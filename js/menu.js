(function () {
    const pages = document.querySelectorAll('#menuFlipStage .menu-page');
    const countEl = document.getElementById('menuFlipCount');
    const prevBtn = document.getElementById('menuFlipPrev');
    const nextBtn = document.getElementById('menuFlipNext');
    if (!pages.length) return;

    let current = 0;
    countEl.textContent = `1 / ${pages.length}`;

    function showPage(index) {
        pages[current].classList.remove('active');
        current = (index + pages.length) % pages.length;
        pages[current].classList.add('active');
        countEl.textContent = `${current + 1} / ${pages.length}`;
    }

    prevBtn.addEventListener('click', () => showPage(current - 1));
    nextBtn.addEventListener('click', () => showPage(current + 1));
})();