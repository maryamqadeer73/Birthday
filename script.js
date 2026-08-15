/* =========================================================
   BIRTHDAY WEBSITE — SCRIPT
   ========================================================= */

/* -------------------------------
   1. CONFIGURATION — edit here!
   ------------------------------- */
const birthdayConfig = {
  friendName: "Usman",
  age: 22, // set to null to hide the age line entirely
  shoppingBudget: 10000,
  products: [
    { id: "shirt",     icon: "👕", name: "Cool Shirt",     price: 3500 },
    { id: "sneakers",  icon: "👟", name: "Sneakers",       price: 8999 },
    { id: "watch",     icon: "⌚", name: "Watch",           price: 6500 },
    { id: "headphones",icon: "🎧", name: "Headphones",     price: 5500 },
    { id: "gaming",    icon: "🎮", name: "Gaming Stuff",   price: 7200 },
    { id: "snacks",    icon: "🍔", name: "Snacks",         price: 1200 },
    { id: "cap",       icon: "🧢", name: "Cap",            price: 1500 },
    { id: "backpack",  icon: "🎒", name: "Backpack",       price: 4200 },
    { id: "chocolate", icon: "🍫", name: "Chocolate",      price: 800 },
    { id: "mystery",   icon: "🎁", name: "Mystery Item",   price: 2999 },
  ],
};

/* -------------------------------
   2. SCENE NAVIGATION
   ------------------------------- */
const TOTAL_SCENES = 8;
let currentScene = 1;

const dotsWrap = document.getElementById("progressDots");
for (let i = 1; i <= TOTAL_SCENES; i++) {
  const d = document.createElement("div");
  d.className = "dot" + (i === 1 ? " active" : "");
  d.dataset.scene = i;
  dotsWrap.appendChild(d);
}

function updateDots() {
  document.querySelectorAll(".progress-dots .dot").forEach((d) => {
    d.classList.toggle("active", Number(d.dataset.scene) === currentScene);
  });
}

function goToScene(n) {
  const current = document.querySelector(".scene.active");
  const next = document.querySelector(`.scene[data-scene="${n}"]`);
  if (!next) return;
  if (current) current.classList.remove("active");
  next.classList.add("active");
  currentScene = n;
  updateDots();
  window.scrollTo({ top: 0, behavior: "smooth" });
  onSceneEnter(n);
}

/* run scene-specific setup the first (and only) time it's entered */
const sceneVisited = {};
function onSceneEnter(n) {
  if (sceneVisited[n]) return;
  sceneVisited[n] = true;
  if (n === 1) runScene1();
  if (n === 2) runScene2();
  if (n === 3) runScene3();
  if (n === 4) runScene4();
  if (n === 5) runScene5();
  if (n === 6) runScene6();
  if (n === 7) runScene7();
  if (n === 8) runScene8();
}

/* -------------------------------
   3. CONFETTI ENGINE (lightweight canvas)
   ------------------------------- */
const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");
let particles = [];
let confettiRunning = false;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const confettiColors = ["#F3B8C6", "#F7D978", "#A9C7D8", "#C8B8DD", "#F7C7A8"];

function burstConfetti(count = 60) {
  if (reducedMotion) return;
  count = Math.min(count, 80); // keep it light
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 100,
      r: 4 + Math.random() * 5,
      color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
      speedY: 2 + Math.random() * 3,
      speedX: (Math.random() - 0.5) * 3,
      rotation: Math.random() * 360,
      spin: (Math.random() - 0.5) * 8,
      shape: Math.random() > 0.5 ? "circle" : "rect",
      life: 0,
    });
  }
  if (!confettiRunning) {
    confettiRunning = true;
    requestAnimationFrame(animateConfetti);
  }
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    p.x += p.speedX;
    p.y += p.speedY;
    p.rotation += p.spin;
    p.life++;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.fillStyle = p.color;
    if (p.shape === "circle") {
      ctx.beginPath();
      ctx.arc(0, 0, p.r, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
    }
    ctx.restore();
  });
  particles = particles.filter((p) => p.y < canvas.height + 40 && p.life < 400);
  if (particles.length > 0) {
    requestAnimationFrame(animateConfetti);
  } else {
    confettiRunning = false;
  }
}

/* -------------------------------
   4. MUSIC TOGGLE
   ------------------------------- */
