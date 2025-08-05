# Ono Store

متجر إلكتروني لبيع حيوانات لعبة Roblox Grow a Garden مع دعم الدفع بالعملات المشفرة عبر Oxapay.

## المميزات

- 🛒 **سلة تسوق متقدمة** مع حفظ البيانات محلياً
- 💳 **دفع آمن** عبر العملات المشفرة (Bitcoin, Ethereum, USDT, USDC)
- 📱 **تصميم متجاوب** يعمل على جميع الأجهزة
- 🎨 **تصميم حديث** مع تأثيرات بصرية جميلة
- 🔒 **حماية كاملة** للمدفوعات عبر Oxapay
- 📦 **إدارة منتجات سهلة** عبر ملف products.js
- 🔔 **إشعارات Discord** عند نجاح الطلب

## كيفية تشغيل الموقع

1. قم بتحميل جميع الملفات
2. افتح ملف `index.html` في المتصفح
3. أو استخدم خادم محلي:
   ```bash
   python -m http.server 8000
   ```
   ثم افتح `http://localhost:8000`

## كيفية إضافة منتجات جديدة

### 1. تعديل ملف products.js

افتح ملف `products.js` وأضف منتج جديد:

```javascript
{
    id: 9, // رقم فريد للمنتج
    name: "اسم المنتج",
    description: "وصف المنتج",
    price: 25.00, // السعر بالدولار
    oldPrice: 30.00, // السعر القديم (اختياري)
    image: "رابط الصورة",
    category: "فئة المنتج",
    badge: "علامة خاصة", // مثل "جديد"، "الأكثر مبيعاً" (اختياري)
    inStock: true // متوفر أم لا
}
```

### 2. إضافة صور المنتجات

- استخدم روابط صور من Unsplash أو أي موقع آخر
- أو ضع الصور في مجلد `images/` واستخدم المسار المحلي

### 3. تحديث الأسعار

- جميع الأسعار بالدولار الأمريكي
- استخدم الأرقام العشرية (مثل 15.50)
- يمكن إضافة سعر قديم للخصومات

## هيكل الملفات

```
├── index.html              # الصفحة الرئيسية
├── checkout.html           # صفحة إتمام الطلب
├── success.html            # صفحة نجاح الدفع
├── cancel.html             # صفحة إلغاء الدفع
├── products.js             # بيانات المنتجات
├── script.js               # JavaScript للصفحة الرئيسية
├── checkout-script.js      # JavaScript لصفحة الدفع
├── discord-webhook.js      # إشعارات Discord
├── styles.css              # CSS للصفحة الرئيسية
├── checkout-styles.css     # CSS لصفحة الدفع
├── DISCORD_SETUP.md        # تعليمات إعداد Discord
└── README.md              # هذا الملف
```

## إعداد Discord Webhook

### كيفية الإعداد:
1. **أنشئ ويبهوك في Discord** (انظر ملف `DISCORD_SETUP.md`)
2. **افتح ملف `discord-webhook.js`**
3. **استبدل `YOUR_DISCORD_WEBHOOK_URL` برابط الويبهوك الخاص بك**

### معلومات الإشعار:
- 🛒 عنوان الطلب مع رقم الطلب
- 💰 المبلغ المدفوع
- 👤 اسم مستخدم Roblox
- 📱 رقم الواتساب
- 📅 تاريخ الطلب
- 🛍️ قائمة المنتجات المطلوبة

## إعدادات Oxapay

### التكوين الحالي:
- **Merchant ID**: 15453928
- **الرابط الأساسي**: https://pay.oxapay.com
- **العملات المدعومة**: USD, EUR, GBP
- **العملات المشفرة**: BTC, ETH, USDT, USDC, BNB, ADA, DOT, LTC

### لتغيير إعدادات Oxapay:

1. افتح ملف `products.js`
2. عدل `oxapayConfig`:
```javascript
const oxapayConfig = {
    merchantId: "YOUR_MERCHANT_ID",
    baseUrl: "https://pay.oxapay.com",
    successUrl: "https://yourdomain.com/success.html",
    cancelUrl: "https://yourdomain.com/cancel.html"
};
```

## المنتجات الحالية

1. **كلب Grow a Garden** - $15.00
2. **قط Grow a Garden** - $12.00
3. **حصان Grow a Garden** - $30.00
4. **أرنب Grow a Garden** - $8.00
5. **بقرة Grow a Garden** - $25.00
6. **دجاجة Grow a Garden** - $10.00
7. **خروف Grow a Garden** - $18.00
8. **بط Grow a Garden** - $9.00

## التقنيات المستخدمة

- **HTML5** - هيكل الصفحات
- **CSS3** - التصميم والتأثيرات
- **JavaScript** - التفاعل والوظائف
- **Font Awesome** - الأيقونات
- **Google Fonts (Cairo)** - الخطوط العربية
- **localStorage** - حفظ بيانات السلة
- **Oxapay** - بوابة الدفع بالعملات المشفرة

## المميزات التفاعلية

- ✅ إضافة المنتجات للسلة
- ✅ عرض عدد العناصر في السلة
- ✅ حذف منتجات من السلة
- ✅ تفريغ السلة بالكامل
- ✅ حفظ السلة محلياً
- ✅ حساب المجموع تلقائياً
- ✅ توجيه لصفحة الدفع
- ✅ دفع آمن عبر Oxapay
- ✅ صفحات نجاح وإلغاء الدفع
- ✅ إشعارات Discord عند نجاح الطلب

## التخصيص

### تغيير الألوان:
عدل متغيرات CSS في ملفات الـ CSS:
```css
:root {
    --primary-color: #7cb342;
    --secondary-color: #8bc34a;
    --accent-color: #4caf50;
}
```

### تغيير الخطوط:
عدل رابط Google Fonts في رأس الصفحات:
```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT:wght@300;400;600;700&display=swap" rel="stylesheet">
```

## الدعم

للمساعدة أو الاستفسارات:
- 📧 البريد الإلكتروني: support@growagarden.com
- 📱 الواتساب: +966 50 000 0000

## الترخيص

هذا المشروع مفتوح المصدر ومتاح للاستخدام التجاري.

---

**ملاحظة**: تأكد من تحديث معلومات التواصل والروابط قبل النشر. 