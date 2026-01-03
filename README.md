

# CoutureHub Catalog Inventory Portal

A responsive inventory management dashboard built to replace spreadsheets with a real-time, high-density web application.

🔗 **Live Demo:** [INSERT DEPLOYED LINK HERE]

## 🛠️ Tech Stack

* **Framework:** React (Vite) 


* **Styling:** Tailwind CSS 


* **Icons:** Lucide React
* **State Management:** React Hooks (Context/State)

## 🚀 How to Run

1. **Install dependencies:**
```bash
npm install

```


2. **Start the server:**
```bash
npm run dev

```


3. **Open:** Visit `http://localhost:5173`

## 🧠 Assumptions & Reasoning

Per the assignment guidelines, the following assumptions were made regarding the implementation:

1. **Low Stock Threshold:**
* **Assumption:** Items with stock < 10 are flagged as "Low Stock".
* **Reasoning:** The API does not provide a specific boolean for stock status, but visual visibility of stock levels was a core requirement.




2. **Category Drill-Down Reusability:**
* **Assumption:** Clicking a category tile redirects to the main Inventory Overview with a URL filter applied.
* **Reasoning:** Satisfies the requirement that the drill-down screen "should feel identical to the main Inventory Overview".




3. **Search Performance:**
* **Assumption:** Search is debounced (delayed execution while typing). 
* **Reasoning:** Prevents the interface from "stuttering or freezing if the manager types too quickly".




4. **Initial Load:**
* **Assumption:** The overview loads 20 products by default.

**Reasoning:** Explicitly required to "load a minimum of 20 products the first time the page is opened".





## ✨ Key Features


**Inventory Overview:** High-density table with sorting (Price, Name, Stock) and category filtering.


**Product Details:** Extended view with ratings, discounts, and "Similar Products" recommendations.


**Catalogue View:** Visual grid of categories for high-level browsing.


**Device Agnostic:** Fully responsive layout that adapts from desktop tables to mobile cards.