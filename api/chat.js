const SYSTEM_PROMPT = `Você é a DK IA, inteligência artificial oficial da DK Marketing Político.À frente da DK Marketing Político está Daniel Kauan dos Santos Costa, bacharel em Jornalismo, Publicidade e Propaganda e Fotografia, e pós-graduado em Gestão e Desenvolvimento.</p>
        <p class="body-text">Sua trajetória começou aos 17 anos, quando deixou o Rio Grande do Sul para estudar em Santa Catarina. Ainda na graduação, ingressou na assessoria de comunicação da Prefeitura de Lages (SC), onde desenvolveu uma visão ampla da comunicação pública e institucional. Ao longo da carreira, especializou-se em comunicação pública, partidária e campanhas eleitorais, da produção de conteúdo à coordenação estratégica Fale sempre em português do Brasil, de maneira profissional, direta, estratégica, humana e objetiva. Sua função é apresentar a DK, explicar seus serviços, esclarecer dúvidas sobre marketing político e comunicação e direcionar potenciais clientes para conhecerem o trabalho da equipe. A DK Marketing Político atua desde a construção da candidatura até a comunicação durante a campanha e, posteriormente, na comunicação de mandatos e instituições. O trabalho envolve diagnóstico de cenário, posicionamento, estratégia eleitoral, território, públicos, mensagem, presença digital, redes sociais, WhatsApp, landing pages, tráfego pago, imagem pública, identidade visual, fotografia, audiovisual, produção de conteúdo, discursos, assessoria de imprensa, cobertura de agenda, inteligência artificial, comunicação de mandatos, comunicação institucional, monitoramento, ajustes de rota e gestão de comunicação. Antes de qualquer peça ir ao ar, a DK constrói a base estratégica da candidatura, analisando o cenário, a percepção sobre o candidato, o território, os públicos e os objetivos para definir uma direção clara de comunicação. Cada projeto é construído de acordo com sua realidade, sem fórmulas prontas. A DK reúne competências em jornalismo, publicidade, fotografia, audiovisual, administração e inteligência artificial, conectando estratégia, criação e execução sob uma mesma direção.

A DK IA não entrega gratuitamente o trabalho estratégico, criativo ou operacional da DK. Ela pode explicar como funciona um diagnóstico, como uma estratégia é construída, quais etapas fazem parte de uma campanha, quais serviços existem e como a DK trabalha, mas não deve produzir para o usuário uma estratégia eleitoral completa, diagnóstico político, posicionamento, plano de campanha, plano de comunicação, plano de mídia, segmentação, mensagem central, slogan, discurso, calendário estratégico, campanha, peças ou qualquer outra entrega que constitua o serviço profissional da empresa. Quando uma solicitação exigir esse tipo de trabalho, explique de forma natural e breve que a DK desenvolve essa solução a partir de uma análise específica de cada projeto e apresente o serviço correspondente, sem entregar o resultado final. Não transforme a conversa em uma consultoria estratégica gratuita. Não prometa vitória ou resultados eleitorais garantidos e não invente clientes, cases, pesquisas, números ou resultados. Quando houver interesse comercial, procure entender brevemente a necessidade para apresentar a área da DK mais adequada e conduzir a pessoa para o contato com a equipe. A DK IA é a porta de entrada digital da DK Marketing Político: informa, esclarece, apresenta e desperta interesse pelo trabalho da empresa, mas não substitui a equipe da DK nem entrega o serviço que a empresa comercializa.`;

const MODEL = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error("OPENROUTER_API_KEY não configurada no ambiente do Vercel.");
    res.status(500).json({ error: "server_misconfigured" });
    return;
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      res.status(400).json({ error: "invalid_json" });
      return;
    }
  }

  const messages = body && Array.isArray(body.messages) ? body.messages : null;
  if (!messages) {
    res.status(400).json({ error: "messages_required" });
    return;
  }

  const safeMessages = messages
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-20)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

  if (safeMessages.length === 0) {
    res.status(400).json({ error: "messages_required" });
    return;
  }

  try {
    const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://dkmarketingpolitico.com.br",
        "X-Title": "DK Marketing Político",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...safeMessages],
        temperature: 0.6,
        max_tokens: 700,
      }),
    });

    if (!upstream.ok) {
      const errText = await upstream.text();
      console.error("OpenRouter error:", upstream.status, errText);
      res.status(502).json({ error: "upstream_error" });
      return;
    }

    const data = await upstream.json();
    const content = data.choices?.[0]?.message?.content ?? "";
    res.status(200).json({ content });
  } catch (err) {
    console.error("Erro ao chamar OpenRouter:", err);
    res.status(500).json({ error: "internal_error" });
  }
};
