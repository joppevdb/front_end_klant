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
let returnOrder;


// functions
// open windows
// options
function open_options_window(clicked_id) {
    // get product_id
    productId = clicked_id;

    // show options
    divOptions.classList.add('visible');
    divOptions.classList.remove('invisible');

    // fade background
    page.classList.add('notUsedPage');
}

// payment
async function open_payment_window() {
    // show div on page
    divPayment.classList.add('visible');
    divPayment.classList.remove('invisible');
    page.classList.add('notUsedPage')

    // get buttons elements
    const btnPaymentCredits = document.getElementById('payWithCredits')
    const btnPaymentPayconic = document.getElementById("payWithPayconic")

    // action for credits
    btnPaymentCredits.addEventListener("click", function (e) {
        send_order("credits");

    });


    // action for payconic
    btnPaymentPayconic.addEventListener('click', function (e) {
        // send order to api
        send_order("payconic");
    });

}

// qrcode
function open_qr_window() {
    divQrcode.classList.add("visible");
    divQrcode.classList.remove("invisible");

    // generate qrcode
    new QRCode(document.getElementById("qrcode"), "https://stellular-genie-b90f30.netlify.app?price=" + price);
    setTimeout(function () {
        close_qrcode_window();
    }, 15000);
}

// SVG
function open_SVG_window() {
    divSVG.classList.add('visible');
    divSVG.classList.remove('invisible');

    // This is for nodejs purposes. So only in a terminal not a WEBSITE!
    console.log(returnOrder);

    // const fs = require('fs');
    var api_order_reply = returnOrder;

    var api_order_reply_done = {
        "r-nummer": undefined,
        "name": undefined,
        "credit": undefined,
        "isSucces": undefined,
        "product": undefined,
        "is_coffee": undefined,
        "melk": undefined,
        "sugar": undefined
    }


// This is for a website
    var text_box = document.getElementById('text-box');

    var console_screen = document.createElement('div');
    console_screen.className = 'console_screen';
    console_screen.innerHTML = "Placeholder";
    text_box.appendChild(console_screen);

    const message_of_the_day = "Having a good day?"
// var machine_working = false;

    var json_file_location = "./javascript/machine_status.json";


// Koffee procedure variables
    const beker = document.getElementById('kopje-koffie-goed');
    const warm_water = document.getElementById('warm-water');
    const koffie_bonen = document.getElementById('koffie-bonen');
    const melk = document.getElementById('melk');
    const sugar = document.getElementById('sugar');

    const vloeistof_1 = document.getElementById('vloeistof-1');
    const vloeistof_2 = document.getElementById('vloeistof-2');
    const vloeistof_3 = document.getElementById('vloeistof-3');
    const vloeistof_4 = document.getElementById('vloeistof-4');

    const beker_niet_goed_text = "Zet een beker op de machine"
    const begin_text = api_order_reply.product + "<br>" + "is being made"
    const warm_water_text = "Water is being heated";

    const koffie_bonen_text = "Coffee beans are ground";
    const koffie_vloeistof_text = "Coffee is being added";

    const thee_text = "Thee is being mixed";
    const thee_vloeistof_text = "Thee is being added";

    const melk_text = "Milk is being added";
    const sugar_text = "Sugar is being added";
    const melk_suger_text = "Milk & Sugar are being added";
    const end_text = api_order_reply.name + "<br>" + "Enjoy your " + api_order_reply.product;
    let json;

    function fetchJsonData() {
        return fetch(json_file_location)
            .then((response) => response.json())
            .then((data) => {
                json = data;
                console.log(json);
            });
    }


    const detected_lamp = document.getElementById('defect-lamp');
    const maintenance_lamp = document.getElementById('maintenance-lamp');
    const fixed_lamp = document.getElementById('offline-lamp');

    function checkJsonData() {
        fetchJsonData().then(() => {
            if (json.detected == 1 && json.confirmed == 0 && json.fixed == 0) {
                console.log("machine out of service [detected]");
                detected_lamp.classList.add('detected-lamp');
                maintenance_lamp.classList.remove('confirmed-lamp');
                fixed_lamp.classList.remove('fixed-lamp');
                console_screen.innerHTML = "Machine is Defect";
                // machine_working = false

                // This will cal this function again and by doing this it will also fetch the data from the file.
                setTimeout(checkJsonData, 5000);
            } else {
                if (json.detected == 0 && json.confirmed == 1 && json.fixed == 0) {
                    console.log("machine out of service [confirmed]");
                    detected_lamp.classList.remove('detected-lamp');
                    maintenance_lamp.classList.add('confirmed-lamp');
                    fixed_lamp.classList.remove('fixed-lamp');
                    console_screen.innerHTML = "Machine is Defect";
                    // machine_working = false

                    // This will cal this function again and by doing this it will also fetch the data from the file.
                    setTimeout(checkJsonData, 5000);
                } else {
                    if (json.detected == 0 && json.confirmed == 0 && json.fixed == 1) {
                        console.log("machine Working [fixed]");
                        detected_lamp.classList.remove('detected-lamp');
                        maintenance_lamp.classList.remove('confirmed-lamp');
                        fixed_lamp.classList.add('fixed-lamp');
                        console_screen.innerHTML = message_of_the_day;
                        // machine_working = true

                        // Koffee procedure
                        // if (machine_working) {
                        if (api_order_reply.isSucces == 1) {
                            // Er is een order en die moet verwerkt worden.
                            console.log('Er is een order beschikbaar');

                            if (json.beker_detected == 1) {
                                // Koffie beker is aanwezig begin process.
                                beker.classList.add('kopje-koffie-opacity-on');
                                beker.classList.remove('kopje-koffie-animatie');
                                console_screen.innerHTML = begin_text;
                                console.log("Beker aanwezig. Begin met procedure");

                                setTimeout(() => {
                                    console.log(warm_water_text);
                                    console_screen.innerHTML = warm_water_text;
                                    warm_water.classList.add("opacity_on_off");

                                    if (api_order_reply.is_coffee == 1) {
                                        // if it is a sort of coffe continue here
                                        setTimeout(() => {
                                            warm_water.classList.remove("opacity_on_off");

                                            console.log(koffie_bonen_text);
                                            console_screen.innerHTML = koffie_bonen_text;
                                            koffie_bonen.classList.add("opacity_on_off");

                                            setTimeout(() => {
                                                console_screen.innerHTML = koffie_vloeistof_text;
                                                vloeistof_1.classList.add("vloeistof-animatie-koffie");
                                                vloeistof_2.classList.add("vloeistof-animatie-koffie");
                                                vloeistof_3.classList.add("vloeistof-animatie-koffie");
                                                vloeistof_4.classList.add("vloeistof-animatie-koffie");

                                                if (api_order_reply.melk == 1 && api_order_reply.sugar == 1) {
                                                    // Milk and sugar
                                                    setTimeout(() => {
                                                        koffie_bonen.classList.remove("opacity_on_off");

                                                        console.log(melk_text);
                                                        melk.classList.add("opacity_on_off");

                                                        console.log(sugar_text);
                                                        sugar.classList.add("opacity_on_off");

                                                        console_screen.innerHTML = melk_suger_text;

                                                        setTimeout(() => {
                                                            melk.classList.remove("opacity_on_off");
                                                            sugar.classList.remove("opacity_on_off");
                                                            console.log(end_text);
                                                            console_screen.innerHTML = end_text;

                                                            console.log("api variabelen is being deleted");

                                                            api_order_reply = api_order_reply_done;

                                                            beker.classList.remove("kopje-koffie-opacity-on");
                                                            vloeistof_1.classList.remove("vloeistof-animatie-koffie");
                                                            vloeistof_2.classList.remove("vloeistof-animatie-koffie");
                                                            vloeistof_3.classList.remove("vloeistof-animatie-koffie");
                                                            vloeistof_4.classList.remove("vloeistof-animatie-koffie");

                                                            setTimeout(checkJsonData, 5000);


                                                        }, 5000);
                                                    }, 5000);

                                                } else if (api_order_reply.melk == 1) {
                                                    // Milk
                                                    setTimeout(() => {
                                                        koffie_bonen.classList.remove("opacity_on_off");

                                                        console.log(melk_text);
                                                        melk.classList.add("opacity_on_off");
                                                        console_screen.innerHTML = melk_text;

                                                        setTimeout(() => {
                                                            melk.classList.remove("opacity_on_off");
                                                            sugar.classList.remove("opacity_on_off");

                                                            console.log(end_text);
                                                            console_screen.innerHTML = end_text;
                                                            console.log("api variabelen is being deleted");
                                                            api_order_reply = api_order_reply_done;

                                                            beker.classList.remove("kopje-koffie-opacity-on");
                                                            vloeistof_1.classList.remove("vloeistof-animatie-koffie");
                                                            vloeistof_2.classList.remove("vloeistof-animatie-koffie");
                                                            vloeistof_3.classList.remove("vloeistof-animatie-koffie");
                                                            vloeistof_4.classList.remove("vloeistof-animatie-koffie");

                                                            setTimeout(checkJsonData, 5000);


                                                        }, 5000);
                                                    }, 5000);
                                                } else {
                                                    // Sugar
                                                    setTimeout(() => {
                                                        koffie_bonen.classList.remove("opacity_on_off");

                                                        console.log(sugar_text);
                                                        sugar.classList.add("opacity_on_off");
                                                        console_screen.innerHTML = sugar_text;

                                                        setTimeout(() => {
                                                            melk.classList.remove("opacity_on_off");
                                                            sugar.classList.remove("opacity_on_off");

                                                            console.log(end_text);
                                                            console_screen.innerHTML = end_text;
                                                            console.log("api variabelen is being deleted");
                                                            api_order_reply = api_order_reply_done;

                                                            beker.classList.remove("kopje-koffie-opacity-on");
                                                            vloeistof_1.classList.remove("vloeistof-animatie-koffie");
                                                            vloeistof_2.classList.remove("vloeistof-animatie-koffie");
                                                            vloeistof_3.classList.remove("vloeistof-animatie-koffie");
                                                            vloeistof_4.classList.remove("vloeistof-animatie-koffie");

                                                            setTimeout(checkJsonData, 5000);


                                                        }, 5000);
                                                    }, 5000);
                                                }
                                            }, 5000);


                                        }, 5000);
                                    } else {
                                        // if it isn't a sort of coffee then we know it is thee
                                        setTimeout(() => {
                                            warm_water.classList.remove("opacity_on_off");

                                            console.log(thee_text);
                                            console_screen.innerHTML = thee_text;

                                            setTimeout(() => {
                                                console_screen.innerHTML = thee_vloeistof_text;
                                                console.log(thee_vloeistof_text);
                                                vloeistof_1.classList.add("vloeistof-animatie-thee");
                                                vloeistof_2.classList.add("vloeistof-animatie-thee");
                                                vloeistof_3.classList.add("vloeistof-animatie-thee");
                                                vloeistof_4.classList.add("vloeistof-animatie-thee");

                                                if (api_order_reply.melk == 1 && api_order_reply.sugar == 1) {
                                                    // Milk and sugar
                                                    setTimeout(() => {

                                                        console.log(melk_text);
                                                        melk.classList.add("opacity_on_off");

                                                        console.log(sugar_text);
                                                        sugar.classList.add("opacity_on_off");

                                                        console_screen.innerHTML = melk_suger_text;

                                                        setTimeout(() => {
                                                            melk.classList.remove("opacity_on_off");
                                                            sugar.classList.remove("opacity_on_off");
                                                            console.log(end_text);
                                                            console_screen.innerHTML = end_text;
                                                            console.log("api variabelen is being deleted");
                                                            api_order_reply = api_order_reply_done;

                                                            beker.classList.remove("kopje-koffie-opacity-on");
                                                            vloeistof_1.classList.remove("vloeistof-animatie-koffie");
                                                            vloeistof_2.classList.remove("vloeistof-animatie-koffie");
                                                            vloeistof_3.classList.remove("vloeistof-animatie-koffie");
                                                            vloeistof_4.classList.remove("vloeistof-animatie-koffie");

                                                            setTimeout(checkJsonData, 5000);


                                                        }, 5000);
                                                    }, 5000);

                                                } else if (api_order_reply.melk == 1) {
                                                    // Milk
                                                    setTimeout(() => {

                                                        console.log(melk_text);
                                                        melk.classList.add("opacity_on_off");
                                                        console_screen.innerHTML = melk_text;

                                                        setTimeout(() => {
                                                            melk.classList.remove("opacity_on_off");
                                                            sugar.classList.remove("opacity_on_off");
                                                            console.log(end_text);
                                                            console_screen.innerHTML = end_text;
                                                            console.log("api variabelen is being deleted");
                                                            api_order_reply = api_order_reply_done;

                                                            beker.classList.remove("kopje-koffie-opacity-on");
                                                            vloeistof_1.classList.remove("vloeistof-animatie-koffie");
                                                            vloeistof_2.classList.remove("vloeistof-animatie-koffie");
                                                            vloeistof_3.classList.remove("vloeistof-animatie-koffie");
                                                            vloeistof_4.classList.remove("vloeistof-animatie-koffie");

                                                            setTimeout(checkJsonData, 5000);


                                                        }, 5000);
                                                    }, 5000);
                                                } else {
                                                    // Sugar
                                                    setTimeout(() => {

                                                        console.log(sugar_text);
                                                        sugar.classList.add("opacity_on_off");
                                                        console_screen.innerHTML = sugar_text;

                                                        setTimeout(() => {
                                                            melk.classList.remove("opacity_on_off");
                                                            sugar.classList.remove("opacity_on_off");
                                                            console.log(end_text);
                                                            console_screen.innerHTML = end_text;
                                                            console.log("api variabelen is being deleted");
                                                            api_order_reply = api_order_reply_done;

                                                            beker.classList.remove("kopje-koffie-opacity-on");
                                                            vloeistof_1.classList.remove("vloeistof-animatie-koffie");
                                                            vloeistof_2.classList.remove("vloeistof-animatie-koffie");
                                                            vloeistof_3.classList.remove("vloeistof-animatie-koffie");
                                                            vloeistof_4.classList.remove("vloeistof-animatie-koffie");

                                                            setTimeout(checkJsonData, 5000);


                                                        }, 5000);
                                                    }, 5000);
                                                }


                                            }, 5000);

                                        }, 5000);
                                    }


                                }, 5000);

                            } else {
                                // Koffie beker is Niet aanwezig Niet beginnen aan process.
                                beker.classList.add('kopje-koffie-animatie');
                                beker.classList.add('kopje-koffie-opacity-on');
                                console_screen.innerHTML = beker_niet_goed_text;
                                console.log("Beker NIET aanwezig.");

                                setTimeout(checkJsonData, 5000);
                            }


                        } else {
                            // Er is geen order beschikbaar maar de machine is wel inorde.
                            console.log("Er is geen order.")
                            setTimeout(checkJsonData, 5000);
                        }

                    }
                }
            }
        });
    }

    checkJsonData();
}


