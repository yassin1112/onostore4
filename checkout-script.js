// API Configuration
const API_KEY = "ODEXOQ-MKHVEF-8YX2BQ-7TB4OG";
const MERCHANT_ID = "15453928";

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    loadCartItems();
    initPaymentForm();
    initCompleteOrder();
    initTestButton();
});

// دالة موحدة لحساب مجموع السلة بالدولار
function calculateCartTotal(cart) {
    if (!Array.isArray(cart)) return 0;
    return cart.reduce((sum, item) => {
        let price = 0;
        if (typeof item.originalPrice === 'number') {
            price = item.originalPrice;
        } else if (typeof item.price === 'number') {
            price = item.price;
        } else if (typeof item.price === 'string') {
            price = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
        }
        return sum + price;
    }, 0);
}

// Load Cart Items
function loadCartItems() {
    const savedCart = localStorage.getItem('cart');
    let cart = savedCart ? JSON.parse(savedCart) : [];
    // إذا كان هناك منتجات، اعرض فقط آخر منتج (آخر عملية شراء الآن)
    if (cart.length > 0) {
        cart = [cart[cart.length - 1]];
    }
    // دمج المنتجات المتكررة وتجميع الكمية (لن يكون هناك تكرار غالباً)
    const grouped = {};
    cart.forEach(item => {
        if (grouped[item.id]) {
            grouped[item.id].quantity += 1;
        } else {
            grouped[item.id] = {...item, quantity: 1};
        }
    });
    const items = Object.values(grouped);
    const cartItemsContainer = document.getElementById('cartItems');
    const totalAmountElement = document.getElementById('totalAmount');
    const finalAmountElement = document.getElementById('finalAmount');
    const paymentAmountElement = document.getElementById('paymentAmount');
    
    if (items.length === 0) {
        cartItemsContainer.innerHTML = `<div style='text-align:center;color:#e74c3c;padding:2rem 0;'>السلة فارغة<br><a href='index.html' style='display:inline-block;margin-top:1rem;padding:0.7rem 1.5rem;background:#7cb342;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;'>العودة للمتجر</a></div>`;
        if (totalAmountElement) totalAmountElement.textContent = "$0.00";
        if (finalAmountElement) finalAmountElement.textContent = "$0.00";
        if (paymentAmountElement) paymentAmountElement.textContent = "$0.00";
        return;
    }
    // ملخص المنتج الأخير فقط
    let total = 0;
    const cartHTML = `
        <ul style=\"list-style:none;padding:0;\">
            ${items.map(item => {
                const price = (typeof item.originalPrice === 'number') ? item.originalPrice :
                              (typeof item.price === 'number') ? item.price :
                              parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
                const itemTotal = price * item.quantity;
                total += itemTotal;
                return `<li style='margin-bottom:10px;display:flex;align-items:center;gap:10px;'>
                    <img src='${item.image || ''}' alt='${item.name}' style='width:50px;height:50px;border-radius:8px;border:1px solid #eee;'>
                    <div style='flex:1;'>
                        <div style='font-weight:600;font-size:1.1em;'>${item.name}</div>
                        <div style='color:#888;font-size:0.95em;'>السعر: $${price.toFixed(2)}</div>
                    </div>
                    <div style='font-weight:700;color:#7cb342;'>$${itemTotal.toFixed(2)}</div>
                </li>`;
            }).join('')}
        </ul>
        <hr style='margin:10px 0;'>
        <div style='font-size:1.1rem;font-weight:700;display:flex;justify-content:space-between;'>
            <span>المجموع النهائي:</span>
            <span style='color:#2d5a27;'>$${total.toFixed(2)}</span>
        </div>
    `;
    cartItemsContainer.innerHTML = cartHTML;
    // Update items count
    const itemsCountElement = document.querySelector('.items-count');
    if (itemsCountElement) {
        itemsCountElement.textContent = `${items.length} منتج`;
    }
    // Update amounts (USD only)
    if (totalAmountElement) totalAmountElement.textContent = `$${total.toFixed(2)}`;
    if (finalAmountElement) finalAmountElement.textContent = `$${total.toFixed(2)}`;
    if (paymentAmountElement) paymentAmountElement.textContent = `$${total.toFixed(2)}`;
}

// Initialize Payment Form
function initPaymentForm() {
    const paymentOptions = document.querySelectorAll('.payment-option');
    
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            paymentOptions.forEach(opt => opt.classList.remove('active'));
            // Add active class to clicked option
            this.classList.add('active');
        });
    });
}

