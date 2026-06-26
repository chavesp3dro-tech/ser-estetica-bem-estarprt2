

Atualizar

Compartilhar
continue
Lite
Vou agora realizar a substituição das características visuais dos cards no arquivo Home(1).tsx, incorporando o design moderno, os efeitos de tilt (inclinação), o spotlight e as animações de entrada do arquivo SER_ServicesSection.jsx, mantendo os textos originais.
Lite
Concluí a substituição das características visuais dos cards de serviços no arquivo Home(1).tsx.
As principais melhorias implementadas incluem:
Design de Cartão em Vidro (Glassmorphism): Agora os cards possuem um fundo semi-transparente com efeito de desfoque (backdrop-filter: blur(20px)), proporcionando uma estética moderna e sofisticada.
Efeito de Inclinação 3D (Tilt): Adicionei interatividade aos cards, que agora se inclinam suavemente em direção ao ponteiro do mouse.
Spotlight Dinâmico: Um efeito de iluminação radial segue o movimento do mouse sobre o cartão.
Animações de Entrada: Os cards agora surgem com um efeito de "staggered entry" (entrada escalonada), aparecendo um após o outro com um suave deslocamento e desfoque.
Estilização Refinada: As bordas, sombras e ícones foram atualizados para usar a paleta de cores da marca (C.rose), mantendo a consistência visual.
Os textos originais e a estrutura do componente foram preservados, focando estritamente na atualização da experiência visual. Você pode baixar o arquivo atualizado em anexo.
Home(1).tsx
Código · 50.14 KB
Ver todos os arquivos nesta tarefa
Como foi este resultado?
agora vá no repositorio no github e altera apenas a parte visual e antes de fazer o commit, tenha certeza que alterou apenas a parte do código da parte visual dos cards, molduras, efeitos, interações e toda parte visual aí depois faça o commit
Lite
Vou agora acessar o repositório no GitHub para aplicar as alterações visuais dos cards. Vou garantir que apenas o código relacionado ao design, efeitos e interações seja modificado, preservando todo o conteúdo textual, e então realizarei o commit.
Lite
Seus créditos foram usados. Obtenha mais créditos para continuar usando.
Seus créditos foram esgotados. Por favor, atualize seu plano para obter mais créditos.
Atualizar


GitHub


Manus is an AI Agent and can make mistakes. Please double-check before use.

Home(1).tsx
import { useState, useRef, useEffect, useCallback } from "react";
import { Menu, X, Star, Award, Users, Calendar, Phone, Mail, MapPin, ChevronRight, Sparkles, Heart, Shield, Instagram, Clock, Zap, Gem, Leaf, Wind, Activity } from "lucide-react";

// ─── IMAGENS REAIS (base64) ──────────────────────────────────────────────────
const IMG_LOGO     = "data:image/jpeg;base64,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";
const IMG_DOURADO  = "data:image/png;base64,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";
const IMG_ABOUT    = "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=1200";

const NAV_LINKS = [
  { label: "Serviços", href: "#services" },
  { label: "Sobre", href: "#about" },
  { label: "Parceiros", href: "#partners" },
  { label: "Contato", href: "#contact" },
];

const SERVICES = [
  {
    icon: Zap,
    title: "Quick Massage",
    description: "Sessão focada na liberação imediata das tensões musculares acumuladas na rotina corporativa, promovendo relaxamento profundo, melhora da circulação e sensação instantânea de bem-estar.",
    duration: "10–20 min",
    tag: "Mais Solicitado",
  },
  {
    icon: Sparkles,
    title: "Reiki",
    description: "Técnica milenar de reequilíbrio energético que atua nos campos sutis do corpo, promovendo alinhamento mental, dissolução do estresse e restauração da vitalidade de forma profunda e não invasiva.",
    duration: "20–30 min",
    tag: "Equilíbrio",
  },
  {
    icon: Gem,
    title: "Revitalização Facial",
    description: "Protocolo exclusivo que combina limpeza profunda, massagem esculpida e hidratação de alta performance para revelar a luminosidade natural e a firmeza duradoura da pele.",
    duration: "20–30 min",
    tag: "Premium",
  },
  {
    icon: Leaf,
    title: "Spa dos Pés",
    description: "Ritual terapêutico completo com técnicas especializadas de alívio de tensões, hidratação intensiva e massagem reflexológica para uma experiência de renovação integral.",
    duration: "15–25 min",
    tag: "Relaxamento",
  },
  {
    icon: Wind,
    title: "Massagem Relaxante",
    description: "Técnica que trabalha toda a musculatura corporal, dissolvendo nódulos de tensão, melhorando a circulação sanguínea e induzindo um estado profundo de relaxamento e renovação física.",
    duration: "30–60 min",
    tag: "Clássico",
  },
  {
    icon: Activity,
    title: "Drenagem & Pós-Operatório",
    description: "Protocolo especializado de drenagem linfática e cuidados pós-cirúrgicos, conduzido por profissionais certificadas para recuperação segura, redução de edemas e resultados otimizados.",
    duration: "Customizado",
    tag: "Especializado",
  },
];

