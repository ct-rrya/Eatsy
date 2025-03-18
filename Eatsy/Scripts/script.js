// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Text animation for the looping text
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

    // Initial call and start the interval
    updateText();
    setInterval(updateText, 4000); // Changes text every 4 seconds

    // Food items array with price and image
    const foodItems = [
        { name: "Burger", price: 50, image: "images/burger.jpg", description: "Juicy beef patty with fresh vegetables" },
        { name: "Pizza", price: 120, image: "images/pizza.jpg", description: "Cheesy pizza with various toppings" },
        { name: "Fries", price: 40, image: "images/fries.jpg", description: "Crispy golden fries with seasoning" },
        { name: "Sushi", price: 200, image: "images/sushi.jpg", description: "Fresh sushi rolls with wasabi" },
        { name: "Ice Cream", price: 80, image: "images/ice-cream.jpg", description: "Creamy dessert in various flavors" },
        { name: "Hotdog", price: 60, image: "images/hotdog.jpg", description: "Classic hotdog with condiments" },
        { name: "Sandwich", price: 90, image: "images/sandwich.jpg", description: "Freshly made sandwich with fillings" },
        { name: "Pasta", price: 150, image: "images/pasta.jpg", description: "Italian pasta with rich sauce" }
    ];


    // sample hardcoded restaurnat data
    const restaurants = [
        {
            name: "Lels Yumyum",
            image: "#",
            description: "Home of the yummy",
            tags: ["Burgers", "Fast Food", "estitik"],
            location: "CTU Main Road"
        },
        {
            name: "court 1",
            image: "#",
            description: "estetek court 1",
            tags: ["court1", "crt", "cute"],
            location: "Campus Food Stall"
        },
        {
            name: "court 2",
            image: "#",
            description: "Fresh Shit",
            tags: ["fresh", "fruit", "Healthy"],
            location: "Campus Food Stall"
        },
        {
            name: "Stall ni Ma'am Roca",
            image: "#",
            description: "YAK",
            tags: ["roca", "sheesh", "saging"],
            location: "Campus Food Stall"
        },
        {
            name: "Ice Cream",
            image: "#",
            description: "delisyoso",
            tags: ["ice", "Ice Cream", "cream"],
            location: "Sulod CTU"
        }
    ];

    // Function to handle image errors
    function handleImageError(img) {
        img.onerror = null;
        img.src = `https://via.placeholder.com/150?text=${encodeURIComponent(img.alt)}`;
    }

    // Function to display food items
    function displayFood(filteredItems = foodItems, center = false) {
        const container = document.getElementById("food-container");
        container.innerHTML = "<div class='loading'></div>"; // Show loading indicator

        setTimeout(() => {
            container.innerHTML = ""; // Clear previous results

            if (filteredItems.length === 0) {
                container.innerHTML = "<p>No food items available within this budget!</p>";
                return;
            }

            // Add 'center' class when filtering to center the results
            if (center) {
                container.classList.add("center");
            } else {
                container.classList.remove("center");
            }

            // Create and append food cards dynamically
            filteredItems.forEach(item => {
                const foodCard = document.createElement("div");
                foodCard.classList.add("food-card");

                foodCard.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" onerror="handleImageError(this)" />
                    <h3>${item.name}</h3>
                    <p>Price: ₱${item.price}</p>
                    <p class="description">${item.description}</p>
                `;

                container.appendChild(foodCard);
            });
        }, 500); // Slight delay for loading effect
    }

    // Function to display restaurants
    function displayRestaurants() {
        const container = document.getElementById("restaurant-container");
        if (!container) return;

        // Create and append restaurant cards
        restaurants.forEach(restaurant => {
            const restaurantCard = document.createElement("div");
            restaurantCard.classList.add("restaurant-card");

            // Create tags HTML
            const tagsHTML = restaurant.tags.map(tag =>
                `<span class="restaurant-tag">${tag}</span>`
            ).join('');

            restaurantCard.innerHTML = `
                <img src="${restaurant.image}" alt="${restaurant.name}" onerror="handleImageError(this)" />
                <div class="restaurant-info">
                    <h3>${restaurant.name}</h3>
                    <p>${restaurant.description}</p>
                    <p><strong>Location:</strong> ${restaurant.location}</p>
                    <div class="restaurant-tags">
                        ${tagsHTML}
                    </div>
                </div>
            `;

            // Add click event to redirect to restaurant page
            restaurantCard.addEventListener('click', () => {
                // Encode the restaurant name for the URL
                const restaurantUrl = `restaurant.html?name=${encodeURIComponent(restaurant.name)}`;
                window.location.href = restaurantUrl;
            });

            container.appendChild(restaurantCard);
        });
    }

    // Display food items and restaurants when page loads
    window.onload = () => {
        displayFood();
        displayRestaurants();
    };

    // Event listener for the search button
    const searchButton = document.getElementById("search-button");
    if (searchButton) {
        searchButton.addEventListener("click", () => {
            const budget = document.getElementById("budget-input").value;
            if (budget === "" || isNaN(budget) || budget <= 0) {
                alert("Please enter a valid budget!");
                return;
            }

            // Filter and center matching items
            const filteredItems = foodItems.filter(item => item.price <= parseInt(budget));
            displayFood(filteredItems, true);

            // Scroll to results
            document.querySelector('.results-container').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Event listener for the reset button
    const resetButton = document.getElementById("reset-button");
    if (resetButton) {
        resetButton.addEventListener("click", () => {
            document.getElementById("budget-input").value = "";
            displayFood();
        });
    }

    // to scroll to section to from burger icon
    function scrollToBudget() {
        document.getElementById('budget-section').scrollIntoView({
            behavior: 'smooth'
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});