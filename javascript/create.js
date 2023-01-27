// variables
// input
var username = null;
var rNumber = null;
var password = null;
var repeatPassword = null;

// html elements
const btnCreate = document.getElementById('createUser')
const errorCreate = document.getElementById('errorCreate')
const url_api_create = "http://127.0.0.1:8000/register_user"

// encryption
var encryptPassword = null;

// output
var returnCreate = null;


// create a new user
btnCreate.addEventListener('click', async function (e) {
    // get values from form
    rNumber = document.getElementById('rNumber').value;
    username = document.getElementById('userName').value;
    password = document.getElementById('userPassword').value;
    repeatPassword = document.getElementById('userRepeatPassword').value;

    // check input
    if (rNumber === "") {
        errorCreate.innerHTML = "NO R-NUMBER";
    } else if (username === "") {
        errorCreate.innerHTML = "NO USERNAME";
    } else if (password === "") {
        errorCreate.innerHTML = "NO PASSWORD";
    } else if (repeatPassword === "") {
        errorCreate.innerHTML = "REPEAT YOUR PASSWORD";
    } else if (password !== repeatPassword) {
        errorCreate.innerHTML = "PASSWORDS ARE NOT THE SAME!";
    }

    // encrypt password
    encryptPassword = btoa(password);

    // sent data to api
    const responseCreate = await fetch(url_api_create, {
        "method": "POST",
        "header": {
            "content-type": "application/json"
        },
        "body": JSON.stringify({
            "name": username,
            "r_nummer": rNumber,
            "password": encryptPassword
        })
    });

    // get reponse data
    returnCreate = await responseCreate.json()
    // storage user local
    localStorage.setItem("username", returnCreate["username"])
    localStorage.setItem("rnumber", returnCreate["r_nummer"])
    localStorage.setItem("isLoggedIn", returnCreate["isSucces"])

    if (returnCreate["isSucces"] === "true"){
        // redirect to order page
        window.location.replace("http://localhost:63342/html/order.html")
    }
})


