(function () {
    const shopGrid = document.getElementById('shopGrid');
    if (!shopGrid) return;

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
            description: 'Chicken spice to make every chicken dish or braai tasty every time, versatile on salads. ',
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
            description: 'A lekke salt & pepper mix, a first in South Africa. Very good all types of dishes, a must try',
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

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'shop-item';
        card.innerHTML = `
            <div class="shop-item-image"><img src="${product.image}" alt="${product.name}" loading="lazy"></div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="shop-item-price">R${product.price.toFixed(2)}</p>
            <button class="btn btn-primary snipcart-add-item"
                data-item-id="${product.id}"
                data-item-price="${product.price}"
                data-item-url="/products.json"
                data-item-name="${product.name}">
                Add to cart
            </button>
        `;
        shopGrid.appendChild(card);
    });
})();