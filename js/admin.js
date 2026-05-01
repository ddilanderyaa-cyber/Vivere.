// --- LOGIN LOGIC ---
function checkLogin() {
    const pass = document.getElementById('admin-pass').value;
    if (pass === 'gofik12345') {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('admin-layout').style.display = 'flex';
        initializeApp();
    } else {
        document.getElementById('login-error').style.display = 'block';
    }
}

// Ensure "Enter" key works for login
document.addEventListener('DOMContentLoaded', () => {
    const passInput = document.getElementById('admin-pass');
    if (passInput) {
        passInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') checkLogin();
        });
    }
});

function initializeApp() {
    initDashboard();
    renderAdminProducts();
    renderCustomers();
    renderAdminCareers();
    
    setupSettingsForm();
    setupProductForm();
    setupCareerForm();
}

// Tab Switching
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));
    
    document.getElementById(tabId).classList.add('active');
    document.querySelector(`.sidebar-nav a[href="#${tabId}"]`).classList.add('active');

    if (tabId === 'dashboard') initDashboard();
}

// --- DASHBOARD ---
function initDashboard() {
    const customers = getCustomers() || [];
    const interactions = getInteractions() || [];

    document.getElementById('stat-customers').textContent = customers.length;
    document.getElementById('stat-clicks').textContent = interactions.filter(i => i.type === 'product_click').length;

    const categoryCounts = {};
    customers.forEach(c => { categoryCounts[c.preference] = (categoryCounts[c.preference] || 0) + 1; });

    let popular = '-', max = 0;
    for (const [cat, count] of Object.entries(categoryCounts)) {
        if (count > max) { max = count; popular = cat; }
    }
    document.getElementById('stat-category').textContent = popular;

    const list = document.getElementById('recent-interactions');
    list.innerHTML = '';
    
    const recent = interactions.slice(-5).reverse();
    recent.forEach(i => {
        const li = document.createElement('li');
        const time = new Date(i.timestamp).toLocaleTimeString();
        li.innerHTML = i.type === 'product_click' 
            ? `[${time}] User clicked on product: <span>${i.detail}</span>`
            : `[${time}] Form submitted. Preference: <span>${i.detail}</span>`;
        list.appendChild(li);
    });
}

// --- SETTINGS ---
function setupSettingsForm() {
    const settings = getSettings();
    if (!settings) return;

    document.getElementById('set-primary').value = settings.primaryColor;
    document.getElementById('set-heading').value = settings.headingColor;
    document.getElementById('set-hero-bg').value = settings.heroBg;
    document.getElementById('set-hero-title').value = settings.heroTitle;
    document.getElementById('set-hero-subtitle').value = settings.heroSubtitle;
    document.getElementById('set-about').value = settings.aboutUsText;
    document.getElementById('set-expectations').value = settings.customerExpectationsText;
    document.getElementById('set-address').value = settings.contactAddress;
    document.getElementById('set-phone').value = settings.contactPhone;
    document.getElementById('set-email').value = settings.contactEmail;
    document.getElementById('set-insta').value = settings.contactInstagram;
    document.getElementById('set-feedback').value = settings.feedbackInfo;

    document.getElementById('settings-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const newSettings = {
            primaryColor: document.getElementById('set-primary').value,
            headingColor: document.getElementById('set-heading').value,
            heroBg: document.getElementById('set-hero-bg').value,
            heroTitle: document.getElementById('set-hero-title').value,
            heroSubtitle: document.getElementById('set-hero-subtitle').value,
            aboutUsText: document.getElementById('set-about').value,
            customerExpectationsText: document.getElementById('set-expectations').value,
            contactAddress: document.getElementById('set-address').value,
            contactPhone: document.getElementById('set-phone').value,
            contactEmail: document.getElementById('set-email').value,
            contactInstagram: document.getElementById('set-insta').value,
            feedbackInfo: document.getElementById('set-feedback').value
        };
        saveSettings(newSettings);
        alert('Settings Saved! Changes will appear on the website.');
    });
}

// --- PRODUCTS ---
function renderAdminProducts() {
    const products = getProducts() || [];
    const tbody = document.getElementById('product-table-body');
    tbody.innerHTML = '';

    products.forEach(p => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><img src="${p.image}" alt="${p.name}"></td>
            <td>${p.name}</td>
            <td>${p.category}</td>
            <td>${p.price}</td>
            <td>
                <button class="btn btn-primary" onclick="editProduct(${p.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteProduct(${p.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        let products = getProducts();
        products = products.filter(p => p.id !== id);
        saveProducts(products);
        renderAdminProducts();
    }
}

