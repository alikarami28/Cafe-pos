// ==================== متغیرها ====================
let products = [];
let orders = [];
let settings = {};
let currentCart = [];
let currentDiscount = 0;
let currentOrderData = null;

// ==================== جملات انگیزشی کافه ====================
const cafeQuotes = [
    "☕ زندگی مثل قهوه است؛ تلخ و شیرینش به دم‌کردن تو بستگی دارد.",
    "✨ هر فنجان قهوه، شروعی دوباره برای یک روز تازه است.",
    "🌅 صبح‌ها با قهوه آغاز می‌شوند، رویاها با امید.",
    "💫 قهوه‌ات را بنوش، نفسی عمیق بکش و جهان را تغییر بده.",
    "🍃 در گرماگرم زندگی، یک فنجان قهوه بهترین بهانه برای مکث است.",
    "🌟 امروز را با طعم قهوه و عطر امید آغاز کن.",
    "🫘 دانه‌های قهوه له می‌شوند تا عطرشان آزاد شود؛ تو هم از سختی‌ها قوی‌تر می‌شوی.",
    "☀️ پشت هر ابری، خورشیدی منتظر طلوع است؛ مثل عطر قهوه در صبحگاهی دل‌انگیز.",
    "💭 گاهی بهترین تصمیم‌ها، پشت یک فنجان قهوه گرفته می‌شوند.",
    "🌺 زندگی کوتاه‌تر از آن است که قهوه‌ات را سرد بنوشی.",
    "🕊️ آرامش یعنی: یک کتاب خوب، یک فنجان قهوه گرم، و سکوت.",
    "🔥 از تلخی قهوه نترس؛ شیرینی زندگی در همان تلخی‌ها پنهان است.",
    "🎯 امروز را زندگی کن؛ دیروز تمام شد، فردا هنوز نیامده است.",
    "🌈 بعد از هر طوفانی، رنگین‌کمانی هست؛ صبور باش.",
    "🍯 مثل عسل در قهوه، شیرینی را به تلخی‌های زندگی اضافه کن.",
    "⛅ هر روز فرصتی تازه است؛ قهوه‌ات را بردار و شروع کن.",
    "💪 تو قوی‌تر از آنی که فکر می‌کنی؛ ادامه بده.",
    "🌻 در تاریک‌ترین شب‌ها هم ستاره‌ها می‌درخشند؛ امیدت را حفظ کن.",
    "🎵 زندگی آهنگی است که تو آهنگسازش هستی؛ قشنگ بنواز.",
    "☕ یک فنجان قهوه، یک دنیا آرامش.",
    "🏔️ قله‌های بلند با قدم‌های کوچک فتح می‌شوند؛ استوار باش.",
    "🍀 شانس به سراغ کسانی می‌آید که تلاش می‌کنند.",
    "💖 امروز را با عشق زندگی کن؛ فردا دیر است.",
    "🦋 تغییر، زیباست؛ مثل پروانه شدن.",
    "🌊 زندگی مثل موج است؛ گاهی بالا، گاهی پایین؛ مهم ادامه دادن است.",
    "☕ قهوه تلخ را تحمل کن تا طعم شیرین زندگی را بچشی.",
    "🌟 تو نوری در این جهان هستی؛ بدرخش.",
    "🌿 ساده زندگی کن، عمیق نفس بکش، آرام لبخند بزن.",
    "🕰️ وقت‌های خوش را دریاب؛ مثل یک فنجان قهوه داغ در روز سرد.",
    "💫 هر پایان، آغازی تازه است؛ مثل فنجان خالی که دوباره پر می‌شود."
];

// ==================== راه‌اندازی ====================
document.addEventListener('DOMContentLoaded', function() {
    loadAllData();
    loadCart();
    renderProductsList();
    renderCategoriesList();
    updateDateTime();
    setInterval(updateDateTime, 1000);
    updateCartCount();
    loadSettingsToForm();
    
    document.getElementById('productForm').addEventListener('click', function(e) {
        if (e.target === this) hideProductForm();
    });
    
    document.querySelectorAll('.payment-option').forEach(opt => {
        opt.addEventListener('click', function() {
            document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            this.querySelector('input').checked = true;
        });
    });
});

