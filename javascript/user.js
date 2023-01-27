// function
function load_data_user() {
    // get html elements
    const overviewName = document.getElementById('overviewName');
    const overviewRNumber = document.getElementById('overviewRNumber');
    const overviewCredit = document.getElementById('overviewCredit');

    // show on html
    overviewName.innerHTML = localStorage.getItem("test");
    overviewRNumber.innerHTML = localStorage.getItem("credits");
    overviewCredit.innerHTML = localStorage.getItem("credits");
}


// add credits to user
async function add_credits(clicked_id) {
    console.log(clicked_id)
    // link to api
    const url_api_credits = "";

    // request to api
    const responseCredits = await fetch(url_api_credits, {
        "methode": "POST",
        "header": {
            "content-type": "application/json"
        },
        "body": JSON.stringify({
            "r_nummer": localStorage.getItem("r_nummer"),
            "credit": clicked_id,
            "opladen": 1
        })
    });

    // update local variable
    localStorage.setItem("credits", responseCredits["newCredits"].toString())

}

// add different buttons
const btn10Credits = document.getElementById('10credits');
const btn15Credits = document.getElementById('15credits');
const btn20Credits = document.getElementById('20credits');

// 10 credits
btn10Credits.addEventListener('click', function (e){
    add_credits(10);
})
// 15 credits
btn15Credits.addEventListener('click', function (e){
    add_credits(15);
})
// 20 credits
btn20Credits.addEventListener('click', function (e){
    add_credits(20);
})

load_data_user();
