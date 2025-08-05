// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    console.log('Products available:', typeof products !== 'undefined');
    
    // Initialize all functions
    loadProducts();
    initScrollEffects();
    initCartFunctionality();
    initSmoothScrolling();
    initLoadingAnimations();
    initSearchFunctionality();
    initFormValidation();
    
    // Update cart count on page load
    updateCartCount();
});

// Load Products
function loadProducts() {
    console.log('Loading products...');
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) {
        console.error('Products grid not found!');
        return;
    }

    // Check if products array exists
    if (!products || !Array.isArray(products)) {
        console.error('Products array not found or invalid!');
        return;
    }

    console.log('Products array:', products);
    
    // Check if products grid is already populated
    if (productsGrid.children.length > 0) {
        console.log('Products grid already has content, skipping load...');
        return;
    }

    const addToCartText = 'شراء الآن';
    
    const productsHTML = products.map(product => {
        const price = product.price.toFixed(2);
        const oldPrice = product.oldPrice ? product.oldPrice.toFixed(2) : null;
        
        return `
            <div class="product-card" data-product-id="${product.id}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <div class="product-price">
                        <span class="price">$${price}</span>
                        ${oldPrice ? `<span class="old-price">$${oldPrice}</span>` : ''}
                    </div>
                    <button class="add-to-cart" data-product-id="${product.id}">${addToCartText}</button>
                </div>
            </div>
        `;
    }).join('');

    console.log('Generated HTML length:', productsHTML.length);
    productsGrid.innerHTML = productsHTML;
    
    // Log success
    console.log('Products loaded successfully!');
    
    // Re-initialize cart functionality after loading products
    setTimeout(() => {
        initCartFunctionality();
    }, 100);
}

// بعد تحميل المنتجات في الصفحة الرئيسية
function updateAddToCartButtonsText() {
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.textContent = 'أضف إلى السلة';
    });
}
document.addEventListener('DOMContentLoaded', updateAddToCartButtonsText);

// Scroll Effects
function initScrollEffects() {
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('section');
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(45, 90, 39, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #2d5a27 0%, #4a7c59 100%)';
            header.style.backdropFilter = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('.category-card, .product-card').forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
}

// Update cart count function
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const savedCart = localStorage.getItem('cart');
        const cart = savedCart ? JSON.parse(savedCart) : [];
        cartCount.textContent = cart.length;
    }
}

// Cart Functionality
function initCartFunctionality() {
    const cartBtn = document.querySelector('.cart-btn');
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    
    // Update cart count first
    updateCartCount();

    // Remove existing event listeners to prevent duplicates
    addToCartBtns.forEach(btn => {
        // Remove existing listeners
        btn.replaceWith(btn.cloneNode(true));
    });

    // Get fresh references after cloning
    const freshAddToCartBtns = document.querySelectorAll('.add-to-cart');

    freshAddToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const productId = parseInt(this.getAttribute('data-product-id'));
            const product = products.find(p => p.id === productId);
            if (!product) return;
            // أضف المنتج للسلة
            const savedCart = localStorage.getItem('cart');
            let cart = savedCart ? JSON.parse(savedCart) : [];
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                originalPrice: product.price,
                description: product.description
            });
            localStorage.setItem('cart', JSON.stringify(cart));
            // حركة المنتج
            const productCard = this.closest('.product-card');
            if (productCard) {
                productCard.style.transition = 'transform 0.3s cubic-bezier(.39,.575,.56,1.000), box-shadow 0.3s';
                productCard.style.transform = 'scale(1.07)';
                productCard.style.boxShadow = '0 8px 32px 0 rgba(124,179,66,0.18)';
                setTimeout(() => {
                    productCard.style.transform = '';
                    productCard.style.boxShadow = '';
                }, 350);
            }
            // إشعار نجاح
            showNotification('تمت إضافة المنتج للسلة بنجاح!', 'success');
            // تحديث عداد السلة
            updateCartCount();
        });
    });

    // Cart button click - show cart modal
    if (cartBtn) {
        // Remove existing listeners
        const newCartBtn = cartBtn.cloneNode(true);
        cartBtn.parentNode.replaceChild(newCartBtn, cartBtn);
        
        newCartBtn.addEventListener('click', () => {
            showCartModal();
        });
    }
}

