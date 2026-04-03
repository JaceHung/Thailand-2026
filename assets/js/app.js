// 建立記憶體快取，避免重複 Fetch 同一個檔案
const htmlCache = {};

async function loadHTML(path) {
    if (htmlCache[path]) return htmlCache[path]; // 有快取直接回傳，切換瞬間完成
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error('Network error');
        const html = await response.text();
        htmlCache[path] = html;
        return html;
    } catch (error) {
        console.error(`Fetching error for ${path}:`, error);
        return `<div class="p-8 bg-rose-50 text-rose-600 rounded-xl font-bold text-center">檔案載入失敗，請確認路徑或是否開啟 Live Server。</div>`;
    }
}

async function switchMainTab(tabId) {
    window.location.hash = tabId;
    
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    const targetTab = document.getElementById('tab-' + tabId);
    if(targetTab) targetTab.classList.add('active');
    
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = '<div class="text-center py-20 text-slate-400"><i class="fa-solid fa-spinner fa-spin text-3xl mb-3"></i></div>';
    
    const html = await loadHTML(`src/views/${tabId}.html`);
    contentArea.innerHTML = `<div class="animate-fade-in">${html}</div>`;
    
    if (tabId === 'itinerary') {
        const savedDay = localStorage.getItem('selectedDay') || 1;
        switchDay(savedDay); 
    }
    
    if (tabId === 'costs') {
        const toggleEl = document.getElementById('charter-expand-toggle');
        if (toggleEl && localStorage.getItem('showCharterDetails') !== null) {
            toggleEl.checked = localStorage.getItem('showCharterDetails') === 'true';
            if (typeof toggleCharterDetails === "function") toggleCharterDetails();
        }
    }
}

// 由於這些是由 index.html 上的按鈕觸發的，我們需要讓這些 functions 留在全域 (Global Scope) 裡
window.switchMainTab = switchMainTab;
window.switchDay = switchDay;

async function switchDay(dayNum) {
    localStorage.setItem('selectedDay', dayNum);
    
    document.querySelectorAll('.day-btn').forEach(btn => {
        btn.classList.remove('active', 'text-white', 'border-indigo-800', 'bg-slate-200');
        btn.classList.add('text-slate-600', 'border-slate-100');
    });
    
    const activeBtn = document.getElementById('btn-day' + dayNum);
    if (activeBtn) {
        activeBtn.classList.remove('text-slate-600', 'border-slate-100', 'text-slate-500', 'bg-slate-50');
        activeBtn.classList.add('active');
    }
    
    const dayContentArea = document.getElementById('day-content-area');
    if (!dayContentArea) return;

    dayContentArea.innerHTML = '<div class="text-center py-10 text-slate-400"><i class="fa-solid fa-spinner fa-spin text-2xl"></i></div>';
    
    const html = await loadHTML(`src/itinerary/day_${dayNum}.html`);
    dayContentArea.innerHTML = `<div class="animate-fade-in">${html}</div>`;
    
    // 復原交通開關狀態
    const toggleEl = document.getElementById('transfer-toggle');
    if (toggleEl && localStorage.getItem('showTransfers') !== null) {
        toggleEl.checked = localStorage.getItem('showTransfers') === 'true';
    }
    
    if (typeof toggleTransfers === "function") toggleTransfers(); 
}

function toggleTransfers() {
    const toggleElement = document.getElementById('transfer-toggle');
    if (!toggleElement) return;
    
    const isChecked = toggleElement.checked;
    localStorage.setItem('showTransfers', isChecked);
    
    document.querySelectorAll('.timeline-item-transfer').forEach(el => {
        el.classList.toggle('hidden', !isChecked);
    });
}
window.toggleTransfers = toggleTransfers;

function toggleCharterDetails() {
    const toggleEl = document.getElementById('charter-expand-toggle');
    if (!toggleEl) return;
    
    const isChecked = toggleEl.checked;
    localStorage.setItem('showCharterDetails', isChecked);
    
    document.querySelectorAll('.charter-details').forEach(d => {
        d.open = isChecked;
    });
}
window.toggleCharterDetails = toggleCharterDetails;

/**
 * 從總覽跳轉至特定天數的行程
 * @param {number} dayNum 
 */
function navigateToDay(dayNum) {
    localStorage.setItem('selectedDay', dayNum);
    switchMainTab('itinerary');
}
window.navigateToDay = navigateToDay;

window.addEventListener('hashchange', () => {
    const tab = window.location.hash.replace('#', '') || 'overview';
    switchMainTab(tab);
});

document.addEventListener('DOMContentLoaded', () => {
    const defaultTab = window.location.hash.replace('#', '') || 'overview';
    switchMainTab(defaultTab);
});
