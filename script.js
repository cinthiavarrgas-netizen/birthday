// ================= Gold Dust Canvas =================
const goldCanvas = document.getElementById('goldCanvas');
const ctx = goldCanvas.getContext('2d');

function resizeCanvas() {
    goldCanvas.width  = window.innerWidth;
    goldCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
const PARTICLE_COUNT = 60;

for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
        x:   Math.random() * window.innerWidth,
        y:   Math.random() * window.innerHeight,
        r:   Math.random() * 1.8 + 0.4,
        dx:  (Math.random() - 0.5) * 0.4,
        dy:  -(Math.random() * 0.5 + 0.15),
        o:   Math.random() * 0.6 + 0.2,
        pulse: Math.random() * Math.PI * 2
    });
}

function drawGold() {
    ctx.clearRect(0, 0, goldCanvas.width, goldCanvas.height);
    particles.forEach(p => {
        p.pulse += 0.03;
        const opacity = p.o * (0.5 + 0.5 * Math.sin(p.pulse));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${opacity})`;
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.y < -10) { p.y = goldCanvas.height + 10; p.x = Math.random() * goldCanvas.width; }
        if (p.x < 0)   p.x = goldCanvas.width;
        if (p.x > goldCanvas.width) p.x = 0;
    });
    requestAnimationFrame(drawGold);
}
drawGold();

// ================= Rose Petals =================
const petalsContainer = document.getElementById('petals');
const petalEmojis = ['🌹', '🌸', '🌺', '🌷', '🥀'];

function createPetal() {
    const p = document.createElement('div');
    p.className = 'petal';
    p.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];

    const duration = (Math.random() * 8 + 7).toFixed(1);
    const delay    = (Math.random() * 12).toFixed(1);
    const left     = Math.random() * 100;
    const size     = (Math.random() * 0.8 + 0.7).toFixed(2);

    p.style.left             = left + 'vw';
    p.style.fontSize         = (parseFloat(size) * 1.4) + 'rem';
    p.style.animationDuration = duration + 's';
    p.style.animationDelay   = delay + 's';

    petalsContainer.appendChild(p);
    setTimeout(() => p.remove(), (parseFloat(duration) + parseFloat(delay) + 1) * 1000);
}

// Initial batch + continuous
for (let i = 0; i < 18; i++) createPetal();
setInterval(createPetal, 900);

// ================= Dual Cursor =================
const cursor         = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const isTouchDevice  = window.matchMedia('(hover: none)').matches;

if (cursor && !isTouchDevice) {
    let fx = 0, fy = 0;

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.08 });
        // Follower lags behind
        fx += (e.clientX - fx) * 0.12;
        fy += (e.clientY - fy) * 0.12;
        gsap.to(cursorFollower, { x: e.clientX, y: e.clientY, duration: 0.35 });
    });

    document.querySelectorAll('button, a, .envelope-icon').forEach(el => {
        el.addEventListener('mouseenter', () => cursorFollower.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hovered'));
    });
}

// ================= Countdown to Feb 26 =================
function updateCountdown() {
    const now     = new Date();
    const target  = new Date(now.getFullYear(), 1, 26, 0, 0, 0); // Feb 26

    // If her birthday already passed this year, target next year
    if (now > target) target.setFullYear(target.getFullYear() + 1);

    const diff = target - now;
    if (diff <= 0) {
        document.getElementById('cd-days').textContent  = '00';
        document.getElementById('cd-hours').textContent = '00';
        document.getElementById('cd-mins').textContent  = '00';
        document.getElementById('cd-secs').textContent  = '00';
        return;
    }

    const days  = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins  = Math.floor((diff % 3600000) / 60000);
    const secs  = Math.floor((diff % 60000) / 1000);

    const pad = n => String(n).padStart(2, '0');
    document.getElementById('cd-days').textContent  = pad(days);
    document.getElementById('cd-hours').textContent = pad(hours);
    document.getElementById('cd-mins').textContent  = pad(mins);
    document.getElementById('cd-secs').textContent  = pad(secs);
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ================= Typing Effect =================
const greetingText    = "Hey gorgeous... I made something just for you 💖 Click below to see it!";
const greetingElement = document.querySelector('.greeting');
let charIndex = 0;

function typeGreeting() {
    if (!greetingElement) return;
    if (charIndex < greetingText.length) {
        greetingElement.textContent += greetingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeGreeting, 52);
    }
}

// ================= Floating Elements =================
const floatEmojis = ['💖', '✨', '🌸', '💫', '💕', '🎀', '⭐', '🌹'];

function createFloating() {
    const el = document.createElement('div');
    el.className = 'floating';
    el.textContent = floatEmojis[Math.floor(Math.random() * floatEmojis.length)];
    el.style.left     = Math.random() * 100 + 'vw';
    el.style.top      = '100vh';
    el.style.fontSize = (Math.random() * 16 + 14) + 'px';
    document.body.appendChild(el);

    gsap.to(el, {
        y: -(window.innerHeight + 150),
        x: Math.random() * 70 - 35,
        rotation: Math.random() * 360,
        opacity: 1,
        duration: Math.random() * 5 + 6,
        ease: 'none',
        onComplete: () => el.remove()
    });
}

// ================= Init =================
window.addEventListener('load', () => {
    // Envelope
    gsap.fromTo('.envelope-icon',
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' }
    );

    // Title
    gsap.fromTo('h1',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.4, ease: 'power3.out' }
    );

    // Countdown
    gsap.fromTo('.countdown-wrapper',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.9, ease: 'power3.out' }
    );

    // Button
    gsap.fromTo('.cta-button',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1, delay: 1.3, ease: 'back.out(1.7)' }
    );

    // Start typing after title appears
    setTimeout(typeGreeting, 700);

    // Floating interval
    const floatTimer = setInterval(createFloating, 1400);
    setTimeout(() => clearInterval(floatTimer), 40000);
});

// ================= Button =================
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, { scale: 1.07, duration: 0.3, ease: 'power2.out' });
    });
    button.addEventListener('mouseleave', () => {
        gsap.to(button, { scale: 1, duration: 0.3, ease: 'power2.out' });
    });
    button.addEventListener('click', () => {
        button.disabled = true;
        gsap.to(button, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
        gsap.to('body', {
            opacity: 0, duration: 0.9, delay: 0.15,
            onComplete: () => { window.location.href = 'cause.html'; }
        });
    });
});
