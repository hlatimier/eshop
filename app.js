// =========================
// VARIABLES
// =========================


let cart = [];

let currentCategory = "all";




// =========================
// CHARGER LE PANIER
// =========================


function loadCart(){

    const savedCart =
    localStorage.getItem("cart");


    if(savedCart){

        cart = JSON.parse(savedCart);

    }


    updateCart();

}



// =========================
// SAUVEGARDER LE PANIER
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

    }

    else{

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



        let li =
        document.createElement(
            "li"
        );



        li.innerHTML = `

        <strong>${item.name}</strong>

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
// + QUANTITE
// =========================


function increaseQty(index){


    if(cart[index].qty < 100){

        cart[index].qty++;

    }


    updateCart();

}




// =========================
// - QUANTITE
// =========================


function decreaseQty(index){


    if(cart[index].qty > 1){

        cart[index].qty--;

    }


    updateCart();

}





// =========================
// SUPPRIMER
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


    localStorage.removeItem(
        "cart"
    );


    updateCart();

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



    window.location.href =
    "checkout.html";


}





// =========================
// FILTRE CATEGORIES
// =========================


function filterProducts(category){


    currentCategory = category;


    applyFilters();


}







// =========================
// RECHERCHE
// =========================


function searchProducts(){


    applyFilters();


}






// =========================
// APPLICATION FILTRES + RECHERCHE
// =========================


function applyFilters(){



    const searchInput =
    document.getElementById(
        "search"
    );



    let searchValue = "";



    if(searchInput){

        searchValue =
        searchInput.value.toLowerCase();

    }





    const products =
    document.querySelectorAll(
        ".product"
    );





    products.forEach(product=>{


        const name =
        product
        .querySelector("h3")
        .textContent
        .toLowerCase();



        const category =
        product.dataset.category;



        const searchMatch =
        name.includes(searchValue);



        const categoryMatch =
        currentCategory === "all"
        ||
        category === currentCategory;





        if(
            searchMatch
            &&
            categoryMatch
        ){


            product.style.display =
            "block";


        }

        else{


            product.style.display =
            "none";


        }



    });



}






// =========================
// DEMARRAGE
// =========================


loadCart();
