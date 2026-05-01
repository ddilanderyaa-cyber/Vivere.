const initialProducts = [
    { id: 1, category: 'Coffee Types', name: 'Caramel Macchiato', price: 120, description: 'Sweet caramel with smooth espresso and velvety milk.', calories: '250 kcal', ingredients: '2 shots of Espresso, 150ml Steamed Milk, 20g Vanilla Syrup, 15g Caramel Drizzle', image: 'assets/caramel_macchiato.png' },
    { id: 2, category: 'Coffee Types', name: 'Classic Espresso', price: 80, description: 'Rich, full-bodied espresso with a beautiful crema.', calories: '5 kcal', ingredients: 'Double shot (60ml) of Vivere House Blend Espresso', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
    { id: 3, category: 'Coffee Types', name: 'Vanilla Latte', price: 110, description: 'Smooth espresso with steamed milk and vanilla syrup.', calories: '200 kcal', ingredients: '1 shot of Espresso, 200ml Steamed Milk, 15g Vanilla Syrup', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
    
    { id: 4, category: 'Matcha', name: 'Iced Strawberry Matcha', price: 140, description: 'Premium matcha paired with sweet strawberry puree.', calories: '180 kcal', ingredients: '3g Premium Matcha, 50ml Water, 150ml Milk, 30g Fresh Strawberry Puree', image: 'assets/strawberry_matcha.png' },
    { id: 5, category: 'Matcha', name: 'Hot Matcha Latte', price: 130, description: 'Cozy and earthy hot matcha latte with latte art.', calories: '150 kcal', ingredients: '3g Premium Matcha, 50ml Hot Water, 200ml Steamed Milk, 10g Simple Syrup', image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
    { id: 6, category: 'Matcha', name: 'Matcha Frappe', price: 150, description: 'Blended ice matcha with whipped cream on top.', calories: '320 kcal', ingredients: '4g Matcha, 100ml Milk, 2 cups Ice, 30g Vanilla Syrup, Whipped Cream', image: 'https://images.unsplash.com/photo-1596704107148-1db172f3a746?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },

    { id: 7, category: 'Desserts', name: 'Berry Pavlova', price: 160, description: 'Light meringue topped with fresh cream and berries.', calories: '280 kcal', ingredients: '1 Meringue Base, 50g Fresh Cream, 20g Strawberries, 20g Blueberries', image: 'assets/berry_pavlova.png' },
    { id: 8, category: 'Desserts', name: 'Croissant', price: 70, description: 'Freshly baked, buttery, and flaky classic French pastry.', calories: '350 kcal', ingredients: 'Flour, Butter, Water, Yeast, Salt, Sugar, Egg Wash', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
    { id: 9, category: 'Desserts', name: 'Strawberry Cake', price: 140, description: 'Soft sponge cake layered with fresh strawberries.', calories: '400 kcal', ingredients: '100g Sponge Cake, 50g Vanilla Buttercream, 40g Fresh Strawberries', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
];

const initialSettings = {
    primaryColor: '#FFB6C1',
    headingColor: '#FF9EAB',
    heroBg: 'assets/hero_bg.png',
    heroTitle: 'Experience Vivere',
    heroSubtitle: 'Your daily dose of aesthetics, premium matcha, and sweet moments.',
    aboutUsText: 'Vivere is more than just a cafe. It is an aesthetic sanctuary where every cup is crafted with passion. Founded in 2026, our mission is to deliver the finest coffee and matcha experience while creating a warm, sweet atmosphere for our guests.',
    customerExpectationsText: 'We listen to you! Our customers prefer plant-based milk alternatives, lower sugar content in their matcha lattes, and a quiet, aesthetic environment for studying. Coffees should be served at exactly 65°C to preserve flavor profiles.',
    contactAddress: 'Opposite Gebze Technical University Faculty of Business',
    contactPhone: '+90 555 123 45 67',
    contactEmail: 'hello@viverecafe.com',
    contactInstagram: '@viverecafe',
    feedbackInfo: 'For any feedback or concerns, please use our MIS Assignment form or email us directly. Your opinions shape our future menu!'
};

const initialCareers = [
    { id: 1, title: 'Barista (Part-Time)', description: 'Looking for an experienced barista who loves latte art and sweet customer interactions.', status: 'Open' }
];

function initData() {
    const version = localStorage.getItem('vivere_version');
    if (version !== '1.2') {
        localStorage.setItem('vivere_products', JSON.stringify(initialProducts));
        localStorage.setItem('vivere_settings', JSON.stringify(initialSettings));
        localStorage.setItem('vivere_careers', JSON.stringify(initialCareers));
        localStorage.setItem('vivere_version', '1.2');
    }

    if (!localStorage.getItem('vivere_customers')) {
        localStorage.setItem('vivere_customers', JSON.stringify([]));
    }
    if (!localStorage.getItem('vivere_interactions')) {
        localStorage.setItem('vivere_interactions', JSON.stringify([]));
    }
}

initData();

function getProducts() { return JSON.parse(localStorage.getItem('vivere_products')); }
function saveProducts(products) { localStorage.setItem('vivere_products', JSON.stringify(products)); }

function getCustomers() { return JSON.parse(localStorage.getItem('vivere_customers')); }

function getInteractions() { return JSON.parse(localStorage.getItem('vivere_interactions')); }
function saveInteraction(type, detail) {
    const interactions = getInteractions();
    interactions.push({ type, detail, timestamp: new Date().toISOString() });
    localStorage.setItem('vivere_interactions', JSON.stringify(interactions));
}

function getSettings() { return JSON.parse(localStorage.getItem('vivere_settings')); }
function saveSettings(settings) { localStorage.setItem('vivere_settings', JSON.stringify(settings)); }

function getCareers() { return JSON.parse(localStorage.getItem('vivere_careers')); }
function saveCareers(careers) { localStorage.setItem('vivere_careers', JSON.stringify(careers)); }
