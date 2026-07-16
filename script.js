// =========================
// INITIALISATION PANIER
// =========================


let cart = [];



// =========================
// CHARGEMENT DU PANIER
// =========================


function loadCart(){

    const saved =
    localStorage.getItem("cart");


    if(saved){

        cart = JSON.parse(saved);

    }


    updateCart();

}




// =========================
// SAUVEGARDE
// =========================


function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}





// =========================
// AJOUTER AU PANIER
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



    let product =
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
// AFFICHER LE PANIER
// =========================


function updateCart(){



    const list =
    document.getElementById(
        "cart-items"
    );


    list.innerHTML = "";



    let total = 0;

    let count = 0;




    cart.forEach(
    (item,index)=>{


        let subtotal =
        item.price * item.qty;



        total += subtotal;


        count += item.qty;



        const li =
        document.createElement(
            "li"
        );



        li.innerHTML = `

        <strong>
        ${item.name}
        </strong>


        <br>


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


    if(cart[index].qty < 100){

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
// VIDER LE PANIER
// =========================


function clearCart(){


    cart=[];


    localStorage.removeItem(
        "cart"
    );


    updateCart();


}





// =========================
// ALLER AU CHECKOUT
// =========================


function goToCheckout(){


    if(cart.length === 0){


        alert(
            "Votre panier est vide"
        );


        return;

    }



    window.location.href =
    "checkout.html";


}







// =========================
// FILTRE CATEGORIES
// =========================


function filterProducts(category){



    const products =
    document.querySelectorAll(
        ".product"
    );



    products.forEach(product=>{


        const productCategory =
        product.dataset.category;



        if(
            category === "all"
            ||
            productCategory === category
        ){


            product.style.display =
            "block";


        }else{


            product.style.display =
            "none";


        }


    });



}







// =========================
// DEMARRAGE
// =========================


loadCart();
