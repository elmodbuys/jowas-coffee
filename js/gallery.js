(function () {
    const flipStage = document.getElementById('flipStage');
    if (!flipStage) return;

    const galleryImages = [
        'images/jowas-1.webp',
        'images/jowas-2.jpg',
        'images/jowas-3.jpg',
        'images/jowas-4.jpg',
        'images/jowas-5.jpg',
        'images/jowas-6.jpg',
        'images/jowas-7.jpg',
        'images/jowas-8.jpg',
        'images/jowas-9.jpg',
        'images/jowas-10.jpg',
        'images/jowas-11.jpg',
        'images/jowas-12.jpg',
        'images/jowas-13.jpg',
        'images/jowas-14.jpg',
        'images/jowas-15.jpg',
        'images/jowas-21.jpg',
        'images/jowas-22.jpg',
        'images/jowas-23.jpg',
        'images/jowas-24.jpg',
        'images/jowas-25.jpg',
        'images/jowas-28.jpg',
        'images/jowas-26.jpg',
        'images/gallery-spices.jpg',
        'images/gallery-spice-salt.jpg',
        'images/gallery-spice-steak.jpg',
        'images/gallery-spice-chicken.jpg',
        'images/gallery-spice-hot-chicken.jpg',
        'images/gallery-spice-seafood.jpg',
        'images/gallery-sauce-hot.jpg',
        'images/gallery-sauce-bbq.jpg',
        'images/gallery-sauces.jpg',
        'images/gallery-spice-sauce.jpg',
        'images/gallery-all.jpg',
        'images/gallery-all-products.jpg',
        'images/jowas-spice-showcase.jpg',
        'images/jowas-spice-showcase1.jpg',
        'images/jowas-spice-spread.jpg',
        'images/jowas-sauce-bbq1.jpg',
        'images/jowas-sauce-pour.jpg',
        'images/jowas-sauce-baste.jpg',
        'images/jowas-truck1.jpeg',
        'images/jowas-truck2.jpeg',
        'images/jowas-truck3.jpeg',
    ];

    galleryImages.forEach((src, i) => {
        const wrap = document.createElement('div');
        wrap.className = 'flipbook-image' + (i === 0 ? ' active' : '');

        const bg = document.createElement('img');
        bg.className = 'flipbook-bg';
        bg.dataset.src = src;
        bg.alt = '';

        const fg = document.createElement('img');
        fg.className = 'flipbook-fg';
        fg.dataset.src = src;
        if (i === 0) { bg.src = src; fg.src = src; }
        fg.alt = '';

        wrap.appendChild(bg);
        wrap.appendChild(fg);
        flipStage.appendChild(wrap);
    });

    const flipImages = document.querySelectorAll('.flipbook-image');
    const flipCount = document.getElementById('flipCount');
    let currentFlip = 0;

    function loadImage(wrap) {
        const bg = wrap.querySelector('.flipbook-bg');
        const fg = wrap.querySelector('.flipbook-fg');
        if (!fg.src && fg.dataset.src) {
            bg.src = bg.dataset.src;
            fg.src = fg.dataset.src;
        }
    }

    function preloadAhead(index) {
        [1, 2].forEach(offset => {
            loadImage(flipImages[(index + offset) % flipImages.length]);
        });
    }

    function showFlip(index) {
        flipImages[currentFlip].classList.remove('active');
        currentFlip = (index + flipImages.length) % flipImages.length;
        loadImage(flipImages[currentFlip]);
        flipImages[currentFlip].classList.add('active');
        flipCount.textContent = `${currentFlip + 1} / ${flipImages.length}`;
        preloadAhead(currentFlip);
    }

    const gallerySection = document.getElementById('gallery');
    if (gallerySection) {
        new IntersectionObserver((entries, observer) => {
            if (entries[0].isIntersecting) {
                preloadAhead(0);
                observer.disconnect();
            }
        }, { rootMargin: '300px' }).observe(gallerySection);
    }

    document.getElementById('flipNext').addEventListener('click', () => showFlip(currentFlip + 1));
    document.getElementById('flipPrev').addEventListener('click', () => showFlip(currentFlip - 1));
})();
