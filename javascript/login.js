// variables
// html elements
const btnLogin = document.getElementById('loginButton');
const erroLogin = document.getElementById('errorLogin');

// input
var inputRnumber = null;
var inputPassword = null;


// output
var returnLogin = null;

// button login
btnLogin.addEventListener('click',  async function (e) {
    // get values from form
    inputRnumber = document.getElementById('rNumberLogin').value;
    inputPassword = document.getElementById('userPasswordLogin').value;

    // api url
    const api_url_login ="http://172.24.192.125:8000/login_user";



    // send request
    async function api(){
        const responseLogin = await fetch(api_url_login, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({
                r_number: inputRnumber,
                password: btoa(inputPassword)
            }),
        });

        returnLogin = await responseLogin.json();
        console.log(responseLogin);

        // check bool
        if (returnLogin["isSucces"] === 0) {
            // show error
            erroLogin.innerHTML = "Login in not correct";
        } else {
            // storage user local
            localStorage.setItem("username", returnLogin["name"]);
            localStorage.setItem("r_number", returnLogin["r_number"]);
            localStorage.setItem("isLoggedIn", returnLogin["isSucces"]);
            localStorage.setItem("credits", returnLogin["credit"]);

            // redirect to order page
            window.location.replace("http://172.24.192.125/order.html");
        }
    }
    api();
})