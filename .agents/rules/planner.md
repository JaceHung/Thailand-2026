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

### 2. 標籤化與動態分支系統 (Tag & Branch System)
- **色系規範**：
    - 主線行程 (`Amber`): 色系變數為琥珀金。
    - 特色/分流行程 (`Rose`): 色系變數為玫瑰紅 (分流標籤色彩)。
- **連線實施 (`timeline-item-xxx`)**：
    - 活動點必須使用 `.timeline-item-amber` 或 `.timeline-item-rose`。
    - 這類節點具備「實線」與「彩色發光圓點」，且在「摺疊交通模式」下**不會被隱藏**，以確保旅程脈絡。
- **交通/中轉排版**：
    - 統一使用 `.timeline-item-transfer`。
    - 視覺特徵為「灰色虛線」與「灰色無影點」，當開關開啟時會被完全摺疊。

### 3. 重要資訊備註盒 (Note-Box System)
- **結構標準**：必須為 `Icon + 標題：內容` 格式。
- **圖示規範 (Semantic Icons)**：
    - 不再強制統一為驚嘆號，應選用與內容情境相關的圖示。
    - 例如：門票相關 (`fa-ticket`)、服裝規定 (`fa-shirt`)、預訂提醒 (`fa-calendar-check`)、嚴格禁止 (`fa-camera-slash` / `fa-phone-slash`)。

### 4. Google Maps 地圖聯動與樣式規範
- **連結格式**：統一使用搜尋 API：`https://www.google.com/maps/search/?api=1&query=地點名稱+城市`
- **圖示規範**：`fa-location-dot` 連結置於地點名稱右側。若後方已有連結圖示，名稱內禁止出現 Emoji。
- **色彩統一**：超連結 (`<a>`) 的 CSS 類別應嚴格跟隨該項目的主題色（如主線行程統一使用 `text-amber-500 hover:text-amber-700 transition-colors` 樣式），以維持視覺整體性。

### 5. 視覺與配色限制
- 統一採用專案定義的 **天燈琥珀金 (Amber)** 主題。
- 所有行程備註盒 (`note-box`) 必須維持統一底色與邊框色，**禁止**針對單一區塊使用 Rose (紅) 或 Emerald (綠) 等 ad-hoc 背景色。

### 6. 文案與排版細節 (Typography & Copywriting)
- **句號省略原則**：為求列點文案簡潔俐落，內文若最後是以全形句號 (`。`) 結束，請一律刪除該句號。
- **統一 Highlight 樣式**：文案內的重點文字（如景點名稱、特殊食物、數字等）嚴禁隨意混用純粗黑體或其他顏色。一律使用該項目區塊的 **主題色粗體** 作為 Highlight 標註（例如主線行程統一使用 `<strong class="text-amber-600">重點文字</strong>`），確保閱讀體驗一致。

---
*本準則由 senior 規劃師 (Antigravity) 維護，嚴格遵守以確保網頁品質致。*