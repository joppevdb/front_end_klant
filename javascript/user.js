// function
async function load_data_user() {
    // get html elements
    const overviewName = document.getElementById('overviewName');
    const overviewRNumber = document.getElementById('overviewRNumber');
    const overviewCredit = document.getElementById('overviewCredit');

    // show on html
    overviewName.innerHTML = sessionStorage.getItem("username");
    overviewRNumber.innerHTML = sessionStorage.getItem("r_number");
    overviewCredit.innerHTML = sessionStorage.getItem("credits");

    const url_api_total_credit = "http://172.24.192.125:8000/credit_total/" + sessionStorage.getItem("r_number");

    // get total credits
    async function api(){
        const responseTotalCredits = await fetch(url_api_total_credit ,{
            method: 'GET',
        });
        const data = await responseTotalCredits.json();

        console.log(data)

        // place on html
        document.getElementById("totalCredit").innerHTML = data["total"];
    }

    api();
}


// add credits to user
async function add_credits(clicked_id) {
    // link to api
    const url_api_credits = "http://172.24.192.125:8000/credit_add";

    console.log(clicked_id)
    console.log(sessionStorage.getItem("r_number"))

    const r_number_sessionStorage =sessionStorage.getItem("r_number");

    // request to api
    async function api(){
        const responseCredits = await fetch(url_api_credits, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                r_number: r_number_sessionStorage ,
                credit: clicked_id,
            }),
        });

        // get response
        const returnCreditsJson = await responseCredits.json();

        // update local variabel
        sessionStorage.setItem("credits", returnCreditsJson["new_credits"]);

        // update
        load_data_user();
    }
    api();


}

// get users orders
async function get_orders(){
    // div wherein everything needs to be placed
    const divOrders = document.getElementById("overviewOrders");

    const url_api_orders = "http://172.24.192.125:8000/user_history/" + sessionStorage.getItem("r_number");



    // api part
    const response = await fetch(url_api_orders, {
        "method": "GET"
    });
    const data = await response.json();

    console.log(data)

    for (var i in data){
        console.log(data[i])


        // create a div
        var newDivOrder = document.createElement("div");
        newDivOrder.className = "order_container";
        newDivOrder.classList.add("col-6");

        // create title
        var newH3_titel = document.createElement("h3");
        newH3_titel.className = "order_name";

        // create p datetime
        var newP_datetime = document.createElement("p");
        newP_datetime.className = "order_datetime";

        // create p credit
        var newP_credit = document.createElement("p");
        newP_credit.className = "order_credit";

        // add to html elements
        newH3_titel.innerHTML = data[i].product_name;
        newP_datetime.innerHTML =  data[i].datetime;
        newP_credit.innerHTML =  data[i].credit;

        newDivOrder.appendChild(newH3_titel);
        newDivOrder.appendChild(newP_datetime);
        newDivOrder.appendChild(newP_credit);

        divOrders.appendChild(newDivOrder);



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

