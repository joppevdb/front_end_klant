// get html elements
const overviewName = document.getElementById('overviewName')
const overviewRNumber = document.getElementById('overviewRNumber')
const overviewCredit = document.getElementById('overviewCredit')


// function
function load_data_user(){
    // get local variables
    // var username = localStorage.getItem("test");
    // // var r_number = localStorage.getItem("r_number");
    // var credits = localStorage.getItem("credits");

    // show on html
    overviewName.innerHTML = "kdjd"
    // overviewRNumber.innerHTML = r_number;
    overviewCredit.innerHTML =  localStorage.getItem("credits");
}


load_data_user();
