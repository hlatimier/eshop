let cart = [];
let total = 0;

function addToCart(name, price, id){

    const qty =
        parseInt(
            document.getElementById(
                "qty-" + id
            ).value
        ) || 0;

    if(qty <= 0){
        return;
    }

    const existing =
        cart.find(
            item => item.name === name
        );

    if(existing){

        existing.qty += qty;

    }else{

        cart.push({
            name,
            price,
            qty
        });
    }

    updateCart();
}

function updateCart(){

    const list =
        document.getElementById(
            "cart-items"
        );

    list.innerHTML = "";

    total = 0;

    cart.forEach(item => {

        total +=
            item.price * item.qty;

        const li =
            document.createElement(
                "li"
            );

        li.textContent =
            `${item.qty} fois ${item.name} - ${(item.price * item.qty).toFixed(2)} €`;

        list.appendChild(li);
    });

    document.getElementById(
        "total"
    ).textContent =
        total.toFixed(2);

    document.getElementById(
        "cart-count"
    ).textContent =
        cart.reduce(
            (sum,item)=>sum+item.qty,
            0
        );
}

function goToCheckout(){

    if(cart.length === 0){

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
        total
    );

    window.location.href =
        "checkout.html";
}
