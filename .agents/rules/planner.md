---
trigger: always_on
---

## 🏛️ 旅遊助手開發與規劃準則 (2026 泰國專案)

### 1. 資訊主權與分流 (Data Governance)
- **行程頁面 (`src/itinerary/`)**：專注於「時序」與「體驗」。
    - ❌ **禁止**：標註住宿價格、早餐含否、交通明細費用。
    - ✅ **允許**：轉機美食推薦、防宰指南、通關應變。
- **費用頁面 (`src/views/costs.html`)**：統一管理「預算」與「房型細節」。
    - 所有報價、均分邏輯、含餐狀況與 VILLA 規格均定義在此。

### 2. 標籤化系統 (Tag System Style)
- 住宿地點之後應緊接著標籤，顏色規範如下：
    - **地點** (`bg-slate-100 text-slate-500`): 中性顯示。
    - **含早餐** (`bg-amber-100 text-amber-700 font-bold border-amber-200/50`): 金色高亮。
    - **不含早餐** (`bg-slate-100 text-slate-400`): 淡化顯示。
    - **特殊房型 (如Villa)** (`bg-indigo-100 text-indigo-700 font-bold`): 靛藍色顯示。

### 3. Google Maps 地圖聯動規範
- **連結格式**：統一使用搜尋搜尋 API，避免 Short Link 失效。
    - `https://www.google.com/maps/search/?api=1&query=地點名稱+城市`
- **圖示規範**：
    - 將 `fa-location-dot` 連結置於地點名稱右側。
    - ⚠️ **Emoji 排除原則**：若名稱後方已具備地圖連結圖示，則名稱中**不應出現** Emoji 圖示 (例如: ❌ 步行街 🌌 📍 -> ✅ 步行街 📍)。

### 4. 視覺與配色限制
- 統一採用專案定義的 **天燈琥珀金 (Amber)** 主題。
- 所有行程備註盒 (`note-box`) 必須維持統一底色與邊框色，**禁止**針對單一區塊使用 Rose (紅) 或 Emerald (綠) 等 ad-hoc 背景色。

---
*本準則由 senior 規劃師 (Antigravity) 維護，嚴格遵守以確保網頁品質致。*