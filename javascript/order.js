// html elements
// checkboxes
const checkboxMilk = document.getElementById('milk');
const checkboxSugar = document.getElementById('sugar');

// buttons
const btnSmall = document.getElementById("buttonSmall");
const btnMedium = document.getElementById("buttonMedium");
const btnLarge = document.getElementById("buttonLarge");
const btnOrder = document.getElementById('order');
const btnCloseOptions = document.getElementById("closeOptions");

// divs
const divOptions = document.getElementById('options');
const divPayment = document.getElementById('payment');
const divError = document.getElementById('error');
const divSVG = document.getElementById('coffeeMachine');
const divQrcode = document.getElementById("qrcodeWindow");

// page
const page = document.getElementById('pageOrder');

// p
const pErrorCredits = document.getElementById("errorCredits");

// variables
var isMilkCheked = 0;
var isSugarCheked = 0;
var productId = null;
var sizeCoffee = null;
var price = 1;


// functions
// open windows
// options
function open_options_window(clicked_id){
    // get product_id
    productId = clicked_id;

    // show options
    divOptions.classList.add('visible');
    divOptions.classList.remove('invisible');

    // fade background
    page.classList.add('notUsedPage');
}

// payment
function open_payment_window(){
    // show div on page
    divPayment.classList.add('visible');
    divPayment.classList.remove('invisible');
    page.classList.add('notUsedPage')

    // get buttons elements
    const btnPaymentCredits = document.getElementById('payWithCredits')
    const btnPaymentPayconic =  document.getElementById("payWithPayconic")

    // action for credits
    btnPaymentCredits.addEventListener("click", function (e){
        // send order to api
        var orderSucceFull = send_order("credits");
        var test = 0;

        // error not succesfull
        if (test === 1){
            pErrorCredits.classList.add("visible");
            pErrorCredits.classList.remove("invisible");
        }
        else {
            // close payment window
            close_payment_window();
            // open SVG
            open_SVG_window();
        }



    });


    // action for payconic
    btnPaymentPayconic.addEventListener('click', function (e){
        // close payment window
        open_qr_window();
        close_payment_window();

        // send order to api
        send_order("payconic")

    });

}

// qrcode
function open_qr_window(){
    divQrcode.classList.add("visible");
    divQrcode.classList.remove("invisible");

    // generate qrcode
    new QRCode(document.getElementById("qrcode"),"https://stellular-genie-b90f30.netlify.app?price=" + price );
    setTimeout(function () {close_qrcode_window();}, 15000);

}

// SVG
function open_SVG_window(){
    divSVG.classList.add('visible');
    divSVG.classList.remove('invisible');
}


// close windows
// options
function close_options_window(){
    // clear css
    // window
    divOptions.classList.add('invisible');
    divOptions.classList.remove('visible');
    page.classList.remove('notUsedPage');

    // options buttons
    btnSmall.classList.remove('selectedButton');
    btnMedium.classList.remove('selectedButton');
    btnLarge.classList.remove('selectedButton');
    btnSmall.classList.remove('notUsed');
    btnMedium.classList.remove('notUsed');
    btnLarge.classList.remove('notUsed');

    // options check boxes
    checkboxMilk.checked = false;
    checkboxSugar.checked = false;

    //hide error
    divError.classList.add('invisible')
    divError.classList.remove('visible')
}

// payment
function close_payment_window(){
    divPayment.classList.add('invisible')
    divPayment.classList.remove('visible')

}

// qrcode
function close_qrcode_window(){
    divQrcode.classList.add('invisible');
    divQrcode.classList.remove('visible');
    open_SVG_window();
}

// get info about the active user
function get_active_user(){
    // get html elements
    const activeUserName = document.getElementById("activeUsername");
    const activeUserCredits = document.getElementById("activeUserCredits");

    // get the information that is stored locally
    activeUserName.innerHTML = "USER: " + localStorage.getItem("test");
    activeUserCredits.innerHTML = "CREDITS: " + localStorage.getItem("credits");
}


// send order after payment is selected
async function send_order(methodePayment){
    // api
    const url_api_order = "";

    // send request
    const responseLogin = await fetch(url_api_order, {
        "methode": "POST",
        "header": {
            "content-type": "application/json"
        },
        "body": JSON.stringify({
            "r-nummer": localStorage.getItem("r_nummer"),
            "product_id": productId,
            "size": sizeCoffee,
            "isMilk": isMilkCheked,
            "isSugar": isSugarCheked,
            "paymentMethode": methodePayment
        })
    });

    // response
    var returnLogin = responseLogin.json();

    // set localstorage correct
    localStorage.setItem("credit", returnLogin["credit"])

    return returnLogin["isSucces"];
}