const TESTIMONIALS = [
  {
    name: "Agenersa",
    role: "Parceria 2025/2026 — Evento Dia das Mulheres",
    text: "Gostaríamos de expressar nossa profunda gratidão à SER pela participação impecável no nosso evento. A equipe demonstrou profissionalismo e um cuidado genuíno com nossas colaboradoras, proporcionando dois dias de puro bem-estar com massagens relaxantes e diversas atividades que tornaram o evento memorável.",
    stars: 5,
    avatar: "AG",
  },
  {
    name: "Transmoto Logística",
    role: "Ação Dia das Mães",
    text: "Uma das decisões mais acertadas que tomamos em maio foi contratar a SER Estética e Bem-Estar. Agradecemos especialmente à Shirley, que se dedicou com carinho e empenho para oferecer uma experiência única às nossas colaboradoras. Foi um momento de cuidado e bem-estar que ficará na memória de todos.",
    stars: 5,
    avatar: "TL",
  },
  {
    name: "Plural Experience",
    role: "Aniversário — Produtor Viny Coutinho",
    text: "A Plural Experience agradece imensamente à SER pelos excelentes serviços de quick massage. Desde o primeiro contato, fomos atendidos com muito profissionalismo, pontualidade e simpatia. A qualidade do atendimento foi impecável e a SER superou nossas expectativas. Foi uma parceria de grande sucesso!",
    stars: 5,
    avatar: "PE",
  },
];

const STATS = [
  { value: "300+", label: "Eventos Realizados" },
  { value: "5k+", label: "Pessoas Atendidas" },
  { value: "98%", label: "Índice de Satisfação" },
  { value: "5+", label: "Anos de Experiência" },
];

