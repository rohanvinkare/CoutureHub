

# 🚀 CoutureHub Inventory Portal

**Goodbye, slow spreadsheets. Hello, real-time insights.**

CoutureHub is a modern, high-density dashboard designed to help store managers browse, analyze, and manage inventory with zero friction. Whether you are at a desk or on the floor with an iPad, your data is live, visible, and stable.

### 🔗 **[Experience the Live Demo](https://couture-hub.codenix.space/)**

---

## ✨ Features You'll Love

We focused on **data visibility** and **ease of access** to build a tool that actually saves time.

### 📊 **The Command Center (Inventory Overview)**

* **High-Density View:** Scan hundreds of products instantly. We prioritized data density so you see Name, Price, Brand, Category, and Stock at a glance.


* **Smart Sorting:** Organize by **Price** (find high-value items) or **Name**.


* **Instant Filtering:** Drill down by specific categories like *Laptops* or *Skincare*.


* **Zero-Lag Search:** A debounced search bar lets you type fast without freezing the browser.



### 🛍️ **Product Deep-Dive**

* **Rich Details:** Beyond the basics. View descriptions, ratings, and discount percentages in a clean layout.


* **Cross-Selling:** Smart "Browse Similar Products" cards at the bottom help you find related inventory instantly.



### 📂 **Visual Catalogue**

* **Gallery Mode:** A dedicated screen to browse categories visually (tiles > text lists).


* **Seamless Navigation:** Click a category tile to instantly jump to a filtered list of those products.



### 🎨 **Polished UX**

* **📱 Device Agnostic:** Fully responsive. Looks pro on a 1080p monitor, an iPad, or a mobile phone.


* **⚡ Network Transparency:** No blank screens. We use skeleton loaders and clear error states so you always know what's happening.


* 
**🏠 Welcome Hub:** A clean landing page to guide new users to the right tools immediately.



---

## 🛠️ Tech Stack (The Engine)

* **⚛️ Framework:** React (Vite) for blazing fast performance.
* **🎨 Styling:** Tailwind CSS for a consistent, professional design system.


* **🧩 State:** React Hooks & Context for managing filters and data flow.
* **✨ Icons:** Lucide React for a clean, modern UI.

---

## 🚀 Quick Start

Want to run this locally? It's easy.

**1. Clone & Install**

```bash
npm install

```

**2. Ignite the Engine**

```bash
npm run dev

```

**3. View It**
Open `http://localhost:5173` in your browser.

**4. Build for Production**

```bash
npm run build

```

---

## 🧠 Design Decisions & Assumptions

To ensure the best user experience, we made a few logical choices during development:

* **⚠️ The "Low Stock" Rule:**
* *The Call:* Items with stock < 10 are visually flagged.
* *The Why:* The API gives us raw numbers, but managers need *alerts*. We made low stock impossible to miss.




* **🔄 One Screen, Many Uses:**
* *The Call:* Clicking a Category Tile reuses the main Inventory Overview logic.
* *The Why:* It keeps the interface consistent. Drilled-down views feel identical to the main dashboard, reducing the learning curve.




* **⚡ Search Optimization:**
* *The Call:* We added a 500ms debounce to the search bar.
* *The Why:* Real-time filtering is great, but stuttering isn't. This ensures the app stays buttery smooth while you type.




* **📦 Smart Loading:**
* *The Call:* We load 20+ products on the first visit.
* *The Why:* This hits the requirement for immediate data availability without overwhelming the browser memory.