const musicBtn = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");
let musicOn = false;

musicBtn.addEventListener("click", () => {
  musicOn = !musicOn;
  if (musicOn) {
    bgMusic.play().catch(() => {
      /* file may be missing — fail silently, site still works */
    });
    musicBtn.classList.add("playing");
    musicBtn.textContent = "🔊";
  } else {
    bgMusic.pause();
    musicBtn.classList.remove("playing");
    musicBtn.textContent = "🎵";
  }
});

/* -------------------------------
   5. SCENE 1 — INTRO
   ------------------------------- */
function runScene1() {
  const lines = document.querySelectorAll("#introTextStack .reveal-line");
  const btn = document.getElementById("toScene2");
  let delay = 300;
  lines.forEach((line, i) => {
    setTimeout(() => {
      line.classList.add("shown");
      if (i === lines.length - 1) {
        setTimeout(() => btn.classList.remove("hidden"), 500);
      }
    }, delay);
    delay += i === lines.length - 2 ? 1100 : 900;
  });
}

document.getElementById("toScene2").addEventListener("click", () => {
  burstConfetti(50);
  goToScene(2);
});

/* -------------------------------
   6. SCENE 2 — BIRTHDAY REVEAL
   ------------------------------- */
function runScene2() {
  const headline = document.getElementById("birthdayHeadline");
  const text = `HAPPY BIRTHDAY, ${birthdayConfig.friendName}🎉`;
  headline.innerHTML = "";
  [...text].forEach((ch, i) => {
    const span = document.createElement("span");
    span.className = "letter";
    span.textContent = ch === " " ? "\u00A0" : ch;
    span.style.animationDelay = `${0.25 + i * 0.035}s`;
    headline.appendChild(span);
  });

  const ageEl = document.getElementById("ageDisplay");
  const levelLine = ageEl.closest(".level-line");
  if (birthdayConfig.age === null || birthdayConfig.age === undefined) {
    levelLine.style.display = "none";
  } else {
    ageEl.textContent = birthdayConfig.age;
  }

  burstConfetti(40);
}

document.getElementById("noiseBtn").addEventListener("click", () => {
  burstConfetti(90);
  const cake = document.getElementById("birthdayCake");
  cake.style.animation = "none";
  void cake.offsetWidth;
  cake.style.animation = "cakePop 0.5s ease, candleFlicker 0.4s ease-in-out 5";
  document.querySelectorAll(".balloon").forEach((b, i) => {
    b.style.animation = "none";
    void b.offsetWidth;
    b.style.animation = `floatY ${0.6 + i * 0.1}s ease-in-out 4`;
  });
  setTimeout(() => goToScene(3), 1400);
});

/* -------------------------------
   7. SCENE 3 — FRIENDSHIP MESSAGE
   ------------------------------- */
function runScene3() {
  document.querySelectorAll("#floatCards .fcard").forEach((card, i) => {
    card.style.animationDelay = `${i * 0.15}s`;
  });

  const warmLines = document.querySelectorAll("#s3MessageBlock .warm-line");
  const jokeLines = document.querySelectorAll("#s3MessageBlock .joke-line");
  const btn = document.getElementById("toScene4");

  let delay = 800;
  warmLines.forEach((line) => {
    setTimeout(() => line.classList.add("shown"), delay);
    delay += 1000;
  });
  jokeLines.forEach((line, i) => {
    setTimeout(() => line.classList.add("shown"), delay);
    delay += 900;
    if (i === jokeLines.length - 1) {
      setTimeout(() => btn.classList.remove("hidden"), delay);
    }
  });
}

document.getElementById("toScene4").addEventListener("click", () => goToScene(4));

/* -------------------------------
   8. SCENE 4 — SHOPPING REVEAL
   ------------------------------- */
function runScene4() {
  /* animations trigger via CSS on scene entry */
}

document.getElementById("toScene5").addEventListener("click", () => goToScene(5));

/* -------------------------------
   9. SCENE 5 — INTERACTIVE SHOPPING
   ------------------------------- */
const cart = {}; // id -> qty
let discountUnlocked = false;

function formatRs(n) {
  return "Rs. " + n.toLocaleString("en-IN");
}

function runScene5() {
  document.getElementById("budgetTotal").textContent =
    birthdayConfig.shoppingBudget.toLocaleString("en-IN");
  renderShopGrid();
  renderCart();
}

