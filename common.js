// Heart cursor that follows the mouse
(function () {
    const cursor = document.createElement('div');
    cursor.className = 'heart-cursor';
    cursor.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
})();

// Floating hearts, bows and sparkles drifting up the screen
const floatingElements = ['💖', '🎀', '🌸', '✨', '💕', '🌙', '💗'];
function createFloating() {
    if (typeof gsap === 'undefined') return;
    const el = document.createElement('div');
    el.className = 'floating';
    el.textContent = floatingElements[Math.floor(Math.random() * floatingElements.length)];
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = (80 + Math.random() * 25) + 'vh';
    el.style.fontSize = (Math.random() * 18 + 16) + 'px';
    document.body.appendChild(el);
    gsap.to(el, {
        y: -window.innerHeight * 1.1,
        x: Math.random() * 120 - 60,
        rotation: Math.random() * 180 - 90,
        duration: Math.random() * 6 + 8,
        ease: 'none',
        keyframes: { opacity: [0, 0.9, 0.9, 0] },
        onComplete: () => el.remove()
    });
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(createFloating, 1200);
}

// Fade the whole page out, then go somewhere
function goTo(url) {
    if (typeof gsap === 'undefined') { window.location.href = url; return; }
    gsap.to('body', { opacity: 0, duration: 0.9, onComplete: () => { window.location.href = url; } });
}

// Reveal-on-scroll for anything with .reveal
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));
