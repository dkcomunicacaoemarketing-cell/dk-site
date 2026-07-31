import { createFileRoute } from "@tanstack/react-router";
import { IntroDK } from "@/components/IntroDK";
import { SectionTabs, type Section } from "@/components/SectionTabs";
import { ScrollTypewriter, TypeOnView } from "@/components/ScrollTypewriter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DK Marketing Político | Comunicação Estratégica" },
      {
        name: "description",
        content:
          "Comunicação e marketing político atento aos detalhes: pré-campanhas, campanhas eleitorais, mandatos e comunicação institucional.",
      },
      { property: "og:title", content: "DK Marketing Político" },
      {
        property: "og:description",
        content:
          "Estratégia, narrativa e execução em comunicação política para candidatos, lideranças e instituições.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const MANIFESTO =
  "Idealizado por Daniel Costa, jornalista, publicitário e fotógrafo. Planejamos, construímos e executamos estratégias de comunicação para candidatos, lideranças, mandatos e instituições. Acreditamos que a comunicação é um processo atento aos detalhes. Cada etapa prepara a próxima. Compreendemos o que precisa ser comunicado, construímos a narrativa, planejamos a estratégia e transformamos em ações de comunicação. Conheça a nossa história e a forma como transformamos comunicação em posicionamento e resultados.";

const H2 =
  "font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-5xl";
const BODY = "font-elegant text-lg leading-relaxed sm:text-xl";

function Label({ children }: { children: string }) {
  return (
    <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
      {children}
    </p>
  );
}

const NUMBERS = [
  {
    n: "5",
    t: "campanhas eleitorais",
    d: "Atuação em campanhas municipais, estaduais e federal, da produção de imagem à coordenação estratégica da comunicação.",
  },
  {
    n: "10",
    t: "anos de experiência",
    d: "Comunicação pública, institucional, marketing político, fotografia, publicidade e produção de conteúdo.",
  },
  {
    n: "4",
    t: "áreas de atuação",
    d: "Marketing Político • Comunicação Pública • Comunicação Institucional • Comunicação Digital.",
  },
  {
    n: "3",
    t: "graduações",
    d: "Jornalismo, Publicidade e Propaganda e Fotografia, além de pós-graduação em Gestão e Desenvolvimento e técnico em Administração.",
  },
];

const TIMELINE = [
  { y: "2016", d: "Assistente de Fotografia. Campanha de candidato a vereador. Lages/SC." },
  {
    y: "2018",
    d: "Assistente de Fotografia. Campanha de candidato a deputado estadual. Lages/SC.",
  },
  { y: "2020", d: "Assessor de Imprensa. Campanha de candidato a prefeito. Cachoeira do Sul/RS." },
  {
    y: "2022",
    d: "Coordenador de Comunicação. Campanha de candidato a deputado federal. Porto Alegre/RS.",
  },
  {
    y: "2024",
    d: "Coordenador de Comunicação. Campanhas de prefeito e vereador. Agudo/RS, Novo Cabrais/RS, Candelária/RS.",
  },
  {
    y: "2026",
    d: "Comunicação do Seminário Nacional de Etnodesenvolvimento (Associação São Jerônimo), em Santa Maria/RS e Porto Alegre/RS: planejamento, conteúdo, identidade visual, cobertura e presença digital.",
  },
];

const SOLUTIONS = [
  {
    t: "Estratégia da candidatura",
    items: [
      "Diagnóstico da candidatura",
      "Posicionamento estratégico",
      "Pesquisa de percepção de imagem",
      "Planejamento de comunicação eleitoral",
    ],
  },
  {
    t: "Território, público e mensagem",
    items: ["Análise demográfica", "Definição de público-alvo", "Construção da mensagem"],
  },
  {
    t: "Presença digital",
    items: [
      "WhatsApp Business",
      "Padronização das redes sociais",
      "Links personalizados",
      "Gestão de tráfego pago",
    ],
  },
  {
    t: "Imagem e conteúdo",
    items: [
      "Fotografia institucional",
      "Vídeo de lançamento",
      "Vídeos para redes sociais",
      "Identidade visual da campanha",
      "Textos estratégicos",
    ],
  },
  {
    t: "Comunicação durante a campanha",
    items: [
      "Gestão de redes sociais",
      "Produção de conteúdo",
      "Cobertura fotográfica",
      "Cobertura audiovisual",
      "IA para atendimento ao eleitor",
    ],
  },
  {
    t: "Comunicação institucional",
    items: [
      "Comunicação pública e institucional",
      "Gestão de redes sociais",
      "Fotografia e audiovisual",
      "Identidade visual",
      "Sites e landing pages",
    ],
  },
];

const DIFERENCIAIS = [
  "Formação multidisciplinar",
  "Experiência prática em campanhas eleitorais",
  "Comunicação estratégica integrada",
  "Produção própria de fotografia e vídeo",
  "Identidade visual personalizada",
  "Gestão profissional das redes sociais",
  "Soluções com Inteligência Artificial",
  "Atendimento personalizado",
  "Planejamento estratégico",
  "Atenção aos detalhes",
];

const SECTIONS: Section[] = [
  {
    id: "inicio",
    label: "Início",
    content: (
      <div>
        <Label>DK Marketing Político</Label>
        <TypeOnView
          as="h2"
          text="Comunicação e Marketing atento aos detalhes."
          className="font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-6xl"
        />
        <TypeOnView
          text="Comunicação estratégica para pré-campanhas, campanhas eleitorais, mandatos e comunicação institucional."
          className="mt-8 max-w-2xl font-elegant text-xl leading-snug text-muted-foreground sm:text-2xl"
        />
        
          href="https://wa.me/5551981809645"
          className="mt-10 inline-flex items-center rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-transform duration-200 hover:scale-[1.03]"
        >
          Fale comigo no WhatsApp
        </a>
      </div>
    ),
  },
  {
    id: "quem",
    label: "Quem está à frente",
    content: (
      <div>
        <Label>Quem está à frente</Label>
        <TypeOnView
          as="h2"
          text="Comunicação estratégica construída com experiência, planejamento e atenção aos detalhes."
          className={H2}
        />
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <TypeOnView
            text="A DK Marketing Político nasce com o propósito de cuidar da comunicação como um todo: entender o contexto, planejar caminhos, construir narrativas e transformar estratégias em ações que fortalecem a presença e a imagem de candidatos, lideranças e instituições. À frente da empresa está Daniel Kauan dos Santos Costa, jornalista, publicitário, fotógrafo e especialista em Gestão e Desenvolvimento."
            className={BODY}
          />
          <TypeOnView
            text="Sua trajetória começou aos 17 anos, quando deixou o Rio Grande do Sul para estudar em Santa Catarina. Ainda na graduação, ingressou na assessoria de comunicação da Prefeitura de Lages (SC), onde desenvolveu uma visão ampla da comunicação pública e institucional. Ao longo da carreira, especializou-se em comunicação pública, partidária e campanhas eleitorais, da produção de conteúdo à coordenação estratégica. Mais do que produzir materiais, a DK acredita que os resultados estão nos detalhes."
            className={BODY}
          />
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <Label>Formação</Label>
          <ul className="grid gap-2 text-base sm:text-lg md:grid-cols-2">
            <li>Pós-graduação em Gestão e Desenvolvimento — UERGS (2021)</li>
            <li>Bacharel em Jornalismo — UNIFACVEST (2019)</li>
            <li>Bacharel em Publicidade e Propaganda — UNIFACVEST (2019)</li>
            <li>Tecnólogo em Fotografia — UNIFACVEST (2019)</li>
            <li>Técnico em Administração — SENAC (2013)</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "numeros",
    label: "Números da trajetória",
    content: (
      <div>
        <Label>Números da trajetória</Label>
        <TypeOnView as="h2" text="Uma trajetória construída na prática." className={H2} />
        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          {NUMBERS.map((item) => (
            <div key={item.t} className="border-t border-border pt-6">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-5xl font-black tracking-[-0.04em] sm:text-6xl">
                  {item.n}
                </span>
                <span className="text-lg font-medium">{item.t}</span>
              </div>
              <TypeOnView
                text={item.d}
                className="mt-4 font-elegant text-lg leading-relaxed text-muted-foreground"
              />
            </div>
          ))}
        </div>
        <div className="mt-16">
          {TIMELINE.map((item) => (
            <div
              key={item.y}
              className="grid grid-cols-[minmax(0,1fr)] gap-2 border-t border-border py-6 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-8"
            >
              <span className="font-display text-2xl font-bold tracking-tight">{item.y}</span>
              <p className="font-elegant text-lg leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "solucoes",
    label: "Soluções",
    content: (
      <div>
        <Label>Soluções</Label>
        <TypeOnView
          as="h2"
          text="Comunicação integrada para todas as etapas da campanha."
          className={H2}
        />
        <TypeOnView
          text="Cada projeto é desenvolvido de forma personalizada, considerando os objetivos, o perfil do candidato e as características do território de atuação."
          className="mt-8 max-w-2xl font-elegant text-xl leading-snug text-muted-foreground"
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2 lg:grid-cols-3">
          {SOLUTIONS.map((group) => (
            <div key={group.t} className="bg-card p-7">
              <h3 className="font-display text-lg font-bold tracking-tight">{group.t}</h3>
              <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground sm:text-base">
                {group.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 border-t border-border pt-10">
          <Label>Diferenciais</Label>
          <TypeOnView
            as="h2"
            text="Comunicação feita por quem conhece campanhas eleitorais."
            className={H2}
          />
          <div className="mt-10 flex flex-wrap gap-2.5">
            {DIFERENCIAIS.map((d) => (
              <span
                key={d}
                className="rounded-full bg-muted px-5 py-2.5 text-sm font-medium sm:text-base"
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "portfolio",
    label: "Portfólio",
    content: (
      <div>
        <Label>Portfólio</Label>
        <TypeOnView as="h2" text="Projetos que traduzem estratégia em comunicação." className={H2} />
        <TypeOnView
          text="Espaço destinado à apresentação de campanhas eleitorais, identidades visuais, materiais gráficos, produções audiovisuais, fotografias, sites e demais projetos desenvolvidos pela DK Marketing Político."
          className="mt-8 max-w-2xl font-elegant text-xl leading-snug text-muted-foreground"
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[4/3] rounded-2xl border border-dashed border-border bg-card"
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "contato",
    label: "Contato",
    content: (
      <div>
        <Label>Contato</Label>
        <TypeOnView
          as="h2"
          text="Vamos construir uma comunicação política forte, estratégica e conectada com as pessoas?"
          className={H2}
        />
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          <TypeOnView
            text="Entre em contato e conheça as soluções desenvolvidas pela DK Marketing Político para pré-campanhas, campanhas eleitorais, mandatos e comunicação institucional."
            className={BODY}
          />
          <div className="space-y-1 text-base sm:text-lg">
            <p className="font-medium">Daniel Kauan dos Santos Costa</p>
            <p className="text-muted-foreground">Jornalista | Publicitário | Fotógrafo</p>
            <p className="text-muted-foreground">DRT 6123/SC | DRT 0412/SC</p>
            <p>
              <a href="tel:+5551981809645" className="story-link">
                (51) 98180-9645
              </a>
            </p>
            <p>
              <a href="mailto:danielcosta.jornalista@gmail.com" className="story-link">
                danielcosta.jornalista@gmail.com
              </a>
            </p>
            
              href="https://wa.me/5551981809645"
              className="mt-6 inline-flex items-center rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-transform duration-200 hover:scale-[1.03]"
            >
              Solicite uma proposta
            </a>
          </div>
        </div>
        <div className="mt-16 border-t border-border pt-8">
          <p className="font-display text-2xl font-black tracking-[-0.03em]">
            DK Marketing Político
          </p>
          <p className="mt-2 font-elegant text-lg text-muted-foreground">
            Assessoria de Comunicação e Marketing atenta aos detalhes.
          </p>
          <p className="mt-3 text-sm uppercase tracking-[0.22em] text-muted-foreground">
            Planejamento • Estratégia • Comunicação • Marketing Político
          </p>
          <p className="mt-2 text-sm text-muted-foreground">© Todos os direitos reservados.</p>
        </div>
      </div>
    ),
  },
];

function Index() {
  return (
    <main className="bg-background font-sans text-foreground antialiased">
      <IntroDK />

      {/* Abertura DK */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20">
        <div className="relative">
          <h1 className="font-display text-[26vw] font-black leading-none tracking-[-0.04em] sm:text-[20vw]">
            DK
          </h1>
          <span className="absolute left-1/2 top-[56%] -translate-x-1/2 whitespace-nowrap text-[2.6vw] font-medium uppercase tracking-[0.3em] text-background sm:text-[1.1vw]">
            Marketing Político
          </span>
        </div>
        <div className="scroll-hint absolute bottom-10 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.28em] text-muted-foreground">
          <span>Role para descer</span>
          <span className="h-8 w-px bg-foreground/30" />
        </div>
      </section>

      {/* Manifesto — typewriter no scroll */}
      <ScrollTypewriter
        text={MANIFESTO}
        heightVh={260}
        imageSrc="/images/daniel-costa.jpg"
        imageAlt="Daniel Costa"
        className="font-elegant text-[1.35rem] leading-[1.45] tracking-tight sm:text-3xl md:text-[2.4rem] md:leading-[1.35]"
      />

      {/* Menu fixo no topo + seções */}
      <div className="border-t border-border">
        <SectionTabs sections={SECTIONS} />
      </div>

    </main>
  );
}
