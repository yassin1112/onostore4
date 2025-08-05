// Translations Configuration
const translations = {
    ar: {
        // Navigation
        nav_home: 'الرئيسية',
        nav_products: 'المنتجات',
        nav_about: 'من نحن',
        nav_contact: 'تواصل معنا',
        
        // Hero Section
        hero_title: 'اكتشف عالم حيوانات Grow a Garden',
        hero_subtitle: 'تسوق أفضل الحيوانات في لعبة Roblox Grow a Garden',
        shop_now: 'تسوق الآن',
        
        // Products Section
        products_title: 'حيوانات Grow a Garden',
        products_subtitle: 'اكتشف مجموعة رائعة من الحيوانات في لعبة Roblox Grow a Garden',
        add_to_cart: 'أضف للسلة',
        
        // About Section
        about_title: 'من نحن',
        about_subtitle: 'تعرف على متجرنا وخدماتنا المميزة',
        about_description: 'نحن متجر متخصص في بيع حيوانات لعبة Roblox Grow a Garden. نقدم أفضل الحيوانات بأفضل الأسعار مع ضمان الجودة والسرعة في التوصيل.',
        fast_delivery: 'توصيل سريع',
        fast_delivery_desc: 'نضمن وصول طلبك خلال 24 ساعة',
        quality_guarantee: 'ضمان الجودة',
        quality_guarantee_desc: 'جميع منتجاتنا مضمونة الجودة',
        support_24_7: 'دعم 24/7',
        support_24_7_desc: 'فريق دعم متاح على مدار الساعة',
        
        // Contact Section
        contact_title: 'تواصل معنا',
        full_name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        message: 'رسالتك',
        send_message: 'إرسال الرسالة',
        
        // Search
        search_title: 'البحث عن المنتجات',
        search_placeholder: 'اكتب اسم المنتج للبحث...',
        no_products_found: 'لم يتم العثور على منتجات',
        no_products_available: 'لا توجد منتجات متاحة',
        
        // Cart
        cart_title: 'السلة',
        price: 'السعر',
        total: 'المجموع',
        grand_total: 'المجموع الكلي',
        clear_cart: 'إفراغ السلة',
        checkout: 'إتمام الطلب',
        
        // Footer
        footer_description: 'كل ما تحتاجه من حيوانات في لعبة Grow a Garden!',
        important_links: 'روابط مهمة',
        privacy_policy: 'سياسة الخصوصية',
        terms_of_service: 'شروط الاستخدام',
        return_policy: 'سياسة الإرجاع',
        payment_methods: 'طرق الدفع',
        contact_us: 'تواصل معنا',
        all_rights_reserved: 'جميع الحقوق محفوظة',
        
        // Language
        arabic: 'العربية',
        english: 'English',
        
        // Notifications
        product_added: 'تم إضافة المنتج للسلة بنجاح',
        cart_empty: 'السلة فارغة',
        cart_cleared: 'تم إفراغ السلة بنجاح',
        item_removed: 'تم إزالة المنتج من السلة'
    },
    en: {
        // Navigation
        nav_home: 'Home',
        nav_products: 'Products',
        nav_about: 'About',
        nav_contact: 'Contact',
        
        // Hero Section
        hero_title: 'Discover Grow a Garden Animals World',
        hero_subtitle: 'Shop the best animals in Roblox Grow a Garden game',
        shop_now: 'Shop Now',
        
        // Products Section
        products_title: 'Grow a Garden Animals',
        products_subtitle: 'Discover an amazing collection of animals in Roblox Grow a Garden game',
        add_to_cart: 'Add to Cart',
        
        // About Section
        about_title: 'About Us',
        about_subtitle: 'Learn about our store and distinguished services',
        about_description: 'We are a specialized store in selling Roblox Grow a Garden game animals. We offer the best animals at the best prices with quality guarantee and fast delivery.',
        fast_delivery: 'Fast Delivery',
        fast_delivery_desc: 'We guarantee your order arrives within 24 hours',
        quality_guarantee: 'Quality Guarantee',
        quality_guarantee_desc: 'All our products are quality guaranteed',
        support_24_7: '24/7 Support',
        support_24_7_desc: 'Support team available around the clock',
        
        // Contact Section
        contact_title: 'Contact Us',
        full_name: 'Full Name',
        email: 'Email',
        message: 'Your Message',
        send_message: 'Send Message',
        
        // Search
        search_title: 'Search Products',
        search_placeholder: 'Type product name to search...',
        no_products_found: 'No products found',
        no_products_available: 'No products available',
        
        // Cart
        cart_title: 'Cart',
        price: 'Price',
        total: 'Total',
        grand_total: 'Grand Total',
        clear_cart: 'Clear Cart',
        checkout: 'Checkout',
        
        // Footer
        footer_description: 'Everything you need from animals in Grow a Garden game!',
        important_links: 'Important Links',
        privacy_policy: 'Privacy Policy',
        terms_of_service: 'Terms of Service',
        return_policy: 'Return Policy',
        payment_methods: 'Payment Methods',
        contact_us: 'Contact Us',
        all_rights_reserved: 'All rights reserved',
        
        // Language
        arabic: 'العربية',
        english: 'English',
        
        // Notifications
        product_added: 'Product added to cart successfully',
        cart_empty: 'Cart is empty',
        cart_cleared: 'Cart cleared successfully',
        item_removed: 'Item removed from cart'
    }
};