// Remove OxaPay logic and replace with OxPay redirect
const OXPAY_API_KEY = "1HXJOV-XDEFDH-XMSBZW-VTY8CK";

function redirectToOxPay(amount, orderId) {
    // Example OxPay payment URL (replace with actual if you have it)
    const oxpayUrl = `https://api.oxpay.com/payment?api_key=${OXPAY_API_KEY}&amount=${amount}&currency=USD&order_id=${orderId}`;
    window.location.href = oxpayUrl;
}

// Update order completion logic
function initCompleteOrder() {
    const completeBtn = document.getElementById('completeOrderBtn');
    if (!completeBtn) return;
    completeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const savedCart = localStorage.getItem('cart');
        let cart = savedCart ? JSON.parse(savedCart) : [];
        if (!cart.length) return;
        const item = cart[0];
        const amount = Number(item.price).toFixed(2);
        const orderId = 'ONO-' + Date.now();
        redirectToOxPay(amount, orderId);
    });
}

// Initialize Test Button (simplified)
function initTestButton() {
    // Add test function to global scope for console testing
    window.openOxapay = function(amount = 10.00) {
        const orderId = generateOrderId();
        const url = createOxxaPayUrl(amount, orderId);
        window.open(url, '_blank');
    };
    console.log('لاختبار رابط Oxxa Pay، اكتب في وحدة التحكم: openOxapay(amount)');
    console.log('API Key:', API_KEY);
}

// Send Discord Notification
async function sendDiscordNotification(orderData) {
    try {
        // Check if Discord webhook is configured
        if (typeof sendDiscordNotification === 'function' && DISCORD_WEBHOOK_URL !== 'https://discord.com/api/webhooks/1398546303201312830/OqaPsQC1zgxaHbNgpI-IiSEjToLhpM8p9uqEfU4IEaGhoX1VSE7hAsjBs61EOp0q_TW6') {
            await sendDiscordNotification(orderData);
        } else {
            // Fallback: send simple notification
            sendSimpleDiscordNotification(orderData);
        }
        
        console.log('تم إرسال إشعار Discord بنجاح');
        return true;
        
    } catch (error) {
        console.error('خطأ في إرسال إشعار Discord:', error);
        return false;
    }
}

// Send simple Discord notification (fallback)
function sendSimpleDiscordNotification(orderData) {
    const message = `
🛒 **طلب جديد - Ono Store**

📋 **رقم الطلب:** ${orderData.orderId}
💰 **المبلغ:** $${orderData.total.toFixed(2)}
👤 **اسم مستخدم Roblox:** ${orderData.user.robloxUsername}
📱 **رقم الواتساب:** ${orderData.user.whatsappNumber}
📅 **التاريخ:** ${new Date().toLocaleDateString('ar-SA')}

🛍️ **المنتجات:**
${orderData.items.map(item => {
    const price = item.originalPrice || item.price;
    return `• ${item.name} - $${price.toFixed(2)}`;
}).join('\n')}

💳 **طريقة الدفع:** Oxxa Pay
🔗 **رابط الدفع:** https://pay.oxapay.com/${MERCHANT_ID}?amount=${orderData.total.toFixed(2)}&currency=USD&order_id=${orderData.orderId}&api_key=${API_KEY}

---
*Ono Store - Grow a Garden Pets*
    `;

    // Create simple payload
    const payload = {
        username: "Ono Store Bot",
        content: message
    };

    // Send to Discord (if webhook is configured)
    if (typeof DISCORD_WEBHOOK_URL !== 'undefined' && DISCORD_WEBHOOK_URL !== 'https://discord.com/api/webhooks/1398546303201312830/OqaPsQC1zgxaHbNgpI-IiSEjToLhpM8p9uqEfU4IEaGhoX1VSE7hAsjBs61EOp0q_TW6') {
        fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        }).then(response => {
            if (response.ok) {
                console.log('تم إرسال إشعار Discord بنجاح');
            } else {
                console.error('فشل في إرسال إشعار Discord');
            }
        }).catch(error => {
            console.error('خطأ في إرسال إشعار Discord:', error);
        });
    } else {
        console.log('Discord webhook غير مُكوّن. سيتم طباعة الإشعار في وحدة التحكم:');
        console.log(message);
    }
}

// Show Notification
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
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

 