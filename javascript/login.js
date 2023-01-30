// variables
// html elements
const btnLogin = document.getElementById('loginButton');
const erroLogin = document.getElementById('errorLogin');

// input
var rNumber = null;
var password = null;


// output
var returnLogin = null;

// button login
btnLogin.addEventListener('click',  async function (e) {
    // get values from form
    rNumber = document.getElementById('rNumberLogin').value;
    password = document.getElementById('userPasswordLogin').value;

    console.log(rNumber)
    console.log(password)

    var user = {
        "r_nummer": rNumber,
        "password": password
    }

    console.log(user)

    // send request
    var responseLogin = await fetch("http://192.168.1.44:8000/login_user", {
        method: 'POST',
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(user)
    });

    // get data response
    returnLogin = await responseLogin.json();

    // check bool
    if (returnLogin["isSucces"] === 0) {
        // show error
        erroLogin.innerHTML = "Login in not correct";
    } else {
        // storage user local
        localStorage.setItem("username", returnLogin["name"]);
        localStorage.setItem("r-number", returnLogin["r-nummer"]);
        localStorage.setItem("isLoggedIn", returnLogin["isSucces"]);
        localStorage.setItem("credits", returnLogin["credit"]);

        // redirect to order page
        window.location.replace("http://localhost:63342/html/order.html");
    }
})