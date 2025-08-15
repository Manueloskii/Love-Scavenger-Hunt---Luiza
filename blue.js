(() => {
  const yesBtn = document.getElementById('blueYes');
  const noBtn = document.getElementById('blueNo');

  noBtn?.addEventListener('click', () => {
    if (!noBtn) return;
    noBtn.textContent = 'Yes';
    noBtn.id = 'blueYes2';
    noBtn.classList.remove('btn-no');
    noBtn.classList.add('btn-yes');
  });

  function goFinal() {
    window.location.href = 'final.html';
  }

  yesBtn?.addEventListener('click', goFinal);
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;
    if (target.id === 'blueYes2') {
      goFinal();
    }
  });
})();


