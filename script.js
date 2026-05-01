const products = [
  { id: 1, icon: '☕', name: 'Signature Latte', price: 4.50, category: 'Hot Coffee', description: 'Espresso, steamed milk, caramel notes, and a smooth café finish.' },
  { id: 2, icon: '🧊', name: 'Cold Brew', price: 5.00, category: 'Cold Coffee', description: 'Slow-steeped cold coffee for customers who prefer refreshing drinks.' },
  { id: 3, icon: '🥐', name: 'Almond Croissant', price: 3.75, category: 'Pastry', description: 'Freshly baked pastry that pairs well with both hot and cold coffee.' },
  { id: 4, icon: '📦', name: 'Monthly Coffee Plan', price: 22.00, category: 'Subscription', description: 'A subscription service for regular customers and home coffee lovers.' }
];

const storageKey = 'aromaBIData';
const defaultData = {
  productClicks: { 1: 18, 2: 26, 3: 15, 4: 11 },
  cartAdds: { 1: 8, 2: 14, 3: 6, 4: 5 },
  customers: [
    { name: 'Ayşe', email: 'ayse@example.com', preference: 'Cold Coffee', intent: 'Today', feedback: 'I like seasonal drinks.' },
    { name: 'Mert', email: 'mert@example.com', preference: 'Hot Coffee', intent: 'This Week', feedback: 'More loyalty discounts please.' }
  ]
};

function loadData(){
  return JSON.parse(localStorage.getItem(storageKey)) || defaultData;
}
function saveData(data){ localStorage.setItem(storageKey, JSON.stringify(data)); }
function track(productId, action){
  const data = loadData();
  if(action === 'click') data.productClicks[productId] = (data.productClicks[productId] || 0) + 1;
  if(action === 'cart') data.cartAdds[productId] = (data.cartAdds[productId] || 0) + 1;
  saveData(data); renderDashboard();
}

function renderProducts(){
  const grid = document.getElementById('productGrid');
  grid.innerHTML = products.map(p => `
    <article class="product-card">
      <div class="product-icon">${p.icon}</div>
      <h3>${p.name}</h3>
      <div class="price">$${p.price.toFixed(2)}</div>
      <p>${p.description}</p>
      <div class="card-actions">
        <button class="secondary-btn" onclick="track(${p.id}, 'click')">View details</button>
        <button class="secondary-btn" onclick="track(${p.id}, 'cart')">Add to cart</button>
      </div>
    </article>`).join('');
}

function renderDashboard(){
  const data = loadData();
  const totalClicks = Object.values(data.productClicks).reduce((a,b)=>a+b,0);
  const cartAdds = Object.values(data.cartAdds).reduce((a,b)=>a+b,0);
  const topId = Object.entries(data.productClicks).sort((a,b)=>b[1]-a[1])[0]?.[0];
  document.getElementById('totalClicks').textContent = totalClicks;
  document.getElementById('cartAdds').textContent = cartAdds;
  document.getElementById('customers').textContent = data.customers.length;
  document.getElementById('topProduct').textContent = products.find(p=>p.id == topId)?.name || '-';

  const max = Math.max(...Object.values(data.productClicks), 1);
  document.getElementById('barChart').innerHTML = products.map(p => {
    const value = data.productClicks[p.id] || 0;
    const height = Math.max(28, Math.round((value / max) * 210));
    return `<div class="bar-wrap"><div class="bar" style="height:${height}px">${value}</div><div class="bar-label">${p.name}</div></div>`;
  }).join('');
}

document.getElementById('customerForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  const formData = Object.fromEntries(new FormData(e.target).entries());
  const data = loadData();
  data.customers.push(formData);
  saveData(data);
  e.target.reset();
  document.getElementById('formMessage').textContent = 'Customer data saved in local storage for this demo.';
  renderDashboard();
});

renderProducts();
saveData(loadData());
renderDashboard();
