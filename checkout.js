// =========================
// RECUPERATION DU PANIER
// =========================


let cart = 
JSON.parse(
    localStorage.getItem("cart")
) || [];




// =========================
// AFFICHAGE COMMANDE
// =========================


function loadOrder(){


    const summary =
    document.getElementById(
        "summary"
    );


    let total = 0;



    summary.innerHTML = "";



    cart.forEach(item => {


        const subtotal =
        item.price * item.qty;



        total += subtotal;



        const p =
        document.createElement(
            "p"
        );


        p.innerHTML = `

        <strong>
        ${item.name}
        </strong>
        <br>

        Quantité :
        ${item.qty}

        <br>

        Prix :
        ${subtotal.toFixed(2)} €

        `;



        summary.appendChild(p);



    });




    document.getElementById(
        "checkout-total"
    ).textContent =
    total.toFixed(2);


}





// =========================
// PAIEMENT FICTIF
// =========================


function fakePayment(method){



    if(cart.length === 0){


        alert(
            "Votre panier est vide."
        );


        window.location.href =
        "index.html";


        return;


    }



    alert(

        "Paiement " 
        + method
        +
        " effectué avec succès !\n\n"
        +
        "⚠️ Paiement fictif"

    );





    clearOrder();



}





// =========================
// SUPPRESSION COMMANDE
// =========================


function clearOrder(){



    localStorage.removeItem(
        "cart"
    );



    window.location.href =
    "index.html";


}





// =========================
// LANCEMENT
// =========================


loadOrder();
