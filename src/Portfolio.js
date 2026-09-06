import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Github, Linkedin, Mail, Phone, MapPin, Download, Menu, X,
  Home, User, Briefcase, Code, FolderOpen, GraduationCap, MessageSquare,
  ChevronDown, ArrowUpRight, Quote, TerminalSquare,
} from 'lucide-react';

/* -------------------------------------------------------------------- */
/*  Data                                                                  */
/* -------------------------------------------------------------------- */

const NAV_SECTIONS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'contact', label: 'Contact', icon: MessageSquare },
];

const ROLE_STRINGS = [
  'agentic AI infrastructure',
  'evaluation & reliability engineering',
  'real-time voice AI',
  'statistically rigorous evaluation',
];

const HERO_STATS = [
  { value: '1,000+', label: 'production interviews powered' },
  { value: '2,500+', label: 'production calls handled' },
  { value: '3', label: 'open-source research platforms' },
  { value: '800+', label: 'tests shipped across projects' },
];

const EXPERIENCE = {
  role: 'AI Engineer',
  company: 'AIRA HR — NR Consulting',
  location: 'Hyderabad, India',
  period: 'August 2025 — Present',
  bullets: [
    {
      text: 'Joined as an Intern and converted to full-time AI Engineer after 11 months; now own architecture for the company’s AI Interview and AI Telephony platforms.',
    },
    {
      text: 'Re-architected a Selenium-based browser media pipeline into native LiveKit, eliminating browser resource contention.',
      metric: '1,000+ interviews',
    },
    {
      text: 'Built a full-duplex streaming voice pipeline (Deepgram STT, LLM inference, Cartesia TTS, LiveKit transport) minimizing end-to-end conversational latency through continuous streaming execution.',
    },
    {
      text: 'Designed concurrent interview execution using process isolation, Redis-backed orchestration, and a queue-driven, memory-aware video analysis pipeline for production-scale deployments.',
    },
    {
      text: 'Delivered an AI telephony platform with deterministic workflow orchestration and retrieval-augmented conversational intelligence.',
      metric: '2,500+ calls',
    },
  ],
};

const SKILLS = [
  {
    category: 'Languages',
    items: ['Python', 'SQL', 'Java'],
  },
  {
    category: 'AI / Machine Learning',
    items: ['PyTorch', 'Transformers', 'Hugging Face', 'LangChain', 'LangGraph', 'RAG', 'Hybrid Retrieval (BM25 + Dense, RRF)', 'PEFT / LoRA / QLoRA'],
  },
  {
    category: 'AI Evaluation & Reliability',
    items: ['LLM-as-Judge Calibration', 'McNemar / Bootstrap / BH-FDR', 'Regression Gating', 'Red Teaming', 'Drift Detection'],
  },
  {
    category: 'Agent Infrastructure',
    items: ['Model Context Protocol (MCP)', 'Tool Governance & Policy Engines', 'Agent Runtimes', 'Trajectory Capture', 'Replay & Counterfactual Analysis'],
  },
  {
    category: 'Backend & Distributed Systems',
    items: ['FastAPI', 'AsyncIO', 'WebSockets', 'Redis', 'Multiprocessing', 'RBAC'],
  },
  {
    category: 'Real-Time Voice AI',
    items: ['LiveKit', 'WebRTC', 'Deepgram', 'Cartesia', 'Streaming AI'],
  },
  {
    category: 'Databases',
    items: ['PostgreSQL (RLS)', 'MySQL', 'SQLite', 'MongoDB', 'SQLAlchemy', 'FAISS'],
  },
  {
    category: 'Observability & MLOps',
    items: ['OpenTelemetry', 'MLflow', 'Prometheus', 'Grafana', 'Docker', 'GitHub Actions CI'],
  },
];