// close windows
// options
function close_options_window() {
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
function close_payment_window() {
    divPayment.classList.add('invisible')
    divPayment.classList.remove('visible')

}

// qrcode
function close_qrcode_window() {
    divQrcode.classList.add('invisible');
    divQrcode.classList.remove('visible');
    open_SVG_window();
}

// get info about the active user
function get_active_user() {
    // get html elements
    const activeUserName = document.getElementById("activeUsername");
    const activeUserCredits = document.getElementById("activeUserCredits");

    // get the information that is stored locally
    activeUserName.innerHTML = "USER: " + sessionStorage.getItem("username");
    activeUserCredits.innerHTML = "CREDITS: " + sessionStorage.getItem("credits");
}


// send order after payment is selected
function send_order(methodePayment) {
    // api
    const url_api_order = "http://172.24.192.125:8000/order";

    console.log(sessionStorage.getItem("r_number"));

    // send request
    async function api() {
        console.log(productId)
        const responseLogin = await fetch(url_api_order, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            "body": JSON.stringify({
                r_number: sessionStorage.getItem("r_number"),
                product_id: productId,
                size: sizeCoffee,
                milk: isMilkCheked,
                sugar: isSugarCheked,
                payment: methodePayment
            }),
        });

        // response
        returnOrder = await responseLogin.json();


        // set localstorage correct
        sessionStorage.setItem("credit", returnOrder["credit"])

        if (returnOrder["isSucces"] === 0) {
            pErrorCredits.classList.add("visible");
            pErrorCredits.classList.remove("invisible");
        } else {
            if (methodePayment === "credits") {
                // close payment window
                close_payment_window();
                // open SVG
                open_SVG_window();
            } else {
                // close payment window
                open_qr_window();
                close_payment_window();
            }
        }
    }

    api();
}


