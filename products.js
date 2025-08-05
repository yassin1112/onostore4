// Products Data
const products = [
    {
        id: 1,
        name: "Raccoon",
        description: "حيوان الراكون الجميل والذكي في Grow a Garden",
        price: 8,
        oldPrice: 10,
        image: "https://i.imgur.com/ZpwndMO.jpeg",
        category: "الحيوانات الأليفة",
        badge: "الاكثر طلبا",
        inStock: true
    },
    {
        id: 2,
        name: "T-Rex",
        description: "ديناصور T-Rex المخيف في لعبة Grow a Garden",
        price: 5,
        oldPrice: null,
        image: "https://i.imgur.com/4AzDuP5.jpeg",
        category: "الحيوانات الأليفة",
        badge: null,
        inStock: true
    },
    {
        id: 3,
        name: "Spinosorus",
        description: "ديناصور Spinosorus النادر في Grow a Garden",
        price: 5,
        oldPrice: null,
        image: "https://i.imgur.com/mxyBexL.jpeg",
        category: "الحيوانات الأليفة",
        badge: "خصم 30%",
        inStock: true
    },
    {
        id: 4,
        name: "Butterfly",
        description: "الفراشة الجميلة والملونة في Grow a Garden",
        price: 10,
        oldPrice: null,
        image: "https://i.imgur.com/hl5ivV6.jpeg",
        category: "الحيوانات الصغيرة",
        badge: null,
        inStock: true
    },
    {
        id: 5,
        name: "Mimic Octopus",
        description: "الأخطبوط المحاكي المذهل في Grow a Garden",
        price: 5,
        oldPrice: null,
        image: "https://i.imgur.com/yPqAbYq.jpeg",
        category: "الحيوانات الصغيرة",
        badge: "مميز",
        inStock: true
    },
    {
        id: 6,
        name: "Dragonfly",
        description: "اليعسوب الجميل والرشيق في Grow a Garden",
        price: 5,
        oldPrice: null,
        image: "https://i.imgur.com/5z6l0Tj.jpeg",
        category: "الحيوانات الصغيرة",
        badge: null,
        inStock: true
    },
    {
        id: 7,
        name: "Kitsune",
        description: "الثعلب الياباني الأسطوري في Grow a Garden",
        price: 35,
        oldPrice: null,
        image: "https://i.imgur.com/AXimrq0.jpeg",
        category: "الحيوانات الأليفة",
        badge: "نادر",
        inStock: true
    },
    {
        id: 8,
        name: "Corrupted Kitsune",
        description: "الثعلب الفاسد النادر في Grow a Garden",
        price: 5,
        oldPrice: null,
        image: "https://i.imgur.com/OgpTN3f.jpeg",
        category: "الحيوانات الأليفة",
        badge: null,
        inStock: true
    },
    {
        id: 9,
        name: "Queen Bee",
        description: "ملكة النحل القوية في Grow a Garden",
        price: 5,
        oldPrice: null,
        image: "https://i.imgur.com/V00o7nl.jpeg",
        category: "الحيوانات الصغيرة",
        badge: null,
        inStock: true
    },
    {
        id: 10,
        name: "disco Bee",
        description: " النحل القوية في Grow a Garden",
        price: 1,
        oldPrice: null,
        image: "https://i.imgur.com/Gtgh9Bv.jpeg",
        category: "الحيوانات الصغيرة",
        badge: null,
        inStock: true
    }
];

// Oxapay Configuration
const oxapayConfig = {
    merchantId: "15453928",
    baseUrl: "https://pay.oxapay.com",
    successUrl: window.location.origin + "/success.html",
    cancelUrl: window.location.origin + "/cancel.html",
    supportedCurrencies: ["USD"],
    supportedCryptos: ["BTC", "ETH", "USDT", "USDC", "BNB", "ADA", "DOT", "LTC"]
};





// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { products, oxapayConfig };
} 
const PRODUCTS_DB = {
    "1": { name: "Raccoon", price: 8 },
    "2": { name: "T-Rex", price: 5 },
    "3": { name: "Spinosorus", price: 5 },
    "4": { name: "Butterfly", price: 10 },
    "5": { name: "Mimic Octopus", price: 5 },
    "6": { name: "Dragonfly", price: 5 },
    "7": { name: "Kitsune", price: 35 },
    "8": { name: "Corrupted Kitsune", price: 5 },
    "9": { name: "Queen Bee", price: 5 },
    "10": { name: "disco Bee", price: 1 }
  };