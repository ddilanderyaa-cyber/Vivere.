document.addEventListener('DOMContentLoaded', () => {
    applySettings();
    renderProducts();
    renderCareers();
    setupForm();
});

function applySettings() {
    const settings = getSettings();
    if (!settings) return;

    // Apply CSS Variables
    document.documentElement.style.setProperty('--primary', settings.primaryColor);
    document.documentElement.style.setProperty('--primary-dark', settings.headingColor);
    
    // Apply Hero Background
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundImage = `linear-gradient(rgba(255,255,255,0.3), rgba(255,255,255,0.7)), url('${settings.heroBg}')`;
    }

    // Apply Texts
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) heroTitle.textContent = settings.heroTitle;

    const heroSubtitle = document.querySelector('.hero p');
    if (heroSubtitle) heroSubtitle.textContent = settings.heroSubtitle;

    const aboutUsContent = document.getElementById('about-us-content');
    if (aboutUsContent) aboutUsContent.textContent = settings.aboutUsText;

    const expectationsContent = document.getElementById('expectations-content');
    if (expectationsContent) expectationsContent.textContent = settings.customerExpectationsText;

    // Apply Footer Contact Info
    const fAddress = document.getElementById('footer-address');
    if (fAddress) fAddress.textContent = settings.contactAddress;

    const fPhone = document.getElementById('footer-phone');
    if (fPhone) fPhone.textContent = settings.contactPhone;

    const fEmail = document.getElementById('footer-email');
    if (fEmail) fEmail.textContent = settings.contactEmail;

    const fInsta = document.getElementById('footer-insta');
    if (fInsta) fInsta.textContent = settings.contactInstagram;

    const fFeedback = document.getElementById('footer-feedback');
    if (fFeedback) fFeedback.textContent = settings.feedbackInfo;
}

function renderProducts() {
    const products = getProducts();
    const menuContainer = document.getElementById('menu-container');
    if (!menuContainer) return;
    menuContainer.innerHTML = '';

    const categories = ['Coffee Types', 'Matcha', 'Desserts'];

    categories.forEach(category => {
        const categoryProducts = products.filter(p => p.category === category);
        if (categoryProducts.length === 0) return;

        const categorySection = document.createElement('div');
        categorySection.className = 'menu-category';
        categorySection.innerHTML = `<h2 class="category-title">${category}</h2>`;
        
        const grid = document.createElement('div');
        grid.className = 'menu-grid';

        categoryProducts.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <div class="product-image" style="background-image: url('${product.image}')"></div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-desc">${product.description}</p>
                    <div class="product-details">
                        <small><strong>Calories:</strong> ${product.calories || 'N/A'}</small><br>
                        <small><strong>Ingredients:</strong> ${product.ingredients || 'N/A'}</small>
                    </div>
                    <div class="product-footer" style="margin-top:1rem;">
                        <span class="product-price">${product.price} ₺</span>
                        <button class="order-btn" data-id="${product.id}" data-name="${product.name}">Order</button>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });

        categorySection.appendChild(grid);
        menuContainer.appendChild(categorySection);
    });

    document.querySelectorAll('.order-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productName = e.target.getAttribute('data-name');
            alert(`Thanks for your interest in ${productName}! Data recorded.`);
            saveInteraction('product_click', productName);
        });
    });
}

function renderCareers() {
    const careers = getCareers();
    const careersContainer = document.getElementById('careers-list');
    if (!careersContainer) return;
    
    careersContainer.innerHTML = '';

    if (!careers || careers.length === 0) {
        careersContainer.innerHTML = '<p>No job openings at the moment. Check back later!</p>';
        return;
    }

    careers.forEach(job => {
        const div = document.createElement('div');
        div.className = 'career-card';
        div.innerHTML = `
            <h3>${job.title} <span class="job-status">${job.status}</span></h3>
            <p>${job.description}</p>
        `;
        careersContainer.appendChild(div);
    });
}

function setupForm() {
    const form = document.getElementById('customer-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const preference = document.getElementById('preference').value;
        const intent = document.getElementById('intent').value;

        const customerData = {
            id: Date.now(),
            name,
            email,
            preference,
            intent,
            date: new Date().toISOString()
        };

        const customers = getCustomers();
        customers.push(customerData);
        localStorage.setItem('vivere_customers', JSON.stringify(customers));

        saveInteraction('form_submission', preference);

        alert('Thank you! Your preferences have been saved securely.');
        form.reset();
    });
}