// Cart Modal Function
function showCartModal() {
    const savedCart = localStorage.getItem('cart');
    const cart = savedCart ? JSON.parse(savedCart) : [];
    
    if (cart.length === 0) {
        const emptyCartText = window.languageManager ? window.languageManager.getText('cart_empty') : 'السلة فارغة';
        showNotification(emptyCartText, 'info');
        return;
    }

    // Group items by ID and calculate quantities
    const groupedCart = {};
    cart.forEach(item => {
        if (groupedCart[item.id]) {
            groupedCart[item.id].quantity += 1;
            const originalPrice = item.originalPrice || item.price;
            groupedCart[item.id].totalPrice = originalPrice * groupedCart[item.id].quantity;
        } else {
            const originalPrice = item.originalPrice || item.price;
            groupedCart[item.id] = {
                ...item,
                quantity: 1,
                totalPrice: originalPrice
            };
        }
    });

    // Calculate total using original prices
    const total = Object.values(groupedCart).reduce((sum, item) => sum + item.totalPrice, 0);

    // Get translated texts
    const cartTitle = window.languageManager ? window.languageManager.getText('cart_title') || 'السلة' : 'السلة';
    const priceText = window.languageManager ? window.languageManager.getText('price') || 'السعر' : 'السعر';
    const totalText = window.languageManager ? window.languageManager.getText('total') || 'المجموع' : 'المجموع';
    const grandTotalText = window.languageManager ? window.languageManager.getText('grand_total') || 'المجموع الكلي' : 'المجموع الكلي';
    const clearCartText = window.languageManager ? window.languageManager.getText('clear_cart') || 'إفراغ السلة' : 'إفراغ السلة';
    const checkoutText = 'شراء الآن';
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'cart-modal';
    modal.innerHTML = `
        <div class="cart-modal-content">
            <div class="cart-modal-header">
                <h3>${cartTitle}</h3>
                <button class="close-cart">&times;</button>
            </div>
            <div class="cart-items">
                ${Object.values(groupedCart).map((item, index) => `
                    <div class="cart-item" data-id="${item.id}">
                        <img src="${item.image}" alt="${item.name}">
                        <div class="cart-item-info">
                            <h4>${item.name}</h4>
                            <p>${priceText}: $${item.originalPrice.toFixed(2)}</p>
                            <div class="quantity-controls">
                                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                                <span class="quantity">${item.quantity}</span>
                                <button class="quantity-btn plus" data-id="${item.id}">+</button>
                            </div>
                            <p class="item-total">${totalText}: $${item.totalPrice.toFixed(2)}</p>
                        </div>
                        <button class="remove-item" data-id="${item.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `).join('')}
            </div>
            <div class="cart-total">
                <h4>${grandTotalText}: $${total.toFixed(2)}</h4>
            </div>
            <div class="cart-actions">
                <button class="clear-cart">${clearCartText}</button>
                <button class="checkout-btn">${checkoutText}</button>
            </div>
        </div>
    `;

    // Add styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    const modalContent = modal.querySelector('.cart-modal-content');
    modalContent.style.cssText = `
        background: white;
        border-radius: 20px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
    `;

    // Add to page
    document.body.appendChild(modal);

    // Close modal
    const closeBtn = modal.querySelector('.close-cart');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Attach event listeners
    attachCartEventListeners(modal, cart);

    // Clear cart
    const clearBtn = modal.querySelector('.clear-cart');
    clearBtn.addEventListener('click', () => {
        localStorage.removeItem('cart');
        updateCartCount();
        modal.remove();
        const clearedText = window.languageManager ? window.languageManager.getText('cart_cleared') : 'تم إفراغ السلة بنجاح';
        showNotification(clearedText, 'success');
    });

    // Checkout
    const checkoutBtn = modal.querySelector('.checkout-btn');
    checkoutBtn.addEventListener('click', () => {
        modal.remove();
        // Redirect to checkout page
        window.location.href = 'checkout.html';
    });
}

// Function to update cart modal
function updateCartModal(modal, cart) {
    if (cart.length === 0) {
        modal.remove();
        const emptyText = window.languageManager ? window.languageManager.getText('cart_empty') : 'السلة فارغة!';
        showNotification(emptyText, 'info');
        return;
    }

    // Group items by ID and calculate quantities
    const groupedCart = {};
    cart.forEach(item => {
        if (groupedCart[item.id]) {
            groupedCart[item.id].quantity += 1;
            const originalPrice = item.originalPrice || item.price;
            groupedCart[item.id].totalPrice = originalPrice * groupedCart[item.id].quantity;
        } else {
            const originalPrice = item.originalPrice || item.price;
            groupedCart[item.id] = {
                ...item,
                quantity: 1,
                totalPrice: originalPrice
            };
        }
    });

    // Calculate total
    const total = Object.values(groupedCart).reduce((sum, item) => sum + item.totalPrice, 0);

    // Get translated texts
    const priceText = window.languageManager ? window.languageManager.getText('price') || 'السعر' : 'السعر';
    const totalText = window.languageManager ? window.languageManager.getText('total') || 'المجموع' : 'المجموع';
    const grandTotalText = window.languageManager ? window.languageManager.getText('grand_total') || 'المجموع الكلي' : 'المجموع الكلي';

    // Update cart items
    const cartItems = modal.querySelector('.cart-items');
    cartItems.innerHTML = Object.values(groupedCart).map((item, index) => `
        <div class="cart-item" data-id="${item.id}">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${priceText}: $${item.originalPrice.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                </div>
                <p class="item-total">${totalText}: $${item.totalPrice.toFixed(2)}</p>
            </div>
            <button class="remove-item" data-id="${item.id}">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');

    // Update total
    const totalElement = modal.querySelector('.cart-total h4');
    totalElement.textContent = `${grandTotalText}: $${total.toFixed(2)}`;

    // Update cart count
    updateCartCount();

    // Re-attach event listeners
    attachCartEventListeners(modal, cart);
}

// Function to attach cart event listeners
function attachCartEventListeners(modal, cart) {
    // Quantity controls functionality
    const quantityBtns = modal.querySelectorAll('.quantity-btn');
    quantityBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const productId = parseInt(btn.dataset.id);
            const isPlus = btn.classList.contains('plus');
            const isMinus = btn.classList.contains('minus');
            
            if (isPlus) {
                // Add one more of this product
                const product = products.find(p => p.id === productId);
                if (product) {
                    cart.push({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        originalPrice: product.price
                    });
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartModal(modal, cart);
                }
            } else if (isMinus) {
                // Remove one of this product
                const productIndex = cart.findIndex(item => item.id === productId);
                if (productIndex !== -1) {
                    cart.splice(productIndex, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    updateCartModal(modal, cart);
                }
            }
        });
    });

    // Remove item functionality
    const removeBtns = modal.querySelectorAll('.remove-item');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const productId = parseInt(btn.dataset.id);
            
            // Remove all instances of this product
            const filteredCart = cart.filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(filteredCart));
            
            // Update modal
            updateCartModal(modal, filteredCart);
            
            const removedText = window.languageManager ? window.languageManager.getText('item_removed') : 'تم إزالة المنتج من السلة';
            showNotification(removedText, 'success');
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    const ctaBtn = document.querySelector('.cta-btn');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // CTA Button - scroll to products
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productsSection = document.querySelector('#products');
            if (productsSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = productsSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Add highlight effect to products section
                productsSection.style.animation = 'highlight 2s ease';
                setTimeout(() => {
                    productsSection.style.animation = '';
                }, 2000);
            }
        });
    }
}

