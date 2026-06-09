// ======================
// PANIER
// ======================

let cart = [];
let total = 0;

// ======================
// AJOUTER AU PANIER
// ======================

function addToCart(name, price, id) {

    let qty = parseInt(
        document.getElementById(
            "qty-" + id
        ).value
    );

    if (!qty || qty < 1) {
        qty = 1;
    }

    const existing = cart.find(
        item => item.name === name
    );

    if (existing) {

        existing.qty += qty;

    } else {

        cart.push({
            name: name,
            price: price,
            qty: qty
        });

    }

    updateCart();
}

// ======================
// MISE À JOUR DU PANIER
// ======================

function updateCart() {

    const cartItems =
        document.getElementById(
            "cart-items"
        );

    if (!cartItems) return;

    cartItems.innerHTML = "";

    total = 0;

    let count = 0;

    cart.forEach(item => {

        const subtotal =
            item.price * item.qty;

        total += subtotal;

        count += item.qty;

        const li =
            document.createElement(
                "li"
            );

        li.innerHTML = `
            <strong>${item.name}</strong><br>
            Quantité : ${item.qty}<br>
            ${subtotal.toFixed(2)} €
        `;

        cartItems.appendChild(li);

    });

    const totalElement =
        document.getElementById(
            "total"
        );

    if (totalElement) {
        totalElement.textContent =
            total.toFixed(2);
    }

    const cartCount =
        document.getElementById(
            "cart-count"
        );

    if (cartCount) {
        cartCount.textContent = count;
    }
}

// ======================
// CHECKOUT
// ======================

function goToCheckout() {

    if (cart.length === 0) {

        alert(
            "Votre panier est vide."
        );

        return;
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    localStorage.setItem(
        "total",
        total.toFixed(2)
    );

    window.location.href =
        "https://hlatimier.github.io/eshop/checkout.html";
}

// ======================
// CHARGEMENT PAGE
// ======================

window.onload = function () {

    const savedCart =
        localStorage.getItem(
            "cart"
        );

    if (savedCart) {

        try {

            cart =
                JSON.parse(
                    savedCart
                );

            updateCart();

        } catch (e) {

            cart = [];

        }
    }
};
