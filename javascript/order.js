//variables
var productId = null;
var qrcode = new QRCode(document.querySelector('#qrcode'), {
    text: "http://jindo.dev.naver.com/collie",
    width: 128,
    height: 128,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});


// checkboxes
const checkboxMilk = document.getElementById('milk');
const checkboxSugar = document.getElementById('sugar');

// elements to open option window
const divOptions = document.getElementById('options');
const page = document.getElementById('pageOrder');


// function open options window
function open_options_window(clicked_id){
    productId = clicked_id;
    divOptions.classList.add('visible');
    divOptions.classList.remove('invisible');
    page.classList.add('notUsedPage');
}

// function close options window
function close_options_window(){
    // clear order
    jsonOrder = "";

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

// elements to open payment window
const divPayment = document.getElementById('payment');

// function open payment window
function open_payment_window(){
    // show div on page
    divPayment.classList.add('visible');
    divPayment.classList.remove('invisible');
    page.classList.add('notUsedPage')

    // close window after 30sec
    setTimeout(function() { close_payment_window(); }, 30000);

}

// close payment window
function close_payment_window(){
    divPayment.classList.add('invisible')
    divPayment.classList.remove('visible')

    // open SVG
    open_SVG_window()
}
// elements to open SVG window
const divSVG = document.getElementById('coffeeMachine')

// open SVG
function open_SVG_window(){
    divSVG.classList.add('visible')
    divSVG.classList.remove('invisible')
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
            var newH1_titel = document.createElement('h3');

            // add class
            newH1_titel.className = 'product-name';

            // add bootstrap
            newH1_titel.classList.add('col-12');

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
            newH1_titel.innerHTML = data[i].name;
            newP_land.innerHTML = "Country: " + data[i].land;
            newP_prijs.innerHTML = "Price: \u20AC " + data[i].prijs;
            newP_description.innerHTML ="Description: " + data[i].discription;
            newbutton.innerHTML = "next";

            // get id of a product
            newbutton.id = data[i].id;

            // open the window with a function
            newbutton.setAttribute("onclick","open_options_window(this.id)");

            // connect elements with div
            newDiv_product.appendChild(newH1_titel);
            newDiv_product.appendChild(newP_land);
            newDiv_product.appendChild(newP_prijs);
            newDiv_product.appendChild(newP_description);
            newDiv_product.appendChild(newbutton);
            producten_container.appendChild(newDiv_product);

        }
        return data

    }
    api_1()
}

// act upon opening page
api_1();



// size order
// variable
var sizeCoffee = null;

// buttons to select the coffee size
const btnSmall = document.getElementById("buttonSmall");
const btnMedium = document.getElementById("buttonMedium");
const btnLarge = document.getElementById("buttonLarge");

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

})

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
})
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
})

// order
const btnOrder = document.getElementById('order')
const divError = document.getElementById('error')

// actions
btnOrder.addEventListener('click', function (e){
    // variables
    var isMilkCheked = false;
    var isSugarCheked = false;

    // check the checkboxes
    if (checkboxMilk.checked === true){
        isMilkCheked = true;
    }
    if (checkboxSugar.checked === true){
        isSugarCheked = true;
    }

    // json that needs to be sent to api
    var jsonOrder = {'id': productId, 'size':sizeCoffee, 'isMilkChecked': isMilkCheked, 'isSugarChecked': isSugarCheked }

    if (sizeCoffee == null){
        divError.classList.add('visible')
        divError.classList.remove('invisible')
    }
    else{
        close_options_window();
        open_payment_window();
        qrcode.makeCode("https://stellular-genie-b90f30.netlify.app/")
    }

})

// close window with button
const btnCloseOptions = document.getElementById("closeOptions");

// action
btnCloseOptions.addEventListener('click', function (e){
    close_options_window();
})



