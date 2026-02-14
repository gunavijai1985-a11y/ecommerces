// ==================== GLOBAL VARIABLES ====================
const products = [
    {
        id: 1,
        name: 'Classic Elegance',
        price: 299.99,
        image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600&h=600&fit=crop',
        description: 'The Classic Elegance is a timeless masterpiece that combines traditional craftsmanship with modern precision. Featuring a genuine leather strap and a polished stainless steel case, this watch is perfect for both formal occasions and everyday wear.',
        features: [
            'Swiss quartz movement for accuracy',
            'Water-resistant up to 50 meters',
            'Scratch-resistant sapphire crystal',
            'Genuine leather strap with butterfly clasp',
            '2-year international warranty'
        ]
    },
    {
        id: 2,
        name: 'Modern Sport',
        price: 399.99,
        image: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=600&h=600&fit=crop',
        description: 'Built for the active lifestyle, the Modern Sport combines durability with sophisticated design. Its robust stainless steel construction and advanced features make it the perfect companion for any adventure.',
        features: [
            'Automatic movement with 42-hour power reserve',
            'Water-resistant up to 100 meters',
            'Luminous hands and markers',
            'Stainless steel bracelet with deployment clasp',
            '3-year manufacturer warranty'
        ]
    },
    {
        id: 3,
        name: 'Luxury Gold',
        price: 599.99,
        image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&h=600&fit=crop',
        description: 'Experience ultimate sophistication with our Luxury Gold timepiece. This premium watch features an 18k gold-plated case and a stunning dial that captures attention from every angle.',
        features: [
            'Premium Swiss automatic movement',
            'Water-resistant up to 30 meters',
            '18k gold-plated case and crown',
            'Premium leather strap',
            'Limited edition with certificate of authenticity'
        ]
    },
    {
        id: 4,
        name: 'Minimalist Black',
        price: 249.99,
        image: 'https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=600&h=600&fit=crop',
        description: 'Less is more with the Minimalist Black. This sleek timepiece features a clean design that makes a bold statement through its simplicity and elegant black finish.',
        features: [
            'Japanese quartz movement',
            'Water-resistant up to 30 meters',
            'Scratch-resistant mineral crystal',
            'Premium mesh steel strap',
            '2-year warranty'
        ]
    },
    {
        id: 5,
        name: 'Chronograph Pro',
        price: 699.99,
        image: 'https://images.unsplash.com/photo-1587836374228-4c6b8a7b9b8c?w=600&h=600&fit=crop',
        description: 'The Chronograph Pro is engineered for precision timing. With multiple sub-dials and advanced chronograph functions, this watch is perfect for professionals and enthusiasts alike.',
        features: [
            'Swiss chronograph movement',
            'Water-resistant up to 200 meters',
            'Tachymeter bezel',
            'Date display at 3 o\'clock position',
            '5-year extended warranty'
        ]
    },
    {
        id: 6,
        name: 'Rose Gold Elite',
        price: 549.99,
        image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600&h=600&fit=crop',
        description: 'The Rose Gold Elite combines warm tones with modern design. Its rose gold finish and sophisticated dial create a perfect balance of elegance and contemporary style.',
        features: [
            'Automatic movement with exhibition caseback',
            'Water-resistant up to 50 meters',
            'Rose gold-plated stainless steel case',
            'Italian leather strap',
            '3-year international warranty'
        ]
    }
];

// ==================== MOBILE MENU ====================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu li a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }

    // Update cart count on all pages
    updateCartCount();

    // Page-specific initializations
    initLoginPage();
    initSignupPage();
    initProductDetailsPage();
    initCartPage();
});

// ==================== CART FUNCTIONALITY ====================
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(product) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += product.quantity;
    } else {
        cart.push(product);
    }

    saveCart(cart);
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
}

function updateCartItemQuantity(productId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity = Math.max(1, quantity);
        saveCart(cart);
    }
}

function updateCartCount() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('.cart-count');
    
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// ==================== LOGIN PAGE ====================
function initLoginPage() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simple validation animation
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Logging in...';
            submitBtn.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                alert('Login successful! (This is a demo)');
                submitBtn.textContent = 'Login';
                submitBtn.style.transform = 'scale(1)';
                window.location.href = 'index.html';
            }, 1000);
        });
    }
}

