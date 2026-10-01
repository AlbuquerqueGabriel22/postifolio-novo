import React, { useState, useEffect, useRef } from 'react';

// Dados dos projetos
const PROJETOS = [
  {
    id: 1,
    numero: '01',
    badge: 'Full Stack',
    titulo: 'Apresentação de Restaurante',
    categoria: 'Web & Python Flask',
    descricaoCurta: 'Site institucional e moderno para apresentação de restaurante, cardápio e reservas.',
    descricaoLonga: 'Site simples e elegante desenvolvido para apresentação de restaurante, exibição de cardápio interativo e informações do estabelecimento comercial, integrando front-end responsivo a um back-end dinâmico com Python Flask.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Python Flask'],
    imagem: '/static/imagens/Captura de tela 2026-03-13 235819.png',
    video: '/static/videos/Video Project 25 (1).mp4',
    github: 'https://github.com/AlbuquerqueGabriel22'
  },
  {
    id: 2,
    numero: '02',
    badge: 'Automação',
    titulo: 'Projeto Beta — Automação de Processos & APIs',
    categoria: 'Automação & Backend',
    descricaoCurta: 'Scripts de automação inteligente e bots para otimização de rotinas diárias.',
    descricaoLonga: 'Solução automatizada desenvolvida em Python para otimizar rotinas operacionais, extração de relatórios automatizados, web scraping de dados estruturados e conexão com webhooks inteligentes.',
    tags: ['Python', 'Flask', 'Requests', 'Web Scraping', 'Automação', 'REST API'],
    imagem: '/static/imagens/Captura de tela 2026-03-13 235819.png',
    github: 'https://github.com/AlbuquerqueGabriel22'
  },
  {
    id: 3,
    numero: '03',
    badge: 'Pentest',
    titulo: 'Projeto Gamma — Auditoria de Segurança & Pentest',
    categoria: 'Cibersegurança & Pentest',
    descricaoCurta: 'Ferramenta de escaneamento de vulnerabilidades com relatórios automatizados.',
    descricaoLonga: 'Kit de ferramentas e scripts voltados para análise de vulnerabilidades de rede e aplicações web, varredura de portas, identificação de falhas conhecidas e geração automatizada de relatórios técnicos de segurança.',
    tags: ['Cibersegurança', 'Pentest', 'Linux Bash', 'Python', 'Redes', 'Auditoria'],
    imagem: '/static/imagens/Captura de tela 2026-03-13 235819.png',
    github: 'https://github.com/AlbuquerqueGabriel22'
  },
  {
    id: 4,
    numero: '04',
    badge: 'Dashboard',
    titulo: 'Projeto Delta — Dashboard Analítico & Telemetria',
    categoria: 'Frontend & Data Analytics',
    descricaoCurta: 'Painel de controle com telemetria, logs visuais e dados analíticos em tempo real.',
    descricaoLonga: 'Painel de controle analítico em tempo real com gráficos dinâmicos, acompanhamento de métricas operacionais e visualização intuitiva de telemetria em modo dark premium.',
    tags: ['Frontend', 'UI/UX', 'Charts', 'JavaScript', 'Telemetria'],
    imagem: '/static/imagens/Captura de tela 2026-03-13 235819.png',
    github: 'https://github.com/AlbuquerqueGabriel22'
  }
];

// Dados dos certificados
const CERTIFICADOS = [
  {
    id: 1,
    img: '/static/CERTIFICADOS_CURSOS/PENTEST PROFISSIONAL.png',
    alt: 'Certificado Pentest Profissional - Desec Security',
    inst: 'Desec Security',
    title: 'Pentest Profissional (200h)',
    date: '18 de janeiro de 2026'
  },
  {
    id: 2,
    img: '/static/CERTIFICADOS_CURSOS/INTRODUÇAO AO PENTEST.png',
    alt: 'Certificado Introdução ao Pentest na Prática - Desec Security',
    inst: 'Desec Security',
    title: 'Introdução ao Pentest na Prática',
    date: '23 de novembro de 2024'
  },
  {
    id: 3,
    img: '/static/CERTIFICADOS_CURSOS/REDES TCP-IP.jpg',
    alt: 'Certificado Redes TCP/IP - Udemy',
    inst: 'Udemy',
    title: 'Redes TCP/IP (26.5h)',
    date: '14 de novembro de 2024'
  },
  {
    id: 4,
    img: '/static/CERTIFICADOS_CURSOS/ENDIANFIREWALL.jpg',
    alt: 'Certificado Endian Firewall Community Administração Profissional - Udemy',
    inst: 'Udemy',
    title: 'Endian Firewall Community Administração Profissional',
    date: '26 de agosto de 2025'
  },
  {
    id: 5,
    img: '/static/CERTIFICADOS_CURSOS/MICROSOFT WINDOWS SERVE 2019.jpg',
    alt: 'Certificado Microsoft Windows Server 2019 Completo - Udemy',
    inst: 'Udemy',
    title: 'Microsoft Windows Server 2019 [COMPLETO]',
    date: '02 de outubro de 2025'
  },
  {
    id: 6,
    img: '/static/CERTIFICADOS_CURSOS/PROGRAMAÇAO PARA INTERNET.png',
    alt: 'Certificado Programação para Internet - Estácio',
    inst: 'Estácio',
    title: 'Programação para Internet',
    date: '03 de julho de 2025'
  },
  {
    id: 7,
    img: '/static/CERTIFICADOS_CURSOS/lei-geral-protecao-dados.png',
    alt: 'Certificado Segurança em Tecnologia da Informação - Fundação Bradesco',
    inst: 'Fundação Bradesco',
    title: 'Segurança em Tecnologia da Informação',
    date: '21 de maio de 2024'
  }
];

