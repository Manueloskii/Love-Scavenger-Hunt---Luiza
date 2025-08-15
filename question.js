(() => {
  // Correct answer in local BR time: 2025-01-20 14:24
  const CORRECT_DATE = '2025-01-20';
  const CORRECT_TIME = '14:24';

  const form = document.getElementById('qa-form');
  const dateInput = document.getElementById('dateInput');
  const timeInput = document.getElementById('timeInput');
  const errorMsg = document.getElementById('errorMsg');
  const overlay = document.getElementById('successOverlay');
  const canvas = document.getElementById('confettiCanvas');

  function showError(msg) {
    if (!errorMsg) return;
    errorMsg.textContent = msg;
    errorMsg.classList.add('visible');
  }

  function clearError() {
    if (!errorMsg) return;
    errorMsg.textContent = '';
    errorMsg.classList.remove('visible');
  }

  function isCorrect() {
    const d = (dateInput?.value || '').trim();
    const t = (timeInput?.value || '').trim();
    return d === CORRECT_DATE && t === CORRECT_TIME;
  }

  function launchConfetti() {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const colors = ['#ffffff', '#e6ffe6', '#ccffcc', '#99ff99', '#66ff66'];
    const NUM = 240;
    for (let i = 0; i < NUM; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: Math.random() * 2 + 2,
        size: Math.random() * 6 + 3,
        color: colors[i % colors.length],
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.2
      });
    }

    function step() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.01; // slight gravity
        p.rot += p.vr;
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
          p.vy = Math.random() * 2 + 2;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
      requestAnimationFrame(step);
    }
    step();
  }

  function showSuccess() {
    if (!overlay) return;
    overlay.hidden = false;
    document.body.style.background = '#18c964';
    document.body.style.color = '#071b09';
    launchConfetti();
    // Proceed to the next round after a brief celebration
    setTimeout(() => { window.location.href = 'suspense.html'; }, 2000);
  }

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    clearError();
    if (isCorrect()) {
      showSuccess();
    } else {
      showError('That doesn\'t look right. Try again, amorzinho.');
    }
  });
})();