// Language Manager
class LanguageManager {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'ar';
        this.init();
    }
    
    init() {
        this.updateLanguageButton();
        this.translatePage();
        this.initLanguageToggle();
    }
    
    setLanguage(lang) {
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
        this.updateLanguageButton();
        this.translatePage();
        this.updatePageDirection(lang);
        this.updateCartButtons();
    }
    
    updateLanguageButton() {
        const langBtn = document.getElementById('languageBtn');
        const currentLangSpan = langBtn.querySelector('.current-lang');
        
        if (this.currentLanguage === 'ar') {
            currentLangSpan.textContent = 'العربية';
        } else {
            currentLangSpan.textContent = 'English';
        }
    }
    
    updatePageDirection(lang) {
        const html = document.documentElement;
        if (lang === 'ar') {
            html.setAttribute('dir', 'rtl');
            html.setAttribute('lang', 'ar');
        } else {
            html.setAttribute('dir', 'ltr');
            html.setAttribute('lang', 'en');
        }
    }
    
    translatePage() {
        // Translate elements with data-translate attribute
        const elements = document.querySelectorAll('[data-translate]');
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = translations[this.currentLanguage][key];
            if (translation) {
                element.textContent = translation;
            }
        });
        
        // Translate placeholders
        const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
        placeholderElements.forEach(element => {
            const key = element.getAttribute('data-translate-placeholder');
            const translation = translations[this.currentLanguage][key];
            if (translation) {
                element.placeholder = translation;
            }
        });
        
        // Update search results if they exist
        this.updateSearchResults();
    }
    
    updateSearchResults() {
        const searchResults = document.getElementById('searchResults');
        if (searchResults && searchResults.innerHTML.includes('أضف للسلة')) {
            const addButtons = searchResults.querySelectorAll('.search-result-add');
            addButtons.forEach(button => {
                button.textContent = translations[this.currentLanguage].add_to_cart;
            });
        }
    }
    
    updateCartButtons() {
        // Update all "Add to Cart" buttons
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.textContent = translations[this.currentLanguage].add_to_cart;
        });
        
        // Update search result buttons
        const searchResultButtons = document.querySelectorAll('.search-result-add');
        searchResultButtons.forEach(button => {
            button.textContent = translations[this.currentLanguage].add_to_cart;
        });
    }
    
    initLanguageToggle() {
        const langBtn = document.getElementById('languageBtn');
        langBtn.addEventListener('click', () => {
            const newLang = this.currentLanguage === 'ar' ? 'en' : 'ar';
            this.setLanguage(newLang);
        });
    }
    
    getText(key) {
        return translations[this.currentLanguage][key] || key;
    }
}

// Initialize language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
}); 