let cart = [];
let total = 0;

/* AJOUT PANIER */
function addToCart(name, price, id) {
  let qty = parseInt(document.getElementById("qty-" + id).value);

  if (qty <= 0) return;

  let existing = cart.find(p => p.name === name);

  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ name, price, qty });
  }

  updateCart();
}

/* UPDATE PANIER */
function updateCart() {
  let list = document.getElementById("cart-items");
  list.innerHTML = "";

  total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;

    let li = document.createElement("li");
    li.innerHTML = `${item.qty} fois ${item.name} - ${(item.price * item.qty).toFixed(2)} €`;
    list.appendChild(li);
  });

  document.getElementById("total").innerText = total.toFixed(2);
  document.getElementById("cart-count").innerText =
    cart.reduce((s, i) => s + i.qty, 0);
}

/* =========================
   💳 PAIEMENT
========================= */

function openPayment() {
  document.getElementById("paymentModal").style.display = "block";
}

function closePayment() {
  document.getElementById("paymentModal").style.display = "none";
  document.getElementById("paymentForm").innerHTML = "";
}

/* CARTE BANCAIRE FAKE */
function fakeCard() {
  document.getElementById("paymentForm").innerHTML = `
    <h3>Carte bancaire</h3>
    <input placeholder="Numéro de carte (fake)">
    <input placeholder="MM/AA">
    <input placeholder="CVC">
    <button onclick="fakePay()">Valider paiement</button>
  `;
}

/* PAYPAL FAKE */
function fakePaypal() {
  document.getElementById("paymentForm").innerHTML = `
    <h3>PayPal</h3>
    <input placeholder="Email PayPal">
    <button onclick="fakePay()">Connexion PayPal</button>
  `;
}

/* PAIEMENT SIMULÉ */
function fakePay() {
  alert("Paiement réussi (fictif) ✅\nTotal : " + total.toFixed(2) + " €");

  cart = [];
  total = 0;
  updateCart();
  closePayment();
}
