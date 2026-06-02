let cart = [];
let total = 0;

function addToCart(name, price) {
  cart.push({ name, price });
  total += price;

  updateCart();
}

function updateCart() {
  // compteur
  document.getElementById("cart-count").innerText = cart.length;

  // liste
  const list = document.getElementById("cart-items");
  list.innerHTML = "";

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - ${item.price.toFixed(2)} €`;
    list.appendChild(li);
  });

  // total
  document.getElementById("total").innerText = total.toFixed(2);
}