// Loading Animations
function initLoadingAnimations() {
    // Add loading class to elements
            const elementsToAnimate = document.querySelectorAll('.hero-text, .category-card, .product-card');
    
    elementsToAnimate.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
}

// Search Functionality
function initSearchFunctionality() {
    const searchBtn = document.getElementById('searchBtn');
    const searchModal = document.getElementById('searchModal');
    const closeSearch = document.getElementById('closeSearch');
    const searchInput = document.getElementById('searchName');
    const searchResults = document.getElementById('searchResults');
    
    // Open search modal
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            searchModal.classList.add('active');
            searchInput.focus();
        });
    }
    
    // Close search modal
    if (closeSearch) {
        closeSearch.addEventListener('click', () => {
            searchModal.classList.remove('active');
            clearSearchResults();
        });
    }
    
    // Close modal when clicking outside
    if (searchModal) {
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) {
                searchModal.classList.remove('active');
                clearSearchResults();
            }
        });
    }
    
    // Real-time search
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase().trim();
            if (searchTerm.length > 0) {
                performSimpleSearch(searchTerm);
            } else {
                clearSearchResults();
            }
        });
        
        // Search on Enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const searchTerm = e.target.value.toLowerCase().trim();
                if (searchTerm.length > 0) {
                    performSimpleSearch(searchTerm);
                }
            }
        });
    }
}

