// ============================================================
// PORTFOLIO SCRIPT — GABRIEL ALBUQUERQUE
// ============================================================

/* ---- CUSTOM CURSOR ---- */
const cursor         = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
});

(function animateCursor() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top  = followerY + 'px';
    requestAnimationFrame(animateCursor);
})();

// Scale cursor on interactive elements
document.querySelectorAll('a, button, .projeto-card, .area-card, .certificado-card, .skill-tag, .social-link, .honeycomb-wrap, .folder, .book, .proj-item, .modal-close').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform         = 'translate(-50%, -50%) scale(2.5)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.6)';
        cursorFollower.style.borderColor = 'rgba(162,89,255,0.8)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform         = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.borderColor = 'rgba(162,89,255,0.5)';
    });
});

/* ---- STICKY HEADER ---- */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
});

/* ---- ACTIVE NAV LINK ON SCROLL ---- */
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks  = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { threshold: 0.25, rootMargin: '-80px 0px -40% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ---- SMOOTH SCROLL FOR ANCHOR LINKS ---- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

/* ---- BACK TO TOP ---- */
const backTopBtn = document.getElementById('voltaInicio');
if (backTopBtn) {
    backTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ---- EMAIL COPY ON CLICK ---- */
const emailBtn = document.getElementById('email-btn');
if (emailBtn) {
    emailBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailBtn.textContent.trim();
        navigator.clipboard.writeText(email)
            .then(() => {
                const original = emailBtn.innerHTML;
                emailBtn.innerHTML = '✓ Email copiado!';
                emailBtn.style.background = 'linear-gradient(135deg, #0ACF83, #09a368)';
                setTimeout(() => {
                    emailBtn.innerHTML = original;
                    emailBtn.style.background = '';
                }, 2200);
            })
            .catch(() => {
                window.location.href = 'mailto:' + email;
            });
    });
}

/* ---- SCROLL-TRIGGERED FADE-UP ANIMATIONS ---- */
const animatableSelectors = [
    '.projeto-card',
    '.area-card',
    '.timeline-card',
    '.projeto-lista-card',
    '.certificado-card',
    '.stat-item',
    '.skill-tag',
    '.historia-block',
    '.formacao-card',
    '.social-link',
];

const animatables = document.querySelectorAll(animatableSelectors.join(', '));
animatables.forEach(el => el.classList.add('fade-up'));

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08 });

animatables.forEach(el => fadeObserver.observe(el));

/* ---- STAGGERED GRID ANIMATIONS ---- */
function staggerGrid(containerSel, childSel, delay = 90) {
    const container = document.querySelector(containerSel);
    if (!container) return;

    const children = container.querySelectorAll(childSel);

    const obs = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            children.forEach((child, i) => {
                setTimeout(() => child.classList.add('visible'), i * delay);
            });
            obs.disconnect();
        }
    }, { threshold: 0.1 });

    obs.observe(container);
}

staggerGrid('.projetos-grid',      '.projeto-card',       100);
staggerGrid('.areas-grid',         '.area-card',          90);
staggerGrid('.projetos-lista-grid','.projeto-lista-card', 110);
staggerGrid('.skills-grid',        '.skill-tag',          50);

/* ---- MOBILE NAV TOGGLE ---- */
const mobileBtn = document.getElementById('nav-mobile-btn');
const navLinksEl = document.querySelector('.nav-links');

if (mobileBtn && navLinksEl) {
    mobileBtn.addEventListener('click', () => {
        const open = navLinksEl.style.display === 'flex';
        navLinksEl.style.display = open ? '' : 'flex';
        navLinksEl.style.flexDirection = 'column';
        navLinksEl.style.position = 'absolute';
        navLinksEl.style.top = '72px';
        navLinksEl.style.left = '0';
        navLinksEl.style.right = '0';
        navLinksEl.style.background = 'rgba(11,11,15,0.97)';
        navLinksEl.style.padding = '16px 24px 24px';
        navLinksEl.style.borderBottom = '1px solid rgba(255,255,255,0.06)';
        navLinksEl.style.backdropFilter = 'blur(24px)';
        if (open) navLinksEl.removeAttribute('style');
    });

    // Close mobile menu on link click
    navLinksEl.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinksEl.removeAttribute('style');
            }
        });
    });
}

