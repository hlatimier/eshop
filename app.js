// =========================
// PANIER
// =========================


let cart = [];



// Charger le panier sauvegardé

function loadCart(){

    const savedCart =
    localStorage.getItem("cart");


    if(savedCart){

        cart = JSON.parse(savedCart);

    }


    updateCart();

}




// Sauvegarder le panier

function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}




// =========================
// AJOUT PRODUIT
// =========================


function addToCart(name, price, id){


    let qty =
    parseInt(
        document.getElementById(
            "qty-" + id
        ).value
    );


    if(!qty || qty < 1){

        qty = 1;

    }



    const product =
    cart.find(
        item => item.name === name
    );



    if(product){


        product.qty += qty;


    }else{


        cart.push({

            name:name,

            price:price,

            qty:qty

        });


    }



    saveCart();

    updateCart();


}




// =========================
// AFFICHAGE PANIER
// =========================


function updateCart(){


    const list =
    document.getElementById(
        "cart-items"
    );


    list.innerHTML="";



    let total = 0;

    let count = 0;



    cart.forEach((item,index)=>{


        let subtotal =
        item.price * item.qty;



        total += subtotal;


        count += item.qty;



        const li =
        document.createElement(
            "li"
        );



        li.innerHTML = `

        <strong>${item.name}</strong><br>

        ${item.price} € x ${item.qty}

        <br>

        Sous-total :
        ${subtotal.toFixed(2)} €

        <br><br>


        <button onclick="decreaseQty(${index})">
        -
        </button>


        <button onclick="increaseQty(${index})">
        +
        </button>


        <button onclick="removeProduct(${index})">
        ❌
        </button>

        `;



        list.appendChild(li);



    });




    document.getElementById(
        "total"
    ).textContent =
    total.toFixed(2);




    document.getElementById(
        "cart-count"
    ).textContent =
    count;



    saveCart();


}





// =========================
// AUGMENTER QUANTITE
// =========================


function increaseQty(index){


    if(cart[index].qty < 99){

        cart[index].qty++;

    }


    updateCart();


}





// =========================
// DIMINUER QUANTITE
// =========================


function decreaseQty(index){


    if(cart[index].qty > 1){


        cart[index].qty--;


    }


    updateCart();


}





// =========================
// SUPPRIMER PRODUIT
// =========================


function removeProduct(index){


    cart.splice(index,1);


    updateCart();


}





// =========================
// VIDER PANIER
// =========================


function clearCart(){


    cart=[];


    updateCart();


    localStorage.removeItem(
        "cart"
    );


}





// =========================
// CHECKOUT
// =========================


function goToCheckout(){



    if(cart.length === 0){


        alert(
            "Votre panier est vide"
        );


        return;


    }



    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );



    window.location.href =
    "checkout.html";

}





// =========================
// DEMARRAGE
// =========================


loadCart();