// Perform simple search
function performSimpleSearch(searchTerm) {
    const searchResults = document.getElementById('searchResults');
    
    if (!products || !Array.isArray(products)) {
        const noProductsText = window.languageManager ? window.languageManager.getText('no_products_available') : 'لا توجد منتجات متاحة';
        searchResults.innerHTML = `<div class="no-results">${noProductsText}</div>`;
        return;
    }
    
    const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
    );
    
    if (filteredProducts.length === 0) {
        const noResultsText = window.languageManager ? window.languageManager.getText('no_products_found') : 'لم يتم العثور على منتجات';
        searchResults.innerHTML = `<div class="no-results">${noResultsText}</div>`;
        return;
    }
    
    const addToCartText = window.languageManager ? window.languageManager.getText('add_to_cart') : 'أضف للسلة';
    
    const resultsHTML = filteredProducts.map(product => `
        <div class="search-result-item" data-product-id="${product.id}">
            <img src="${product.image}" alt="${product.name}">
            <div class="search-result-info">
                <h4>${product.name}</h4>
                <p>$${product.price.toFixed(2)}</p>
            </div>
            <button class="search-result-add" data-product-id="${product.id}">
                ${addToCartText}
            </button>
        </div>
    `).join('');
    
    searchResults.innerHTML = resultsHTML;
    
    // Add event listeners to search result buttons
    const searchResultButtons = searchResults.querySelectorAll('.search-result-add');
    searchResultButtons.forEach(button => {
        // Remove existing listeners first
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const productId = parseInt(this.getAttribute('data-product-id'));
            addToCartFromSearch(productId);
        });
    });
}

// Add to cart from search results
function addToCartFromSearch(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Get current cart
    const savedCart = localStorage.getItem('cart');
    let cart = savedCart ? JSON.parse(savedCart) : [];
    
    // Add to cart
    cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        originalPrice: product.price
    });
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show success message
    const successText = window.languageManager ? window.languageManager.getText('product_added') : 'تم إضافة المنتج للسلة بنجاح';
    showNotification(successText, 'success');
    
    // Close search modal
    const searchModal = document.getElementById('searchModal');
    if (searchModal) {
        searchModal.classList.remove('active');
        clearSearchResults();
    }
}

// Clear search results
function clearSearchResults() {
    const searchResults = document.getElementById('searchResults');
    const searchInput = document.getElementById('searchName');
    
    if (searchResults) {
        searchResults.innerHTML = '';
    }
    
    if (searchInput) {
        searchInput.value = '';
    }
}

// Form Validation
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            if (!name || !email || !message) {
                showNotification('يرجى ملء جميع الحقول', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('البريد الإلكتروني غير صحيح', 'error');
                return;
            }
            
            // Simulate form submission
            showNotification('جاري إرسال الرسالة...', 'info');
            
            setTimeout(() => {
                showNotification('تم إرسال الرسالة بنجاح', 'success');
                this.reset();
            }, 2000);
        });
    }
}

// Utility Functions
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#7cb342' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // RTL support (Arabic)
    notification.style.right = 'auto';
    notification.style.left = '20px';
    notification.style.transform = 'translateX(-400px)';
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(-400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(-400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add hover effects to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const plants = document.querySelectorAll('.plant');
    
    if (hero) {
        const rate = scrolled * -0.5;
        plants.forEach((plant, index) => {
            plant.style.transform = `translateY(${rate + (index * 10)}px)`;
        });
    }
});

// Add counter animation for numbers
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Initialize counter animations when elements come into view
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            counterObserver.unobserve(entry.target);
        }
    });
});

// Add mobile menu functionality
function initMobileMenu() {
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
    `;
    
    const navContainer = document.querySelector('.nav-container');
    const navMenu = document.querySelector('.nav-menu');
    
    navContainer.insertBefore(mobileMenuBtn, navMenu);
    
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Show mobile menu button on small screens
    function checkMobile() {
        if (window.innerWidth <= 768) {
            mobileMenuBtn.style.display = 'block';
            navMenu.style.display = 'none';
        } else {
            mobileMenuBtn.style.display = 'none';
            navMenu.style.display = 'flex';
        }
    }
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', initMobileMenu);

// تأكد أن زر السلة ينقلك إلى صفحة الشيك أوت مباشرة
// ضع هذا في نهاية الملف أو بعد تعريف cart-btn

document.addEventListener('DOMContentLoaded', function() {
    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'checkout.html';
        });
    }
});

 