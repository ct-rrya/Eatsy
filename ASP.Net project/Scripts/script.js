document.addEventListener("DOMContentLoaded", function () {
    const dynamicText = document.querySelector(".loop");
    const messages = ["BUDGET?", "HUNGRY?", "CRAVING?"];
    let index = 0;

    function updateText() {
        dynamicText.style.opacity = 0; // Fade out
        setTimeout(() => {
            dynamicText.textContent = messages[index];
            dynamicText.style.opacity = 1; // Fade in
            index = (index + 1) % messages.length;
        }, 500);
    }

    setInterval(updateText, 4000); // Change text every 4 seconds

    // Function to load restaurant data from JSON
    function loadRestaurants() {
        fetch("Data/restaurants.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to load restaurant data");
                }
                return response.json();
            })
            .then(data => {
                createRestaurantCards(data);
            })
            .catch(error => console.error("Error loading data:", error));
    }

    // Function to create restaurant cards
    function createRestaurantCards(restaurants) {
        const container = document.getElementById('restaurant-container');
        container.innerHTML = '';

        restaurants.forEach(restaurant => {
            const card = document.createElement('div');
            card.className = 'restaurant-card';
            card.innerHTML = `
                <img src="${restaurant.image}" alt="${restaurant.name}" class="restaurant-image">
                <div class="restaurant-details">
                    <a href="#" class="restaurant-name">${restaurant.name}</a>
                    <div class="restaurant-info">
                        <span>${restaurant.distance}</span>
                    </div>
                    <div class="restaurant-tags">
                        ${restaurant.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
            card.addEventListener('click', () => showRestaurantMenu(restaurant));
            container.appendChild(card);
        });

        initSliderNav();
    }

    // Function to initialize slider navigation
    function initSliderNav() {
        const slider = document.getElementById('restaurant-container');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        const scrollAmount = 300; // Approximate width of card + gap

        prevBtn.addEventListener('click', () => {
            slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    // Function to show restaurant menu
    function showRestaurantMenu(restaurant) {
        const searchContainer = document.querySelector('.search-container');
        const menuContainer = document.getElementById('menu-container');
        const menuItemsContainer = document.getElementById('menu-items-container');

        searchContainer.style.display = 'flex';
        menuContainer.style.display = 'block';

        document.querySelector('.menu-heading').textContent = `${restaurant.name} Menu`;

        displayMenuItems(restaurant.menu, menuItemsContainer);

        const searchBar = document.querySelector('.search-bar');
        const searchButton = document.querySelector('.search-button');

        searchBar.value = ''; // Clear previous input

        // Ensure only one event listener is active
        searchButton.replaceWith(searchButton.cloneNode(true));
        document.querySelector('.search-button').addEventListener('click', () => filterMenu(restaurant.menu, menuItemsContainer, searchBar));

        searchBar.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                filterMenu(restaurant.menu, menuItemsContainer, searchBar);
            }
        });
    }

    // Function to filter menu items by budget
    function filterMenu(menu, container, searchBar) {
        const maxBudget = parseFloat(searchBar.value);
        if (!isNaN(maxBudget)) {
            const filteredItems = menu.filter(item => item.price <= maxBudget);
            displayMenuItems(filteredItems, container);
        }
    }

    // Function to display menu items
    function displayMenuItems(items, container) {
        container.innerHTML = '';

        if (items.length === 0) {
            container.innerHTML = '<div class="no-results">No items found within your budget</div>';
            return;
        }

        items.forEach(item => {
            const menuItem = document.createElement('div');
            menuItem.className = 'menu-item';
            menuItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="menu-item-image">
                <div class="menu-item-details">
                    <h4 class="menu-item-name">${item.name}</h4>
                    <p class="menu-item-price">₱${item.price.toFixed(2)}</p>
                    <p class="menu-item-description">${item.description}</p>
                </div>
            `;
            container.appendChild(menuItem);
        });
    }

    // Load restaurants when page is ready
    loadRestaurants();
});
