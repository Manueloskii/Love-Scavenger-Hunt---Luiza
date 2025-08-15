(() => {
  const ANSWER_NAME = 'Royal blue';
  const ANSWER_HEX = '#4169E1';

  const PALETTE = [
    ['Crimson', '#DC143C'],
    ['Coral', '#FF7F50'],
    ['Forest green', '#228B22'],
    ['Gold', '#FFD700'],
    ['Hot pink', '#FF69B4'],
    ['Indigo', '#4B0082'],
    ['Lavender', '#E6E6FA'],
    ['Lime green', '#32CD32'],
    ['Medium turquoise', '#48D1CC'],
    ['Orange red', '#FF4500'],
    ['Plum', '#DDA0DD'],
    ['Salmon', '#FA8072'],
    ['Slate blue', '#6A5ACD'],
    ['Teal', '#008080'],
    ['Tomato', '#FF6347'],
    ['Violet', '#EE82EE'],
    ['Midnight blue', '#191970'],
    ['Sea green', '#2E8B57'],
    ['Chocolate', '#D2691E'],
    ['Deep pink', '#FF1493'],
    ['Dodger blue', '#1E90FF'],
    ['Peru', '#CD853F'],
    ['Sienna', '#A0522D'],
    ['Sky blue', '#87CEEB'],
    ['Steel blue', '#4682B4'],
    ['Spring green', '#00FF7F'],
    ['Turquoise', '#40E0D0'],
    ['Dark khaki', '#BDB76B']
  ];

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function pickRandomColors(count) {
    const pool = [...PALETTE];
    shuffle(pool);
    return pool.slice(0, count);
  }

  function hexToRgb(hex) {
    const h = hex.replace('#', '');
    const bigint = parseInt(h.length === 3 ? h.split('').map(c => c + c).join('') : h, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255
    };
  }

  function luminance(hex) {
    const { r, g, b } = hexToRgb(hex);
    const srgb = [r, g, b].map(v => v / 255).map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
    return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
  }

  function textColorOn(bgHex) {
    return luminance(bgHex) > 0.5 ? '#1b1b1b' : '#ffffff';
  }

  function buildChoices() {
    const choicesEl = document.getElementById('choices');
    const messageEl = document.getElementById('message');
    if (!choicesEl) return;

    const others = pickRandomColors(9);
    const all = [...others, [ANSWER_NAME, ANSWER_HEX]];
    shuffle(all);

    for (const [name, hex] of all) {
      const btn = document.createElement('button');
      btn.className = 'choice';
      btn.style.backgroundColor = hex;
      btn.style.color = textColorOn(hex);
      btn.setAttribute('aria-label', name);
      btn.innerHTML = `<span class="label">${name}</span>`;
      btn.addEventListener('click', () => {
        if (name.toLowerCase() === ANSWER_NAME.toLowerCase()) {
          window.location.href = 'pause.html';
        } else {
          if (messageEl) {
            messageEl.textContent = "Either you thought of another person's favorite color or you got a little confused hmm cutie";
            messageEl.classList.add('visible');
          }
          btn.classList.add('shake');
          setTimeout(() => btn.classList.remove('shake'), 600);
        }
      });
      choicesEl.appendChild(btn);
    }
  }

  window.addEventListener('DOMContentLoaded', buildChoices);
})();


