// Discord Webhook Configuration
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1398546303201312830/OqaPsQC1zgxaHbNgpI-IiSEjToLhpM8p9uqEfU4IEaGhoX1VSE7hAsjBs61EOp0q_TW6"; // ضع رابط الويبهوك هنا
const API_KEY = "ODEXOQ-MKHVEF-8YX2BQ-7TB4OG";
const MERCHANT_ID = "15453928";

// Send Discord Notification
async function sendDiscordNotification(orderData) {
    try {
        // Create embed message
        const embed = {
            title: "🛒 طلب جديد - Ono Store",
            color: 0x7cb342, // Green color
            timestamp: new Date().toISOString(),
            footer: {
                text: "Ono Store - Grow a Garden Pets"
            },
            fields: [
                {
                    name: "📋 رقم الطلب",
                    value: orderData.orderId,
                    inline: true
                },
                {
                    name: "💰 المبلغ",
                    value: `$${orderData.total.toFixed(2)}`,
                    inline: true
                },
                {
                    name: "👤 اسم مستخدم Roblox",
                    value: orderData.user.robloxUsername,
                    inline: true
                },
                {
                    name: "📱 رقم الواتساب",
                    value: orderData.user.whatsappNumber,
                    inline: true
                },
                {
                    name: "📅 تاريخ الطلب",
                    value: new Date().toLocaleDateString('ar-SA'),
                    inline: true
                },
                {
                    name: "💳 طريقة الدفع",
                    value: "Oxxa Pay - العملات المشفرة",
                    inline: true
                },
                {
                    name: "🔑 API Key",
                    value: API_KEY,
                    inline: true
                },
                {
                    name: "🔗 رابط الدفع",
                    value: `https://pay.oxapay.com/${MERCHANT_ID}?amount=${orderData.total.toFixed(2)}&currency=USD&order_id=${orderData.orderId}&api_key=${API_KEY}`,
                    inline: false
                }
            ]
        };

        // Add products list
        if (orderData.items && orderData.items.length > 0) {
            const productsList = orderData.items.map(item => {
                const price = item.originalPrice || item.price;
                return `• ${item.name} - $${price.toFixed(2)}`;
            }).join('\n');
            
            embed.fields.push({
                name: "🛍️ المنتجات المطلوبة",
                value: productsList,
                inline: false
            });
        }

        // Create webhook payload
        const payload = {
            username: "Ono Store Bot",
            avatar_url: "https://cdn.discordapp.com/attachments/123456789/123456789/ono-store-logo.png", // يمكنك تغيير هذا
            embeds: [embed]
        };

        // Send to Discord
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log('تم إرسال إشعار Discord بنجاح');
            return true;
        } else {
            console.error('فشل في إرسال إشعار Discord:', response.status);
            return false;
        }

    } catch (error) {
        console.error('خطأ في إرسال إشعار Discord:', error);
        return false;
    }
}

// Send simple notification (fallback)
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

💳 **طريقة الدفع:** Oxxa Pay - العملات المشفرة
🔑 **API Key:** ${API_KEY}
🔗 **رابط الدفع:** https://pay.oxapay.com/${MERCHANT_ID}?amount=${orderData.total.toFixed(2)}&currency=USD&order_id=${orderData.orderId}&api_key=${API_KEY}

---
*Ono Store - Grow a Garden Pets*
    `;

    // Create simple payload
    const payload = {
        username: "Ono Store Bot",
        content: message
    };

    // Send to Discord
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
}

// Send payment success notification
async function sendPaymentSuccessNotification(orderData) {
    try {
        const embed = {
            title: "✅ تم الدفع بنجاح - Ono Store",
            color: 0x00ff00, // Green color
            timestamp: new Date().toISOString(),
            footer: {
                text: "Ono Store - Grow a Garden Pets"
            },
            fields: [
                {
                    name: "📋 رقم الطلب",
                    value: orderData.orderId,
                    inline: true
                },
                {
                    name: "💰 المبلغ المدفوع",
                    value: `$${orderData.total.toFixed(2)}`,
                    inline: true
                },
                {
                    name: "👤 اسم مستخدم Roblox",
                    value: orderData.user.robloxUsername,
                    inline: true
                },
                {
                    name: "📱 رقم الواتساب",
                    value: orderData.user.whatsappNumber,
                    inline: true
                },
                {
                    name: "⏰ وقت الدفع",
                    value: new Date().toLocaleString('ar-SA'),
                    inline: true
                },
                {
                    name: "💳 طريقة الدفع",
                    value: "Oxxa Pay - العملات المشفرة",
                    inline: true
                },
                {
                    name: "🔑 API Key",
                    value: API_KEY,
                    inline: true
                }
            ]
        };

        // Add products list
        if (orderData.items && orderData.items.length > 0) {
            const productsList = orderData.items.map(item => {
                const price = item.originalPrice || item.price;
                return `• ${item.name} - $${price.toFixed(2)}`;
            }).join('\n');
            
            embed.fields.push({
                name: "🛍️ المنتجات المطلوبة",
                value: productsList,
                inline: false
            });
        }

        const payload = {
            username: "Ono Store Bot",
            avatar_url: "https://cdn.discordapp.com/attachments/123456789/123456789/ono-store-logo.png",
            embeds: [embed]
        };

        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            console.log('تم إرسال إشعار نجاح الدفع بنجاح');
            return true;
        } else {
            console.error('فشل في إرسال إشعار نجاح الدفع:', response.status);
            return false;
        }

    } catch (error) {
        console.error('خطأ في إرسال إشعار نجاح الدفع:', error);
        return false;
    }
}

// Export functions
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        sendDiscordNotification, 
        sendSimpleDiscordNotification,
        sendPaymentSuccessNotification 
    };
} 