window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollTop / docHeight;
    const maxY = window.innerHeight - 32;
    document.getElementById('scrollIcon').style.top = (progress * maxY) + 'px';
});

const galleryImages = [
    'images/jowas-1.jpg',
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
];

const flipStage = document.getElementById('flipStage');
galleryImages.forEach((src, i) => {
    const img = document.createElement('img');
    img.dataset.src = src;
    if (i === 0) img.src = src;
    img.className = 'flipbook-image' + (i === 0 ? ' active ' : '');
    img.alt = '';
    flipStage.appendChild(img);
});

const flipImages = document.querySelectorAll('.flipbook-image');
const flipCount = document.getElementById('flipCount');
let currentFlip = 0;

function loadImage(img) {
    if (!img.src && img.dataset.src) {
        img.src = img.dataset.src;
    }
}

function showFlip(index) {
    flipImages[currentFlip].classList.remove('active');
    currentFlip = (index + flipImages.length) % flipImages.length;
    loadImage(flipImages[currentFlip]);
    flipImages[currentFlip].classList.add('active');
    flipCount.textContent = `${currentFlip + 1} / ${flipImages.length}`;

    const next = flipImages[(currentFlip + 1) % flipImages.length];
    loadImage(next);
}

document.getElementById('flipNext').addEventListener('click', () => showFlip(currentFlip + 1));
document.getElementById('flipPrev').addEventListener('click', () => showFlip(currentFlip - 1));

const products = [
    {
        id: 'coffee-medium-250g',
        name: 'Medium Roast - 250g',
        category: 'coffee',
        price: 170,
        delivery: 100,
        weight: 0.25,
        image: 'images/jowas-250g.jpg',
        description: 'Medium roast, AAA-plus beans sourced from Ethiopia, India, Burundi & Colombia * Delivery R100 ',
    },
    {
        id: 'coffee-medium-1kg',
        name: 'Medium Roast - 1kg',
        category: 'coffee',
        price: 350,
        delivery: 100,
        weight: 0.25,
        image: 'images/jowas-1kg.jpg',
        description: 'Medium roast, AAA-plus beans sourced from Ethiopia, India, Burundi & Colombia * Delivery R100',
    },
    {
        id: 'spicy-juicy-steak',
        name: 'Juicy Steak & Chops Spice',
        category: 'spices',
        price: 25.00,
        weight: 0.1,
        image: 'images/jowas_steak&chops_spice.jpeg',
        description: 'Makes every steak, chop or afval juicy',
    },
    {
        id: 'spice-hot-chicken',
        name: 'Hot Chicken & Chips Spice',
        category: 'spices',
        price: 25.00,
        weight: 0.1,
        image: 'images/jowas_hot_chicken.jpeg',
        description: 'Very hot spice for chicken and chips and for all food. Enjoy the hotness.', 
    },
    {
        id: 'tasty-chicken-spice',
        name: 'Tasty Chicken Spice',
        category: 'spices',
        price: 25.00,
        weight: 0.1,
        image: 'images/jowas_tasty_chicken.jpeg',
        description: 'Chicken spice to make every chicken dish or braai tasty every time, versatile on salads. '
    },
    {
        id: 'fish-seafood-spice',
        name: 'Fish & Seafood Spice',
        category: 'spices',
        price: 25.00,
        weight: 0.1,
        image: 'images/jowas_fish&seafood_spice.jpeg',
        description: 'Fish & Seafood spice',
    },
    {
        id: 'salt-pepper-spice',
        name: 'Lekka Salt and Pepper',
        category: 'spices',
        price: 25.00,
        weight: 0.1,
        image: 'images/jowas_salt&pepper.jpeg',
        description: 'A lekke salt & pepper mix, a first in South Africa. Very good all types of dishes, a must try'
    },
    {
        id: 'hot-spicy-sauce',
        name: 'Hot & Spicy Braai Sauce',
        category: 'sauces',
        price: 30.00,
        weight: 0.5,
        image: 'images/jowas_hot&spicy_sauce.jpeg',
        description: 'A "not too hot" spicy marinade & spicy sauce that adds lots of flavour to your meat',
    },
    {
        id: 'bbq-steak-rib-sauce',
        name: 'BBQ Steak & Rib sauce',
        category: 'sauces',
        price: 30.00,
        weight: 0.5,
        image: 'images/jowas_bbq&steak_sauce.jpeg',
        description: 'A versatile marinade & basting sauce, the more you baste the more flavour you add.',
    },
];

const shopGrid = document.getElementById('shopGrid');
products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'shop-item';
    card.innerHTML = `
    <div class="shop-item-image"><img src="${product.image}" alt="${product.name}"></div>
    <h3>${product.name}</h3>
    <p>${product.description}</p>
    <p class="shop-item-price">R${product.price.toFixed(2)}</p>
    <button class="btn btn-primary snipcart-add-item"
      data-item-id="${product.id}"
      data-item-price="${product.price}"
      data-item-url="/"
      data-item-name="${product.name}">
      Add to cart
    </button>
  `;
  shopGrid.appendChild(card);
});

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