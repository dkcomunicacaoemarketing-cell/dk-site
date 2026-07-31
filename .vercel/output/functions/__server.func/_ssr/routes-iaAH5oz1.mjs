import { r as __toESM } from "../_runtime.mjs";
import { n as require_jsx_runtime, r as require_react } from "../_libs/react+tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-iaAH5oz1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Opening animation: DK reveals from a mask, holds, then the page takes over. */
function IntroDK() {
	const [phase, setPhase] = (0, import_react.useState)("in");
	(0, import_react.useEffect)(() => {
		const t1 = setTimeout(() => setPhase("out"), 2200);
		const t2 = setTimeout(() => setPhase("done"), 3200);
		return () => {
			clearTimeout(t1);
			clearTimeout(t2);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (phase === "done") return;
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = prev;
		};
	}, [phase]);
	if (phase === "done") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `fixed inset-0 z-50 flex items-center justify-center bg-background ${phase === "out" ? "intro-veil-out" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex items-end gap-[0.02em] overflow-hidden",
			children: ["D", "K"].map((letter, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "line-mask",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "intro-letter block font-display text-[30vw] font-black leading-[0.82] tracking-[-0.05em] sm:text-[22vw]",
					style: { animationDelay: `${i * 140}ms` },
					children: letter
				})
			}, letter))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "intro-rule absolute bottom-[22%] h-px bg-foreground/25" })]
	});
}
/**
* Fixed top menu (like a standard site header) with the sections inside it.
* Switching a tab replaces the content in place (masked line transition)
* while the page keeps its normal, native scroll.
*/
function SectionTabs({ sections }) {
	const [active, setActive] = (0, import_react.useState)(0);
	const [pass, setPass] = (0, import_react.useState)(0);
	const anchorRef = (0, import_react.useRef)(null);
	const select = (i) => {
		if (i === active) return;
		setActive(i);
		setPass((p) => p + 1);
		const el = anchorRef.current;
		if (el) {
			const y = el.getBoundingClientRect().top + window.scrollY - 8;
			window.scrollTo({
				top: y,
				behavior: "smooth"
			});
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto flex max-w-5xl gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:overflow-visible sm:py-4 [&::-webkit-scrollbar]:hidden",
			children: sections.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => select(i),
				className: `shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium tracking-tight transition-colors duration-300 sm:px-5 sm:py-2.5 sm:text-sm ${i === active ? "bg-foreground text-background" : "bg-muted text-muted-foreground hover:text-foreground"}`,
				children: s.label
			}, s.id))
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: anchorRef,
		className: "scroll-mt-24 px-5 pb-24 pt-12 sm:px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-5xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "line-in",
				children: sections[active].content
			})
		}, pass)
	})] });
}
/**
* Scroll-driven typewriter: the text is revealed character by character as the
* user scrolls through the (tall) wrapper. The text itself stays pinned.
*/
function ScrollTypewriter({ text, heightVh = 220, className = "", imageSrc, imageAlt = "" }) {
	const wrapperRef = (0, import_react.useRef)(null);
	const [count, setCount] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const el = wrapperRef.current;
		if (!el) return;
		let frame = 0;
		const update = () => {
			frame = 0;
			const rect = el.getBoundingClientRect();
			const total = rect.height - window.innerHeight;
			const progress = total > 0 ? -rect.top / total : 0;
			const eased = Math.min(Math.max(progress / .95, 0), 1);
			setCount(Math.max(12, Math.round(eased * text.length)));
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};
		update();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);
		return () => {
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			if (frame) cancelAnimationFrame(frame);
		};
	}, [text]);
	const done = count >= text.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: wrapperRef,
		style: { height: `${heightVh}vh` },
		className: "relative",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "sticky top-0 flex h-screen items-center justify-center px-6 pt-16",
			children: imageSrc ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex w-full max-w-6xl flex-col items-center gap-10 sm:flex-row sm:items-center sm:justify-between sm:gap-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: `text-left text-balance sm:flex-1 ${className}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.slice(0, count) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: `caret ${done ? "opacity-0" : ""}`
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: imageSrc,
					alt: imageAlt,
					className: "aspect-square w-40 shrink-0 rounded-full object-cover object-top shadow-xl sm:w-52 md:w-64"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: `mx-auto max-w-4xl text-balance ${className}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text.slice(0, count) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					className: `caret ${done ? "opacity-0" : ""}`
				})]
			})
		})
	});
}
/** Typewriter that plays once when the element enters the viewport. */
function TypeOnView({ text, className = "", speed = 26, as: Tag = "p" }) {
	const ref = (0, import_react.useRef)(null);
	const [count, setCount] = (0, import_react.useState)(0);
	const [started, setStarted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const el = ref.current;
		if (!el) return;
		const io = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				setStarted(true);
				io.disconnect();
			}
		}, { threshold: .2 });
		io.observe(el);
		return () => io.disconnect();
	}, []);
	(0, import_react.useEffect)(() => {
		if (!started) return;
		let i = 0;
		const id = setInterval(() => {
			i += 1;
			setCount(Math.min(i, text.length));
			if (i >= text.length) clearInterval(id);
		}, speed);
		return () => clearInterval(id);
	}, [
		started,
		text,
		speed
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tag, {
			className,
			children: [text.slice(0, count), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				"aria-hidden": true,
				className: `caret ${count >= text.length ? "opacity-0" : ""}`
			})]
		})
	});
}
var MANIFESTO = "Idealizado por Daniel Costa, jornalista, publicitário e fotógrafo. Planejamos, construímos e executamos estratégias de comunicação para candidatos, lideranças, mandatos e instituições. Acreditamos que a comunicação é um processo atento aos detalhes. Cada etapa prepara a próxima. Compreendemos o que precisa ser comunicado, construímos a narrativa, planejamos a estratégia e transformamos em ações de comunicação. Conheça a nossa história e a forma como transformamos comunicação em posicionamento e resultados.";
var H2 = "font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-5xl";
var BODY = "font-elegant text-lg leading-relaxed sm:text-xl";
function Label({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground",
		children
	});
}
var SECTIONS = [
	{
		id: "inicio",
		label: "Início",
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "DK Marketing Político" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeOnView, {
				as: "h2",
				text: "Comunicação e Marketing atento aos detalhes.",
				className: "font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-6xl"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeOnView, {
				text: "Comunicação estratégica para pré-campanhas, campanhas eleitorais, mandatos e comunicação institucional.",
				className: "mt-8 max-w-2xl font-elegant text-xl leading-snug text-muted-foreground sm:text-2xl"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
				href: "https://wa.me/5551981809645",
				className: "mt-10 inline-flex items-center rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-transform duration-200 hover:scale-[1.03]",
				children: "Fale comigo no WhatsApp"
			})
		] })
	},
	{
		id: "quem",
		label: "Quem está à frente",
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Quem está à frente" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeOnView, {
				as: "h2",
				text: "Comunicação estratégica construída com experiência, planejamento e atenção aos detalhes.",
				className: H2
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-8 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeOnView, {
					text: "A DK Marketing Político nasce com o propósito de cuidar da comunicação como um todo: entender o contexto, planejar caminhos, construir narrativas e transformar estratégias em ações que fortalecem a presença e a imagem de candidatos, lideranças e instituições. À frente da empresa está Daniel Kauan dos Santos Costa, jornalista, publicitário, fotógrafo e especialista em Gestão e Desenvolvimento.",
					className: BODY
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeOnView, {
					text: "Sua trajetória começou aos 17 anos, quando deixou o Rio Grande do Sul para estudar em Santa Catarina. Ainda na graduação, ingressou na assessoria de comunicação da Prefeitura de Lages (SC), onde desenvolveu uma visão ampla da comunicação pública e institucional. Ao longo da carreira, especializou-se em comunicação pública, partidária e campanhas eleitorais, da produção de conteúdo à coordenação estratégica. Mais do que produzir materiais, a DK acredita que os resultados estão nos detalhes.",
					className: BODY
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 border-t border-border pt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Formação" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "grid gap-2 text-base sm:text-lg md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Pós-graduação em Gestão e Desenvolvimento — UERGS (2021)" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Bacharel em Jornalismo — UNIFACVEST (2019)" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Bacharel em Publicidade e Propaganda — UNIFACVEST (2019)" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Tecnólogo em Fotografia — UNIFACVEST (2019)" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Técnico em Administração — SENAC (2013)" })
					]
				})]
			})
		] })
	},
	{
		id: "numeros",
		label: "Números da trajetória",
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Números da trajetória" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeOnView, {
				as: "h2",
				text: "Uma trajetória construída na prática.",
				className: H2
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-10 sm:grid-cols-2",
				children: [
					{
						n: "5",
						t: "campanhas eleitorais",
						d: "Atuação em campanhas municipais, estaduais e federal, da produção de imagem à coordenação estratégica da comunicação."
					},
					{
						n: "10",
						t: "anos de experiência",
						d: "Comunicação pública, institucional, marketing político, fotografia, publicidade e produção de conteúdo."
					},
					{
						n: "4",
						t: "áreas de atuação",
						d: "Marketing Político • Comunicação Pública • Comunicação Institucional • Comunicação Digital."
					},
					{
						n: "3",
						t: "graduações",
						d: "Jornalismo, Publicidade e Propaganda e Fotografia, além de pós-graduação em Gestão e Desenvolvimento e técnico em Administração."
					}
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-border pt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-5xl font-black tracking-[-0.04em] sm:text-6xl",
							children: item.n
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-lg font-medium",
							children: item.t
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeOnView, {
						text: item.d,
						className: "mt-4 font-elegant text-lg leading-relaxed text-muted-foreground"
					})]
				}, item.t))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-16",
				children: [
					{
						y: "2016",
						d: "Assistente de Fotografia. Campanha de candidato a vereador. Lages/SC."
					},
					{
						y: "2018",
						d: "Assistente de Fotografia. Campanha de candidato a deputado estadual. Lages/SC."
					},
					{
						y: "2020",
						d: "Assessor de Imprensa. Campanha de candidato a prefeito. Cachoeira do Sul/RS."
					},
					{
						y: "2022",
						d: "Coordenador de Comunicação. Campanha de candidato a deputado federal. Porto Alegre/RS."
					},
					{
						y: "2024",
						d: "Coordenador de Comunicação. Campanhas de prefeito e vereador. Agudo/RS, Novo Cabrais/RS, Candelária/RS."
					},
					{
						y: "2026",
						d: "Comunicação do Seminário Nacional de Etnodesenvolvimento (Associação São Jerônimo), em Santa Maria/RS e Porto Alegre/RS: planejamento, conteúdo, identidade visual, cobertura e presença digital."
					}
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-[minmax(0,1fr)] gap-2 border-t border-border py-6 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl font-bold tracking-tight",
						children: item.y
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-elegant text-lg leading-relaxed",
						children: item.d
					})]
				}, item.y))
			})
		] })
	},
	{
		id: "solucoes",
		label: "Soluções",
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Soluções" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeOnView, {
				as: "h2",
				text: "Comunicação integrada para todas as etapas da campanha.",
				className: H2
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeOnView, {
				text: "Cada projeto é desenvolvido de forma personalizada, considerando os objetivos, o perfil do candidato e as características do território de atuação.",
				className: "mt-8 max-w-2xl font-elegant text-xl leading-snug text-muted-foreground"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-px overflow-hidden rounded-2xl bg-border sm:grid-cols-2 lg:grid-cols-3",
				children: [
					{
						t: "Estratégia da candidatura",
						items: [
							"Diagnóstico da candidatura",
							"Posicionamento estratégico",
							"Pesquisa de percepção de imagem",
							"Planejamento de comunicação eleitoral"
						]
					},
					{
						t: "Território, público e mensagem",
						items: [
							"Análise demográfica",
							"Definição de público-alvo",
							"Construção da mensagem"
						]
					},
					{
						t: "Presença digital",
						items: [
							"WhatsApp Business",
							"Padronização das redes sociais",
							"Links personalizados",
							"Gestão de tráfego pago"
						]
					},
					{
						t: "Imagem e conteúdo",
						items: [
							"Fotografia institucional",
							"Vídeo de lançamento",
							"Vídeos para redes sociais",
							"Identidade visual da campanha",
							"Textos estratégicos"
						]
					},
					{
						t: "Comunicação durante a campanha",
						items: [
							"Gestão de redes sociais",
							"Produção de conteúdo",
							"Cobertura fotográfica",
							"Cobertura audiovisual",
							"IA para atendimento ao eleitor"
						]
					},
					{
						t: "Comunicação institucional",
						items: [
							"Comunicação pública e institucional",
							"Gestão de redes sociais",
							"Fotografia e audiovisual",
							"Identidade visual",
							"Sites e landing pages"
						]
					}
				].map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card p-7",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-lg font-bold tracking-tight",
						children: group.t
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-1.5 text-sm text-muted-foreground sm:text-base",
						children: group.items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: i }, i))
					})]
				}, group.t))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-16 border-t border-border pt-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Diferenciais" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeOnView, {
						as: "h2",
						text: "Comunicação feita por quem conhece campanhas eleitorais.",
						className: H2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 flex flex-wrap gap-2.5",
						children: [
							"Formação multidisciplinar",
							"Experiência prática em campanhas eleitorais",
							"Comunicação estratégica integrada",
							"Produção própria de fotografia e vídeo",
							"Identidade visual personalizada",
							"Gestão profissional das redes sociais",
							"Soluções com Inteligência Artificial",
							"Atendimento personalizado",
							"Planejamento estratégico",
							"Atenção aos detalhes"
						].map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-muted px-5 py-2.5 text-sm font-medium sm:text-base",
							children: d
						}, d))
					})
				]
			})
		] })
	},
	{
		id: "portfolio",
		label: "Portfólio",
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Portfólio" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeOnView, {
				as: "h2",
				text: "Projetos que traduzem estratégia em comunicação.",
				className: H2
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeOnView, {
				text: "Espaço destinado à apresentação de campanhas eleitorais, identidades visuais, materiais gráficos, produções audiovisuais, fotografias, sites e demais projetos desenvolvidos pela DK Marketing Político.",
				className: "mt-8 max-w-2xl font-elegant text-xl leading-snug text-muted-foreground"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-[4/3] rounded-2xl border border-dashed border-border bg-card" }, i))
			})
		] })
	},
	{
		id: "contato",
		label: "Contato",
		content: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Contato" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeOnView, {
				as: "h2",
				text: "Vamos construir uma comunicação política forte, estratégica e conectada com as pessoas?",
				className: H2
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-10 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypeOnView, {
					text: "Entre em contato e conheça as soluções desenvolvidas pela DK Marketing Político para pré-campanhas, campanhas eleitorais, mandatos e comunicação institucional.",
					className: BODY
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1 text-base sm:text-lg",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: "Daniel Kauan dos Santos Costa"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: "Jornalista | Publicitário | Fotógrafo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground",
							children: "DRT 6123/SC | DRT 0412/SC"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "tel:+5551981809645",
							className: "story-link",
							children: "(51) 98180-9645"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "mailto:danielcosta.jornalista@gmail.com",
							className: "story-link",
							children: "danielcosta.jornalista@gmail.com"
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "https://wa.me/5551981809645",
							className: "mt-6 inline-flex items-center rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-transform duration-200 hover:scale-[1.03]",
							children: "Solicite uma proposta"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-16 border-t border-border pt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl font-black tracking-[-0.03em]",
						children: "DK Marketing Político"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-elegant text-lg text-muted-foreground",
						children: "Assessoria de Comunicação e Marketing atenta aos detalhes."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm uppercase tracking-[0.22em] text-muted-foreground",
						children: "Planejamento • Estratégia • Comunicação • Marketing Político"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "© Todos os direitos reservados."
					})
				]
			})
		] })
	}
];
function Index() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "bg-background font-sans text-foreground antialiased",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IntroDK, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative flex min-h-screen flex-col items-center justify-center px-6 pt-20",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-[26vw] font-black leading-none tracking-[-0.04em] sm:text-[20vw]",
						children: "DK"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "-mt-2 whitespace-nowrap text-[2.6vw] font-medium uppercase tracking-[0.3em] text-foreground sm:-mt-3 sm:text-[1.1vw]",
						children: "Marketing Político"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "scroll-hint absolute bottom-10 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.28em] text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Role para descer" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-8 w-px bg-foreground/30" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollTypewriter, {
				text: MANIFESTO,
				heightVh: 260,
				imageSrc: "/images/daniel-costa.jpg",
				imageAlt: "Daniel Costa",
				className: "font-elegant text-[1.35rem] leading-[1.45] tracking-tight sm:text-3xl md:text-[2.4rem] md:leading-[1.35]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTabs, { sections: SECTIONS })
			})
		]
	});
}
//#endregion
export { Index as component };
