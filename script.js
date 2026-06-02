let cart = [];
let total = 0;

function addToCart(name, price) {
  const item = cart.find(p => p.name === name);

  if (item) {
    item.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  updateCart();
}

function addItem(index) {
  cart[index].qty += 1;
  updateCart();
}

function removeItem(index) {
  cart[index].qty -= 1;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  updateCart();
}

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

/* FILTRES */
function filterProducts(category) {
  const products = document.querySelectorAll(".product");

  products.forEach(product => {
    const cat = product.getAttribute("data-category");

    product.style.display =
      category === "all" || cat === category ? "block" : "none";
  });
}

/* PAIEMENT */
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
