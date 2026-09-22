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
document.querySelectorAll('a, button, .projeto-card, .area-card, .certificado-card, .skill-tag, .social-link').forEach(el => {
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
staggerGrid('.certificados-grid',  '.certificado-card',   100);
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
