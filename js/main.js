(function () {
    const icon = document.getElementById('scrollIcon');
    if (!icon) return;

    window.addEventListener('scroll', () => {
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight <= 0) return;
        const progress = window.scrollY / docHeight;
        icon.style.top = (progress * (window.innerHeight - 32)) + 'px';
    });
})();

