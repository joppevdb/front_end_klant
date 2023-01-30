// function
function load_data_user() {
    // get html elements
    const overviewName = document.getElementById('overviewName');
    const overviewRNumber = document.getElementById('overviewRNumber');
    const overviewCredit = document.getElementById('overviewCredit');

    // show on html
    overviewName.innerHTML = localStorage.getItem("username");
    overviewRNumber.innerHTML = localStorage.getItem("r_number");
    overviewCredit.innerHTML = localStorage.getItem("credits");
}


// add credits to user
async function add_credits(clicked_id) {
    // link to api
    const url_api_credits = "https://172.24.192.125/credit_add";

    // request to api
    const responseCredits = await fetch(url_api_credits, {
        methode: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            r_number: localStorage.getItem("r_number"),
            credit: clicked_id,
        }),
    });

    // get response
    var returnCreditsJson = responseCredits.json();

    // update local variable
    localStorage.setItem("credits", returnCreditsJson["new_credit"].toString())

    // update
    load_data_user();
}

// get users orders
async function get_orders(){
    // div wherein everything needs to be placed
    const divOrders = document.getElementById("overviewOrders");

    // api part
    const response = await fetch("http://172.24.192.125:8000/user_history/" + localStorage.getItem("r_number"), {
        "method": "GET"
    });
    const data = await response.json();


    // clear section for next output
    divOrders.innerHTML = "";
    // loop through orders
    for (var i in data){
        // create div around order
        var newDiv_order = document.createElement("div");

        // add class
        newDiv_order.className = "order_inner_container";

        // add bootstrap to element
        newDiv_order.classList.add("col-6");
        newDiv_order.classList.add("row");

        // header with order
        var newH3_titel = document.createElement("h3");

        // add class
        newH3_titel.className = "order-product-name";

        // add bootstrap
        newH3_titel.classList.add("col-12");

        // time of order
        var newP_time_order = document.createElement("p");

        // add bootstrap
        newP_time_order.classList.add("col-12");
        newP_time_order.classList.add("text-left");

        // id of the machine
        var newP_machine_id = document.createElement("p");

        // add bootstrap
        newP_time_order.classList.add("col-12");
        newP_time_order.classList.add("text-left");

        // fill elements with data from api
        newH3_titel.innerHTML = data[i].datetime;
        newP_time_order.innerHTML = data[i].product_name;
        newP_machine_id.innerHTML = data[i].credit;

        // connect elements with div
        newDiv_order.appendChild(newH3_titel);
        newDiv_order.appendChild(newP_machine_id);
        newDiv_order.appendChild(newP_time_order);

    }
}

// add different buttons
const btn10Credits = document.getElementById('10credits');
const btn15Credits = document.getElementById('15credits');
const btn20Credits = document.getElementById('20credits');

// 10 credits
btn10Credits.addEventListener('click', async function (e){
    await add_credits(10);
    load_data_user();
})
// 15 credits
btn15Credits.addEventListener('click', async function (e){
    await add_credits(15);
    load_data_user();
})
// 20 credits
btn20Credits.addEventListener('click', async function (e) {
    await add_credits(20);
    load_data_user();
})

load_data_user();
get_orders();

