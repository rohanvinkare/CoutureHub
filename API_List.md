
---

# 📦 Product Catalog API Reference (DummyJSON)

This document defines all required API endpoints and their expected behavior for building a **Product Inventory & Catalog application**.

Base URL:

```
https://dummyjson.com
```

---

## 1️⃣ Get All Products

Fetches a paginated list of products.

### Endpoint

```
GET /products
```

### Default Behavior

* Returns **30 products**
* Supports pagination using `limit` and `skip`

### Example

```js
fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(console.log);
```

### Response Structure

```json
{
  "products": [
    {
      "id": 1,
      "title": "Essence Mascara Lash Princess",
      "description": "The Essence Mascara Lash Princess is a popular mascara...",
      "category": "beauty",
      "price": 9.99,
      "discountPercentage": 7.17,
      "rating": 4.94,
      "stock": 5,
      "brand": "Essence",
      "thumbnail": "...",
      "images": ["...", "..."]
    }
  ],
  "total": 194,
  "skip": 0,
  "limit": 30
}
```

---

## 2️⃣ Get a Single Product

Fetch detailed information for a specific product.

### Endpoint

```
GET /products/{id}
```

### Example

```js
fetch('https://dummyjson.com/products/1')
  .then(res => res.json())
  .then(console.log);
```

### Response

Returns a **single product object** with full details such as:

* Description
* Rating
* Discount
* Reviews
* Images
* Stock & availability

---

## 3️⃣ Search Products

Search products by keyword (title-based).

### Endpoint

```
GET /products/search?q={query}
```

### Example

```js
fetch('https://dummyjson.com/products/search?q=phone')
  .then(res => res.json())
  .then(console.log);
```

### Notes

* Returns matching products
* Supports pagination

---

## 4️⃣ Pagination & Field Selection

### Pagination

Use `limit` and `skip` to paginate results.

### Field Selection

Use `select` to request specific fields only.

### Example

```js
fetch('https://dummyjson.com/products?limit=10&skip=10&select=title,price')
  .then(res => res.json())
  .then(console.log);
```

### Notes

* `limit=0` returns **all products**
* Useful for performance optimization

---

## 5️⃣ Sort Products

Sort products by any field.

### Endpoint

```
GET /products?sortBy={field}&order={asc|desc}
```

### Example

```js
fetch('https://dummyjson.com/products?sortBy=title&order=asc')
  .then(res => res.json())
  .then(console.log);
```

---

## 6️⃣ Get All Product Categories (Detailed)

Returns category metadata with URLs.

### Endpoint

```
GET /products/categories
```

### Example

```js
fetch('https://dummyjson.com/products/categories')
  .then(res => res.json())
  .then(console.log);
```

### Response

```json
[
  {
    "slug": "beauty",
    "name": "Beauty",
    "url": "https://dummyjson.com/products/category/beauty"
  }
]
```

---

## 7️⃣ Get Product Category List (Simple)

Returns category slugs only.

### Endpoint

```
GET /products/category-list
```

### Example

```js
fetch('https://dummyjson.com/products/category-list')
  .then(res => res.json())
  .then(console.log);
```

---

## 8️⃣ Get Products by Category

Fetch products belonging to a specific category.

### Endpoint

```
GET /products/category/{category}
```

### Example

```js
fetch('https://dummyjson.com/products/category/smartphones')
  .then(res => res.json())
  .then(console.log);
```

---

## 9️⃣ Add a New Product (Simulated)

⚠️ This does **not persist data** on the server.

### Endpoint

```
POST /products/add
```

### Example

```js
fetch('https://dummyjson.com/products/add', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'BMW Pencil'
  })
})
.then(res => res.json())
.then(console.log);
```

---

## 🔟 Update a Product (Simulated)

⚠️ Changes are **not saved permanently**.

### Endpoint

```
PUT /products/{id}
```

or

```
PATCH /products/{id}
```

### Example

```js
fetch('https://dummyjson.com/products/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'iPhone Galaxy +1'
  })
})
.then(res => res.json())
.then(console.log);
```

---

## 1️⃣1️⃣ Delete a Product (Simulated)

⚠️ Does not actually delete data on the server.

### Endpoint

```
DELETE /products/{id}
```

### Example

```js
fetch('https://dummyjson.com/products/1', {
  method: 'DELETE'
})
.then(res => res.json())
.then(console.log);
```

### Response

```json
{
  "id": 1,
  "isDeleted": true,
  "deletedOn": "ISO_TIMESTAMP"
}
```

---