/* ---- CERTIFICADOS: ANIMAÇÃO DE SAÍDA E ENTRADA NA PASTA ---- */
const folderCert = document.getElementById('folder-cert');
const folderElement = document.querySelector('.folder');
const carouselCert = document.getElementById('carousel-cert');
const closeCarousel = document.getElementById('close-carousel');
const certItems = Array.from(document.querySelectorAll('.cert-item'));
const btnPrev = document.getElementById('cert-prev');
const btnNext = document.getElementById('cert-next');

let currentIndex = 0;

function updateCarousel() {
    certItems.forEach((item, index) => {
        item.classList.remove('active', 'prev', 'next', 'hidden');
        
        if (index === currentIndex) {
            item.classList.add('active');
        } else if (index === currentIndex - 1 || (currentIndex === 0 && index === certItems.length - 1)) {
            item.classList.add('prev');
        } else if (index === currentIndex + 1 || (currentIndex === certItems.length - 1 && index === 0)) {
            item.classList.add('next');
        } else {
            item.classList.add('hidden');
        }
    });
}

if (folderCert) {
    folderCert.addEventListener('click', () => {
        // 1. Abre a aba da pasta
        folderElement.classList.add('open');
        
        // 2. Os certificados emergem e saltam de dentro da pasta
        setTimeout(() => {
            carouselCert.classList.add('active');
            certItems.forEach((item, i) => {
                item.classList.remove('retracting');
                item.classList.add('ejecting');
                item.style.animationDelay = `${i * 120}ms`;
            });

            // 3. Após a animação de ejeção, posiciona a roleta
            setTimeout(() => {
                certItems.forEach(item => {
                    item.classList.remove('ejecting');
                    item.style.animationDelay = '';
                });
                updateCarousel();
            }, 800);
        }, 400);
    });
}

if (closeCarousel) {
    closeCarousel.addEventListener('click', () => {
        // 1. Os certificados mergulham de volta para dentro da pasta
        certItems.forEach((item, i) => {
            item.classList.remove('active', 'prev', 'next', 'hidden');
            item.classList.add('retracting');
            item.style.animationDelay = `${(certItems.length - 1 - i) * 80}ms`;
        });

        // 2. Fecha a pasta
        setTimeout(() => {
            carouselCert.classList.remove('active');
            certItems.forEach(item => {
                item.classList.remove('retracting');
                item.style.animationDelay = '';
            });
            folderElement.classList.remove('open');
        }, 600);
    });
}

if (btnPrev) {
    btnPrev.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : certItems.length - 1;
        updateCarousel();
    });
}

