(() => {
  const NUM_HEARTS = 80;
  const colors = ['#ff6b8a', '#ff3d6e', '#ffa3b5', '#ff7a9a', '#ff96ab'];
  const FRICTION = 0.985; // per-frame velocity damping
  const SPEED_MIN_STOP = 0.02; // threshold to consider a heart stopped
  const KICK_BASE_SPEED = 0.9; // base speed after mouse collision
  const KICK_RANDOM = 0.6; // added random speed on top of base

  const hearts = [];
  const mouse = { x: -9999, y: -9999, radius: 80 };

  function createHeart(index) {
    const el = document.createElement('div');
    el.className = 'heart';

    const size = Math.floor(Math.random() * 18) + 12; // 12..30
    const vx = (Math.random() * 0.6 + 0.2) * (Math.random() < 0.5 ? -1 : 1); // px/frame-ish
    const vy = (Math.random() * 0.6 + 0.2) * (Math.random() < 0.5 ? -1 : 1);
    const color = colors[index % colors.length];

    el.style.setProperty('--size', `${size}px`);
    el.style.setProperty('--color', color);

    // Start within viewport
    const x = Math.random() * (window.innerWidth - size);
    const y = Math.random() * (window.innerHeight - size);

    return { el, x, y, vx, vy, size };
  }

  function populateHearts() {
    const container = document.getElementById('hearts-container');
    if (!container) return;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < NUM_HEARTS; i++) {
      const h = createHeart(i);
      hearts.push(h);
      frag.appendChild(h.el);
    }
    container.appendChild(frag);
  }

  function updateHeartPosition(h) {
    // Apply friction so hearts slow down over time
    h.vx *= FRICTION;
    h.vy *= FRICTION;

    // If too slow, stop completely
    const currentSpeed = Math.hypot(h.vx, h.vy);
    if (currentSpeed < SPEED_MIN_STOP) {
      h.vx = 0;
      h.vy = 0;
    }

    h.x += h.vx;
    h.y += h.vy;

    // Window bounds
    const maxX = window.innerWidth - h.size;
    const maxY = window.innerHeight - h.size;
    if (h.x <= 0) { h.x = 0; h.vx *= -1; }
    if (h.x >= maxX) { h.x = maxX; h.vx *= -1; }
    if (h.y <= 0) { h.y = 0; h.vy *= -1; }
    if (h.y >= maxY) { h.y = maxY; h.vy *= -1; }

    // Mouse collision -> repel and slightly randomize angle
    const hx = h.x + h.size / 2;
    const hy = h.y + h.size / 2;
    const dx = hx - mouse.x;
    const dy = hy - mouse.y;
    const distSq = dx * dx + dy * dy;
    const r = mouse.radius + h.size * 0.6;
    if (distSq < r * r) {
      const dist = Math.sqrt(distSq) || 0.001;
      const nx = dx / dist;
      const ny = dy / dist;
      // Give a fresh kick away from the cursor
      const targetSpeed = KICK_BASE_SPEED + Math.random() * KICK_RANDOM;
      h.vx = nx * targetSpeed;
      h.vy = ny * targetSpeed;
      // push out a little so it doesn't get stuck
      const push = (r - dist) * 0.3;
      h.x += nx * push;
      h.y += ny * push;
    }

    h.el.style.transform = `translate(${h.x}px, ${h.y}px) rotate(-45deg)`;
    h.el.style.width = `${h.size}px`;
    h.el.style.height = `${h.size}px`;
  }

  function animate() {
    for (let i = 0; i < hearts.length; i++) {
      updateHeartPosition(hearts[i]);
    }
    requestAnimationFrame(animate);
  }

  function handleMouseMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  function handleMouseLeave() {
    mouse.x = -9999;
    mouse.y = -9999;
  }

  // Optional: smooth scroll for anchor links (kept from previous version)
  function enableSmoothAnchorScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (!targetId) return;
        const targetEl = document.querySelector(targetId);
        if (!targetEl) return;
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  window.addEventListener('resize', () => {
    // Keep hearts inside if window shrinks
    for (let i = 0; i < hearts.length; i++) {
      const h = hearts[i];
      h.x = Math.min(Math.max(0, h.x), Math.max(0, window.innerWidth - h.size));
      h.y = Math.min(Math.max(0, h.y), Math.max(0, window.innerHeight - h.size));
    }
  });

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseleave', handleMouseLeave);

  window.addEventListener('DOMContentLoaded', () => {
    populateHearts();
    enableSmoothAnchorScroll();
    requestAnimationFrame(animate);
  });
})();