function openProductModal() {
    document.getElementById('product-form').reset();
    document.getElementById('prod-id').value = '';
    document.getElementById('modal-title').textContent = 'Add New Product';
    document.getElementById('product-modal').style.display = 'block';
}

function closeProductModal() {
    document.getElementById('product-modal').style.display = 'none';
}

function editProduct(id) {
    const p = getProducts().find(prod => prod.id === id);
    if (!p) return;

    document.getElementById('prod-id').value = p.id;
    document.getElementById('prod-name').value = p.name;
    document.getElementById('prod-category').value = p.category;
    document.getElementById('prod-price').value = p.price;
    document.getElementById('prod-desc').value = p.description;
    document.getElementById('prod-calories').value = p.calories || '';
    document.getElementById('prod-ingredients').value = p.ingredients || '';
    document.getElementById('prod-image').value = p.image;
    
    document.getElementById('modal-title').textContent = 'Edit Product';
    document.getElementById('product-modal').style.display = 'block';
}

function setupProductForm() {
    document.getElementById('product-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const id = document.getElementById('prod-id').value;
        const pData = {
            name: document.getElementById('prod-name').value,
            category: document.getElementById('prod-category').value,
            price: document.getElementById('prod-price').value,
            description: document.getElementById('prod-desc').value,
            calories: document.getElementById('prod-calories').value,
            ingredients: document.getElementById('prod-ingredients').value,
            image: document.getElementById('prod-image').value
        };

        let products = getProducts();
        if (id) {
            const idx = products.findIndex(p => p.id == id);
            if (idx !== -1) products[idx] = { ...pData, id: parseInt(id) };
        } else {
            pData.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
            products.push(pData);
        }

        saveProducts(products);
        closeProductModal();
        renderAdminProducts();
    });
}

// --- CAREERS ---
function renderAdminCareers() {
    const careers = getCareers() || [];
    const tbody = document.getElementById('career-table-body');
    tbody.innerHTML = '';

    careers.forEach(c => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${c.title}</td>
            <td>${c.status}</td>
            <td>
                <button class="btn btn-primary" onclick="editCareer(${c.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteCareer(${c.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function deleteCareer(id) {
    if (confirm('Delete this job?')) {
        let careers = getCareers().filter(c => c.id !== id);
        saveCareers(careers);
        renderAdminCareers();
    }
}

function openCareerModal() {
    document.getElementById('career-form').reset();
    document.getElementById('car-id').value = '';
    document.getElementById('career-modal-title').textContent = 'Add Job Posting';
    document.getElementById('career-modal').style.display = 'block';
}

function closeCareerModal() {
    document.getElementById('career-modal').style.display = 'none';
}

function editCareer(id) {
    const c = getCareers().find(car => car.id === id);
    if (!c) return;

    document.getElementById('car-id').value = c.id;
    document.getElementById('car-title').value = c.title;
    document.getElementById('car-desc').value = c.description;
    document.getElementById('car-status').value = c.status;
    
    document.getElementById('career-modal-title').textContent = 'Edit Job Posting';
    document.getElementById('career-modal').style.display = 'block';
}

function setupCareerForm() {
    document.getElementById('career-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const id = document.getElementById('car-id').value;
        const cData = {
            title: document.getElementById('car-title').value,
            description: document.getElementById('car-desc').value,
            status: document.getElementById('car-status').value
        };

        let careers = getCareers();
        if (id) {
            const idx = careers.findIndex(c => c.id == id);
            if (idx !== -1) careers[idx] = { ...cData, id: parseInt(id) };
        } else {
            cData.id = careers.length > 0 ? Math.max(...careers.map(c => c.id)) + 1 : 1;
            careers.push(cData);
        }

        saveCareers(careers);
        closeCareerModal();
        renderAdminCareers();
    });
}

// --- CUSTOMERS ---
function renderCustomers() {
    const customers = getCustomers() || [];
    const tbody = document.getElementById('customer-table-body');
    tbody.innerHTML = '';

    customers.forEach(c => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${new Date(c.date).toLocaleDateString()}</td>
            <td>${c.name}</td>
            <td>${c.email}</td>
            <td>${c.preference}</td>
            <td>${c.intent}</td>
        `;
        tbody.appendChild(tr);
    });
}