const PROJECTS = [
  {
    id: 'aegis',
    name: 'Aegis',
    tagline: 'Agent Reliability & Evaluation Platform',
    period: 'Sep 2026',
    description:
      'An open-source reliability laboratory for agentic AI: runs versioned agents against reproducible datasets, captures complete tool/MCP/RAG trajectories, and answers where an agent fails, why, and whether a change actually made it better or worse.',
    bullets: [
      'Engineered an agent runtime where the runtime — not the LLM — owns control flow: a pure, property-tested state machine, budgets enforced before every model call, and a policy gate authorizing each proposed action.',
      'Built an MCP gateway as sole egress to untrusted tool servers, with operator-assigned risk classification and deny-by-default policy.',
      'Implemented statistically rigorous evaluation — McNemar for paired outcomes, Benjamini–Hochberg FDR correction, Wilson intervals — yielding pass/fail/inconclusive verdicts instead of noise-sensitive point estimates.',
      'Discovered and fixed a silent multi-tenant bypass in which Postgres superuser roles ignore row-level security entirely, adding a runtime guard that refuses to start on an RLS-exempt role.',
    ],
    quote:
      "A refund made 74 days after a stated 30-day policy window was scored 1.00 by an LLM groundedness judge — perfectly faithful to what it said, with nothing to say about whether it should have said it. Only a deterministic check caught it.",
    stats: [
      { value: '~6,600', label: 'impl. lines' },
      { value: '300+', label: 'tests' },
      { value: '7', label: 'dependency contracts' },
    ],
    tech: ['Python', 'FastAPI', 'PostgreSQL', 'MCP', 'MLflow', 'OpenTelemetry'],
    github: 'https://github.com/HemanthReddy-1408/Aegis',
  },
  {
    id: 'medassist',
    name: 'MedAssist X',
    tagline: 'Serving-Time Admission Control for Clinical Answers',
    period: 'Jul 2025 — Sep 2026',
    description:
      'A multi-agent clinical assistant paired with an in-band release gate that decides, per request and before any token is shown, whether an answer may reach the user — with no gold labels and no second chance, unlike an offline evaluation harness.',
    bullets: [
      'Designed a six-check verification cascade ordered cheapest-first, so an answer removed by check two never reaches the expensive checks behind it.',
      'Implemented patient-relational safety checking that no groundedness or faithfulness metric can express — correctness held between the answer and the patient’s own medication record.',
      'Engineered fail-closed semantics throughout: an unreachable judge, empty retrieval, or exhausted latency budget all resolve to ABSTAIN.',
      'Shipped confidence calibration (ECE / Brier, risk–coverage curves), longitudinal patient memory across visits, and a red-team suite of 15 attacks across 10 classes.',
    ],
    quote:
      'Arithmetic grounding catches a dosage error — 800 mg cited against a source that says 500 mg — in 0.3 ms, something LLM judges routinely wave through as consistent. Meanwhile 2.5 g and 2500 mg correctly match, because units are normalized first.',
    stats: [
      { value: '8,274', label: 'impl. lines' },
      { value: '448', label: 'tests · 2.4s' },
      { value: '15', label: 'red-team attacks' },
    ],
    tech: ['Python', 'FastAPI', 'BM25 + Dense Retrieval', 'RRF', 'Pydantic', 'NumPy'],
    github: 'https://github.com/HemanthReddy-1408/medassist-ai',
  },
  {
    id: 'anomaly-transformer',
    name: 'Anomaly Transformer',
    tagline: 'Reverse-Engineered Reimplementation & Statistical Evaluation',
    period: 'Oct 2024 — Sep 2026',
    description:
      'Reverse-engineered Xu et al.’s ICLR 2022 Anomaly Transformer from a buggy single-file prototype into a correctness-audited reimplementation — a multi-layer encoder, a minimax training objective, and an evaluation layer that questions its own numbers.',
    bullets: [
      'Found and fixed 7 correctness bugs in the reference math and data pipeline, including a non-log-space KL divergence and an autograd-detaching loss reduction.',
      'Built point-adjusted and PA%K-swept F1, ROC/PR-AUC, and moving-block bootstrap confidence intervals — three threshold strategies reported side by side instead of one flattering number.',
      'Benchmarked against LSTM and vanilla Transformer autoencoders and three classical detectors across all 28 Server Machine Dataset machines with multi-seed ablations.',
      'Reported an honest negative finding — a plain Transformer autoencoder of matched depth outperformed the paper’s own association-discrepancy mechanism at reduced training scale — rather than only results favorable to the model.',
    ],
    quote:
      'Point-adjusted F1 hits 0.9985 on the exact predictions that score 0.095 unadjusted — a 10x swing from the evaluation convention alone, holding the model completely fixed.',
    stats: [
      { value: '68', label: 'tests' },
      { value: '28', label: 'machines benchmarked' },
      { value: '7', label: 'bugs fixed' },
    ],
    tech: ['Python', 'PyTorch', 'scikit-learn', 'Streamlit'],
    github: 'https://github.com/HemanthReddy-1408/Anomaly-Transformer',
  },
];

