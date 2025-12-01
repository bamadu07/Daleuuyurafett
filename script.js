// Données de l'application
const appState = {
    cart: [],
    products: [
        {
            id: 1,
            name: "Baskets Classiques",
            price: "25,000 FCFA",
            originalPrice: "30,000 FCFA",
            image: "https://images.unsplash.com/photo-1542280756-74b2f55e73ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "baskets",
            badge: "Nouveau",
            rating: 4.5,
            featured: true
        },
        {
            id: 2,
            name: "Sandales Élégantes",
            price: "18,000 FCFA",
            originalPrice: "22,000 FCFA",
            image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "sandales",
            badge: "Promo",
            rating: 4.2,
            featured: true
        },
        {
            id: 3,
            name: "Chaussures de Sport",
            price: "32,000 FCFA",
            originalPrice: "35,000 FCFA",
            image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "sport",
            badge: "Bestseller",
            rating: 4.8,
            featured: true
        },
        {
            id: 4,
            name: "Escarpins Modernes",
            price: "22,000 FCFA",
            image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "escarpins",
            badge: "",
            rating: 4.3,
            featured: false
        },
        {
            id: 5,
            name: "Bottines en Cuir",
            price: "35,000 FCFA",
            image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "bottines",
            badge: "Luxe",
            rating: 4.7,
            featured: false
        },
        {
            id: 6,
            name: "Tongs Décontractées",
            price: "8,000 FCFA",
            image: "https://images.unsplash.com/photo-1560769684-5507c57e5c98?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "tongs",
            badge: "",
            rating: 4.0,
            featured: false
        },
        {
            id: 7,
            name: "Mocassins Élégants",
            price: "28,000 FCFA",
            image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "mocassins",
            badge: "Nouveau",
            rating: 4.6,
            featured: false
        },
        {
            id: 8,
            name: "Baskets Urbaines",
            price: "24,000 FCFA",
            image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
            category: "baskets",
            badge: "",
            rating: 4.4,
            featured: false
        }
    ]
};

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    // Charger le thème sauvegardé
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.querySelector('i').classList.remove('fa-moon');
            themeToggle.querySelector('i').classList.add('fa-sun');
        }
    }
    
    // Initialiser les fonctionnalités selon la page
    initPageFeatures();
    
    // Initialiser les animations
    initAnimations();
});

// Initialiser les fonctionnalités selon la page
function initPageFeatures() {
    const body = document.body;
    
    if (body.classList.contains('page-accueil')) {
        animateStatsCounters();
        displayFeaturedProducts();
    }
    
    if (body.classList.contains('page-produits')) {
        displayAllProducts();
        setupProductFilters();
    }
    
    if (body.classList.contains('page-contact')) {
        setupContactForm();
    }
    
    // Ajouter les écouteurs d'événements pour les boutons "Ajouter au panier"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            addToCart(productId);
        });
    });
}

// Afficher les produits en vedette
function displayFeaturedProducts() {
    const featuredProductsContainer = document.getElementById('featuredProducts');
    if (!featuredProductsContainer) return;
    
    const featuredProducts = appState.products.filter(product => product.featured);
    
    featuredProductsContainer.innerHTML = featuredProducts.map(product => `
        <div class="col-md-4 mb-4 animate-on-scroll">
            <div class="card product-card">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <div class="mb-2">
                        ${getRatingStars(product.rating)}
                    </div>
                    <p class="card-text">Chaussure de qualité supérieure pour un confort optimal toute la journée.</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <p class="fw-bold mb-0">${product.price}</p>
                            ${product.originalPrice ? `<small class="text-muted text-decoration-line-through">${product.originalPrice}</small>` : ''}
                        </div>
                        <button class="btn btn-custom add-to-cart" data-id="${product.id}">
                            <i class="fas fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Afficher tous les produits
function displayAllProducts() {
    const productsContainer = document.getElementById('productsGrid');
    if (!productsContainer) return;
    
    productsContainer.innerHTML = appState.products.map(product => `
        <div class="col-md-6 col-lg-4 mb-4 animate-on-scroll" data-category="${product.category}">
            <div class="card product-card">
                ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <div class="mb-2">
                        ${getRatingStars(product.rating)}
                    </div>
                    <p class="card-text">Chaussure de qualité supérieure pour un confort optimal toute la journée.</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <p class="fw-bold mb-0">${product.price}</p>
                            ${product.originalPrice ? `<small class="text-muted text-decoration-line-through">${product.originalPrice}</small>` : ''}
                        </div>
                        <button class="btn btn-custom add-to-cart" data-id="${product.id}">
                            <i class="fas fa-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Configurer les filtres de produits
function setupProductFilters() {
    // Filtre par catégorie
    document.querySelectorAll('.category-list li').forEach(item => {
        item.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Mettre à jour l'élément actif
            document.querySelectorAll('.category-list li').forEach(li => {
                li.classList.remove('active');
            });
            this.classList.add('active');
            
            // Filtrer les produits
            filterProductsByCategory(category);
        });
    });
    
    // Filtre par prix
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    
    if (priceRange && priceValue) {
        priceRange.addEventListener('input', function() {
            const value = parseInt(this.value);
            priceValue.textContent = value.toLocaleString() + ' FCFA';
            filterProductsByPrice(value);
        });
    }
    
    // Recherche
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            filterProductsBySearch(this.value);
        });
    }
}

// Filtrer les produits par catégorie
function filterProductsByCategory(category) {
    const products = document.querySelectorAll('#productsGrid [data-category]');
    
    products.forEach(product => {
        if (category === 'all' || product.getAttribute('data-category') === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Filtrer les produits par prix
function filterProductsByPrice(maxPrice) {
    // Implémentation simplifiée - dans une vraie application, 
    // vous voudriez stocker les prix comme des nombres pour faciliter la comparaison
    console.log('Filtrage par prix:', maxPrice);
}

// Filtrer les produits par recherche
function filterProductsBySearch(searchTerm) {
    const products = document.querySelectorAll('#productsGrid .card-title');
    
    products.forEach(title => {
        const productCard = title.closest('[data-category]');
        const productName = title.textContent.toLowerCase();
        
        if (productName.includes(searchTerm.toLowerCase())) {
            productCard.style.display = 'block';
        } else {
            productCard.style.display = 'none';
        }
    });
}

// Configurer le formulaire de contact
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les valeurs du formulaire
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            
            // Simulation d'envoi
            showNotification(`Merci ${name}! Votre message "${subject}" a été envoyé.`);
            
            // Réinitialiser le formulaire
            this.reset();
        });
    }
}

// Animer les compteurs de statistiques
function animateStatsCounters() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-count'));
        animateValue(stat, 0, target, 2000);
    });
}

// Initialiser les animations au défilement
function initAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, delay);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Ajouter au panier
function addToCart(productId) {
    const product = appState.products.find(p => p.id == productId);
    if (product) {
        appState.cart.push(product);
        showNotification(`${product.name} ajouté au panier!`);
        
        // Mettre à jour le badge du panier
        const cartBadge = document.getElementById('cartCount');
        if (cartBadge) {
            cartBadge.textContent = appState.cart.length;
        }
    }
}

// Afficher une notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
}

// Animer une valeur numérique
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Générer les étoiles de notation
function getRatingStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let stars = '';
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star text-warning"></i>';
    }
    
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt text-warning"></i>';
    }
    
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star text-warning"></i>';
    }
    
    return stars;
}

// Basculer le thème
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const icon = this.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                showNotification('Mode sombre activé');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                showNotification('Mode clair activé');
            }
            
            // Sauvegarder la préférence de thème
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });
    }
});