// variables
// html elements
const btnLogin = document.getElementById('login')
const erroLogin = document.getElementById('errorLogin')

// input
var rNumber = null;
var password = null;
var url_api_login = "http://127.0.0.1:8000/register_user";

// output
var returnLogin = null;

// button login
btnLogin.addEventListener('click', async function (e) {
    // get values from form
    rNumber = document.getElementById('rNumberLogin')
    password = document.getElementById('userPasswordLogin')

    // send request
    const responseLogin = await fetch(url_api_login, {
        "methode": "POST",
        "header": {
            "content-type": "application/json"
        },
        "body": JSON.stringify({
            "r_nummer": rNumber,
            "password": encryptPassword
        })
    });

    // get data response
    returnLogin = await responseLogin.json();

    // check bool
    if (returnLogin["isSucces"] === "false") {
        // show error
        erroLogin.innerHTML = "Login in not correct";
    } else {
        // storage user local
        localStorage.setItem("username", "test");
        localStorage.setItem("rnumber", returnLogin["r_nummer"]);
        localStorage.setItem("isLoggedIn", returnLogin["isSucces"])

        // redirect to order page
        window.location.replace("http://localhost:63342/html/order.html");
    }
})