// load options
window.api_1 = function api_1() {
    // main div wherein everything needs to be placed
    const producten_container = document.getElementById('producten-container');

    // url on the raspberry pi
    const url_api = "http://127.0.0.1:8000/products";

    // function to show all products
    async function api_1() {

        // const response = await fetch(url_api, {
        //     "method": "GET"
        // });
        // const data = await response.json();

        // test data
        const data = [{'id': 0, 'name': 'Cappucino', 'prijs': 3.0, 'land': 'Italy', 'discription': 'Empty', 'iscoffee': true}, {'id': 1, 'name': 'Espresso', 'prijs': 2.0, 'land': 'Duitsland', 'discription': 'Empty', 'iscoffee': true}, {'id': 2, 'name': 'Groene_thee', 'prijs': 2.5, 'land': 'Taiwan', 'discription': 'Empty', 'iscoffee': false}, {'id': 3, 'name': 'Ijskoffie', 'prijs': 3.5, 'land': 'België', 'discription': 'Koude koffie met ijs klontjes', 'iscoffee': true}, {'id': 4, 'name': 'Lungo', 'prijs': 1.5, 'land': 'België', 'discription': 'Empty', 'iscoffee': true}, {'id': 5, 'name': 'Munt_thee', 'prijs': 1.2, 'land': 'Nederland', 'discription': 'Thee van munt bladeren', 'iscoffee': false}, {'id': 6, 'name': 'Ristretto', 'prijs': 2.2, 'land': 'Nederland', 'discription': 'Empty', 'iscoffee': true}]
        // Clear section for next output
        producten_container.innerHTML = "";

        // loop through all products available for machine
        for (var i in data) {

            // Create new elements
            // div around a product
            var newDiv_product = document.createElement('div');

            // add class
            newDiv_product.className = 'producten_inner_container';

            // add bootstrap to element
            newDiv_product.classList.add('col-5');
            newDiv_product.classList.add('mx-auto');
            newDiv_product.classList.add('row');


            // header with name
            var newH3_titel = document.createElement('h3');

            // add class
            newH3_titel.className = 'product-name';

            // add bootstrap
            newH3_titel.classList.add('col-12');

            // country of the product
            var newP_land = document.createElement('p');

            // add class
            newP_land.className = 'product-land';

            // add bootstrap
            newP_land.classList.add('col-12');

            // price of a product
            var newP_prijs = document.createElement('p');

            // add class
            newP_prijs.className = 'product-prijs';

            // add bootstrap
            newP_prijs.classList.add('col-12');

            // description of a product
            var newP_description = document.createElement('p');

            // add class
            newP_description.className = 'product-discription';

            // add bootstrap
            newP_description.classList.add('col-12');

            // button for options
            var newbutton = document.createElement('button');

            // add bootstrap
            newbutton.classList.add('col-6');
            newbutton.classList.add('mx-auto');

            // fill elements with data from api
            newH3_titel.innerHTML = data[i].name;
            newP_land.innerHTML = "Country: " + data[i].land;
            newP_prijs.innerHTML = "Price: \u20AC " + data[i].prijs;
            newP_description.innerHTML ="Description: " + data[i].discription;
            newbutton.innerHTML = "next";

            // get id of a product
            newbutton.id = data[i].id;

            // open the window with a function
            newbutton.setAttribute("onclick","open_options_window(this.id)");

            // connect elements with div
            newDiv_product.appendChild(newH3_titel);
            newDiv_product.appendChild(newP_land);
            newDiv_product.appendChild(newP_prijs);
            newDiv_product.appendChild(newP_description);
            newDiv_product.appendChild(newbutton);
            producten_container.appendChild(newDiv_product);

        }
        return data

    }
    api_1();
}


// button acitons
// size small selected
btnSmall.addEventListener('click', function (e){
    // add classes
    btnSmall.classList.add('selectedButton');
    btnMedium.classList.add('notUsed');
    btnLarge.classList.add('notUsed');

    // remove classes
    btnSmall.classList.remove('notUsed');
    btnMedium.classList.remove('selectedButton');
    btnLarge.classList.remove('selectedButton');

    // size
    sizeCoffee = 0;
});

//size medium selected
btnMedium.addEventListener('click', function (e){
    // add classes
    btnMedium.classList.add('selectedButton');
    btnSmall.classList.add('notUsed');
    btnLarge.classList.add('notUsed');

    // remove classes
    btnSmall.classList.remove('selectedButton');
    btnMedium.classList.remove('notUsed');
    btnLarge.classList.remove('selectedButton');

    // size
    sizeCoffee = 1;
});


//size large selected
btnLarge.addEventListener('click', function (e){
    //add classes
    btnLarge.classList.add('selectedButton');
    btnMedium.classList.add('notUsed');
    btnSmall.classList.add('notUsed');

    // remove classes
    btnSmall.classList.remove('selectedButton');
    btnMedium.classList.remove('selectedButton');
    btnLarge.classList.remove('notUsed');

    // size
    sizeCoffee = 3;
});

// order -> goes to payment window
btnOrder.addEventListener('click', function (e){
    // check the checkboxes
    if (checkboxMilk.checked === true){
        isMilkCheked = 1;
    }
    if (checkboxSugar.checked === true){
        isSugarCheked = 1;
    }

    // check for an error
    if (sizeCoffee == null){
        divError.classList.add('visible');
        divError.classList.remove('invisible');
    }
    // continue if there is no error
    else{
        close_options_window();
        open_payment_window();
    }
});


// close options window
btnCloseOptions.addEventListener('click', function (e){
    close_options_window();
});


//execute actions upon opening page
api_1();
get_active_user();