export default function App() {
  // Estado do cabeçalho fixo / scrolled
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Livro de projetos
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isBookCarouselActive, setIsBookCarouselActive] = useState(false);
  const [isBookEjecting, setIsBookEjecting] = useState(false);
  const [isBookRetracting, setIsBookRetracting] = useState(false);
  const [currentProjIndex, setCurrentProjIndex] = useState(0);

  // Pasta de certificados
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [isFolderCarouselActive, setIsFolderCarouselActive] = useState(false);
  const [isFolderEjecting, setIsFolderEjecting] = useState(false);
  const [isFolderRetracting, setIsFolderRetracting] = useState(false);
  const [currentCertIndex, setCurrentCertIndex] = useState(0);

  // Modal de Detalhes do Projeto
  const [activeModalProject, setActiveModalProject] = useState(null);

  // Botão de email copiado
  const [emailCopied, setEmailCopied] = useState(false);

  // Refs de animação de cursor
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });
  const [cursorScale, setCursorScale] = useState(false);

  // Cursor suave
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    let animId;
    const animateCursor = () => {
      followerPos.current.x += (mousePos.current.x - followerPos.current.x) * 0.12;
      followerPos.current.y += (mousePos.current.y - followerPos.current.y) * 0.12;

      if (followerRef.current) {
        followerRef.current.style.left = `${followerPos.current.x}px`;
        followerRef.current.style.top = `${followerPos.current.y}px`;
      }
      animId = requestAnimationFrame(animateCursor);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animId = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Header scroll & Seção ativa
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    const sections = document.querySelectorAll('section[id], footer[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.getAttribute('id'));
          }
        });
      },
      { threshold: 0.25, rootMargin: '-80px 0px -40% 0px' }
    );

    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Animação de fade-up e stagger
  useEffect(() => {
    const animatables = document.querySelectorAll(
      '.area-card, .timeline-card, .formacao-card, .historia-block, .stat-item, .skill-tag, .social-link'
    );
    animatables.forEach((el) => el.classList.add('fade-up'));

    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    animatables.forEach((el) => fadeObserver.observe(el));

    // Stagger para colunas
    const staggerConfigs = [
      { container: '.areas-grid', item: '.area-card', delay: 90 },
      { container: '.skills-grid', item: '.skill-tag', delay: 50 },
    ];

    staggerConfigs.forEach(({ container, item, delay }) => {
      const c = document.querySelector(container);
      if (!c) return;
      const children = c.querySelectorAll(item);
      const obs = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            children.forEach((child, i) => {
              setTimeout(() => child.classList.add('visible'), i * delay);
            });
            obs.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      obs.observe(c);
    });

    return () => {
      fadeObserver.disconnect();
    };
  }, []);

  // Fechar modal com Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        fecharModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Abertura / Fechamento do Livro 3D
  const abrirLivro = () => {
    setIsBookOpen(true);
    setTimeout(() => {
      setIsBookCarouselActive(true);
      setIsBookEjecting(true);
      setTimeout(() => {
        setIsBookEjecting(false);
      }, 800);
    }, 450);
  };

  const fecharLivro = () => {
    setIsBookRetracting(true);
    setTimeout(() => {
      setIsBookCarouselActive(false);
      setIsBookRetracting(false);
      setIsBookOpen(false);
    }, 600);
  };

  const prevProj = () => {
    setCurrentProjIndex((prev) => (prev > 0 ? prev - 1 : PROJETOS.length - 1));
  };

  const nextProj = () => {
    setCurrentProjIndex((prev) => (prev < PROJETOS.length - 1 ? prev + 1 : 0));
  };

  // Abertura / Fechamento da Pasta de Certificados
  const abrirPasta = () => {
    setIsFolderOpen(true);
    setTimeout(() => {
      setIsFolderCarouselActive(true);
      setIsFolderEjecting(true);
      setTimeout(() => {
        setIsFolderEjecting(false);
      }, 800);
    }, 400);
  };

  const fecharPasta = () => {
    setIsFolderRetracting(true);
    setTimeout(() => {
      setIsFolderCarouselActive(false);
      setIsFolderRetracting(false);
      setIsFolderOpen(false);
    }, 600);
  };

  const prevCert = () => {
    setCurrentCertIndex((prev) => (prev > 0 ? prev - 1 : CERTIFICADOS.length - 1));
  };

  const nextCert = () => {
    setCurrentCertIndex((prev) => (prev < CERTIFICADOS.length - 1 ? prev + 1 : 0));
  };

  // Modal
  const abrirModal = (projeto) => {
    setActiveModalProject(projeto);
    document.body.style.overflow = 'hidden';
  };

  const fecharModal = () => {
    setActiveModalProject(null);
    document.body.style.overflow = '';
  };

  // Copiar Email
  const copiarEmail = (e) => {
    e.preventDefault();
    const email = 'albuquerquegabriel307@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2200);
    }).catch(() => {
      window.location.href = `mailto:${email}`;
    });
  };

  // Helper de classes da roleta de projetos
  const getProjItemClass = (index) => {
    const classes = ['proj-item'];
    if (isBookEjecting) classes.push('ejecting');
    if (isBookRetracting) classes.push('retracting');

    if (!isBookEjecting && !isBookRetracting) {
      if (index === currentProjIndex) {
        classes.push('active');
      } else if (index === currentProjIndex - 1 || (currentProjIndex === 0 && index === PROJETOS.length - 1)) {
        classes.push('prev');
      } else if (index === currentProjIndex + 1 || (currentProjIndex === PROJETOS.length - 1 && index === 0)) {
        classes.push('next');
      } else {
        classes.push('hidden');
      }
    }
    return classes.join(' ');
  };

  // Helper de classes da roleta de certificados
  const getCertItemClass = (index) => {
    const classes = ['cert-item'];
    if (isFolderEjecting) classes.push('ejecting');
    if (isFolderRetracting) classes.push('retracting');

    if (!isFolderEjecting && !isFolderRetracting) {
      if (index === currentCertIndex) {
        classes.push('active');
      } else if (index === currentCertIndex - 1 || (currentCertIndex === 0 && index === CERTIFICADOS.length - 1)) {
        classes.push('prev');
      } else if (index === currentCertIndex + 1 || (currentCertIndex === CERTIFICADOS.length - 1 && index === 0)) {
        classes.push('next');
      } else {
        classes.push('hidden');
      }
    }
    return classes.join(' ');
  };

  const cursorHoverProps = {
    onMouseEnter: () => setCursorScale(true),
    onMouseLeave: () => setCursorScale(false),
  };

  return (
    <>
      {/* Cursor personalizado */}
      <div
        className="cursor"
        id="cursor"
        ref={cursorRef}
        style={{
          transform: cursorScale ? 'translate(-50%, -50%) scale(2.5)' : 'translate(-50%, -50%) scale(1)'
        }}
      />
      <div
        className="cursor-follower"
        id="cursor-follower"
        ref={followerRef}
        style={{
          transform: cursorScale ? 'translate(-50%, -50%) scale(1.6)' : 'translate(-50%, -50%) scale(1)',
          borderColor: cursorScale ? 'rgba(162,89,255,0.8)' : 'rgba(162,89,255,0.5)'
        }}
      />

      {/* ============ HEADER ============ */}
      <header id="header" className={isScrolled ? 'scrolled' : ''}>
        <nav className="nav">
          <div className="nav-logo" {...cursorHoverProps}>
            <span className="logo-initials">GA</span>
            <span className="logo-name">Gabriel Albuquerque</span>
          </div>
          <ul
            className="nav-links"
            style={
              mobileMenuOpen
                ? {
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'absolute',
                    top: '72px',
                    left: 0,
                    right: 0,
                    background: 'rgba(11,11,15,0.97)',
                    padding: '16px 24px 24px',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    backdropFilter: 'blur(24px)'
                  }
                : {}
            }
          >
            <li>
              <a
                href="#sobre-mim"
                className={`nav-link ${activeSection === 'sobre-mim' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
                {...cursorHoverProps}
              >
                Sobre mim
              </a>
            </li>
            <li>
              <a
                href="#areas"
                className={`nav-link ${activeSection === 'areas' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
                {...cursorHoverProps}
              >
                Áreas
              </a>
            </li>
            <li>
              <a
                href="#projetos"
                className={`nav-link ${activeSection === 'projetos' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
                {...cursorHoverProps}
              >
                Projetos
              </a>
            </li>
            <li>
              <a
                href="#experiencias"
                className={`nav-link ${activeSection === 'experiencias' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
                {...cursorHoverProps}
              >
                Experiência
              </a>
            </li>
            <li>
              <a
                href="#contato"
                className={`nav-link nav-cta ${activeSection === 'contato' ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
                {...cursorHoverProps}
              >
                Contato
              </a>
            </li>
          </ul>
          <button
            className="nav-mobile-btn"
            id="nav-mobile-btn"
            aria-label="Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            {...cursorHoverProps}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      </header>

      <main>
        {/* ============ HERO ============ */}
        <section className="hero" id="hero">
          <div className="hero-bg-grid"></div>
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="gradient-text">Desenvolvedor</span>
                <br />
                &amp; Pentester
              </h1>
              <p className="hero-desc">
                Desenvolvedor front-end, back-end, cibersegurança e scripts de automação. Busco sempre entregar o melhor
                resultado em cada projeto, com experiência em diversas tecnologias.
              </p>
              <div className="hero-actions">
                <a href="#projetos" className="btn btn-primary" id="hero-btn-projetos" {...cursorHoverProps}>
                  Ver Projetos <span className="btn-arrow">→</span>
                </a>
                <a href="#sobre-mim" className="btn btn-ghost" id="hero-btn-sobre" {...cursorHoverProps}>
                  Sobre mim
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-img-wrapper">
                <div className="hero-img-glow"></div>
                <img
                  src="/static/imagens/WhatsApp Image 2026-09-22 at 00.31.58.jpeg"
                  alt="Gabriel Albuquerque"
                  className="hero-img"
                />
              </div>
              <div className="hero-floating-card card-1">
                <span className="fc-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                </span>
                <span className="fc-text">Estudante</span>
              </div>
              <div className="hero-floating-card card-2">
                <span className="fc-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                </span>
                <span className="fc-text">Desenvolvedor</span>
              </div>
              <div className="hero-floating-card card-3">
                <span className="fc-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                </span>
                <span className="fc-text">Pentester</span>
              </div>
              <div className="hero-floating-card card-4">
                <span className="fc-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                </span>
                <span className="fc-text">Profissional</span>
              </div>
            </div>
          </div>
          <div className="hero-scroll-hint">
            <span>scroll</span>
            <div className="scroll-line"></div>
          </div>
        </section>

        {/* ============ PROJETOS DESTAQUE (LIVRO 3D) ============ */}
        <section className="projetos-destaque" id="projetos">
          <div className="section-header">
            <span className="section-tag">// projetos em destaque</span>
            <h2 className="section-title">Livro de <span className="gradient-text">Projetos</span></h2>
            <p className="section-subtitle">Clique no livro para abrir suas páginas e explorar os projetos em 3D</p>
          </div>

          {/* Contêiner do Livro 3D */}
          <div className="livro-container" id="livro-container">
            <div
              className={`book ${isBookOpen ? 'open' : ''}`}
              id="book-element"
              onClick={!isBookOpen ? abrirLivro : undefined}
              {...cursorHoverProps}
            >
              <div className="book-cover-back"></div>
              <div className="book-pages">
                <div className="book-page-leaf leaf-1"></div>
                <div className="book-page-leaf leaf-2"></div>
                <div className="book-page-leaf leaf-3"></div>
              </div>
              <div className="book-cover-front">
                <div className="book-glow"></div>
                <div className="book-spine"></div>
                <div className="book-emblem">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                    <polyline points="2 17 12 22 22 17"/>
                    <polyline points="2 12 12 17 22 12"/>
                  </svg>
                </div>
                <h3 className="book-title">PROJETOS</h3>
                <span className="book-subtitle">GABRIEL ALBUQUERQUE</span>
                <span className="book-hint">CLIQUE PARA ABRIR</span>
              </div>
            </div>
          </div>

          {/* Carrossel / Roleta 3D dos Projetos */}
          <div className={`projetos-carousel ${isBookCarouselActive ? 'active' : ''}`} id="projetos-carousel">
            <div className="carousel-nav">
              <button id="proj-prev" className="carousel-btn" aria-label="Projeto anterior" onClick={prevProj} {...cursorHoverProps}>
                ←
              </button>
              <button id="proj-next" className="carousel-btn" aria-label="Próximo projeto" onClick={nextProj} {...cursorHoverProps}>
                →
              </button>
            </div>

            <div className="projetos-carousel-track" id="projetos-carousel-track">
              {PROJETOS.map((proj, idx) => {
                const isCurrent = idx === currentProjIndex;
                return (
                  <div
                    key={proj.id}
                    className={getProjItemClass(idx)}
                    data-id={proj.id}
                    style={{
                      animationDelay: isBookEjecting
                        ? `${idx * 120}ms`
                        : isBookRetracting
                        ? `${(PROJETOS.length - 1 - idx) * 80}ms`
                        : undefined
                    }}
                    onClick={() => {
                      if (isCurrent && !isBookEjecting && !isBookRetracting) {
                        abrirModal(proj);
                      }
                    }}
                    {...cursorHoverProps}
                  >
                    <div className="proj-item-img">
                      {proj.video ? (
                        <video
                          autoPlay
                          muted
                          loop
                          playsInline
                          poster={proj.imagem}
                          className="proj-item-video"
                        >
                          <source src={proj.video} type="video/mp4" />
                        </video>
                      ) : (
                        <img src={proj.imagem} alt={proj.titulo} />
                      )}
                      <span className="proj-badge">{proj.badge}</span>
                    </div>
                    <div className="proj-item-content">
                      <span className="proj-num">{proj.numero}</span>
                      <h3>{proj.titulo}</h3>
                      <p>{proj.descricaoCurta}</p>
                      <div className="proj-tags">
                        {proj.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="tag">{tag}</span>
                        ))}
                      </div>
                      <button
                        className="btn btn-primary btn-sm btn-open-modal"
                        data-id={proj.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          abrirModal(proj);
                        }}
                        {...cursorHoverProps}
                      >
                        Ver Detalhes ↗
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="btn btn-ghost" id="close-projetos" onClick={fecharLivro} {...cursorHoverProps}>
              Fechar Livro de Projetos
            </button>
          </div>
        </section>

        {/* ============ SOBRE MIM ============ */}
        <section className="sobre-mim" id="sobre-mim">
          <div className="sobre-mim-inner">
            <div className="sobre-mim-stats">
              <div className="stat-item" id="stat-anos">
                <span className="stat-num gradient-text">3+</span>
                <span className="stat-label">Anos de estudo</span>
              </div>
              <div className="stat-item" id="stat-projetos">
                <span className="stat-num gradient-text">10+</span>
                <span className="stat-label">Projetos realizados</span>
              </div>
              <div className="stat-item" id="stat-areas">
                <span className="stat-num gradient-text">5</span>
                <span className="stat-label">Áreas de foco</span>
              </div>
            </div>
            <div className="sobre-mim-content">
              <span className="section-tag">// sobre mim</span>
              <h2 className="section-title">Um pouco sobre <span className="gradient-text">mim</span></h2>
              <p>
                Desenvolvedor com foco em front-end e back-end e scripts de automação. Não me considero
                ainda um Full Stack pois ainda falta muito para aprender, mas busco sempre entregar o
                melhor resultado em cada projeto.
              </p>
              <p>
                Tenho experiência em diversas tecnologias e estou sempre aprendendo coisas novas para
                me manter atualizado com o mercado.
              </p>
              <div className="skills-grid">
                {['Python', 'JavaScript', 'HTML/CSS', 'Node.js', 'Flask', 'SQL', 'Git', 'Linux', 'React.js'].map(
                  (skill) => (
                    <span key={skill} className="skill-tag" {...cursorHoverProps}>
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ============ HISTÓRIA COM A PROGRAMAÇÃO ============ */}
        <section className="historia" id="historia">
          <div className="section-header">
            <span className="section-tag"></span>
            <h2 className="section-title">
              Minha história com a <span className="gradient-text">programação</span>
            </h2>
            <p>
              Meu interesse pela tecnologia nasceu da minha melhor terapia, tanto na infância quanto nos dias de hoje: os videogames — de consoles e celulares até o computador. Com a curiosidade natural de uma criança, eu sempre me perguntava como era possível criar aqueles universos e mecânicas, ou por que certos chefes eram tão desafiadores de derrotar. Eu queria entender como tudo funcionava, mesmo sem saber que aquilo se chamava desenvolvimento de jogos e que existiam pessoas dedicadas a isso pelo mundo inteiro.
            </p>
            <p>
              Mesmo explorando outras áreas e estudos, aquela inquietação continuava: <em>"Como é possível um chefe de jogo aprender com os meus movimentos e superá-los?"</em>. Até que, em uma conversa com amigos, soube que alguém próximo estava criando um jogo de MMORPG para computador. Naquele momento minhas buscas evoluíram de <em>"Como criar um jogo do zero?"</em> para <em>"Como programar em C"</em> — e foi exatamente ali que a minha jornada na programação realmente começou.
            </p>
          </div>
          <div className="historia-content">
            {/* Bloco 1 */}
            <div className="historia-block">
              <div className="honeycomb-wrap" {...cursorHoverProps}>
                <div className="honeycomb-border">
                  <div className="honeycomb-inner">
                    <video autoPlay muted loop playsInline poster="/static/imagens/Captura de tela 2026-03-13 235819.png" className="honeycomb-video">
                      <source src="/static/videos/Video Project 1.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
                <div className="honeycomb-glow"></div>
              </div>
              <div className="historia-info">
                <span className="historia-step"></span>
                <h3>Primeiros passos no mundo tech</h3>
                <p></p>
              </div>
            </div>

            {/* Bloco 2 (Reverse) */}
            <div className="historia-block reverse">
              <div className="honeycomb-wrap" {...cursorHoverProps}>
                <div className="honeycomb-border">
                  <div className="honeycomb-inner">
                    <video autoPlay muted loop playsInline poster="/static/imagens/Captura de tela 2026-03-13 235819.png" className="honeycomb-video">
                      <source src="/static/videos/" type="video/mp4" />
                    </video>
                  </div>
                </div>
                <div className="honeycomb-glow"></div>
              </div>
              <div className="historia-info">
                <span className="historia-step">Fase 02</span>
                <h3>Desenvolvimento &amp; Automação</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ipsum provident nemo excepturi similique ad officiis quo tempora molestias expedita. Distinctio similique consequatur nam totam qui, autem asperiores veritatis magni?
                </p>
              </div>
            </div>

            {/* Bloco 3 */}
            <div className="historia-block">
              <div className="honeycomb-wrap" {...cursorHoverProps}>
                <div className="honeycomb-border">
                  <div className="honeycomb-inner">
                    <video autoPlay muted loop playsInline poster="/static/imagens/Captura de tela 2026-03-13 235819.png" className="honeycomb-video">
                      <source src="/static/videos/video3.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
                <div className="honeycomb-glow"></div>
              </div>
              <div className="historia-info">
                <span className="historia-step">Fase 03</span>
                <h3>Segurança Ofensiva &amp; Pentest</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ipsum provident nemo excepturi similique ad officiis quo tempora molestias expedita. Distinctio similique consequatur nam totam qui, autem asperiores veritatis magni?
                </p>
              </div>
            </div>

            {/* Bloco 4 (Reverse) */}
            <div className="historia-block reverse">
              <div className="honeycomb-wrap" {...cursorHoverProps}>
                <div className="honeycomb-border">
                  <div className="honeycomb-inner">
                    <video autoPlay muted loop playsInline poster="/static/imagens/Captura de tela 2026-03-13 235819.png" className="honeycomb-video">
                      <source src="/static/videos/Video Project 25.mp4" type="video/mp4" />
                    </video>
                  </div>
                </div>
                <div className="honeycomb-glow"></div>
              </div>
              <div className="historia-info">
                <span className="historia-step">Fase 04</span>
                <h3>Construção de Projetos e Futuro</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus ipsum provident nemo excepturi similique ad officiis quo tempora molestias expedita. Distinctio similique consequatur nam totam qui, autem asperiores veritatis magni?
                </p>
              </div>
            </div>

            <p className="historia-final">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse dignissimos expedita, adipisci quo numquam modi assumenda ullam, minima, quod commodi aliquam magnam inventore sunt voluptas laborum quos deleniti totam consequuntur?
            </p>
          </div>
        </section>

        {/* ============ ÁREAS DE ESTUDO ============ */}
        <section className="areas" id="areas">
          <div className="section-header">
            <span className="section-tag">// especialidades</span>
            <h2 className="section-title">Principais áreas de <span className="gradient-text">estudo</span></h2>
          </div>
          <div className="areas-grid">
            <div className="area-card" data-color="purple" id="area-ciberseg" {...cursorHoverProps}>
              <div className="area-card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <h3>Cibersegurança</h3>
              <p>Formado pela Desec no curso de Pentest Profissional, com conhecimento em segurança ofensiva, testes de invasão e mitigação de vulnerabilidades.</p>
            </div>
            <div className="area-card" data-color="blue" id="area-web" {...cursorHoverProps}>
              <div className="area-card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              </div>
              <h3>Desenvolvimento Web</h3>
              <p>Desenvolvimento de plataformas completas e landing pages de alta conversão para microempresas e clientes de diversos segmentos.</p>
            </div>
            <div className="area-card" data-color="green" id="area-auto" {...cursorHoverProps}>
              <div className="area-card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07"/></svg>
              </div>
              <h3>Automação</h3>
              <p>Criação de scripts de automação para planilhas, otimização de ações diárias e simplificação de tarefas repetitivas com precisão.</p>
            </div>
            <div className="area-card" data-color="orange" id="area-dados" {...cursorHoverProps}>
              <div className="area-card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
              </div>
              <h3>Análise de Dados</h3>
              <p>Observação e análise do mercado financeiro de ações e criptomoedas, monitorando altas, baixas, padrões de compra/venda e moedas mais relevantes.</p>
            </div>
            <div className="area-card" data-color="pink" id="area-ia" {...cursorHoverProps}>
              <div className="area-card-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>
              </div>
              <h3>IA &amp; Machine Learning</h3>
              <p>Desenvolvimento de IAs para identificação de padrões no mercado financeiro (sinais de compra e venda) e assistência inteligente em rotinas diárias.</p>
            </div>
          </div>
        </section>

        {/* ============ EXPERIÊNCIAS ============ */}
        <section className="experiencias" id="experiencias">
          <div className="section-header">
            <span className="section-tag">// experiência</span>
            <h2 className="section-title">Minha <span className="gradient-text">trajetória</span></h2>
          </div>
          <div className="timeline">
            <div className="timeline-item" id="exp-1">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <div className="timeline-header">
                  <h3>Desenvolvedor Autônomo</h3>
                  <span className="timeline-date">2025</span>
                </div>
                <h4>Freelancer</h4>
                <p>
                  Desenvolvimento e entrega de projetos sob demanda para comércios e serviços, incluindo padarias, restaurantes e clínicas.
                </p>
              </div>
            </div>

            <div className="timeline-item" id="exp-2">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <div className="timeline-header">
                  <h3>Professor de Desenvolvimento</h3>
                  <span className="timeline-date">2025</span>
                </div>
                <h4>Ensino & Mentoria</h4>
                <p>
                  Ensino prático de desenvolvimento web cobrindo HTML, CSS e JavaScript desde os fundamentos até a construção de um projeto real completo.
                </p>
              </div>
            </div>

            <div className="timeline-item" id="exp-3">
              <div className="timeline-dot"></div>
              <div className="timeline-card">
                <div className="timeline-header">
                  <h3>Técnico em TI</h3>
                  <span className="timeline-date">2024</span>
                </div>
                <h4>Centerlite</h4>
                <p>
                  Atuação com administração de firewall, manutenção preventiva e corretiva de computadores, suporte e manutenção de sistemas, além de administração de rede cabeada e Wi-Fi.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ FORMAÇÃO ============ */}
        <section className="formacao" id="formacao">
          <div className="section-header">
            <span className="section-tag">// formação</span>
            <h2 className="section-title">Minha <span className="gradient-text">formação</span></h2>
          </div>
          <div className="formacao-card" id="formacao-card">
            <div className="formacao-logo">
              <img src="/static/imagens/images.jpeg" alt="Logo da instituição" />
            </div>
            <div className="formacao-info">
              <h3>Análise e Desenvolvimento de Sistemas</h3>
              <h4>Estácio</h4>
              <span className="timeline-date">02/2024 — Cursando</span>
            </div>
          </div>
        </section>

        {/* ============ CERTIFICADOS ============ */}
        <section className="certificados" id="certificados">
          <div className="section-header">
            <span className="section-tag">// certificados</span>
            <h2 className="section-title">Meus <span className="gradient-text">certificados</span></h2>
          </div>
          <div className="certificados-folder-container" id="folder-cert">
            <div
              className={`folder ${isFolderOpen ? 'open' : ''}`}
              onClick={!isFolderOpen ? abrirPasta : undefined}
              {...cursorHoverProps}
            >
              <div className="folder-back"></div>
              <div className="folder-front">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="folder-icon">
                  <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"></path>
                </svg>
                <span>Certificados</span>
              </div>
            </div>
          </div>

          <div className={`certificados-carousel ${isFolderCarouselActive ? 'active' : ''}`} id="carousel-cert">
            <div className="carousel-nav">
              <button id="cert-prev" className="carousel-btn" aria-label="Certificado anterior" onClick={prevCert} {...cursorHoverProps}>
                ←
              </button>
              <button id="cert-next" className="carousel-btn" aria-label="Próximo certificado" onClick={nextCert} {...cursorHoverProps}>
                →
              </button>
            </div>

            <div className="carousel-track" id="carousel-track">
              {CERTIFICADOS.map((cert, idx) => (
                <div
                  key={cert.id}
                  className={getCertItemClass(idx)}
                  style={{
                    animationDelay: isFolderEjecting
                      ? `${idx * 120}ms`
                      : isFolderRetracting
                      ? `${(CERTIFICADOS.length - 1 - idx) * 80}ms`
                      : undefined
                  }}
                  {...cursorHoverProps}
                >
                  <img src={cert.img} alt={cert.alt} />
                  <div className="cert-item-info">
                    <span className="cert-item-inst">{cert.inst}</span>
                    <h4 className="cert-item-title">{cert.title}</h4>
                    <span className="cert-item-date">{cert.date}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-ghost" id="close-carousel" onClick={fecharPasta} {...cursorHoverProps}>
              Fechar Certificados
            </button>
          </div>
        </section>
      </main>

      {/* ============ FOOTER / CONTATO ============ */}
      <footer id="contato">
        <div className="footer-inner">
          <div className="footer-cta">
            <span className="section-tag">// contato</span>
            <h2 className="footer-title">Se interessou por <span className="gradient-text">algo?</span></h2>
            <p>Me manda uma mensagem e vamos conversar sobre seu projeto.</p>
            <a
              href="mailto:albuquerquegabriel307@gmail.com"
              className="btn btn-primary"
              id="email-btn"
              onClick={copiarEmail}
              style={
                emailCopied
                  ? { background: 'linear-gradient(135deg, #0ACF83, #09a368)' }
                  : {}
              }
              {...cursorHoverProps}
            >
              {emailCopied ? '✓ Email copiado!' : 'albuquerquegabriel307@gmail.com'}
            </a>
          </div>

          <div className="footer-links">
            <ul className="social-links">
              <li>
                <a href="https://github.com/AlbuquerqueGabriel22" className="social-link" id="link-github" target="_blank" rel="noreferrer" aria-label="GitHub" {...cursorHoverProps}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/gabriel-albuquerque-072641332/" className="social-link" id="link-linkedin" target="_blank" rel="noreferrer" aria-label="LinkedIn" {...cursorHoverProps}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="social-link" id="link-instagram" aria-label="Instagram" {...cursorHoverProps}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="social-link" id="link-twitter" aria-label="Twitter / X" {...cursorHoverProps}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Twitter
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-bottom">
            <p>© 2026 Gabriel Albuquerque — Todos os direitos reservados.</p>
            <button
              id="voltaInicio"
              className="btn-top"
              aria-label="Voltar ao topo"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              {...cursorHoverProps}
            >
              ↑
            </button>
          </div>
        </div>
      </footer>

      {/* ============ MODAL EXPANSÍVEL DE DETALHES DO PROJETO ============ */}
      <div
        className={`modal-overlay ${activeModalProject ? 'open' : ''}`}
        id="projeto-modal"
        aria-hidden={!activeModalProject}
        onClick={(e) => {
          if (e.target.id === 'projeto-modal') {
            fecharModal();
          }
        }}
      >
        {activeModalProject && (
          <div className="modal-card">
            <button className="modal-close" id="modal-close-btn" aria-label="Fechar janela" onClick={fecharModal} {...cursorHoverProps}>
              ✕
            </button>
            <div className="modal-header">
              <span className="modal-tag" id="modal-categoria">{activeModalProject.categoria}</span>
              <h2 className="modal-title" id="modal-titulo">{activeModalProject.titulo}</h2>
            </div>
            <div className="modal-body">
              <div className="modal-gallery">
                <div className="modal-main-img" id="modal-media-container">
                  {activeModalProject.video ? (
                    <video
                      id="modal-video-principal"
                      src={activeModalProject.video}
                      controls
                      autoPlay
                      playsInline
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
                    />
                  ) : (
                    <img
                      src={activeModalProject.imagem}
                      id="modal-img-principal"
                      alt={activeModalProject.titulo}
                    />
                  )}
                </div>
              </div>
              <div className="modal-info">
                <h3>Sobre o Projeto</h3>
                <p id="modal-descricao">{activeModalProject.descricaoLonga}</p>

                <h3>Tecnologias Utilizadas</h3>
                <div className="modal-tags" id="modal-tags">
                  {activeModalProject.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>

                <div className="modal-actions">
                  <a
                    href={activeModalProject.github || '#'}
                    className="btn btn-primary"
                    id="modal-link-github"
                    target="_blank"
                    rel="noreferrer"
                    {...cursorHoverProps}
                  >
                    Código no GitHub ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
