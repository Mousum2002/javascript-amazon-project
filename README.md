# JavaScript Amazon Project

A front-end Amazon clone built with **vanilla JavaScript (ES Modules)**, HTML, and CSS — simulating a full e-commerce shopping flow from product browsing to checkout.

Visit [here](https://mousum2002.github.io/javascript-amazon-project/)
for full preview, immages may fail to load on some browser as it's hosted in github pages and in some browser it sends wrong mime type for the immages. also some functionality might not work if there are blocker in place. here is a general functionality breakdown:

- **Product Listing** — Dynamically rendered product grid with name, rating, price, quantity selector, and Add to Cart button. Shows a 4-second "Added ✓" indicator on click.
- **Cart / Checkout** — Displays all cart items with quantity update and delete controls. Each item has 3 delivery options (FREE/7d, $4.99/3d, $9.99/1d) with live delivery date via `dayjs`.
- **Payment Summary** — Live-calculated subtotal, shipping, before-tax total, 10% tax, and order total.
- **Orders & Tracking** — Dedicated pages accessible from the header.
- **Persistence** — Cart state saved to `localStorage` across pages.

## Project Structure

```
├── index.html / checkout.html / orders.html / tracking.html
├── scripts/
│   ├── amazon.js           # Product grid & add-to-cart logic
│   ├── money.js            # Currency formatter
│   └── cheakout/
│       └── cheakout.js     # Checkout rendering, delivery options, totals
├── data/
│   ├── products.js         # Product data & getProduct() helper
│   └── cart.js             # addToCart(), updateCartQuantity()
├── backend/
│   └── products.json       # Raw product JSON
├── styles/                 # Page and shared CSS
└── images/                 # Product images, icons, logos
```

## Running Locally

> ES Modules require HTTP — opening the HTML files directly (`file://`) won't work.

The easiest way is with the **VS Code Live Server** extension: right-click `index.html` → *Open with Live Server*. No terminal commands needed.

Alternatively:
```bash
npx serve .
```

## Tech Stack

Vanilla JS (ES Modules) · HTML5 · CSS3 · localStorage · [dayjs](https://day.js.org/) · GitHub Pages
