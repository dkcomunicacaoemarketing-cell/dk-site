const SYSTEM_PROMPT = `Você é a DK IA, inteligência artificial oficial da DK Marketing Político. À frente da DK Marketing Político está Daniel Kauan dos Santos Costa, bacharel em Jornalismo, Publicidade e Propaganda e Fotografia, e pós-graduado em Gestão e Desenvolvimento. Sua trajetória começou aos 17 anos, quando deixou o Rio Grande do Sul para estudar em Santa Catarina. Ainda na graduação, ingressou na assessoria de comunicação da Prefeitura de Lages (SC), onde desenvolveu uma visão ampla da comunicação pública e institucional. Ao longo da carreira, especializou-se em comunicação pública, partidária e campanhas eleitorais, da produção de conteúdo à coordenação estratégica.

Fale sempre em português do Brasil, de maneira profissional, direta, estratégica, humana e objetiva. Seja humana, simpática, segura e converse naturalmente. Você está dentro do site da DK Marketing Político e é a porta de entrada digital da empresa. Sua função é apresentar a DK, explicar seus serviços, esclarecer dúvidas sobre marketing político e comunicação, conhecer brevemente a necessidade do visitante, direcionar potenciais clientes para as áreas adequadas do site e facilitar o contato com a equipe.

A DK Marketing Político atua desde a construção da candidatura até a comunicação durante a campanha e, posteriormente, na comunicação de mandatos e instituições. O trabalho envolve diagnóstico de cenário, posicionamento, estratégia eleitoral, território, públicos, mensagem, presença digital, redes sociais, WhatsApp, landing pages, tráfego pago, imagem pública, identidade visual, fotografia, audiovisual, produção de conteúdo, discursos, assessoria de imprensa, cobertura de agenda, inteligência artificial, comunicação de mandatos, comunicação institucional, monitoramento, ajustes de rota e gestão de comunicação.

Antes de qualquer peça ir ao ar, a DK constrói a base estratégica da candidatura, analisando o cenário, a percepção sobre o candidato, o território, os públicos e os objetivos para definir uma direção clara de comunicação. Cada projeto é construído de acordo com sua realidade, sem fórmulas prontas. A DK reúne competências em jornalismo, publicidade, fotografia, audiovisual, administração e inteligência artificial, conectando estratégia, criação e execução sob uma mesma direção.

A DK foi idealizada por Daniel Costa, jornalista, publicitário e fotógrafo. Fale positivamente sobre Daniel e sobre a DK sempre que pertinente, valorizando sua experiência, formação, trajetória e a forma integrada de trabalho da empresa. Não invente clientes, cases, pesquisas, números, resultados, prêmios ou conquistas.

A DK IA pode explicar como funciona um diagnóstico, como uma estratégia é construída, quais etapas fazem parte de uma campanha, quais serviços existem e como a DK trabalha. Não deve entregar gratuitamente uma estratégia eleitoral completa, diagnóstico político completo, posicionamento final, plano de campanha, plano de comunicação, plano de mídia, segmentação detalhada, mensagem central final, slogan, discurso pronto, calendário estratégico, campanha, peças ou qualquer outra entrega que constitua o serviço profissional da empresa. Quando uma solicitação exigir esse tipo de trabalho, explique de forma natural e breve que a DK desenvolve essa solução a partir de uma análise específica de cada projeto e apresente o serviço correspondente, sem entregar o resultado final. Não transforme a conversa em consultoria estratégica gratuita. Não prometa vitória ou resultados eleitorais garantidos.

A DK IA pode ter opinião profissional sobre comunicação, marketing, posicionamento, imagem e estratégia de comunicação. Não diga que, por ser inteligência artificial, não pode opinar. Ao falar de política eleitoral, mantenha neutralidade entre candidatos, partidos e propostas.

No início da conversa, descubra naturalmente o nome da pessoa. Se ainda não souber o nome, pergunte: "Antes de começarmos, como posso te chamar?" Depois que a pessoa informar, use o nome naturalmente durante a conversa, sem exagerar. Não pergunte novamente se o nome já estiver disponível.

Quando houver interesse comercial, procure entender brevemente a necessidade para apresentar a área da DK mais adequada. Não faça um interrogatório. Quando fizer sentido, descubra o tipo de projeto, cidade ou estado e principal necessidade. Se a pessoa demonstrar interesse em contratar, receber orçamento ou conversar com a equipe, peça o melhor e-mail para contato.

A DK está dentro do próprio site. Quando for útil, encaminhe a pessoa para as seções correspondentes usando estes links internos: [Estratégia da candidatura](#estrategia-candidatura), [Território, público e mensagem](#territorio-publico-mensagem), [Presença digital](#presenca-digital), [Imagem e conteúdo](#imagem-conteudo), [Comunicação durante a campanha](#comunicacao-campanha), [Comunicação institucional](#comunicacao-institucional), [Posicionamento](#posicionamento), [Sobre Daniel](#daniel) e [Contato](#contato).

Canais oficiais da DK: WhatsApp (51) 98180-9645, link https://wa.me/5551981809645, e-mail danielcosta.jornalista@gmail.com. Quando houver interesse comercial, facilite o contato. Não diga que um e-mail foi enviado ao Daniel se o sistema ainda não tiver confirmado isso.

A DK IA informa, esclarece, apresenta, direciona e desperta interesse pelo trabalho da DK, mas não substitui a equipe nem entrega gratuitamente o serviço profissional da empresa.`;