if (btnNext) {
    btnNext.addEventListener('click', () => {
        currentIndex = (currentIndex < certItems.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });
}

/* ---- LIVRO 3D DE PROJETOS & ROLETA ---- */
const livroContainer = document.getElementById('livro-container');
const bookElement = document.getElementById('book-element');
const projetosCarousel = document.getElementById('projetos-carousel');
const closeProjetos = document.getElementById('close-projetos');
const projItems = Array.from(document.querySelectorAll('.proj-item'));
const projPrev = document.getElementById('proj-prev');
const projNext = document.getElementById('proj-next');

let currentProjIndex = 0;

function updateProjetosCarousel() {
    projItems.forEach((item, index) => {
        item.classList.remove('active', 'prev', 'next', 'hidden');
        
        if (index === currentProjIndex) {
            item.classList.add('active');
        } else if (index === currentProjIndex - 1 || (currentProjIndex === 0 && index === projItems.length - 1)) {
            item.classList.add('prev');
        } else if (index === currentProjIndex + 1 || (currentProjIndex === projItems.length - 1 && index === 0)) {
            item.classList.add('next');
        } else {
            item.classList.add('hidden');
        }
    });
}

if (bookElement) {
    bookElement.addEventListener('click', () => {
        // 1. O livro abre a capa e as páginas em 3D
        bookElement.classList.add('open');
        
        // 2. Os projetos saltam de dentro do livro
        setTimeout(() => {
            projetosCarousel.classList.add('active');
            projItems.forEach((item, i) => {
                item.classList.remove('retracting');
                item.classList.add('ejecting');
                item.style.animationDelay = `${i * 120}ms`;
            });

            // 3. Posiciona na roleta após saltarem
            setTimeout(() => {
                projItems.forEach(item => {
                    item.classList.remove('ejecting');
                    item.style.animationDelay = '';
                });
                updateProjetosCarousel();
            }, 800);
        }, 450);
    });
}

if (closeProjetos) {
    closeProjetos.addEventListener('click', () => {
        // 1. Projetos mergulham de volta para as páginas do livro
        projItems.forEach((item, i) => {
            item.classList.remove('active', 'prev', 'next', 'hidden');
            item.classList.add('retracting');
            item.style.animationDelay = `${(projItems.length - 1 - i) * 80}ms`;
        });

        // 2. Fecha o livro
        setTimeout(() => {
            projetosCarousel.classList.remove('active');
            projItems.forEach(item => {
                item.classList.remove('retracting');
                item.style.animationDelay = '';
            });
            bookElement.classList.remove('open');
        }, 600);
    });
}

if (projPrev) {
    projPrev.addEventListener('click', () => {
        currentProjIndex = (currentProjIndex > 0) ? currentProjIndex - 1 : projItems.length - 1;
        updateProjetosCarousel();
    });
}

if (projNext) {
    projNext.addEventListener('click', () => {
        currentProjIndex = (currentProjIndex < projItems.length - 1) ? currentProjIndex + 1 : 0;
        updateProjetosCarousel();
    });
}

/* ---- MODAL DE DETALHES DO PROJETO ---- */
const projetoModal = document.getElementById('projeto-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalTitulo = document.getElementById('modal-titulo');
const modalCategoria = document.getElementById('modal-categoria');
const modalDescricao = document.getElementById('modal-descricao');
const modalImgPrincipal = document.getElementById('modal-img-principal');
const modalTags = document.getElementById('modal-tags');
const modalLinkDemo = document.getElementById('modal-link-demo');
const modalLinkGithub = document.getElementById('modal-link-github');

const modalVideoPrincipal = document.getElementById('modal-video-principal');

const projetosDetalhes = {
    1: {
        titulo: "Site de Apresentação de Restaurante",
        categoria: "Web & Python Flask",
        imagem: "static/imagens/Captura de tela 2026-03-13 235819.png",
        video: "static/videos/Video Project 25 (1).mp4",
        descricao: "Site simples e elegante desenvolvido para apresentação de restaurante, exibição de cardápio interativo e informações do estabelecimento comercial, integrando front-end responsivo a um back-end dinâmico com Python Flask.",
        tags: ["HTML", "CSS", "JavaScript", "Python Flask"],
        github: "https://github.com/AlbuquerqueGabriel22"
    },
    2: {
        titulo: "Projeto Beta — Automação de Processos & APIs",
        categoria: "Automação & Backend",
        imagem: "static/imagens/Captura de tela 2026-03-13 235819.png",
        descricao: "Solução automatizada desenvolvida em Python para otimizar rotinas operacionais, extração de relatórios automatizados, web scraping de dados estruturados e conexão com webhooks inteligentes.",
        tags: ["Python", "Flask", "Requests", "Web Scraping", "Automação", "REST API"],
        demo: "#",
        github: "https://github.com/AlbuquerqueGabriel22"
    },
    3: {
        titulo: "Projeto Gamma — Auditoria de Segurança & Pentest",
        categoria: "Cibersegurança & Pentest",
        imagem: "static/imagens/Captura de tela 2026-03-13 235819.png",
        descricao: "Kit de ferramentas e scripts voltados para análise de vulnerabilidades de rede e aplicações web, varredura de portas, identificação de falhas conhecidas e geração automatizada de relatórios técnicos de segurança.",
        tags: ["Cibersegurança", "Pentest", "Linux Bash", "Python", "Redes", "Auditoria"],
        demo: "#",
        github: "https://github.com/AlbuquerqueGabriel22"
    },
    4: {
        titulo: "Projeto Delta — Dashboard Analítico & Telemetria",
        categoria: "Frontend & Data Analytics",
        imagem: "static/imagens/Captura de tela 2026-03-13 235819.png",
        descricao: "Painel de controle analítico em tempo real com gráficos dinâmicos, acompanhamento de métricas operacionais e visualização intuitiva de telemetria em modo dark premium.",
        tags: ["Frontend", "UI/UX", "Charts", "JavaScript", "Telemetria"],
        demo: "#",
        github: "https://github.com/AlbuquerqueGabriel22"
    }
};

function abrirModalProjeto(id) {
    const dados = projetosDetalhes[id];
    if (!dados || !projetoModal) return;

    modalTitulo.textContent = dados.titulo;
    modalCategoria.textContent = dados.categoria;
    modalDescricao.textContent = dados.descricao;

    // Gerenciar vídeo vs imagem no modal
    if (dados.video && modalVideoPrincipal) {
        modalVideoPrincipal.src = dados.video;
        modalVideoPrincipal.style.display = 'block';
        if (modalImgPrincipal) modalImgPrincipal.style.display = 'none';
        modalVideoPrincipal.currentTime = 0;
        modalVideoPrincipal.play().catch(() => {});
    } else {
        if (modalVideoPrincipal) {
            modalVideoPrincipal.pause();
            modalVideoPrincipal.removeAttribute('src');
            modalVideoPrincipal.style.display = 'none';
        }
        if (modalImgPrincipal) {
            modalImgPrincipal.src = dados.imagem;
            modalImgPrincipal.alt = dados.titulo;
            modalImgPrincipal.style.display = 'block';
        }
    }
    
    // Tags
    modalTags.innerHTML = '';
    dados.tags.forEach(tag => {
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = tag;
        modalTags.appendChild(span);
    });

    if (modalLinkDemo) {
        if (dados.demo) {
            modalLinkDemo.href = dados.demo;
            modalLinkDemo.style.display = 'inline-flex';
        } else {
            modalLinkDemo.style.display = 'none';
        }
    }
    if (modalLinkGithub) {
        modalLinkGithub.href = dados.github || '#';
    }

    projetoModal.classList.add('open');
    projetoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Impede scroll ao abrir modal
}

function fecharModalProjeto() {
    if (!projetoModal) return;
    projetoModal.classList.remove('open');
    projetoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';

    // Pausa e reseta vídeo do modal se estiver rodando
    if (modalVideoPrincipal) {
        modalVideoPrincipal.pause();
        modalVideoPrincipal.currentTime = 0;
    }
}

// Event Listeners para botões "Ver Detalhes ↗"
document.querySelectorAll('.btn-open-modal').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        abrirModalProjeto(id);
    });
});

// Clique no card de projeto ativo também expande o modal
projItems.forEach(item => {
    item.addEventListener('click', () => {
        if (item.classList.contains('active')) {
            const id = item.getAttribute('data-id');
            abrirModalProjeto(id);
        }
    });
});

if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', fecharModalProjeto);
}

// Fechar ao clicar no backdrop (fora do card)
if (projetoModal) {
    projetoModal.addEventListener('click', (e) => {
        if (e.target === projetoModal) {
            fecharModalProjeto();
        }
    });
}

// Fechar com a tecla ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        fecharModalProjeto();
    }
});

/* ---- AUTOPLAY MUTE VIDEOS EM COLMEIA ---- */
document.querySelectorAll('.honeycomb-video').forEach(video => {
    video.muted = true;
    video.setAttribute('muted', '');
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.loop = true;
    
    // Inicia vídeo automaticamente
    const startPlay = () => {
        const promise = video.play();
        if (promise !== undefined) {
            promise.catch(() => {
                // Se o navegador barrar o autoplay no carregamento inicial, inicia ao rolar até ele
                const obs = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            video.play().catch(() => {});
                        }
                    });
                }, { threshold: 0.1 });
                obs.observe(video);
            });
        }
    };
    
    startPlay();
});
