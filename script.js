// ================= Detect mobile =================
const isMobile =
  window.innerWidth <= 500 || window.matchMedia("(hover: none)").matches;

// ================= Gold Dust Canvas =================
const goldCanvas = document.getElementById("goldCanvas");
const ctx = goldCanvas.getContext("2d");

function resizeCanvas() {
  goldCanvas.width = window.innerWidth;
  goldCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Reduce particle count on mobile to save battery/performance
const PARTICLE_COUNT = isMobile ? 25 : 60;
const particles = [];

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.8 + 0.4,
    dx: (Math.random() - 0.5) * 0.4,
    dy: -(Math.random() * 0.5 + 0.15),
    o: Math.random() * 0.6 + 0.2,
    pulse: Math.random() * Math.PI * 2,
  });
}

function drawGold() {
  ctx.clearRect(0, 0, goldCanvas.width, goldCanvas.height);
  particles.forEach((p) => {
    p.pulse += 0.03;
    const opacity = p.o * (0.5 + 0.5 * Math.sin(p.pulse));
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(212, 175, 55, ${opacity})`;
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;

    if (p.y < -10) {
      p.y = goldCanvas.height + 10;
      p.x = Math.random() * goldCanvas.width;
    }
    if (p.x < 0) p.x = goldCanvas.width;
    if (p.x > goldCanvas.width) p.x = 0;
  });
  requestAnimationFrame(drawGold);
}
drawGold();

// ================= Rose Petals =================
const petalsContainer = document.getElementById("petals");
const petalEmojis = ["🌹", "🌸", "🌺", "🌷", "🥀"];

function createPetal() {
  const p = document.createElement("div");
  p.className = "petal";
  p.textContent = petalEmojis[Math.floor(Math.random() * petalEmojis.length)];

  const duration = (Math.random() * 8 + 7).toFixed(1);
  const delay = (Math.random() * 12).toFixed(1);

  p.style.left = Math.random() * 100 + "vw";
  p.style.fontSize = Math.random() * 0.6 + 0.8 + "rem";
  p.style.animationDuration = duration + "s";
  p.style.animationDelay = delay + "s";

//   petalsContainer.appendChild(p);
//   setTimeout(
//     () => p.remove(),
//     (parseFloat(duration) + parseFloat(delay) + 1) * 1000,
//   );
}

// Fewer petals on mobile
const initialPetals = isMobile ? 8 : 18;
const petalInterval = isMobile ? 1800 : 900;
for (let i = 0; i < initialPetals; i++) createPetal();
setInterval(createPetal, petalInterval);

// ================= Dual Cursor (desktop only) =================
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");
const isTouchDevice = window.matchMedia("(hover: none)").matches;

if (cursor && !isTouchDevice) {
  document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.08 });
    gsap.to(cursorFollower, { x: e.clientX, y: e.clientY, duration: 0.35 });
  });

  document.querySelectorAll("button, a, .envelope-icon").forEach((el) => {
    el.addEventListener("mouseenter", () =>
      cursorFollower.classList.add("hovered"),
    );
    el.addEventListener("mouseleave", () =>
      cursorFollower.classList.remove("hovered"),
    );
  });
}

// ================= Countdown to Feb 26 =================
function updateCountdown() {
  const now = new Date();
  const target = new Date(now.getFullYear(), 1, 26, 0, 0, 0);
  if (now > target) target.setFullYear(target.getFullYear() + 1);

  const diff = target - now;
  if (diff <= 0) {
    ["cd-days", "cd-hours", "cd-mins", "cd-secs"].forEach((id) => {
      document.getElementById(id).textContent = "00";
    });
    return;
  }

  const pad = (n) => String(n).padStart(2, "0");
  document.getElementById("cd-days").textContent = pad(
    Math.floor(diff / 86400000),
  );
  document.getElementById("cd-hours").textContent = pad(
    Math.floor((diff % 86400000) / 3600000),
  );
  document.getElementById("cd-mins").textContent = pad(
    Math.floor((diff % 3600000) / 60000),
  );
  document.getElementById("cd-secs").textContent = pad(
    Math.floor((diff % 60000) / 1000),
  );
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ================= Typing Effect =================
const greetingText =
  "Hey gorgeous... I made something just for you 💖 Click below to see it!";
const greetingElement = document.querySelector(".greeting");
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
const floatEmojis = ["💖", "✨", "🌸", "💫", "💕", "🎀", "⭐", "🌹"];

function createFloating() {
  const el = document.createElement("div");
  el.className = "floating";
  el.textContent = floatEmojis[Math.floor(Math.random() * floatEmojis.length)];
  el.style.left = Math.random() * 100 + "vw";
  el.style.top = "100vh";
  el.style.fontSize = Math.random() * 14 + 12 + "px";
  document.body.appendChild(el);

  gsap.to(el, {
    y: -(window.innerHeight + 150),
    x: Math.random() * 60 - 30,
    rotation: Math.random() * 360,
    opacity: 1,
    duration: Math.random() * 5 + 6,
    ease: "none",
    onComplete: () => el.remove(),
  });
}

// ================= Init =================
window.addEventListener("load", () => {
  gsap.fromTo(
    ".envelope-icon",
    { opacity: 0, scale: 0.5 },
    { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" },
  );
  gsap.fromTo(
    "h1",
    { opacity: 0, y: -20 },
    { opacity: 1, y: 0, duration: 1.2, delay: 0.4, ease: "power3.out" },
  );
  gsap.fromTo(
    ".countdown-wrapper",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1, delay: 0.9, ease: "power3.out" },
  );
  gsap.fromTo(
    ".cta-button",
    { opacity: 0, y: 25 },
    { opacity: 1, y: 0, duration: 1, delay: 1.3, ease: "back.out(1.7)" },
  );

  setTimeout(typeGreeting, 700);

  // Fewer floating elements on mobile
  const floatInterval = isMobile ? 2500 : 1400;
  const floatTimer = setInterval(createFloating, floatInterval);
  setTimeout(() => clearInterval(floatTimer), 40000);
});

// ================= Waiting Messages (shown before Feb 26) =================
const waitingMessages = [
  {
    emoji: "🙈",
    text: "Patience, love! The surprise unlocks on your special day Feb 26th 🎂",
  },
  {
    emoji: "🥺",
    text: "Aww, not yet! Good things come to those who wait... just a little longer💕",
  },
  {
    emoji: "🎁",
    text: "The surprise is wrapped and waiting! Feb 26th is almost here 🌸",
  },
  {
    emoji: "😄",
    text: "Someone's excited! Hold on tight it's worth the wait, I promise ✨",
  },
  {
    emoji: "💌",
    text: "Soon, my love! Every second of waiting makes the surprise even sweeter 🍰",
  },
];
let waitMsgIndex = 0;

function showWaitingMessage(button) {
  const old = document.getElementById("wait-toast");
  if (old) old.remove();

  const msg = waitingMessages[waitMsgIndex % waitingMessages.length];
  waitMsgIndex++;

  const toast = document.createElement("div");
  toast.id = "wait-toast";
  toast.innerHTML = `<span class="toast-emoji">${msg.emoji}</span><span class="toast-text">${msg.text}</span>`;

  // Use safe-area-inset-bottom so toast clears the iPhone home indicator
  Object.assign(toast.style, {
    position: "fixed",
    bottom: "max(2rem, calc(env(safe-area-inset-bottom) + 1rem))",
    left: "50%",
    transform: "translateX(-50%) translateY(30px)",
    background:
      "linear-gradient(135deg, rgba(30,5,10,0.97), rgba(90,7,24,0.97))",
    border: "1px solid rgba(212,175,55,0.55)",
    borderRadius: "60px",
    padding: "0.85rem 1.5rem",
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    color: "#F5E08A",
    fontFamily: "'Quicksand', sans-serif",
    fontWeight: "600",
    fontSize: "0.92rem",
    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
    zIndex: "9999",
    maxWidth: "calc(100vw - 2rem)",
    textAlign: "center",
    opacity: "0",
    transition: "opacity 0.4s ease, transform 0.4s ease",
    pointerEvents: "none",
    lineHeight: "1.4",
  });
  toast.querySelector(".toast-emoji").style.cssText =
    "font-size:1.4rem; flex-shrink:0;";
  toast.querySelector(".toast-text").style.cssText = "flex:1;";

  document.body.appendChild(toast);

  gsap.to(button, {
    x: -5,
    duration: 0.07,
    repeat: 5,
    yoyo: true,
    ease: "power1.inOut",
    onComplete: () => gsap.to(button, { x: 0, duration: 0.1 }),
  });

  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateX(-50%) translateY(0)";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(-50%) translateY(20px)";
    setTimeout(() => toast.remove(), 450);
  }, 3500);
}

// ================= Button =================
document.querySelectorAll(".cta-button").forEach((button) => {
  button.addEventListener("mouseenter", () => {
    if (!isTouchDevice)
      gsap.to(button, { scale: 1.07, duration: 0.3, ease: "power2.out" });
  });
  button.addEventListener("mouseleave", () => {
    if (!isTouchDevice)
      gsap.to(button, { scale: 1, duration: 0.3, ease: "power2.out" });
  });

  button.addEventListener("click", () => {
    const now = new Date();
    const isHerDay = now.getMonth() === 1 && now.getDate() >= 26; // Feb 26 onwards

    if (!isHerDay) {
      showWaitingMessage(button);
      return;
    }

    button.disabled = true;
    gsap.to(button, { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1 });
    gsap.to("body", {
      opacity: 0,
      duration: 0.9,
      delay: 0.15,
      onComplete: () => {
        window.location.href = "cause.html";
      },
    });
  });
});