const GALLERY_IMAGES = [
  { src: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&q=80&w=600", alt: "Quick Massage em evento", tall: true },
  { src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&q=80&w=600", alt: "Revitalização facial" },
  { src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600", alt: "Ambiente de spa" },
  { src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&q=80&w=600", alt: "Massagem relaxante", tall: true },
  { src: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&q=80&w=600", alt: "Spa dos pés" },
  { src: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600", alt: "Produtos de estética" },
];

const C = {
  bg: "#0c0812",
  card: "#150f22",
  muted: "#1e1230",
  rose: "#D4A5BA",
  roseLight: "#E8C4D8",
  lilac: "#9B7BA0",
  lilacMuted: "#B8A0C2",
  secondary: "#3D2D45",
  text: "#f5f0ff",
  placeholder: "#4a3a64",
};

const styles = {
  playfair: { fontFamily: "'Playfair Display', serif" },
};

function GoldDivider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "8px 0" }}>
      <div style={{ height: 1, flex: 1, background: `linear-gradient(to right, transparent, ${C.rose}, transparent)`, opacity: 0.4 }} />
      <div style={{ width: 6, height: 6, transform: "rotate(45deg)", background: C.rose, opacity: 0.7 }} />
      <div style={{ height: 1, flex: 1, background: `linear-gradient(to right, transparent, ${C.rose}, transparent)`, opacity: 0.4 }} />
    </div>
  );
}

function StatCard({ value, label }: any) {
  const match = value.match(/^([\d.]+)(\D*)$/);
  const numPart = match ? match[1] : value;
  const suffixPart = match ? match[2] : "";
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ ...styles.playfair, fontSize: 48, fontWeight: 300, letterSpacing: "0.05em", color: C.rose, marginBottom: 8 }}>
        <span style={{ fontWeight: 300, fontStyle: "italic" }}>{numPart}</span>
        <span style={{ fontWeight: 300, fontSize: "0.75em" }}>{suffixPart}</span>
      </div>
      <div style={{ fontSize: 11, letterSpacing: "0.2em", color: C.lilacMuted, textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}

function TagBadge({ label }: any) {
  return (
    <span style={{ 
      display: "inline-flex", 
      alignItems: "center", 
      padding: "3px 11px", 
      background: "rgba(212, 165, 186, 0.07)", 
      border: "1px solid rgba(212, 165, 186, 0.18)", 
      borderRadius: "20px", 
      fontSize: "9.5px", 
      fontWeight: 600, 
      letterSpacing: "0.13em", 
      color: "rgba(212, 165, 186, 0.78)", 
      textTransform: "uppercase" 
    }}>
      {label}
    </span>
  );
}

function LogoImg({ size = 40 }: { size?: number }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden", border: `1px solid ${C.rose}44`, background: C.muted, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <img src={IMG_LOGO} alt="SER Logo" style={{ width: "80%", height: "80%", objectFit: "contain" }} />
    </div>
  );
}

function ServiceCard({ service, index }: { service: typeof SERVICES[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [entered, setEntered] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [light, setLight] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), index * 120 + 80);
    return () => clearTimeout(t);
  }, [index]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    setTilt({
      rx: ((y - r.height / 2) / (r.height / 2)) * -4,
      ry: ((x - r.width / 2) / (r.width / 2)) * 4,
    });
    setLight({ x: (x / r.width) * 100, y: (y / r.height) * 100 });
  }, []);

  const onLeave = useCallback(() => {
    setHovered(false);
    setTilt({ rx: 0, ry: 0 });
    setLight({ x: 50, y: 50 });
  }, []);

  const { icon: Icon, tag, title, description, duration } = service;

  const cardTransform = hovered
    ? `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(-8px) scale(1.02)`
    : "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";

  const cardBoxShadow = hovered
    ? "0 12px 40px rgba(0,0,0,0.55), 0 0 40px rgba(212,165,186,0.09), 0 28px 65px rgba(0,0,0,0.38)"
    : "0 6px 28px rgba(0,0,0,0.42), 0 0 22px rgba(212,165,186,0.02), 0 18px 50px rgba(0,0,0,0.28)";

  const cardBorder = hovered
    ? `1px solid ${C.rose}4d`
    : "1px solid rgba(255,255,255,0.08)";

  return (
    <div
      style={{
        height: "100%",
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0px)" : "translateY(40px)",
        filter: entered ? "blur(0px)" : "blur(12px)",
        transition: "opacity 0.7s ease, transform 0.7s ease, filter 0.7s ease",
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        style={{
          height: "100%",
          position: "relative",
          overflow: "hidden",
          borderRadius: "16px",
          padding: "28px 24px 26px",
          cursor: "default",
          background: "rgba(21, 15, 34, 0.65)",
          backdropFilter: "blur(20px)",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          border: cardBorder,
          boxShadow: cardBoxShadow,
          transform: cardTransform,
          transition: hovered
            ? "transform 0.08s linear, box-shadow 0.3s ease, border-color 0.3s ease"
            : "transform 0.65s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.65s ease, border-color 0.3s ease",
        }}
      >
        {/* Mouse spotlight */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "16px",
            background: `radial-gradient(circle at ${light.x}% ${light.y}%, ${C.rose}1a 0%, transparent 58%)`,
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.25s ease",
            pointerEvents: "none",
          }}
        />

        {/* Top shimmer line */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            left: "12%",
            right: "12%",
            height: "1px",
            borderRadius: "0 0 3px 3px",
            background: hovered ? `${C.rose}80` : "rgba(255,255,255,0.11)",
            transition: "background 0.4s ease",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ marginBottom: "22px" }}>
            <TagBadge label={tag} />
          </div>

          <div
            style={{
              width: "48px",
              height: "48px",
              flexShrink: 0,
              borderRadius: "50%",
              background: `radial-gradient(circle at 38% 36%, ${C.rose}33 0%, ${C.lilac}12 55%, transparent 80%)`,
              border: `1px solid ${C.rose}29`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "22px",
              transition: "transform 0.35s ease, box-shadow 0.35s ease",
              transform: hovered ? "scale(1.12)" : "scale(1)",
              boxShadow: hovered ? `0 0 22px ${C.rose}29` : "none",
            }}
          >
            <Icon size={21} color={`${C.rose}e0`} strokeWidth={1.5} />
          </div>

          <h3 style={{ ...styles.playfair, fontSize: "21px", fontWeight: 700, color: "#ffffff", lineHeight: 1.2, marginBottom: "12px", letterSpacing: "-0.015em" }}>
            {title}
          </h3>

          <p style={{ fontSize: "13.5px", color: "rgba(255,255,255,0.47)", lineHeight: 1.72, marginBottom: "26px", flex: 1 }}>
            {description}
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "20px", height: "20px", flexShrink: 0, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Clock size={10} color="rgba(255,255,255,0.4)" strokeWidth={1.8} />
            </div>
            <span style={{ fontSize: "11.5px", color: "rgba(255,255,255,0.32)", letterSpacing: "0.05em" }}>
              {duration}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text, fontFamily: "'Inter', sans-serif" }}>
      {/* ── Navbar ── */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: `${C.bg}cc`, backdropFilter: "blur(12px)", borderBottom: `1px solid ${C.rose}1a` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 80, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <LogoImg size={44} />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span style={{ ...styles.playfair, color: C.rose, fontSize: 20, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" }}>SER</span>
              <span style={{ fontSize: 10, letterSpacing: "0.25em", color: C.lilacMuted, textTransform: "uppercase" }}>Estética & Bem-Estar</span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 40 }} className="hide-mobile">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} style={{ fontSize: 13, fontWeight: 500, color: C.lilacMuted, textTransform: "uppercase", letterSpacing: "0.1em", transition: "color 0.2s" }} className="nav-link">
                {l.label}
              </a>
            ))}
          </div>

          <button style={{ background: "none", border: "none", color: C.rose }} className="show-mobile" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section style={{ padding: "180px 24px 100px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "10%", right: "-5%", width: 600, height: 600, borderRadius: "50%", background: `${C.rose}14`, filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: `${C.lilac}14`, filter: "blur(60px)", pointerEvents: "none" }} />
        
        <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", background: `${C.rose}14`, borderRadius: 99, marginBottom: 32, border: `1px solid ${C.rose}33` }}>
            <Sparkles size={14} color={C.rose} />
            <span style={{ fontSize: 12, fontWeight: 600, color: C.rose, letterSpacing: "0.1em", textTransform: "uppercase" }}>Excelência em Eventos Corporativos</span>
          </div>
          
          <h1 style={{ ...styles.playfair, fontSize: "clamp(40px, 8vw, 84px)", fontWeight: 700, color: C.text, lineHeight: 1.1, marginBottom: 32 }}>
            Sua Equipe Merece <br />
            <span style={{ color: C.rose, fontStyle: "italic", fontWeight: 400 }}>Bem-Estar Real</span>
          </h1>
          
          <p style={{ maxWidth: 700, margin: "0 auto 48px", color: C.lilacMuted, fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.6 }}>
            Elevamos a experiência do seu evento com serviços premium de estética e terapias relaxantes. Transformamos ambientes em refúgios de renovação.
          </p>
          
          <div style={{ display: "flex", gap: 16, justifyContent: "center" }} className="md-flex-col">
            <a href="https://wa.me/5521991219642" target="_blank" rel="noreferrer" className="cta-btn" style={{ padding: "180x 40px", fontSize: 14, fontWeight: 600 }}>
              Solicitar Proposta <ChevronRight size={18} />
            </a>
            <a href="#services" style={{ padding: "18px 40px", fontSize: 14, fontWeight: 600, border: `1px solid ${C.rose}33`, borderRadius: 4, color: C.text, transition: "all 0.3s" }}>
              Nossos Serviços
            </a>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: "64px 24px", borderTop: `1px solid ${C.rose}1a`, borderBottom: `1px solid ${C.rose}1a`, background: `${C.card}4d` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40 }} className="md-grid-2">
          {STATS.map(s => <StatCard key={s.label} {...s} />)}
        </div>
      </section>

      {/* ── Services ── */}
      <section id="services" style={{ padding: "120px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 80 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
              <div style={{ height: 1, width: 32, background: C.rose, opacity: 0.6 }} />
              <span style={{ color: C.rose, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase" }}>Nossos Serviços</span>
              <div style={{ height: 1, width: 32, background: C.rose, opacity: 0.6 }} />
            </div>
            <h2 style={{ ...styles.playfair, fontSize: "clamp(32px,4vw,48px)", fontWeight: 700, color: C.text, marginBottom: 16 }}>Experiências que Transformam</h2>
            <p style={{ color: C.lilacMuted, lineHeight: 1.7 }}>Cada serviço foi desenhado para se adaptar ao ritmo do seu evento, com máxima qualidade e mínima interrupção na programação.</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {SERVICES.map((s, i) => (
              <ServiceCard key={s.title} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" style={{ padding: "96px 24px", background: C.card, borderTop: `1px solid ${C.rose}1a`, borderBottom: `1px solid ${C.rose}1a` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="md-grid-2">
          <div style={{ position: "relative" }}>
            <div style={{ position: "relative", overflow: "hidden" }}>
              <img src={IMG_ABOUT} alt="Terapeuta SER realizando massagem" style={{ width: "100%", objectFit: "cover", height: 520, display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${C.card}99, transparent)` }} />
            </div>
            <div style={{ position: "absolute", top: -12, left: -12, width: 128, height: 128, border: "1.5px solid transparent", boxShadow: `0 0 0 1.5px ${C.rose}55, inset 0 1px 0 rgba(255,255,255,0.12)`, pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -12, right: -12, width: 128, height: 128, border: "1.5px solid transparent", boxShadow: `0 0 0 1.5px ${C.lilac}55, inset 0 1px 0 rgba(255,255,255,0.10)`, pointerEvents: "none" }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ height: 1, width: 32, background: C.rose, opacity: 0.6 }} />
              <span style={{ color: C.rose, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase" }}>Sobre a SER</span>
            </div>
            <h2 style={{ ...styles.playfair, fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: C.text, lineHeight: 1.2 }}>Bem-Estar como Estratégia</h2>
            <GoldDivider />
            <p style={{ color: C.lilacMuted, lineHeight: 1.7 }}>A <strong style={{ color: C.rose }}>SER Estética e Bem-Estar</strong> nasceu da convicção de que cuidar das pessoas é o investimento com maior retorno. Atendemos a domicílio, eventos, congressos, feiras, despedidas de solteira e casamentos com equipamentos e material 100% profissional.</p>
            <p style={{ color: C.lilacMuted, lineHeight: 1.7 }}>Nossa equipe é formada por terapeutas altamente treinadas e apaixonadas, com experiência em eventos de todos os tamanhos e formatos — de ações internas corporativas a grandes feiras com centenas de participantes.</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, paddingTop: 16 }}>
              {[
                { n: "Certificadas", v: "Todas as profissionais" },
                { n: "Equipamentos", v: "Estrutura completa inclusa" },
                { n: "Flexibilidade", v: "Qualquer porte de evento" },
                { n: "WhatsApp", v: "(21) 99121-9642" },
              ].map(f => (
                <div key={f.n} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ color: C.rose, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 500 }}>{f.n}</div>
                  <div style={{ color: C.text, fontSize: 14 }}>{f.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="partners" style={{ padding: "120px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <span style={{ color: C.rose, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase" }}>Depoimentos</span>
            <h2 style={{ ...styles.playfair, fontSize: "clamp(32px,4vw,48px)", fontWeight: 700, color: C.text, marginTop: 16 }}>Quem Confia na SER</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }} className="md-grid-1">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: C.card, padding: 40, border: `1px solid ${C.rose}1a`, position: "relative" }}>
                <div style={{ position: "absolute", top: 24, right: 32, opacity: 0.1 }}>
                  <LogoImg size={48} />
                </div>
                <div style={{ display: "flex", gap: 4, marginBottom: 24 }}>
                  {[...Array(t.stars)].map((_, i) => <Star key={i} size={14} fill={C.rose} color={C.rose} />)}
                </div>
                <p style={{ color: C.text, lineHeight: 1.8, fontSize: 15, marginBottom: 32, fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: `${C.rose}14`, border: `1px solid ${C.rose}33`, display: "flex", alignItems: "center", justifyContent: "center", color: C.rose, fontWeight: 700, fontSize: 14 }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ color: C.text, fontWeight: 600, fontSize: 16 }}>{t.name}</div>
                    <div style={{ color: C.rose, fontSize: 12, marginTop: 2 }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section style={{ padding: "0 24px 120px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "220px 220px", gap: 12 }}>
            {GALLERY_IMAGES.map((img, i) => (
              <div key={i} className="gallery-item" style={{ overflow: "hidden", position: "relative", background: C.muted, gridRow: img.tall ? "span 2" : "span 1" }}>
                <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${C.bg}99, transparent)`, opacity: 0, transition: "opacity 0.3s" }} className="gallery-overlay" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ padding: "80px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${C.lilac}4d, ${C.secondary}, ${C.rose}1a)` }} />
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 600, height: 600, borderRadius: "50%", background: `${C.lilac}14`, filter: "blur(64px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: 720, margin: "0 auto", textAlign: "center", display: "flex", flexDirection: "column", gap: 24, alignItems: "center" }}>
          <h2 style={{ ...styles.playfair, fontSize: "clamp(32px,4vw,48px)", fontWeight: 700, color: C.text }}>Transforme seu Próximo Evento</h2>
          <GoldDivider />
          <p style={{ color: C.lilacMuted, fontSize: 18, lineHeight: 1.7 }}>Proposta personalizada em até 24 horas. Sem compromisso, com toda a nossa expertise.</p>
          <a href="https://wa.me/5521991219642" target="_blank" rel="noreferrer" className="cta-btn" style={{ padding: "16px 40px", display: "inline-flex", alignItems: "center", gap: 8 }}>
            Solicitar Proposta pelo WhatsApp <ChevronRight size={16} />
          </a>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" style={{ padding: "96px 24px", background: C.card, borderTop: `1px solid ${C.rose}1a` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }} className="md-grid-2">
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ height: 1, width: 32, background: C.rose, opacity: 0.6 }} />
                <span style={{ color: C.rose, fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase" }}>Contato</span>
              </div>
              <h2 style={{ ...styles.playfair, fontSize: "clamp(28px,3vw,40px)", fontWeight: 700, color: C.text, lineHeight: 1.2 }}>Vamos Criar algo Especial Juntos</h2>
            </div>
            <GoldDivider />
            <p style={{ color: C.lilacMuted, lineHeight: 1.7 }}>Entre em contato para receber uma proposta personalizada. Atendemos todo o Rio de Janeiro e região.</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { Icon: Phone, label: "WhatsApp 1", value: "(21) 99121-9642" },
                { Icon: Phone, label: "WhatsApp 2", value: "(21) 96819-7068" },
                { Icon: Mail, label: "E-mail", value: "seresteticaebemestar.rede@gmail.com" },
                { Icon: Instagram, label: "Instagram", value: "@seresteticaebemestar" },
                { Icon: MapPin, label: "Base de operações", value: "Rio de Janeiro — RJ · Brasil" },
              ].map(({ Icon, label, value }) => (
                <div key={label} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <div style={{ width: 36, height: 36, border: "1.5px solid transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2, boxShadow: `0 0 0 1.5px ${C.rose}55, inset 0 1px 0 rgba(255,255,255,0.12), 0 2px 8px ${C.rose}22` }}>
                    <Icon size={15} color={C.rose} />
                  </div>
                  <div>
                    <div style={{ color: C.lilacMuted, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                    <div style={{ color: C.text, fontSize: 14 }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[[
              { id: "name", label: "Nome Completo", type: "text", placeholder: "Seu nome" },
              { id: "company", label: "Empresa / Evento", type: "text", placeholder: "Nome da empresa ou evento" },
            ]].map((row, ri) => (
              <div key={ri} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {row.map(f => (
                  <div key={f.id} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label htmlFor={f.id} style={{ color: C.lilacMuted, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>{f.label}</label>
                    <input id={f.id} type={f.type} placeholder={f.placeholder} style={{ background: C.muted, border: '1.5px solid transparent', boxShadow: `0 0 0 1.5px ${C.rose}33, inset 0 1px 0 rgba(255,255,255,0.06)`, color: C.text, fontSize: 14, padding: '12px 16px' }} />
                  </div>
                ))}
              </div>
            ))}

            {[
              { id: "email", label: "E-mail", type: "email", placeholder: "seu@email.com" },
              { id: "phone", label: "Telefone / WhatsApp", type: "tel", placeholder: "(21) 9 0000-0000" },
            ].map(f => (
              <div key={f.id} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label htmlFor={f.id} style={{ color: C.lilacMuted, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>{f.label}</label>
                <input id={f.id} type={f.type} placeholder={f.placeholder} style={{ background: C.muted, border: '1.5px solid transparent', boxShadow: `0 0 0 1.5px ${C.rose}33, inset 0 1px 0 rgba(255,255,255,0.06)`, color: C.text, fontSize: 14, padding: '12px 16px' }} />
              </div>
            ))}

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label htmlFor="event" style={{ color: C.lilacMuted, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>Tipo de Evento</label>
              <select id="event" style={{ background: C.muted, border: "1.5px solid transparent", boxShadow: `0 0 0 1.5px ${C.rose}33, inset 0 1px 0 rgba(255,255,255,0.06)`, color: C.text, fontSize: 14, padding: "12px 16px", appearance: "none" }}>
                <option value="">Selecione uma opção</option>
                <option value="evento-corporativo">Evento Corporativo</option>
                <option value="congresso">Congresso / Conferência</option>
                <option value="feira">Feira / Exposição</option>
                <option value="despedida">Despedida de Solteira</option>
                <option value="casamento">Casamento</option>
                <option value="aniversario">Aniversário / Festa</option>
                <option value="dia-das-maes">Dia das Mães / Mulheres</option>
                <option value="sipat">SIPAT / Semana de Saúde</option>
                <option value="domicilio">Atendimento a Domicílio</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label htmlFor="message" style={{ color: C.lilacMuted, fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>Detalhes do Evento</label>
              <textarea id="message" rows={4} placeholder="Número de pessoas, data estimada, local, serviços de interesse..." style={{ background: C.muted, border: "1.5px solid transparent", boxShadow: `0 0 0 1.5px ${C.rose}33, inset 0 1px 0 rgba(255,255,255,0.06)`, color: C.text, fontSize: 14, padding: "12px 16px", resize: "none" }} />
            </div>

            <a
              href="https://wa.me/5521991219642"
              target="_blank"
              rel="noreferrer"
              className="cta-btn"
              style={{ width: "100%", padding: 16, marginTop: 8, textAlign: "center", display: "block" }}
            >
              Enviar pelo WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: C.bg, borderTop: `1px solid ${C.rose}1a`, padding: "48px 24px", position: "relative", overflow: "hidden" }}>
        {/* Logo em marca d'água no fundo */}
        <div style={{
          position: "absolute",
          right: -40,
          bottom: -40,
          width: 320,
          height: 320,
          backgroundImage: `url(${IMG_DOURADO})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.06,
          pointerEvents: "none",
        }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24, position: "relative", zIndex: 1 }}>
          {/* Logo no footer */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <LogoImg size={36} />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span style={{ ...styles.playfair, color: C.rose, fontSize: 16, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase" }}>SER</span>
              <span style={{ fontSize: 9, letterSpacing: "0.25em", color: C.lilacMuted, textTransform: "uppercase" }}>Estética & Bem-Estar</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            {NAV_LINKS.map(l => <a key={l.href} href={l.href} style={{ fontSize: 12, color: C.lilacMuted, letterSpacing: "0.05em", transition: "color 0.2s" }}>{l.label}</a>)}
          </div>
          <div style={{ fontSize: 12, color: C.placeholder, textAlign: "right" }}>
            © 2025 SER Estética e Bem-Estar<br />
            <a href="https://instagram.com/seresteticaebemestar" target="_blank" rel="noreferrer" style={{ color: C.rose }}>@seresteticaebemestar</a><br />
            Todos os direitos reservados
          </div>
        </div>
      </footer>
    </div>
  );
}
Análise das Características dos Cards de Serviços no Código - Manus
