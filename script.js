let cart = [];
let total = 0;

function addToCart(name, price) {
  cart.push({ name, price });
  total += price;
  updateCart();
}

function removeFromCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  document.getElementById("cart-count").innerText = cart.length;

  const list = document.getElementById("cart-items");
  list.innerHTML = "";

  cart.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${item.name} - ${item.price.toFixed(2)} €
      <button class="delete-btn" onclick="removeFromCart(${index})">×</button>
    `;

    list.appendChild(li);
  });

  document.getElementById("total").innerText = total.toFixed(2);
}

/* FILTRE PRODUITS */
function filterProducts(category) {
  const products = document.querySelectorAll(".product");

  products.forEach(product => {
    const cat = product.getAttribute("data-category");

    if (category === "all" || cat === category) {
      product.style.display = "block";
    } else {
      product.style.display = "none";
    }
  });
}