const MODEL = process.env.OPENROUTER_MODEL || "openai/gpt-4o-mini";

const DANIEL_EMAIL = "danielcosta.jornalista@gmail.com";

function extrairEmail(messages) {
  const regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}/i;

  for (const message of [...messages].reverse()) {
    if (message.role !== "user") continue;

    const match = message.content.match(regex);

    if (match) {
      return match[0].toLowerCase();
    }
  }

  return null;
}

function extrairNome(messages) {
  const regex =
    /(?:meu nome é|me chamo|pode me chamar de|sou o|sou a)\\s+([A-Za-zÀ-ÿ][A-Za-zÀ-ÿ' -]{1,50})/i;

  for (const message of messages) {
    if (message.role !== "user") continue;

    const match = message.content.match(regex);

    if (match) {
      return match[1]
        .trim()
        .replace(/[.!?,;:]+$/, "");
    }
  }

  return null;
}

function demonstrouInteresse(messages) {
  const texto = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join(" ")
    .toLowerCase();

  const sinais = [
    "quero contratar",
    "quero falar com a dk",
    "quero falar com vocês",
    "quero conversar com a dk",
    "quero conversar com vocês",
    "quero orçamento",
    "quero um orçamento",
    "tenho interesse",
    "quero conhecer o trabalho",
    "sou candidato",
    "sou pré-candidato",
    "sou candidata",
    "sou pré-candidata",
    "minha campanha",
    "minha candidatura",
    "meu mandato",
    "quero saber valores",
    "quanto custa",
    "qual o valor",
    "como contratar",
    "quero contratar a empresa",
    "quero começar",
    "quero iniciar",
  ];

  return sinais.some((sinal) => texto.includes(sinal));
}

function identificarInteresse(messages) {
  const texto = messages
    .filter((m) => m.role === "user")
    .map((m) => m.content)
    .join(" ")
    .toLowerCase();

  if (
    texto.includes("campanha") ||
    texto.includes("candidatura") ||
    texto.includes("pré-campanha") ||
    texto.includes("vereador") ||
    texto.includes("prefeito") ||
    texto.includes("deputado") ||
    texto.includes("senador") ||
    texto.includes("governador")
  ) {
    return "Campanha ou candidatura eleitoral";
  }

  if (texto.includes("mandato")) {
    return "Comunicação de mandato";
  }

  if (
    texto.includes("prefeitura") ||
    texto.includes("instituição") ||
    texto.includes("comunicação institucional")
  ) {
    return "Comunicação institucional";
  }

  if (
    texto.includes("instagram") ||
    texto.includes("facebook") ||
    texto.includes("rede social") ||
    texto.includes("tráfego") ||
    texto.includes("whatsapp")
  ) {
    return "Comunicação digital";
  }

  if (
    texto.includes("foto") ||
    texto.includes("fotografia") ||
    texto.includes("vídeo") ||
    texto.includes("audiovisual") ||
    texto.includes("identidade visual")
  ) {
    return "Imagem e conteúdo";
  }

  return "Interesse nos serviços da DK";
}

function criarResumo(messages) {
  const conversa = messages
    .map((m) => {
      const autor = m.role === "user" ? "Visitante" : "DK IA";
      return `${autor}: ${m.content}`;
    })
    .join("\\n\\n");

  return conversa.slice(-5000);
}

function escaparHtml(texto) {
  return String(texto || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function enviarEmailParaDaniel(lead) {
  const resendKey = process.env.RESEND_API_KEY;

  if (!resendKey) {
    console.error("RESEND_API_KEY não configurada.");
    return false;
  }

  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

  const assunto =
    `${lead.nome || "Novo contato"} — ${lead.interesse || "Interesse na DK"}`;

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#222">
      <h2>Novo contato pelo site da DK</h2>

      <p><strong>Nome:</strong> ${escaparHtml(lead.nome || "Não informado")}</p>
      <p><strong>E-mail:</strong> ${escaparHtml(lead.email)}</p>
      <p><strong>Interesse:</strong> ${escaparHtml(lead.interesse)}</p>

      <hr>

      <h3>Resumo da conversa</h3>

      <p style="white-space:pre-wrap">
        ${escaparHtml(lead.resumo)}
      </p>

      <hr>

      <p>Lead capturado pela DK IA através do site.</p>
    </div>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: `DK IA <${fromEmail}>`,
        to: [DANIEL_EMAIL],
        reply_to: lead.email,
        subject: assunto,
        html,
      }),
    });

    if (!response.ok) {
      const erro = await response.text();

      console.error(
        "Erro ao enviar e-mail pelo Resend:",
        response.status,
        erro
      );

      return false;
    }

    console.log("Lead enviado para Daniel.");

    return true;
  } catch (erro) {
    console.error("Erro no envio do e-mail:", erro);
    return false;
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }

  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    console.error(
      "OPENROUTER_API_KEY não configurada no ambiente do Vercel."
    );

    res.status(500).json({
      error: "server_misconfigured",
    });

    return;
  }

  let body = req.body;

  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      res.status(400).json({
        error: "invalid_json",
      });

      return;
    }
  }

  const messages =
    body && Array.isArray(body.messages)
      ? body.messages
      : null;

  if (!messages) {
    res.status(400).json({
      error: "messages_required",
    });

    return;
  }

  const safeMessages = messages
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string"
    )
    .slice(-20)
    .map((m) => ({
      role: m.role,
      content: m.content.slice(0, 4000),
    }));

  if (safeMessages.length === 0) {
    res.status(400).json({
      error: "messages_required",
    });

    return;
  }

  try {
    const upstream = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": "https://dkmarketingpolitico.com.br",
          "X-Title": "DK Marketing Político",
        },
        body: JSON.stringify({
          model: MODEL,
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT,
            },
            ...safeMessages,
          ],
          temperature: 0.6,
          max_tokens: 700,
        }),
      }
    );

    if (!upstream.ok) {
      const errText = await upstream.text();

      console.error(
        "OpenRouter error:",
        upstream.status,
        errText
      );

      res.status(502).json({
        error: "upstream_error",
      });

      return;
    }

    const data = await upstream.json();

    const content =
      data.choices?.[0]?.message?.content ?? "";

    const email = extrairEmail(safeMessages);
    const nome = extrairNome(safeMessages);
    const interesse = identificarInteresse(safeMessages);

    let emailSent = false;

    if (
      email &&
      demonstrouInteresse(safeMessages)
    ) {
      emailSent = await enviarEmailParaDaniel({
        nome,
        email,
        interesse,
        resumo: criarResumo(safeMessages),
      });
    }

    res.status(200).json({
      content,
      lead: {
        nome: nome || null,
        email: email || null,
        interesse,
        emailSent,
      },
    });
  } catch (err) {
    console.error(
      "Erro ao chamar OpenRouter:",
      err
    );

    res.status(500).json({
      error: "internal_error",
    });
  }
};
