let cart = [];
let total = 0;

// quantités produits (0 → 100)
let productQty = {
  tshirt: 1,
  casquette: 1,
  sneakers: 1
};

/* =========================
   QUANTITÉ PRODUITS (0 - 100)
========================= */
function changeQty(id, value) {
  productQty[id] += value;

  if (productQty[id] < 0) productQty[id] = 0;
  if (productQty[id] > 100) productQty[id] = 100;

  document.getElementById("qty-" + id).innerText = productQty[id];
}

/* =========================
   AJOUT PANIER
========================= */
function addToCart(name, price, id) {
  const qty = productQty[id];

  if (qty <= 0) return;

  const existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, price, qty });
  }

  updateCart();
}

/* =========================
   QUANTITÉ PANIER
========================= */
function addItem(index) {
  if (cart[index].qty < 100) {
    cart[index].qty++;
  }
  updateCart();
}

function removeItem(index) {
  cart[index].qty--;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
}

/* =========================
   UPDATE PANIER
========================= */
function updateCart() {
  const list = document.getElementById("cart-items");
  list.innerHTML = "";

  total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const li = document.createElement("li");

    li.innerHTML = `
      <span>${item.name} x${item.qty} - ${(item.price * item.qty).toFixed(2)} €</span>
      <div>
        <button onclick="removeItem(${index})">➖</button>
        <button onclick="addItem(${index})">➕</button>
      </div>
    `;

    list.appendChild(li);
  });

  document.getElementById("cart-count").innerText =
    cart.reduce((sum, i) => sum + i.qty, 0);

  document.getElementById("total").innerText = total.toFixed(2);
}

/* =========================
   FILTRES
========================= */
function filterProducts(category) {
  document.querySelectorAll(".product").forEach(product => {
    const cat = product.getAttribute("data-category");

    product.style.display =
      category === "all" || cat === category ? "block" : "none";
  });
}

/* =========================
   PAIEMENT
========================= */
function pay() {
  if (cart.length === 0) {
    alert("Ton panier est vide !");
    return;
  }

  alert("Paiement réussi ✅\nTotal : " + total.toFixed(2) + " €");

  cart = [];
  total = 0;
  updateCart();
}
