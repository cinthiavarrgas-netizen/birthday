// ===============================
// Reasons Database
// ===============================
const reasons = [
    {
        text: "You're such a kind and wonderful person, and I feel so lucky to share such a beautiful bond with you. 💖",
        emoji: "🌟",
        gif: "gif1.gif"
    },
    {
        text: "May your day be filled with love, laughter, and endless joy — you deserve every bit of it. 🌸",
        emoji: "💗",
        gif: "gif2.gif"
    },
    {
        text: "Wishing you success, happiness, and everything your heart desires. ✨",
        emoji: "💕",
        gif: "gif1.gif"
    },
    {
        text: "Stay the amazing girl you are — always spreading positivity. Have the happiest year ahead! 🥳",
        emoji: "🌟",
        gif: "gif2.gif"
    }
];

// ===============================
// State
// ===============================
let currentReasonIndex = 0;
let isTransitioning   = false;
let isFinalStage      = false;

const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton    = document.querySelector('.shuffle-button');
const btnLabel         = document.getElementById('btn-label');
const heartPips        = document.querySelectorAll('.heart-pip');


// ===============================
// Custom Cursor
// ===============================
const cursor       = document.querySelector('.custom-cursor');
const isTouchDevice = window.matchMedia('(hover: none)').matches;

if (cursor && !isTouchDevice) {
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.12, ease: 'power2.out' });
    });
    document.querySelectorAll('button, a, .reason-card').forEach(el => {
        el.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 1.6, duration: 0.2 }));
        el.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1, duration: 0.2 }));
    });
}


// ===============================
// Update Heart Progress Bar
// ===============================
function updateHeartBar(index) {
    if (index < heartPips.length) {
        heartPips[index].textContent = '❤️';
        heartPips[index].classList.add('filled');
    }
}


// ===============================
// Create Reason Card
// ===============================
function createReasonCard(reason, cardIndex) {
    const card = document.createElement('div');
    card.className = 'reason-card';

    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `<span class="reason-emoji">${reason.emoji}</span>${reason.text}`;

    const gifOverlay = document.createElement('div');
    gifOverlay.className = 'gif-overlay';
    gifOverlay.innerHTML = `<img src="${reason.gif}" alt="Memory" loading="lazy">`;

    card.appendChild(text);
    card.appendChild(gifOverlay);
    reasonsContainer.appendChild(card);

    // Re-attach cursor events for dynamic cards
    if (cursor && !isTouchDevice) {
        card.addEventListener('mouseenter', () => gsap.to(cursor, { scale: 1.6, duration: 0.2 }));
        card.addEventListener('mouseleave', () => gsap.to(cursor, { scale: 1, duration: 0.2 }));
    }

    gsap.from(card, {
        opacity: 0,
        y: 60,
        scale: 0.92,
        duration: 0.7,
        ease: 'back.out(1.7)'
    });
}


// ===============================
// Display New Reason
// ===============================
function displayNewReason() {
    if (isTransitioning || isFinalStage) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        createReasonCard(reasons[currentReasonIndex], currentReasonIndex);
        updateHeartBar(currentReasonIndex);
        currentReasonIndex++;

        if (currentReasonIndex === reasons.length) {
            setTimeout(transformButtonToFinal, 750);
        }

        createFloatingElement();
        setTimeout(() => { isTransitioning = false; }, 750);
    }
}


// ===============================
// Transform Button to Final Stage
// ===============================
function transformButtonToFinal() {
    isFinalStage = true;

    gsap.to(shuffleButton, {
        scale: 1.12,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
        onComplete: () => {
            btnLabel.textContent = 'Enter Our Storylane 💫';
            shuffleButton.classList.add('story-mode');

            // Gentle pulse to draw attention
            gsap.to(shuffleButton, {
                scale: 1.06,
                duration: 0.85,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }
    });
}


// ===============================
// Button Click
// ===============================
shuffleButton.addEventListener('click', () => {

    if (isFinalStage) {
        shuffleButton.disabled = true;
        gsap.killTweensOf(shuffleButton);
        gsap.to('body', {
            opacity: 0,
            duration: 0.9,
            onComplete: () => { window.location.href = 'last.html'; }
        });
        return;
    }

    gsap.to(shuffleButton, {
        scale: 0.93,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
    });

    displayNewReason();
});


// ===============================
// Floating Elements
// ===============================
const floatEmojis = ['🌸', '✨', '💖', '🦋', '⭐', '💕', '🎀', '🌹'];

function createFloatingElement() {
    const el = document.createElement('div');
    el.className = 'floating';
    el.textContent = floatEmojis[Math.floor(Math.random() * floatEmojis.length)];
    el.style.left     = Math.random() * 100 + 'vw';
    el.style.top      = '100vh';
    el.style.fontSize = (Math.random() * 16 + 14) + 'px';
    document.body.appendChild(el);

    gsap.to(el, {
        y: -(window.innerHeight + 150),
        x: Math.random() * 60 - 30,
        opacity: 1,
        duration: Math.random() * 6 + 6,
        ease: 'none',
        onComplete: () => el.remove()
    });
}

setInterval(createFloatingElement, 2500);