const EDUCATION = {
  institution: 'Neil Gogte Institute Of Technology',
  degree: 'B.E. in Computer Science and Engineering',
  location: 'Hyderabad, India',
  period: '2022 — 2026',
  detail: 'CGPA: 8.07 / 10.0',
};

const CONTACT_LINKS = [
  { icon: Mail, label: 'Email', value: 'hemanth984849@gmail.com', href: 'mailto:hemanth984849@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91 90149 95824', href: 'tel:+919014995824' },
  { icon: Linkedin, label: 'LinkedIn', value: 'hemanth-reddy-432237333', href: 'https://linkedin.com/in/hemanth-reddy-432237333/' },
  { icon: Github, label: 'GitHub', value: 'HemanthReddy-1408', href: 'https://github.com/HemanthReddy-1408' },
];

/* -------------------------------------------------------------------- */
/*  Small hooks & primitives                                              */
/* -------------------------------------------------------------------- */

/** Fades + slides an element up into place the first time it enters the viewport.
 *  Triggers a little before the element is literally on screen (rootMargin) and
 *  carries a time-based fallback, so content can never be stuck invisible if the
 *  observer is unsupported, throttled, or simply never fires for this element. */
function useReveal(threshold = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px 150px 0px' }
    );
    observer.observe(node);

    const fallback = setTimeout(() => setVisible(true), 2000);
    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [threshold]);

  return [ref, visible];
}

function Reveal({ children, delay = 0, className = '' }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? undefined : 0,
        animation: visible ? `fade-up 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms forwards` : 'none',
      }}
    >
      {children}
    </div>
  );
}

/** Cycles through a list of role strings with a typing/deleting effect. */
function useTypewriter(words, { typeMs = 55, deleteMs = 30, holdMs = 1600, gapMs = 400 } = {}) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState('typing'); // typing | holding | deleting | gap

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout;

    if (phase === 'typing') {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typeMs);
      } else {
        timeout = setTimeout(() => setPhase('holding'), holdMs);
      }
    } else if (phase === 'holding') {
      timeout = setTimeout(() => setPhase('deleting'), 10);
    } else if (phase === 'deleting') {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deleteMs);
      } else {
        timeout = setTimeout(() => setPhase('gap'), gapMs);
      }
    } else if (phase === 'gap') {
      setWordIndex((i) => (i + 1) % words.length);
      setPhase('typing');
    }

    return () => clearTimeout(timeout);
  }, [text, phase, wordIndex, words, typeMs, deleteMs, holdMs, gapMs]);

  return text;
}

function SectionKicker({ children }) {
  return (
    <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-cyan-400 mb-3">
      {children}
    </p>
  );
}

function SectionHeading({ kicker, title, subtitle }) {
  return (
    <Reveal className="mb-14 max-w-3xl">
      <SectionKicker>{kicker}</SectionKicker>
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-slate-400 text-lg leading-relaxed">{subtitle}</p>}
    </Reveal>
  );
}

function StatChip({ value, label }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <div className="font-mono text-lg sm:text-xl font-semibold text-cyan-300">{value}</div>
      <div className="text-xs text-slate-500 mt-0.5">{label}</div>
    </div>
  );
}

