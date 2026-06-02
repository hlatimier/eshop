let cart = [];
let total = 0;

/* AJOUT */
function addToCart(name, price, id) {
  let qty = parseInt(document.getElementById("qty-" + id).value);

  if (qty <= 0) return;

  let existing = cart.find(p => p.name === name);

  if (existing) existing.qty += qty;
  else cart.push({ name, price, qty });

  updateCart();
}

/* UPDATE */
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

/* 🔥 PASSAGE PAGE PAIEMENT */
function goToCheckout() {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("total", total);
  window.location.href = "checkout.html";
}