// load options
window.api_1 = function api_1() {
    // main div wherein everything needs to be placed
    const products_container = document.getElementById('producten-container');

    // url on the raspberry pi
    const url_api = "http://172.24.192.125:8000/products";


    // function to show all products
    async function api_1() {

        const response = await fetch(url_api, {
            "method": "GET"
        });
        const data = await response.json();
        console.log(data);

        // Clear section for next output
        products_container.innerHTML = "";

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
            newP_description.innerHTML = "Description: " + data[i].discription;
            newbutton.innerHTML = "next";

            // get id of a product
            newbutton.id = data[i].id;

            // open the window with a function
            newbutton.setAttribute("onclick", "open_options_window(this.id)");

            // connect elements with div
            newDiv_product.appendChild(newH3_titel);
            newDiv_product.appendChild(newP_land);
            newDiv_product.appendChild(newP_prijs);
            newDiv_product.appendChild(newP_description);
            newDiv_product.appendChild(newbutton);
            products_container.appendChild(newDiv_product);

        }
        return data

    }

    api_1();
}


// button acitons
// size small selected
btnSmall.addEventListener('click', function (e) {
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
btnMedium.addEventListener('click', function (e) {
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
btnLarge.addEventListener('click', function (e) {
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
btnOrder.addEventListener('click', function (e) {
    // check the checkboxes
    if (checkboxMilk.checked === true) {
        isMilkCheked = 1;
    }
    if (checkboxSugar.checked === true) {
        isSugarCheked = 1;
    }

    // check for an error
    if (sizeCoffee == null) {
        divError.classList.add('visible');
        divError.classList.remove('invisible');
    }
    // continue if there is no error
    else {
        close_options_window();
        open_payment_window();
    }
});


// close options window
btnCloseOptions.addEventListener('click', function (e) {
    close_options_window();
});


//execute actions upon opening page
api_1();
get_active_user();