function TechTag({ children }) {
  return (
    <span className="font-mono text-xs px-2.5 py-1 rounded-md border border-white/10 bg-white/[0.03] text-slate-300 hover:border-cyan-400/40 hover:text-cyan-300 transition-colors">
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------- */
/*  Main component                                                        */
/* -------------------------------------------------------------------- */

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionsRef = useRef({});
  const roleText = useTypewriter(ROLE_STRINGS);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      setIsScrolled(scrollTop > 40);
      setScrollProgress(progress);

      let currentSection = 'home';
      const offset = 120;
      NAV_SECTIONS.forEach(({ id }) => {
        const element = sectionsRef.current[id];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom > offset) currentSection = id;
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = useCallback((sectionId) => {
    const element = sectionsRef.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  }, []);

  const NavItem = ({ id, label }) => (
    <button
      onClick={() => scrollToSection(id)}
      className={`relative px-3.5 py-2 text-sm font-medium transition-colors duration-300 ${
        activeSection === id ? 'text-white' : 'text-slate-400 hover:text-slate-200'
      }`}
    >
      {label}
      <span
        className={`absolute left-3.5 right-3.5 -bottom-[1px] h-px bg-gradient-to-r from-cyan-400 to-violet-400 origin-left transition-transform duration-300 ${
          activeSection === id ? 'scale-x-100' : 'scale-x-0'
        }`}
      />
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-x-hidden font-sans selection:bg-cyan-500/20">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-grid-slate [background-size:44px_44px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_10%,transparent_75%)]" />
        <div className="absolute top-[-10%] left-[-10%] w-[36rem] h-[36rem] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute top-[20%] right-[-15%] w-[40rem] h-[40rem] bg-violet-500/10 rounded-full blur-[130px] animate-pulse-slow" />
      </div>

      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-white/5 z-[60]">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-violet-400"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled || isMenuOpen ? 'bg-slate-950/95 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex justify-between items-center py-4">
            <button
              onClick={() => scrollToSection('home')}
              className="font-display text-lg font-semibold text-white flex items-center gap-2"
            >
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center text-slate-950 font-mono text-sm font-bold">
                H
              </span>
              hemanth<span className="text-cyan-400">.</span>
            </button>

            <div className="hidden md:flex items-center gap-1">
              {NAV_SECTIONS.map((s) => (
                <NavItem key={s.id} id={s.id} label={s.label} />
              ))}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg bg-white text-slate-950 hover:bg-cyan-300 transition-colors"
              >
                <Download size={15} /> Resume
              </a>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/5 text-slate-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden pb-5 border-t border-white/10 pt-4">
              <div className="flex flex-col gap-1">
                {NAV_SECTIONS.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollToSection(s.id)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                      activeSection === s.id ? 'bg-white/10 text-white' : 'text-slate-400'
                    }`}
                  >
                    <s.icon size={17} />
                    <span className="font-medium">{s.label}</span>
                  </button>
                ))}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2.5 mt-1 rounded-lg bg-white text-slate-950 font-medium"
                >
                  <Download size={17} /> Download Resume
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero */}
      <section
        id="home"
        ref={(el) => (sectionsRef.current.home = el)}
        className="min-h-screen flex items-center relative pt-32 pb-20 px-5 sm:px-8"
      >
        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 mb-8 font-mono text-xs text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Open to Applied AI / ML Engineer roles
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-semibold text-white tracking-tight leading-[1.05]">
            Hemanth Reddy
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
              Nalabolu
            </span>
          </h1>

          <div className="mt-7 h-8 flex items-center font-mono text-lg sm:text-xl text-slate-300">
            <span className="text-slate-600 mr-2">$</span>
            <span>{roleText}</span>
            <span className="w-2 h-5 bg-cyan-400 ml-1 animate-blink" />
          </div>

          <p className="mt-6 max-w-2xl text-slate-400 text-base sm:text-lg leading-relaxed">
            Applied AI Systems Engineer building production voice-AI and interview
            platforms in industry, and an open-source reliability lab in the
            open — turning statistical measurement rigor into shipped engineering
            decisions rather than a single flattering number.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <button
              onClick={() => scrollToSection('projects')}
              className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-950 font-semibold hover:bg-cyan-300 transition-colors"
            >
              View Projects
              <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 text-slate-200 font-semibold hover:border-cyan-400/50 hover:text-cyan-300 transition-colors"
            >
              Get in Touch
            </button>
          </div>

          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl">
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <div className="font-mono text-2xl sm:text-3xl font-semibold text-white">{s.value}</div>
                <div className="text-xs sm:text-sm text-slate-500 mt-1 leading-snug">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => scrollToSection('about')}
          className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-slate-600 hover:text-slate-400 transition-colors"
          aria-label="Scroll to about"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest">Scroll</span>
          <ChevronDown className="animate-bounce" size={18} />
        </button>
      </section>

      {/* About */}
      <section
        id="about"
        ref={(el) => (sectionsRef.current.about = el)}
        className="py-24 px-5 sm:px-8 relative border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading kicker="01 · About" title="Reliability is a design decision, not an afterthought." />

          <div className="grid lg:grid-cols-5 gap-10">
            <Reveal className="lg:col-span-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 h-full">
                <TerminalSquare className="text-cyan-400 mb-5" size={26} />
                <p className="text-slate-300 text-lg leading-relaxed">
                  I specialize in agentic AI infrastructure, evaluation, and
                  reliability engineering — architecting production platforms for
                  real-time interview orchestration and intelligent telephony,
                  and building an open-source reliability laboratory that treats
                  agent evaluation as a statistics problem, not a vibe check.
                </p>
                <p className="mt-5 text-slate-400 leading-relaxed">
                  That means the same instincts apply whether I'm cutting
                  conversational latency in a voice pipeline or auditing a
                  research paper's math before trusting its numbers: measure it
                  properly, assume your first implementation has a bug worth
                  finding, and report what you actually found — including when
                  it isn't flattering.
                </p>
              </div>
            </Reveal>

            <div className="lg:col-span-2 flex flex-col gap-5">
              {[
                {
                  title: 'Production systems',
                  body: 'Low-latency voice AI, concurrent and distributed backend design, and layered architecture with enforced dependency contracts.',
                },
                {
                  title: 'Reliability research',
                  body: 'Statistical regression testing, MCP tool governance, adversarial red-teaming, and turning measurement rigor into engineering decisions.',
                },
                {
                  title: 'Outside of work',
                  body: 'Music, gaming, and watching movies when not building AI systems.',
                },
              ].map((card, i) => (
                <Reveal key={card.title} delay={i * 100}>
                  <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 border-l-2 border-l-cyan-400/60 hover:bg-white/[0.04] transition-colors">
                    <h4 className="font-display font-semibold text-white mb-1.5">{card.title}</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">{card.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section
        id="experience"
        ref={(el) => (sectionsRef.current.experience = el)}
        className="py-24 px-5 sm:px-8 relative border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading kicker="02 · Experience" title="Industry experience" />

          <Reveal>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 sm:p-10">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-8 pb-8 border-b border-white/10">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-white">{EXPERIENCE.role}</h3>
                  <p className="text-cyan-400 font-medium mt-1">{EXPERIENCE.company}</p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="font-mono text-sm text-slate-400">{EXPERIENCE.period}</p>
                  <p className="text-sm text-slate-500 flex items-center gap-1 sm:justify-end mt-1">
                    <MapPin size={13} /> {EXPERIENCE.location}
                  </p>
                </div>
              </div>

              <ul className="space-y-5">
                {EXPERIENCE.bullets.map((b, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    <p className="text-slate-300 leading-relaxed">
                      {b.text}
                      {b.metric && (
                        <span className="ml-2 inline-block font-mono text-xs px-2 py-0.5 rounded-md bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 align-middle">
                          {b.metric}
                        </span>
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Skills */}
      <section
        id="skills"
        ref={(el) => (sectionsRef.current.skills = el)}
        className="py-24 px-5 sm:px-8 relative border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading kicker="03 · Skills" title="Technical toolbox" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {SKILLS.map((group, i) => (
              <Reveal key={group.category} delay={(i % 4) * 80}>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 h-full hover:border-cyan-400/30 transition-colors">
                  <h4 className="font-mono text-xs uppercase tracking-wider text-cyan-400 mb-4">
                    {group.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="text-sm text-slate-300 bg-white/[0.04] border border-white/5 rounded-md px-2.5 py-1"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section
        id="projects"
        ref={(el) => (sectionsRef.current.projects = el)}
        className="py-24 px-5 sm:px-8 relative border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading
            kicker="04 · Projects"
            title="Selected projects"
            subtitle="Open-source systems built to be audited, not just demoed — each one shipped with real tests and a documented account of what broke along the way."
          />

          <div className="space-y-8">
            {PROJECTS.map((project, idx) => (
              <Reveal key={project.id} delay={idx * 90}>
                <article className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden hover:border-white/20 transition-colors group">
                  <div className="p-7 sm:p-9">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                      <div>
                        <div className="flex items-baseline gap-3 flex-wrap">
                          <h3 className="font-display text-2xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
                            {project.name}
                          </h3>
                          <span className="font-mono text-xs text-slate-500">{project.period}</span>
                        </div>
                        <p className="text-violet-300 font-medium mt-1">{project.tagline}</p>
                      </div>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-200 hover:bg-white hover:text-slate-950 transition-colors text-sm font-medium shrink-0"
                      >
                        <Github size={16} /> Source
                      </a>
                    </div>

                    <p className="text-slate-400 leading-relaxed mb-6 max-w-3xl">{project.description}</p>

                    <div className="grid md:grid-cols-5 gap-8 mb-6">
                      <ul className="md:col-span-3 space-y-3">
                        {project.bullets.map((b, i) => (
                          <li key={i} className="flex gap-3 text-sm text-slate-300 leading-relaxed">
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-slate-600 shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>

                      <div className="md:col-span-2 flex flex-col gap-4">
                        <div className="relative rounded-xl border border-cyan-400/20 bg-cyan-400/[0.04] p-4">
                          <Quote className="absolute -top-2.5 -left-2.5 text-cyan-400 bg-slate-950 rounded-full p-1" size={22} />
                          <p className="text-sm text-slate-300 italic leading-relaxed">{project.quote}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          {project.stats.map((s) => (
                            <StatChip key={s.label} value={s.value} label={s.label} />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-5 border-t border-white/5">
                      {project.tech.map((t) => (
                        <TechTag key={t}>{t}</TechTag>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section
        id="education"
        ref={(el) => (sectionsRef.current.education = el)}
        className="py-24 px-5 sm:px-8 relative border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto relative z-10">
          <SectionHeading kicker="05 · Education" title="Education" />

          <Reveal>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-violet-400/20 border border-white/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="text-cyan-300" size={22} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">{EDUCATION.institution}</h3>
                  <p className="text-slate-400 text-sm mt-0.5">{EDUCATION.degree}</p>
                </div>
              </div>
              <div className="text-left sm:text-right shrink-0">
                <p className="font-mono text-sm text-slate-400">{EDUCATION.period}</p>
                <p className="text-sm text-cyan-300 font-medium mt-1">{EDUCATION.detail}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        ref={(el) => (sectionsRef.current.contact = el)}
        className="py-24 px-5 sm:px-8 relative border-t border-white/5"
      >
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <Reveal className="max-w-2xl mx-auto mb-14">
            <SectionKicker>06 · Contact</SectionKicker>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight">
              Let's build something reliable.
            </h2>
            <p className="mt-4 text-slate-400 text-lg leading-relaxed">
              Open to Applied AI / ML Engineer roles. Always glad to talk about
              agent evaluation, voice AI, or why a metric might be lying to you.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
            {CONTACT_LINKS.map((c, i) => (
              <Reveal key={c.label} delay={i * 80}>
                <a
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-6 hover:border-cyan-400/40 hover:bg-white/[0.04] transition-all h-full text-center"
                >
                  <div className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-400/10 transition-colors shrink-0">
                    <c.icon className="text-slate-300 group-hover:text-cyan-300 transition-colors" size={19} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white font-medium text-sm">{c.label}</h3>
                    <p className="text-slate-500 text-[11px] font-mono mt-1 truncate max-w-[11rem]">{c.value}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <p className="mt-12 text-sm text-slate-500 flex items-center justify-center gap-1.5">
            <MapPin size={14} /> Hyderabad, India
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 px-5 sm:px-8 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Hemanth Reddy Nalabolu. Built with React &amp; Tailwind CSS.</p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/HemanthReddy-1408" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
              <Github size={15} /> GitHub
            </a>
            <a href="https://linkedin.com/in/hemanth-reddy-432237333/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
              <Linkedin size={15} /> LinkedIn
            </a>
            <a href="mailto:hemanth984849@gmail.com" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
              <Mail size={15} /> Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