// ==================== داده‌ها ====================
function loadAllData() {
    const sp = localStorage.getItem('cafe_products');
    if (sp) { try { products = JSON.parse(sp); } catch(e) { products = []; } }
    
    if (products.length === 0) {
        products = [
            { id: 1, name: 'اسپرسو', category: 'نوشیدنی گرم', price: 45000, available: true, order: 1 },
            { id: 2, name: 'لاته', category: 'نوشیدنی گرم', price: 65000, available: true, order: 2 },
            { id: 3, name: 'کاپوچینو', category: 'نوشیدنی گرم', price: 60000, available: true, order: 3 },
            { id: 4, name: 'موکا', category: 'نوشیدنی گرم', price: 70000, available: true, order: 4 },
            { id: 5, name: 'آیس لاته', category: 'نوشیدنی سرد', price: 70000, available: true, order: 5 },
            { id: 6, name: 'اسموتی', category: 'نوشیدنی سرد', price: 65000, available: true, order: 6 },
            { id: 7, name: 'چای سیاه', category: 'چای و دمنوش', price: 30000, available: true, order: 7 },
            { id: 8, name: 'چای سبز', category: 'چای و دمنوش', price: 35000, available: true, order: 8 },
            { id: 9, name: 'دمنوش بابونه', category: 'چای و دمنوش', price: 40000, available: true, order: 9 },
            { id: 10, name: 'چیزکیک', category: 'کیک و دسر', price: 55000, available: true, order: 10 },
            { id: 11, name: 'کیک شکلاتی', category: 'کیک و دسر', price: 45000, available: true, order: 11 },
            { id: 12, name: 'براونی', category: 'کیک و دسر', price: 40000, available: true, order: 12 }
        ];
        saveProducts();
    }
    
    const so = localStorage.getItem('cafe_orders');
    if (so) { try { orders = JSON.parse(so); } catch(e) { orders = []; } }
    
    const ss = localStorage.getItem('cafe_settings');
    if (ss) { try { settings = JSON.parse(ss); } catch(e) { settings = {}; } }
}

function saveProducts() { localStorage.setItem('cafe_products', JSON.stringify(products)); }
function saveOrders() { localStorage.setItem('cafe_orders', JSON.stringify(orders)); }
function saveSettings() { localStorage.setItem('cafe_settings', JSON.stringify(settings)); }
function getNextId(items) { return items.length === 0 ? 1 : Math.max(...items.map(i => i.id)) + 1; }

// ==================== ناوبری ====================
function navigateTo(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    
    const el = document.getElementById('page-' + page);
    if (el) el.classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.textContent.includes(getNavName(page))) btn.classList.add('active');
    });
    
    if (page === 'pos') { renderProductsList(); renderCategoriesList(); }
    if (page === 'cart') renderCart();
    if (page === 'products') renderProductList();
    if (page === 'reports') generateReport();
}

function getNavName(page) {
    const names = { pos: 'فروش', products: 'محصولات', reports: 'گزارشات', settings: 'تنظیمات' };
    return names[page] || '';
}

// ==================== محصولات ====================
function renderProductsList(category = 'all') {
    const container = document.getElementById('productsGrid');
    if (!container) return;
    
    let filtered = category === 'all' ? products : products.filter(p => p.category === category);
    
    // مرتب‌سازی بر اساس فیلد order
    filtered.sort((a, b) => (a.order || 999) - (b.order || 999));
    
    if (filtered.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-box-open"></i><p>محصولی یافت نشد</p></div>';
        return;
    }
    
    container.innerHTML = filtered.map(p => `
        <div class="product-card" data-name="${p.name}">
            <h3>${p.name}</h3>
            <span class="category">${p.category}</span>
            <span class="price">${Number(p.price).toLocaleString('fa-IR')} تومان</span>
            <button class="add-btn" onclick="addToCart(${p.id})" ${!p.available ? 'disabled' : ''}>
                ${p.available ? 'افزودن به سبد' : 'ناموجود'}
            </button>
        </div>
    `).join('');
}

function renderCategoriesList() {
    const container = document.getElementById('categoryFilter');
    if (!container) return;
    
    const order = ['نوشیدنی گرم', 'نوشیدنی سرد', 'چای و دمنوش', 'کیک و دسر'];
    const existing = [...new Set(products.map(p => p.category))];
    const sorted = order.filter(c => existing.includes(c));
    const others = existing.filter(c => !order.includes(c));
    
    container.innerHTML = [
        '<button class="category-btn active" onclick="filterByCategory(\'all\')">همه</button>',
        ...sorted.map(c => `<button class="category-btn" onclick="filterByCategory('${c}')">${c}</button>`),
        ...others.map(c => `<button class="category-btn" onclick="filterByCategory('${c}')">${c}</button>`)
    ].join('');
}