// ==================== SIGNUP PAGE ====================
function initSignupPage() {
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const errorMessage = document.getElementById('passwordError');
            
            // Check if passwords match
            if (password !== confirmPassword) {
                errorMessage.style.display = 'block';
                
                // Add shake animation
                errorMessage.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    errorMessage.style.animation = '';
                }, 500);
                
                return;
            }
            
            // Check password length
            if (password.length < 6) {
                alert('Password must be at least 6 characters long');
                return;
            }
            
            errorMessage.style.display = 'none';
            
            // Success animation
            const submitBtn = signupForm.querySelector('button[type="submit"]');
            submitBtn.textContent = 'Creating Account...';
            submitBtn.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                alert('Account created successfully! (This is a demo)');
                submitBtn.textContent = 'Create Account';
                submitBtn.style.transform = 'scale(1)';
                window.location.href = 'login.html';
            }, 1000);
        });
        
        // Real-time password match checking
        const confirmPasswordInput = document.getElementById('confirmPassword');
        confirmPasswordInput.addEventListener('input', function() {
            const password = document.getElementById('password').value;
            const confirmPassword = this.value;
            const errorMessage = document.getElementById('passwordError');
            
            if (confirmPassword.length > 0 && password !== confirmPassword) {
                errorMessage.style.display = 'block';
            } else {
                errorMessage.style.display = 'none';
            }
        });
    }
}

// ==================== PRODUCT DETAILS PAGE ====================
function initProductDetailsPage() {
    // Check if we're on the product details page
    const productImage = document.getElementById('productImage');
    if (!productImage) return;
    
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id')) || 1;
    
    // Find the product
    const product = products.find(p => p.id === productId);
    
    if (product) {
        // Update page content
        document.getElementById('productImage').src = product.image;
        document.getElementById('productName').textContent = product.name;
        document.getElementById('productTitle').textContent = product.name;
        document.getElementById('productPrice').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('productDescription').textContent = product.description;
        
        // Update features list
        const featuresList = document.getElementById('productFeatures');
        featuresList.innerHTML = product.features.map(feature => 
            `<li>${feature}</li>`
        ).join('');
        
        // Update page title
        document.title = `${product.name} - Luxe Watches`;
    }
    
    // Quantity controls
    const decreaseBtn = document.getElementById('decreaseQty');
    const increaseBtn = document.getElementById('increaseQty');
    const quantityInput = document.getElementById('quantity');
    
    if (decreaseBtn && increaseBtn && quantityInput) {
        decreaseBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
        
        increaseBtn.addEventListener('click', function() {
            let value = parseInt(quantityInput.value);
            if (value < 10) {
                quantityInput.value = value + 1;
            }
        });
    }
    
    // Add to cart functionality
    const addToCartBtn = document.getElementById('addToCartBtn');
    const cartMessage = document.getElementById('cartMessage');
    
    if (addToCartBtn && product) {
        addToCartBtn.addEventListener('click', function() {
            const quantity = parseInt(quantityInput.value);
            
            const cartItem = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            };
            
            addToCart(cartItem);
            
            // Show success message
            cartMessage.style.display = 'block';
            addToCartBtn.textContent = 'Added to Cart!';
            addToCartBtn.style.backgroundColor = '#27ae60';
            
            setTimeout(() => {
                cartMessage.style.display = 'none';
                addToCartBtn.textContent = 'Add to Cart';
                addToCartBtn.style.backgroundColor = '';
            }, 2000);
        });
    }
}

// ==================== CART PAGE ====================
function initCartPage() {
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    if (!cartItemsContainer) return;
    
    renderCart();
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            const cart = getCart();
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            alert('Thank you for your order! (This is a demo - no actual payment is processed)');
            localStorage.removeItem('cart');
            renderCart();
            updateCartCount();
        });
    }
}

function renderCart() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const emptyCart = document.getElementById('emptyCart');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyCart.style.display = 'block';
        updateCartSummary(0, 0, 0, 0);
        return;
    }
    
    emptyCart.style.display = 'none';
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p class="price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <label>Quantity:</label>
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <input type="number" value="${item.quantity}" min="1" max="10" readonly>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
            </div>
            <div class="cart-item-actions">
                <p class="price">$${(item.price * item.quantity).toFixed(2)}</p>
                <button class="remove-btn" onclick="removeItem(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 15 : 0;
    const tax = subtotal * 0.1;
    const total = subtotal + shipping + tax;
    
    updateCartSummary(subtotal, shipping, tax, total);
}

function updateCartSummary(subtotal, shipping, tax, total) {
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) newQuantity = 1;
    if (newQuantity > 10) newQuantity = 10;
    
    updateCartItemQuantity(productId, newQuantity);
    renderCart();
}

function removeItem(productId) {
    if (confirm('Are you sure you want to remove this item?')) {
        removeFromCart(productId);
        renderCart();
    }
}

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add CSS for shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);
