// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

// Data grid animation
const gridCells = document.querySelectorAll('.grid-cell');
const activeCells = document.querySelectorAll('.grid-cell.active');

function animateGrid() {
    const allCells = [...gridCells];
    const randomIndex = Math.floor(Math.random() * allCells.length);
    allCells[randomIndex].classList.toggle('active');
}

setInterval(animateGrid, 2000);

// Intersection observer for fade-in
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Background particle network
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
const particles = [];
const PARTICLE_COUNT = 50;
const CONNECTION_DISTANCE = 150;

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = document.documentElement.scrollHeight;
}

function createParticle() {
    return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1
    };
}

function initParticles() {
    particles.length = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle());
    }
}

function drawParticle(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(34, 211, 238, ${p.opacity})`;
    ctx.fill();
}

function drawConnection(p1, p2, dist) {
    const opacity = (1 - dist / CONNECTION_DISTANCE) * 0.12;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.strokeStyle = `rgba(34, 211, 238, ${opacity})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
}

function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        drawParticle(p);

        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < CONNECTION_DISTANCE) {
                drawConnection(p, p2, dist);
            }
        }
    }

    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    resize();
    initParticles();
});

resize();
initParticles();
animate();

// Recalc canvas height on scroll (content may shift)
let resizeTimer;
window.addEventListener('scroll', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const newHeight = document.documentElement.scrollHeight;
        if (newHeight !== height) {
            canvas.height = newHeight;
            height = newHeight;
        }
    }, 250);
});