let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = localStorage.getItem("total") || 0;

/* affichage résumé */
function load() {
  let div = document.getElementById("summary");

  cart.forEach(item => {
    let p = document.createElement("p");
    p.innerText = `${item.qty} fois ${item.name}`;
    div.appendChild(p);
  });

  document.getElementById("checkout-total").innerText = total;
}

function fakePay() {
  alert("Paiement réussi (fictif) ✅");

  localStorage.removeItem("cart");
  localStorage.removeItem("total");

  window.location.href = "index.html";
}

load();
