 let cart = [];
let total = 0;

let productQty = {
  tshirt: 1,
  casquette: 1,
  sneakers: 1
};

/* =========================
   + / - (FIX PRINCIPAL)
========================= */
function changeQty(id, value) {
  let input = document.getElementById("qty-" + id);

  let qty = parseInt(input.value) || 0;
  qty += value;

  if (qty < 0) qty = 0;
  if (qty > 100) qty = 100;

  input.value = qty;
  productQty[id] = qty;
}

/* input manuel */
function setQty(id, value) {
  let qty = parseInt(value);

  if (isNaN(qty)) qty = 0;
  if (qty < 0) qty = 0;
  if (qty > 100) qty = 100;

  document.getElementById("qty-" + id).value = qty;
  productQty[id] = qty;
}

/* ajouter panier */
function addToCart(name, price, id) {
  let qty = productQty[id];

  if (qty <= 0) return;

  let existing = cart.find(p => p.name === name);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, price, qty });
  }

  updateCart();
}

/* panier + - */
function addItem(index) {
  if (cart[index].qty < 100) cart[index].qty++;
  updateCart();
}

function removeItem(index) {
  cart[index].qty--;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  updateCart();
}

/* update panier */
function updateCart() {
  let list = document.getElementById("cart-items");
  list.innerHTML = "";

  total = 0;

  cart.forEach((item, i) => {
    total += item.price * item.qty;

    let li = document.createElement("li");

    li.innerHTML = `
      <span>${item.qty} fois ${item.name} - ${(item.price * item.qty).toFixed(2)}€</span>
      <div>
        <button onclick="removeItem(${i})">-</button>
        <button onclick="addItem(${i})">+</button>
      </div>
    `;

    list.appendChild(li);
  });

  document.getElementById("total").innerText = total.toFixed(2);
  document.getElementById("cart-count").innerText =
    cart.reduce((s, i) => s + i.qty, 0);
}

/* filtre */
function filterProducts(cat) {
  document.querySelectorAll(".product").forEach(p => {
    p.style.display =
      cat === "all" || p.dataset.category === cat ? "block" : "none";
  });
}

/* paiement */
function pay() {
  if (cart.length === 0) {
    alert("Panier vide");
    return;
  }

  alert("Paiement OK : " + total.toFixed(2) + "€");

  cart = [];
  total = 0;
  updateCart();
}
