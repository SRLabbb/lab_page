// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const isIndexPage = currentPage === 'index.html';

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        const href = item.getAttribute('href');
        if (
            (!isIndexPage && href === currentPage) ||
            (isIndexPage && (
                href === `#${current}` ||
                href === `${currentPage}#${current}` ||
                href === `index.html#${current}` ||
                (current === '' && href === currentPage)
            ))
        ) {
            item.classList.add('active');
        }
    });
});

navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPage) {
        item.classList.add('active');
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .member-card, .pub-item, .achievement-item').forEach(el => {
    observer.observe(el);
});

// Wave animation on canvas
const canvas = document.getElementById('waveCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const waves = [];
    const waveCount = 3;
    for (let i = 0; i < waveCount; i++) {
        waves.push({
            y: canvas.height / 2,
            length: 0.01 + i * 0.002,
            amplitude: 50 + i * 20,
            frequency: 0.01 + i * 0.005,
            phase: i * Math.PI / 2
        });
    }

    let increment = 0;

    function animate() {
        ctx.fillStyle = 'rgba(10, 10, 26, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        waves.forEach((wave, index) => {
            ctx.beginPath();
            ctx.moveTo(0, canvas.height / 2);

            for (let x = 0; x < canvas.width; x++) {
                const y = wave.y + Math.sin(x * wave.length + increment + wave.phase) * wave.amplitude;
                ctx.lineTo(x, y);
            }

            const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
            gradient.addColorStop(0, 'rgba(91, 132, 215, 0.3)');
            gradient.addColorStop(1, 'rgba(136, 167, 221, 0.18)');

            ctx.strokeStyle = gradient;
            ctx.lineWidth = 2;
            ctx.stroke();
        });

        increment += 0.02;
        requestAnimationFrame(animate);
    }

    animate();
}
