/**
 * QUÁN ĂN 396 - BÒ NÉ & BÒ BÍT TẾT NGUYỄN THỊ KIỂU Q.12
 * Xử lý logic thực đơn, giỏ gọi món, đặt bàn trực tuyến, bản đồ và hiệu ứng tương tác
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    menu: [...MENU_ITEMS],
    currentCategory: 'all',
    searchQuery: '',
    cart: JSON.parse(localStorage.getItem('scb396_cart') || '[]'),
    theme: localStorage.getItem('scb396_theme') || 'dark'
  };

  // DOM Elements Cache
  const el = {
    html: document.documentElement,
    btnThemeToggle: document.getElementById('btnThemeToggle'),
    liveOpenStatus: document.getElementById('liveOpenStatus'),
    
    // Menu elements
    menuItemsGrid: document.getElementById('menuItemsGrid'),
    menuSearchInput: document.getElementById('menuSearchInput'),
    categoryPills: document.getElementById('categoryPills'),
    menuEmptyState: document.getElementById('menuEmptyState'),
    btnResetMenuSearch: document.getElementById('btnResetMenuSearch'),

    // Category Counts
    countAll: document.getElementById('countAll'),
    countBoNe: document.getElementById('countBoNe'),
    countBitTet: document.getElementById('countBitTet'),
    countMiCay: document.getElementById('countMiCay'),
    countTopping: document.getElementById('countTopping'),
    countDrinks: document.getElementById('countDrinks'),

    // Cart Elements
    cartCountBadge: document.getElementById('cartCountBadge'),
    btnOpenCartDrawer: document.getElementById('btnOpenCartDrawer'),
    cartDrawerOverlay: document.getElementById('cartDrawerOverlay'),
    btnCloseCartDrawer: document.getElementById('btnCloseCartDrawer'),
    cartItemsContainer: document.getElementById('cartItemsContainer'),
    cartTotalAmount: document.getElementById('cartTotalAmount'),
    btnCheckoutZalo: document.getElementById('btnCheckoutZalo'),

    // Reservation Modal
    btnOpenReserveModal: document.getElementById('btnOpenReserveModal'),
    btnOpenReserveFromSpace: document.getElementById('btnOpenReserveFromSpace'),
    reserveModalOverlay: document.getElementById('reserveModalOverlay'),
    btnCloseReserveModal: document.getElementById('btnCloseReserveModal'),
    reserveForm: document.getElementById('reserveForm'),
    resTime: document.getElementById('resTime'),

    // Reviews & Copy
    reviewsGrid: document.getElementById('reviewsGrid'),
    btnCopyAddress: document.getElementById('btnCopyAddress'),
    toastContainer: document.getElementById('toastContainer')
  };

  // -------------------------------------------------------------
  // INITIALIZATION
  // -------------------------------------------------------------
  function init() {
    initTheme();
    checkOpeningHours();
    updateCategoryCounts();
    renderMenuItems();
    renderReviews();
    updateCartUI();
    initReservationDatetime();
    attachEventListeners();
  }

  // -------------------------------------------------------------
  // THEME MANAGEMENT
  // -------------------------------------------------------------
  function initTheme() {
    el.html.setAttribute('data-theme', state.theme);
  }

  function toggleTheme() {
    state.theme = state.theme === 'dark' ? 'light' : 'dark';
    el.html.setAttribute('data-theme', state.theme);
    localStorage.setItem('scb396_theme', state.theme);
    showToast(`Đã chuyển sang giao diện ${state.theme === 'dark' ? 'Tối (Cast Iron)' : 'Sáng (Cozy Light)'}`);
  }

  // -------------------------------------------------------------
  // OPENING HOURS CHECKER
  // -------------------------------------------------------------
  function checkOpeningHours() {
    const now = new Date();
    const hour = now.getHours();

    // Opening hours: 06:00 to 23:00
    const isOpen = hour >= 6 && hour < 23;

    if (el.liveOpenStatus) {
      if (isOpen) {
        el.liveOpenStatus.innerHTML = `Đang Mở Cửa Phục Vụ (06:00 - 23:00)`;
        el.liveOpenStatus.style.color = '#86efac';
      } else {
        el.liveOpenStatus.innerHTML = `Quán Tạm Nghỉ (Hẹn gặp quý khách vào 06:00 sáng mai)`;
        el.liveOpenStatus.style.color = '#fdba74';
      }
    }
  }

  // -------------------------------------------------------------
  // MENU CATEGORY COUNTS
  // -------------------------------------------------------------
  function updateCategoryCounts() {
    if (el.countAll) el.countAll.textContent = state.menu.length;
    if (el.countBoNe) el.countBoNe.textContent = state.menu.filter(i => i.category === 'bo-ne').length;
    if (el.countBitTet) el.countBitTet.textContent = state.menu.filter(i => i.category === 'bit-tet').length;
    if (el.countMiCay) el.countMiCay.textContent = state.menu.filter(i => i.category === 'mi-cay').length;
    if (el.countTopping) el.countTopping.textContent = state.menu.filter(i => i.category === 'topping').length;
    if (el.countDrinks) el.countDrinks.textContent = state.menu.filter(i => i.category === 'drinks').length;
  }

  // -------------------------------------------------------------
  // MENU FILTERING & RENDERING
  // -------------------------------------------------------------
  function getFilteredMenu() {
    return state.menu.filter(item => {
      // Category check
      if (state.currentCategory !== 'all' && item.category !== state.currentCategory) {
        return false;
      }
      // Search query check
      if (state.searchQuery.trim() !== '') {
        const q = state.searchQuery.toLowerCase().trim();
        const inName = item.name.toLowerCase().includes(q);
        const inDesc = item.desc.toLowerCase().includes(q);
        const inTags = item.tags.some(t => t.toLowerCase().includes(q));
        if (!inName && !inDesc && !inTags) {
          return false;
        }
      }
      return true;
    });
  }

  function renderMenuItems() {
    const items = getFilteredMenu();

    if (items.length === 0) {
      el.menuItemsGrid.innerHTML = '';
      el.menuEmptyState.style.display = 'block';
      return;
    }

    el.menuEmptyState.style.display = 'none';

    el.menuItemsGrid.innerHTML = items.map(dish => {
      const badgeHtml = dish.badge 
        ? `<span class="menu-card-badge">${dish.badge}</span>` 
        : '';

      return `
        <article class="menu-card" data-dish-id="${dish.id}">
          <div class="menu-card-top">
            <div class="menu-card-thumb">
              <img src="${dish.image}" alt="${dish.name}" loading="lazy">
            </div>
            <div class="menu-card-info">
              ${badgeHtml}
              <h3 class="menu-card-title">${dish.name}</h3>
              <p class="menu-card-desc">${dish.desc}</p>
            </div>
          </div>

          <div class="menu-card-tags">
            ${dish.tags.map(t => `<span class="food-tag">#${t}</span>`).join('')}
          </div>

          <div class="menu-card-bottom">
            <span class="menu-card-price">${dish.priceDisplay}</span>
            <button class="btn-order-add" data-add-id="${dish.id}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              <span>Thêm Món</span>
            </button>
          </div>
        </article>
      `;
    }).join('');

    // Attach click listener to add dish buttons
    el.menuItemsGrid.querySelectorAll('[data-add-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-add-id');
        addToCart(id);
      });
    });
  }

  // -------------------------------------------------------------
  // CART / MÂM GỌI MÓN LOGIC
  // -------------------------------------------------------------
  function addToCart(dishId) {
    const dish = state.menu.find(d => d.id === dishId);
    if (!dish) return;

    const existingIndex = state.cart.findIndex(i => i.id === dishId);

    if (existingIndex > -1) {
      state.cart[existingIndex].qty += 1;
    } else {
      state.cart.push({
        id: dish.id,
        name: dish.name,
        price: dish.price,
        priceDisplay: dish.priceDisplay,
        qty: 1
      });
    }

    saveCart();
    updateCartUI();
    showToast(`Đã thêm "${dish.name}" vào mâm! 🍳`);

    // Bump cart badge animation
    if (el.cartCountBadge) {
      el.cartCountBadge.style.transform = 'scale(1.4)';
      setTimeout(() => {
        el.cartCountBadge.style.transform = 'scale(1)';
      }, 200);
    }
  }

  function updateItemQty(dishId, delta) {
    const index = state.cart.findIndex(i => i.id === dishId);
    if (index === -1) return;

    state.cart[index].qty += delta;

    if (state.cart[index].qty <= 0) {
      state.cart.splice(index, 1);
    }

    saveCart();
    updateCartUI();
  }

  function saveCart() {
    localStorage.setItem('scb396_cart', JSON.stringify(state.cart));
  }

  function updateCartUI() {
    // Total quantity count
    const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
    if (el.cartCountBadge) el.cartCountBadge.textContent = totalQty;

    // Total Amount calculation
    const totalAmount = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    if (el.cartTotalAmount) {
      el.cartTotalAmount.textContent = totalAmount.toLocaleString('vi-VN') + 'đ';
    }

    // Render Cart Items
    if (!el.cartItemsContainer) return;

    if (state.cart.length === 0) {
      el.cartItemsContainer.innerHTML = `
        <div class="cart-empty-view">
          <span>🍳</span>
          <p>Mâm gọi món của bạn đang trống</p>
          <small>Hãy chọn các món Bò Né, Bít Tết và Mì Cay thơm ngon bên ngoài menu nhé!</small>
        </div>
      `;
      return;
    }

    el.cartItemsContainer.innerHTML = state.cart.map(item => `
      <div class="cart-item-card">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${(item.price * item.qty).toLocaleString('vi-VN')}đ (${item.priceDisplay})</div>
        </div>
        <div class="cart-qty-ctrl">
          <button class="qty-btn" data-minus-id="${item.id}">-</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" data-plus-id="${item.id}">+</button>
        </div>
      </div>
    `).join('');

    // Attach listeners
    el.cartItemsContainer.querySelectorAll('[data-minus-id]').forEach(b => {
      b.addEventListener('click', () => {
        updateItemQty(b.getAttribute('data-minus-id'), -1);
      });
    });

    el.cartItemsContainer.querySelectorAll('[data-plus-id]').forEach(b => {
      b.addEventListener('click', () => {
        updateItemQty(b.getAttribute('data-plus-id'), 1);
      });
    });
  }

  function openCartDrawer() {
    updateCartUI();
    el.cartDrawerOverlay.classList.add('active');
    el.cartDrawerOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    el.cartDrawerOverlay.classList.remove('active');
    el.cartDrawerOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function checkoutViaZalo() {
    if (state.cart.length === 0) {
      showToast('Mâm gọi món đang trống, vui lòng chọn món trước!');
      return;
    }

    const itemsSummary = state.cart.map(i => `- ${i.name} x${i.qty} = ${(i.price * i.qty).toLocaleString('vi-VN')}đ`).join('\n');
    const totalAmount = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const message = `Chào Quán Ăn 396 Bò Né (396 Nguyễn Thị Kiểu, Q.12),\nTôi muốn đặt đơn hàng:\n${itemsSummary}\n\n👉 Tổng tạm tính: ${totalAmount.toLocaleString('vi-VN')}đ\n(Kèm bánh mì nóng & salad dĩa).\nXin quán xác nhận đơn hàng giúp tôi!`;

    // Open Zalo web / app
    const zaloUrl = `https://zalo.me/0908396396?text=${encodeURIComponent(message)}`;
    window.open(zaloUrl, '_blank');
  }

  // -------------------------------------------------------------
  // TABLE RESERVATION MODAL
  // -------------------------------------------------------------
  function initReservationDatetime() {
    if (!el.resTime) return;
    const now = new Date();
    // Default to 1 hour ahead
    now.setHours(now.getHours() + 1);
    now.setMinutes(0);
    
    // Format YYYY-MM-DDTHH:mm
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    
    el.resTime.value = `${year}-${month}-${day}T${hours}:${mins}`;
    el.resTime.min = `${year}-${month}-${day}T06:00`;
  }

  function openReserveModal() {
    initReservationDatetime();
    el.reserveModalOverlay.classList.add('active');
    el.reserveModalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeReserveModal() {
    el.reserveModalOverlay.classList.remove('active');
    el.reserveModalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function handleReserveSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('resName').value.trim();
    const phone = document.getElementById('resPhone').value.trim();
    const guests = document.getElementById('resGuests').value;
    const time = document.getElementById('resTime').value;
    const note = document.getElementById('resNote').value.trim();

    // Store reservation locally
    const reservation = { name, phone, guests, time, note, createdAt: new Date().toISOString() };
    const saved = JSON.parse(localStorage.getItem('scb396_reservations') || '[]');
    saved.push(reservation);
    localStorage.setItem('scb396_reservations', JSON.stringify(saved));

    closeReserveModal();
    el.reserveForm.reset();

    showToast(`🎉 Đặt bàn thành công cho khách hàng ${name}! Quán 396 rất hân hạnh được đón tiếp.`);
  }

  // -------------------------------------------------------------
  // REVIEWS RENDERING
  // -------------------------------------------------------------
  function renderReviews() {
    if (!el.reviewsGrid) return;
    el.reviewsGrid.innerHTML = REVIEWS_DATA.map(rev => `
      <div class="review-card">
        <div>
          <div class="review-header">
            <img src="${rev.avatar}" alt="${rev.author}" class="review-avatar">
            <div>
              <div class="reviewer-name">${rev.author}</div>
              <div class="review-time">${rev.time}</div>
            </div>
          </div>
          <div class="review-stars">★★★★★</div>
          <p class="review-comment">"${rev.comment}"</p>
        </div>
      </div>
    `).join('');
  }

  // -------------------------------------------------------------
  // TOAST UTILITY
  // -------------------------------------------------------------
  function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'food-toast';
    toast.innerHTML = `
      <span style="font-size:1.2rem;">🔥</span>
      <span>${msg}</span>
    `;

    el.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // -------------------------------------------------------------
  // EVENT LISTENERS
  // -------------------------------------------------------------
  function attachEventListeners() {
    // Theme toggle
    if (el.btnThemeToggle) {
      el.btnThemeToggle.addEventListener('click', toggleTheme);
    }

    // Category pills click
    if (el.categoryPills) {
      el.categoryPills.querySelectorAll('.cat-pill-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          el.categoryPills.querySelectorAll('.cat-pill-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.currentCategory = btn.getAttribute('data-cat');
          renderMenuItems();
        });
      });
    }

    // Menu Search Input
    if (el.menuSearchInput) {
      el.menuSearchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderMenuItems();
      });
    }

    // Reset menu search
    if (el.btnResetMenuSearch) {
      el.btnResetMenuSearch.addEventListener('click', () => {
        state.searchQuery = '';
        state.currentCategory = 'all';
        el.menuSearchInput.value = '';
        el.categoryPills.querySelectorAll('.cat-pill-btn').forEach(b => b.classList.remove('active'));
        const allBtn = el.categoryPills.querySelector('[data-cat="all"]');
        if (allBtn) allBtn.classList.add('active');
        renderMenuItems();
      });
    }

    // Spotlight section add buttons
    document.querySelectorAll('[data-add-dish]').forEach(btn => {
      btn.addEventListener('click', () => {
        const dishId = btn.getAttribute('data-add-dish');
        addToCart(dishId);
      });
    });

    // Cart Drawer Open & Close
    if (el.btnOpenCartDrawer) el.btnOpenCartDrawer.addEventListener('click', openCartDrawer);
    if (el.btnCloseCartDrawer) el.btnCloseCartDrawer.addEventListener('click', closeCartDrawer);
    if (el.cartDrawerOverlay) {
      el.cartDrawerOverlay.addEventListener('click', (e) => {
        if (e.target === el.cartDrawerOverlay) closeCartDrawer();
      });
    }

    // Checkout via Zalo
    if (el.btnCheckoutZalo) el.btnCheckoutZalo.addEventListener('click', checkoutViaZalo);

    // Reservation Modal Open & Close
    if (el.btnOpenReserveModal) el.btnOpenReserveModal.addEventListener('click', openReserveModal);
    if (el.btnOpenReserveFromSpace) el.btnOpenReserveFromSpace.addEventListener('click', openReserveModal);
    if (el.btnCloseReserveModal) el.btnCloseReserveModal.addEventListener('click', closeReserveModal);
    if (el.reserveModalOverlay) {
      el.reserveModalOverlay.addEventListener('click', (e) => {
        if (e.target === el.reserveModalOverlay) closeReserveModal();
      });
    }

    // Reservation Form Submit
    if (el.reserveForm) el.reserveForm.addEventListener('submit', handleReserveSubmit);

    // Copy Address Button
    if (el.btnCopyAddress) {
      el.btnCopyAddress.addEventListener('click', () => {
        navigator.clipboard.writeText('396 Nguyễn Thị Kiểu, Phường Hiệp Thành, Quận 12, TP. Hồ Chí Minh').then(() => {
          showToast('Đã sao chép địa chỉ: 396 Nguyễn Thị Kiểu, Q.12!');
        }).catch(() => {
          showToast('Không thể sao chép địa chỉ');
        });
      });
    }

    // Keyboard ESC to close any open modal
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCartDrawer();
        closeReserveModal();
      }
    });
  }

  // Run on startup
  init();
});
