document.addEventListener("DOMContentLoaded", function () {
    const dynamicText = document.querySelector(".loop");

    const messages = [
        "BUDGET?",
        "HUNGRY?",
        "CRAVING?"
    ];

    let index = 0;

    function updateText() {
        dynamicText.style.opacity = 0; // Fade out

        setTimeout(() => {
            dynamicText.textContent = messages[index];
            dynamicText.style.opacity = 1; // Fade in
            index = (index + 1) % messages.length;
        }, 500); // Delay for smooth fade effect
    }

    setInterval(updateText, 4000); // Changes text every 2 seconds
});


const restaurants = [
    {
        id: 1,
        name: "Tasty Treats",
        image: "images/restaurant1.jpg",
        distance: "1.2 km",
        tags: ["Fast Food", "Budget-friendly", "Takeout"],
        menu: [
            { name: "Burger", price: 45, image: "images/burger.jpg", description: "Juicy beef patty with fresh veggies" },
            { name: "Fries", price: 25, image: "images/fries.jpg", description: "Crispy golden fries" },
            { name: "Soda", price: 20, image: "images/soda.jpg", description: "Refreshing cold drink" },
            { name: "Chicken Meal", price: 65, image: "images/chicken.jpg", description: "Crispy fried chicken with rice" }
        ]
    },
    {
        id: 2,
        name: "Cafe Delight",
        image: "images/restaurant2.jpg",
        distance: "0.8 km",
        tags: ["Cafe", "Breakfast", "Coffee"],
        menu: [
            { name: "Coffee", price: 35, image: "images/coffee.jpg", description: "Freshly brewed coffee" },
            { name: "Sandwich", price: 40, image: "images/sandwich.jpg", description: "Ham and cheese sandwich" },
            { name: "Pancakes", price: 55, image: "images/pancakes.jpg", description: "Fluffy pancakes with syrup" },
            { name: "Croissant", price: 30, image: "images/croissant.jpg", description: "Buttery flaky croissant" }
        ]
    },
    {
        id: 3,
        name: "Pizza Paradise",
        image: "Images/Restaurants/restaurant.jpg",
        distance: "2.5 km",
        tags: ["Pizza", "Italian", "Delivery"],
        menu: [
            { name: "Margherita Slice", price: 50, image: "images/pizza1.jpg", description: "Classic cheese and tomato" },
            { name: "Pepperoni Slice", price: 60, image: "images/pizza2.jpg", description: "Spicy pepperoni pizza" },
            { name: "Garlic Bread", price: 35, image: "images/garlic.jpg", description: "Toasted bread with garlic butter" },
            { name: "Pasta", price: 70, image: "images/pasta.jpg", description: "Tomato pasta with herbs" }
        ]
    },
    {
        id: 4,
        name: "Street Food Corner",
        image: "images/restaurant4.jpg",
        distance: "0.5 km",
        tags: ["Street Food", "Local", "Quick Bite"],
        menu: [
            { name: "Fishball", price: 15, image: "images/fishball.jpg", description: "Deep-fried fish balls with sauce" },
            { name: "Kwek Kwek", price: 20, image: "images/kwek.jpg", description: "Orange battered quail eggs" },
            { name: "Isaw", price: 10, image: "images/isaw.jpg", description: "Grilled chicken intestines" },
            { name: "Watataps Cue", price: 40, image: "images/banana.jpg", description: "Caramelized banana on stick" },
            { name: "Banana Cue", price: 15, image: "images/banana.jpg", description: "Caramelized banana on stick" },
            { name: "Banana Cue", price: 15, image: "images/banana.jpg", description: "Caramelized banana on stick" },
            { name: "Banana Cue", price: 15, image: "images/banana.jpg", description: "Caramelized banana on stick" }
        ]
    },
    {
        id: 5,
        name: "Bulingits ni goper",
        image: "images/restaurant4.jpg",
        distance: "0.5 km",
        tags: ["Street Food", "Local", "Quick Bite"],
        menu: [
            { name: "Fishball", price: 15, image: "images/fishball.jpg", description: "Deep-fried fish balls with sauce" },
            { name: "Kwek Kwek", price: 20, image: "images/kwek.jpg", description: "Orange battered quail eggs" },
            { name: "Isaw", price: 10, image: "images/isaw.jpg", description: "Grilled chicken intestines" },
            { name: "Banana Cue", price: 15, image: "images/banana.jpg", description: "Caramelized banana on stick" }
        ]
    }
    
];


        // Function to create restaurant cards
        function createRestaurantCards() {
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

            // Initialize slider navigation
            initSliderNav();
        }

        // Function to initialize slider navigation
        function initSliderNav() {
            const slider = document.getElementById('restaurant-container');
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            
            // Set scroll amount (width of one card + gap)
            const scrollAmount = 300; // Approximate width of card + gap
            
            prevBtn.addEventListener('click', () => {
                slider.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth'
                });
            });
            
            nextBtn.addEventListener('click', () => {
                slider.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
            });
        }

        // Function to show restaurant menu and search container
        function showRestaurantMenu(restaurant) {
            const searchContainer = document.querySelector('.search-container');
            const menuContainer = document.getElementById('menu-container');
            const menuItemsContainer = document.getElementById('menu-items-container');
            
            // Show search container
            searchContainer.style.display = 'flex';
            
            // Show menu container
            menuContainer.style.display = 'block';
            
            // Update menu heading
            document.querySelector('.menu-heading').textContent = `${restaurant.name} Menu`;
            
            // Display all menu items initially
            displayMenuItems(restaurant.menu, menuItemsContainer);
            
            // Set up search functionality
            const searchBar = document.querySelector('.search-bar');
            const searchButton = document.querySelector('.search-button');
            
            // Clear previous input
            searchBar.value = '';
            
            // Remove previous event listeners
            searchButton.replaceWith(searchButton.cloneNode(true));
            
            // Add new event listener
            document.querySelector('.search-button').addEventListener('click', () => {
                const maxBudget = parseFloat(searchBar.value);
                if (!isNaN(maxBudget)) {
                    const filteredItems = restaurant.menu.filter(item => item.price <= maxBudget);
                    displayMenuItems(filteredItems, menuItemsContainer);
                }
            });
            
            // Also filter on Enter key
            searchBar.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    const maxBudget = parseFloat(searchBar.value);
                    if (!isNaN(maxBudget)) {
                        const filteredItems = restaurant.menu.filter(item => item.price <= maxBudget);
                        displayMenuItems(filteredItems, menuItemsContainer);
                    }
                }
            });
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

        // Initialize the page
        document.addEventListener('DOMContentLoaded', createRestaurantCards);