const cart =
JSON.parse(localStorage.getItem("cart")) || [];

const total =
localStorage.getItem("total") || "0.00";

function loadSummary(){

    const summary =
    document.getElementById("summary");

    cart.forEach(item => {

        const p =
        document.createElement("p");

        p.textContent =
        `${item.qty} fois ${item.name}`;

        summary.appendChild(p);

    });

    document.getElementById(
        "checkout-total"
    ).textContent = total;
}

function clearData(){
    localStorage.removeItem("cart");
    localStorage.removeItem("total");
}

function fakeMastercard(){

    alert("Paiement Mastercard fictif ✅");

    clearData();

    window.location.href = "index.html";
}

function fakeCardPayment(){

    alert("Paiement carte bancaire fictif ✅");

    clearData();

    window.location.href = "index.html";
}

function fakePaypal(){

    alert("Paiement PayPal fictif ✅");

    clearData();

    window.location.href = "index.html";
}

loadSummary();