function filterByCategory(category) {
    document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    renderProductsList(category);
}

function searchProducts() {
    const term = document.getElementById('searchProduct').value.toLowerCase();
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.display = card.dataset.name.toLowerCase().includes(term) ? 'block' : 'none';
    });
}

// ==================== مدیریت محصولات ====================
function renderProductList() {
    const container = document.getElementById('productsList');
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>محصولی ثبت نشده</p></div>';
        return;
    }
    
    // مرتب‌سازی بر اساس order
    const sortedProducts = [...products].sort((a, b) => (a.order || 999) - (b.order || 999));
    
    container.innerHTML = sortedProducts.map(p => `
        <div class="product-item">
            <div class="info">
                <span class="name">🔢 ${p.order || '-'} | ${p.name}</span>
                <span class="meta">${p.category} | ${Number(p.price).toLocaleString('fa-IR')} تومان</span>
                <span class="status ${p.available ? 'available' : 'unavailable'}">${p.available ? 'موجود' : 'ناموجود'}</span>
            </div>
            <div style="display:flex;gap:4px;">
                <button class="btn btn-secondary" style="padding:6px 10px;font-size:12px;" onclick="editProduct(${p.id})"><i class="fas fa-edit"></i></button>
                <button class="btn btn-outline" style="padding:6px 10px;font-size:12px;color:var(--danger);" onclick="deleteProduct(${p.id})"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');
}

function showProductForm(id = null) {
    const form = document.getElementById('productForm');
    document.getElementById('formTitle').textContent = id ? 'ویرایش محصول' : 'محصول جدید';
    document.getElementById('productId').value = id || '';
    
    if (id) {
        const p = products.find(p => p.id === id);
        if (p) {
            document.getElementById('productName').value = p.name;
            document.getElementById('productCategory').value = p.category;
            document.getElementById('productPrice').value = p.price;
            document.getElementById('productAvailable').value = p.available ? 'true' : 'false';
            document.getElementById('productOrder').value = p.order || products.length + 1;
        }
    } else {
        document.getElementById('productName').value = '';
        document.getElementById('productCategory').value = 'نوشیدنی گرم';
        document.getElementById('productPrice').value = '';
        document.getElementById('productAvailable').value = 'true';
        document.getElementById('productOrder').value = products.length + 1;
    }
    
    form.classList.add('show');
}

function hideProductForm() {
    document.getElementById('productForm').classList.remove('show');
}

function saveProduct() {
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value.trim();
    const category = document.getElementById('productCategory').value;
    const price = parseInt(document.getElementById('productPrice').value);
    const available = document.getElementById('productAvailable').value === 'true';
    const order = parseInt(document.getElementById('productOrder').value) || products.length + 1;
    
    if (!name) { showToast('نام محصول الزامی است', 'error'); return; }
    if (!price || price <= 0) { showToast('قیمت معتبر وارد کنید', 'error'); return; }
    
    if (id) {
        const index = products.findIndex(p => p.id === parseInt(id));
        if (index !== -1) products[index] = { ...products[index], name, category, price, available, order };
    } else {
        products.push({ id: getNextId(products), name, category, price, available, order });
    }
    
    saveProducts();
    hideProductForm();
    renderProductList();
    renderProductsList();
    renderCategoriesList();
    showToast(id ? 'محصول ویرایش شد' : 'محصول جدید اضافه شد', 'success');
}

function editProduct(id) { showProductForm(id); }

function deleteProduct(id) {
    const p = products.find(p => p.id === id);
    if (!p) return;
    if (confirm(`حذف "${p.name}"؟`)) {
        products = products.filter(p => p.id !== id);
        saveProducts();
        renderProductList();
        renderProductsList();
        renderCategoriesList();
        showToast('محصول حذف شد', 'warning');
    }
}

// ==================== سبد خرید ====================
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.available) { showToast('محصول ناموجود است', 'warning'); return; }
    
    const existing = currentCart.find(i => i.productId === product.id);
    if (existing) {
        existing.quantity++;
        existing.totalPrice = existing.quantity * existing.unitPrice;
    } else {
        currentCart.push({ productId: product.id, name: product.name, unitPrice: product.price, quantity: 1, totalPrice: product.price });
    }
    
    saveCart();
    updateCartCount();
    showToast(`${product.name} افزوده شد`, 'success');
}

function updateCartItem(productId, change) {
    const item = currentCart.find(i => i.productId === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) currentCart = currentCart.filter(i => i.productId !== productId);
        else item.totalPrice = item.quantity * item.unitPrice;
    }
    saveCart();
    renderCart();
    updateCartCount();
}

function removeFromCart(productId) {
    currentCart = currentCart.filter(i => i.productId !== productId);
    saveCart();
    renderCart();
    updateCartCount();
}

function renderCart() {
    const container = document.getElementById('cartItems');
    const summary = document.getElementById('cartSummary');
    if (!container || !summary) return;
    
    if (currentCart.length === 0) {
        container.innerHTML = '<div class="empty-state"><i class="fas fa-shopping-basket"></i><p>سبد خرید خالی است</p></div>';
        summary.innerHTML = '';
        return;
    }
    
    container.innerHTML = currentCart.map(item => `
        <div class="cart-item">
            <div class="item-info">
                <span class="item-name">${item.name}</span>
                <span class="item-price">${Number(item.unitPrice).toLocaleString('fa-IR')} تومان</span>
            </div>
            <div class="qty-control">
                <button class="qty-btn" onclick="updateCartItem(${item.productId}, -1)">−</button>
                <span class="qty-value">${item.quantity}</span>
                <button class="qty-btn" onclick="updateCartItem(${item.productId}, 1)">+</button>
            </div>
            <span class="item-total">${Number(item.totalPrice).toLocaleString('fa-IR')} تومان</span>
            <button class="remove-btn" onclick="removeFromCart(${item.productId})"><i class="fas fa-times"></i></button>
        </div>
    `).join('');
    
    const subtotal = currentCart.reduce((s, i) => s + i.totalPrice, 0);
    const total = subtotal - currentDiscount;
    
    summary.innerHTML = `
        <div class="row"><span>جمع</span><span>${subtotal.toLocaleString('fa-IR')} تومان</span></div>
        ${currentDiscount > 0 ? `<div class="row discount"><span>تخفیف</span><span>−${currentDiscount.toLocaleString('fa-IR')} تومان</span></div>` : ''}
        <div class="row total"><span>مبلغ نهایی</span><span>${total.toLocaleString('fa-IR')} تومان</span></div>
    `;
}

function openCheckout() {
    if (currentCart.length === 0) { showToast('سبد خرید خالی است', 'warning'); return; }
    document.getElementById('page-checkout').classList.add('active');
    updateCheckout();
}

function updateCheckout() {
    currentDiscount = parseInt(document.getElementById('discountAmount').value) || 0;
    const total = currentCart.reduce((s, i) => s + i.totalPrice, 0) - currentDiscount;
    document.getElementById('finalAmount').textContent = total.toLocaleString('fa-IR') + ' تومان';
    
    document.getElementById('checkoutDetails').innerHTML = `
        <div class="section-card">
            <h3>اقلام سفارش</h3>
            ${currentCart.map(item => `
                <div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #eee;">
                    <span>${item.name} × ${item.quantity}</span>
                    <span>${Number(item.totalPrice).toLocaleString('fa-IR')} تومان</span>
                </div>
            `).join('')}
        </div>
    `;
}

function processPayment() {
    if (currentCart.length === 0) { showToast('سبد خرید خالی است', 'error'); return; }
    
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const subtotal = currentCart.reduce((s, i) => s + i.totalPrice, 0);
    const total = subtotal - currentDiscount;
    
    const order = {
        id: getNextId(orders),
        items: [...currentCart],
        subtotal, discount: currentDiscount, total,
        paymentMethod,
        datetime: new Date().toISOString(),
        status: 'completed'
    };
    
    orders.push(order);
    saveOrders();
    
    showReceipt(order);
    
    currentCart = [];
    currentDiscount = 0;
    saveCart();
    updateCartCount();
    
    document.getElementById('discountAmount').value = 0;
    document.getElementById('page-checkout').classList.remove('active');
}

function clearCart() {
    if (currentCart.length === 0) return;
    if (confirm('خالی کردن سبد خرید؟')) {
        currentCart = [];
        currentDiscount = 0;
        saveCart();
        renderCart();
        updateCartCount();
    }
}

function saveCart() { localStorage.setItem('currentCart', JSON.stringify(currentCart)); }
function loadCart() {
    const s = localStorage.getItem('currentCart');
    if (s) { try { currentCart = JSON.parse(s); } catch(e) { currentCart = []; } }
}

function updateCartCount() {
    const count = currentCart.reduce((s, i) => s + i.quantity, 0);
    const el = document.getElementById('cartCount');
    if (el) {
        el.textContent = count;
        el.classList.toggle('show', count > 0);
    }
}

// ==================== پیش‌نمایش فاکتور ====================
function showReceipt(order) {
    currentOrderData = order;
    
    const shopName = settings.shopName || 'کافه من';
    const shopPhone = settings.shopPhone || '';
    const date = new Date(order.datetime);
    
    const randomQuote = cafeQuotes[Math.floor(Math.random() * cafeQuotes.length)];
    
    document.getElementById('receiptContent').innerHTML = `
        <div class="receipt-header">
            <h3>${shopName}</h3>
            ${shopPhone ? `<small>${shopPhone}</small>` : ''}
            <small>${date.toLocaleDateString('fa-IR')} - ${date.toLocaleTimeString('fa-IR')}</small>
        </div>
        <div class="receipt-divider">━━━━━━━━━━━━━━━━</div>
        <div class="receipt-row title"><span>شرح</span><span>قیمت</span></div>
        ${order.items.map(item => `
            <div class="receipt-row">
                <span>${item.name}</span>
                <span>${Number(item.unitPrice).toLocaleString('fa-IR')}</span>
            </div>
            <div class="receipt-row" style="font-size:11px;color:#666;">
                <span>  × ${item.quantity} عدد</span>
                <span>${Number(item.totalPrice).toLocaleString('fa-IR')}</span>
            </div>
        `).join('')}
        <div class="receipt-divider">━━━━━━━━━━━━━━━━</div>
        <div class="receipt-row"><span>تعداد اقلام:</span><span>${order.items.reduce((s,i) => s + i.quantity, 0)} عدد</span></div>
        <div class="receipt-row"><span>جمع کل:</span><span>${Number(order.subtotal).toLocaleString('fa-IR')} تومان</span></div>
        ${order.discount > 0 ? `<div class="receipt-row" style="color:#c62828;"><span>تخفیف:</span><span>-${Number(order.discount).toLocaleString('fa-IR')} تومان</span></div>` : ''}
        <div class="receipt-row total"><span>مبلغ نهایی:</span><span>${Number(order.total).toLocaleString('fa-IR')} تومان</span></div>
        <div class="receipt-divider">━━━━━━━━━━━━━━━━</div>
        <div style="text-align:center;margin:4px 0;"><span>روش پرداخت: ${order.paymentMethod === 'cash' ? 'نقدی' : 'کارت خوان'}</span></div>
        <div class="receipt-divider">━━━━━━━━━━━━━━━━</div>
        <div class="receipt-footer">
            <p style="margin:8px 0;line-height:1.8;font-style:italic;">${randomQuote}</p>
            <p>با آرزوی روزی خوش برای شما</p>
            <p style="margin-top:8px;font-size:10px;">${shopName} - سپاسگزاریم</p>
        </div>
    `;
    
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-receipt').classList.add('active');
}

function closeReceipt() {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-pos').classList.add('active');
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.nav-btn')?.classList.add('active');
    currentOrderData = null;
}

function printReceipt() {
    window.print();
}

// ==================== گزارشات ====================
function changeReportPeriod(period) {
    document.getElementById('reportPeriod').value = period;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    generateReport();
}

function generateReport() {
    const period = document.getElementById('reportPeriod').value;
    const now = new Date();
    let startDate;
    
    if (period === 'daily') startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    else if (period === 'weekly') { startDate = new Date(now); startDate.setDate(now.getDate() - now.getDay()); startDate.setHours(0,0,0,0); }
    else startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    
    const filtered = orders.filter(o => new Date(o.datetime) >= startDate);
    
    if (filtered.length === 0) {
        document.getElementById('reportSummary').innerHTML = '<div class="empty-state"><p>سفارشی یافت نشد</p></div>';
        document.getElementById('reportDetails').innerHTML = '';
        return;
    }
    
    const totalSales = filtered.reduce((s, o) => s + o.total, 0);
    
    document.getElementById('reportSummary').innerHTML = `
        <div class="report-cards">
            <div class="report-card"><span class="value">${totalSales.toLocaleString('fa-IR')}</span><span class="label">فروش کل (تومان)</span></div>
            <div class="report-card"><span class="value">${filtered.length}</span><span class="label">تعداد سفارش</span></div>
            <div class="report-card"><span class="value">${Math.round(totalSales/filtered.length).toLocaleString('fa-IR')}</span><span class="label">میانگین</span></div>
        </div>
    `;
    
    document.getElementById('reportDetails').innerHTML = `
        <h3 style="margin-bottom:10px;">آخرین سفارشات</h3>
        ${filtered.slice(-10).reverse().map(o => `
            <div class="cart-item" style="margin-bottom:6px;">
                <div class="item-info">
                    <span class="item-name">#${o.id}</span>
                    <span class="item-price">${new Date(o.datetime).toLocaleTimeString('fa-IR')} | ${o.paymentMethod === 'cash' ? 'نقدی' : 'کارت'}</span>
                </div>
                <span class="item-total">${Number(o.total).toLocaleString('fa-IR')} تومان</span>
            </div>
        `).join('')}
    `;
}

function exportCSV() {
    if (orders.length === 0) { showToast('داده‌ای نیست', 'warning'); return; }
    let csv = 'شماره,تاریخ,مبلغ,تخفیف,نهایی,پرداخت\n';
    orders.forEach(o => { csv += `${o.id},${o.datetime},${o.subtotal},${o.discount},${o.total},${o.paymentMethod}\n`; });
    const blob = new Blob(['\ufeff' + csv], {type: 'text/csv'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'گزارش.csv'; a.click();
    showToast('دانلود شد', 'success');
}

// ==================== پرینتر ====================
async function connectPrinter() {
    try {
        await navigator.bluetooth.requestDevice({ acceptAllDevices: true, optionalServices: ['00001101-0000-1000-8000-00805f9b34fb'] });
        document.getElementById('printerStatus').innerHTML = '<span style="color:#2e7d32;">● متصل</span>';
        showToast('متصل شد', 'success');
    } catch(e) { showToast('خطا - از Chrome استفاده کنید', 'error'); }
}

// ==================== تنظیمات ====================
function loadSettingsToForm() {
    if (settings.shopName) document.getElementById('shopName').value = settings.shopName;
    if (settings.shopSlogan) document.getElementById('shopSlogan').value = settings.shopSlogan || '';
    if (settings.shopPhone) document.getElementById('shopPhone').value = settings.shopPhone || '';
}

function saveSettingsData() {
    settings.shopName = document.getElementById('shopName').value;
    settings.shopSlogan = document.getElementById('shopSlogan').value;
    settings.shopPhone = document.getElementById('shopPhone').value;
    saveSettings();
    showToast('تنظیمات ذخیره شد', 'success');
}

function backupData() {
    const data = { products, orders, settings, date: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data)], {type: 'application/json'});
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'backup.json'; a.click();
    showToast('دانلود شد', 'success');
}

function restoreData() { document.getElementById('uploadDB').click(); }

function uploadDBFile(file) {
    if (!file || !confirm('جایگزینی داده‌ها؟')) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data.products) { products = data.products; saveProducts(); }
            if (data.orders) { orders = data.orders; saveOrders(); }
            if (data.settings) { settings = data.settings; saveSettings(); loadSettingsToForm(); }
            renderProductsList(); renderCategoriesList();
            showToast('بازگردانی شد', 'success');
        } catch(err) { showToast('خطا در فایل', 'error'); }
    };
    reader.readAsText(file);
}

// ==================== کمکی ====================
function updateDateTime() {
    const el = document.getElementById('dateTime');
    if (el) {
        const now = new Date();
        el.textContent = now.toLocaleDateString('fa-IR', { weekday: 'long', day: 'numeric', month: 'long' }) + '  ' + now.toLocaleTimeString('fa-IR');
    }
}

function showToast(message, type = 'success') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => { if (toast.parentElement) toast.remove(); }, 2500);
}