function renderShopGrid() {
  const grid = document.getElementById("shopGrid");
  grid.innerHTML = "";
  birthdayConfig.products.forEach((p) => {
    const card = document.createElement("div");
    card.className = "shop-card";
    card.innerHTML = `
      <div class="icon">${p.icon}</div>
      <div class="name">${p.name}</div>
      <div class="price">${formatRs(p.price)}</div>
      <button class="add-btn" data-id="${p.id}">ADD TO CART 🛒</button>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll(".add-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => addToCart(btn.dataset.id, e));
  });
}

function addToCart(id, event) {
  const product = birthdayConfig.products.find((p) => p.id === id);
  if (!product) return;

  cart[id] = (cart[id] || 0) + 1;

  // flying animation
  const btn = event.currentTarget;
  const rect = btn.getBoundingClientRect();
  const cartPanel = document.getElementById("cartPanel");
  const cartRect = cartPanel.getBoundingClientRect();
  const flyer = document.createElement("div");
  flyer.className = "flying-item";
  flyer.textContent = product.icon;
  flyer.style.left = rect.left + rect.width / 2 + "px";
  flyer.style.top = rect.top + "px";
  document.body.appendChild(flyer);
  requestAnimationFrame(() => {
    flyer.style.left = cartRect.left + cartRect.width / 2 + "px";
    flyer.style.top = cartRect.top + 20 + "px";
    flyer.style.transform = "scale(0.3)";
    flyer.style.opacity = "0.3";
  });
  setTimeout(() => flyer.remove(), 750);

  renderCart();
}

function removeFromCart(id) {
  if (!cart[id]) return;
  cart[id] -= 1;
  if (cart[id] <= 0) delete cart[id];
  renderCart();
}

function getSubtotal() {
  return Object.entries(cart).reduce((sum, [id, qty]) => {
    const p = birthdayConfig.products.find((pr) => pr.id === id);
    return sum + (p ? p.price * qty : 0);
  }, 0);
}

function renderCart() {
  const itemsWrap = document.getElementById("cartItems");
  const countEl = document.getElementById("cartCount");
  const subtotalEl = document.getElementById("subtotalVal");
  const finalTotalEl = document.getElementById("finalTotalVal");
  const discountRow = document.getElementById("discountRow");
  const discountVal = document.getElementById("discountVal");
  const unlockBtn = document.getElementById("unlockDiscountBtn");

  const entries = Object.entries(cart);
  const totalCount = entries.reduce((s, [, qty]) => s + qty, 0);
  countEl.textContent = `(${totalCount})`;

  if (entries.length === 0) {
    itemsWrap.innerHTML = `<p class="cart-empty">Cart's empty... for now. 👀</p>`;
  } else {
    itemsWrap.innerHTML = "";
    entries.forEach(([id, qty]) => {
      const p = birthdayConfig.products.find((pr) => pr.id === id);
      const line = document.createElement("div");
      line.className = "cart-line";
      line.innerHTML = `
        <span>${p.icon} ${p.name} ${qty > 1 ? `x${qty}` : ""}</span>
        <span>${formatRs(p.price * qty)} <button class="remove-btn" data-id="${id}">✕</button></span>
      `;
      itemsWrap.appendChild(line);
    });
    itemsWrap.querySelectorAll(".remove-btn").forEach((b) => {
      b.addEventListener("click", () => removeFromCart(b.dataset.id));
    });
  }

  const subtotal = getSubtotal();
  subtotalEl.textContent = formatRs(subtotal);

  const budget = birthdayConfig.shoppingBudget;
  const remaining = budget - subtotal;
  const remainingEl = document.getElementById("budgetRemaining");
  remainingEl.textContent = formatRs(remaining);
  remainingEl.classList.toggle("negative", remaining < 0);

  const fill = document.getElementById("budgetFill");
  const pct = Math.min((subtotal / budget) * 100, 100);
  fill.style.width = pct + "%";
  fill.classList.toggle("over", subtotal > budget);

  updateWalletMessage(subtotal, budget, totalCount);

  if (discountUnlocked) {
    const discount = subtotal;
    discountVal.textContent = "- " + formatRs(discount);
    discountRow.classList.remove("hidden");
    finalTotalEl.textContent = "Rs. 0 😂";
  } else {
    discountRow.classList.add("hidden");
    finalTotalEl.textContent = formatRs(subtotal);
  }

  unlockBtn.disabled = totalCount < 3 || discountUnlocked;
  unlockBtn.textContent = discountUnlocked
    ? "DISCOUNT UNLOCKED 🎉"
    : totalCount < 3
    ? `ADD ${3 - totalCount} MORE FOR DISCOUNT`
    : "UNLOCK BIRTHDAY DISCOUNT 🎉";
}

let walletStage = 0;
function updateWalletMessage(subtotal, budget, count) {
  const msgEl = document.getElementById("walletMsg");
  if (subtotal <= budget) {
    msgEl.textContent = "";
    walletStage = 0;
    return;
  }
  const over = subtotal - budget;
  if (over > 0 && walletStage < 1) {
    walletStage = 1;
    msgEl.textContent = "UMM... BHAI 😭 YOUR WALLET IS FIGHTING FOR ITS LIFE.";
  } else if (over > budget * 0.5 && walletStage < 2) {
    walletStage = 2;
    msgEl.textContent = "PLEASE STOP. 😭";
  } else if (over > budget && walletStage < 3) {
    walletStage = 3;
    msgEl.textContent = "THIS WAS SUPPOSED TO BE A BIRTHDAY WEBSITE, NOT A BANKRUPTCY SIMULATOR. 😂";
  } else if (walletStage >= 1) {
    // keep last message displayed, retrigger shake
    msgEl.style.animation = "none";
    void msgEl.offsetWidth;
    msgEl.style.animation = "shake 0.4s ease";
  }
}

document.getElementById("unlockDiscountBtn").addEventListener("click", () => {
  discountUnlocked = true;
  renderCart();
  burstConfetti(50);

  const subtotal = getSubtotal();
  document.getElementById("dTotal").textContent = formatRs(subtotal);
  document.getElementById("dDiscount").textContent = "- " + formatRs(subtotal);
  document.getElementById("discountReveal").classList.remove("hidden");
  document.getElementById("discountReveal").scrollIntoView({ behavior: "smooth", block: "center" });
});

document.getElementById("toScene6").addEventListener("click", () => goToScene(6));

/* -------------------------------
   10. SCENE 6 — THE GIFT
   ------------------------------- */
function runScene6() {}

document.getElementById("openGiftBtn").addEventListener("click", function () {
  const box = document.getElementById("giftBox");
  const sparkles = document.getElementById("giftSparkles");
  const contents = document.getElementById("giftContents");

  box.classList.add("opened");
  sparkles.classList.remove("hidden");
  burstConfetti(70);
  this.classList.add("hidden");

  setTimeout(() => {
    contents.classList.remove("hidden");
    document.querySelectorAll(".gift-word").forEach((w, i) => {
      w.style.animationDelay = `${i * 0.25}s`;
    });
    contents.scrollIntoView({ behavior: "smooth", block: "center" });
  }, 500);
});

document.getElementById("toScene7").addEventListener("click", () => goToScene(7));

/* -------------------------------
   11. SCENE 7 — HEARTFELT MESSAGE
   ------------------------------- */
function runScene7() {
  const lines = document.querySelectorAll("#heartfeltLines p");
  const shout = document.querySelector(".final-shout");
  const btn = document.getElementById("toScene8");
  let delay = 400;
  lines.forEach((line) => {
    setTimeout(() => line.classList.add("shown"), delay);
    delay += 750;
  });
  setTimeout(() => {
    shout.classList.add("shown");
    burstConfetti(40);
    setTimeout(() => btn.classList.remove("hidden"), 500);
  }, delay);
}

document.getElementById("toScene8").addEventListener("click", () => goToScene(8));

/* -------------------------------
   12. SCENE 8 — FINAL TROLL
   ------------------------------- */
function runScene8() {
  const stage1 = document.getElementById("trollStage1");
  const stage2 = document.getElementById("trollStage2");
  setTimeout(() => {
    stage1.classList.add("hidden");
    stage2.classList.remove("hidden");
    burstConfetti(100);
  }, 3200);
}

document.getElementById("replayBtn").addEventListener("click", () => {
  location.reload();
});

/* -------------------------------
   13. INIT
   ------------------------------- */
updateDots();
onSceneEnter(1);
