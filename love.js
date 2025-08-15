(() => {
  const btnNo = document.getElementById('btnNo');
  const btnYes = document.getElementById('btnYes');
  const container = document.querySelector('.love');
  const heart = document.querySelector('.big-heart');

  function teleportNoButton() {
    if (!btnNo || !container) return;
    const area = container.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();

    const maxLeft = Math.max(0, area.width - btnRect.width - 20);
    const maxTop = Math.max(0, area.height - btnRect.height - 20);

    const left = Math.random() * maxLeft + 10;
    const top = Math.random() * maxTop + 10;

    btnNo.style.position = 'absolute';
    btnNo.style.left = `${left}px`;
    btnNo.style.top = `${top}px`;
  }

  btnNo?.addEventListener('mouseenter', teleportNoButton);
  btnNo?.addEventListener('click', teleportNoButton);

  btnYes?.addEventListener('click', (e) => {
    if (!heart) return;
    e.preventDefault();
    heart.classList.add('grow');
    // Navigate after animation ends
    setTimeout(() => {
      window.location.href = 'blue.html';
    }, 820);
  });
})();


