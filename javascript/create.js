// variables
// input
var username = null;
var rNumber = null;
var password = null;
var repeatPassword = null;

// html elements
const btnCreate = document.getElementById('createUser')
const errorCreate = document.getElementById('errorCreate')
const url_api_create = "http://192.168.1.44:8000/register_user"

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
    } else {
        // encrypt password
        encryptPassword = btoa(password);

        console.log(username)
        console.log(rNumber)
        console.log(password)


        // sent data to api
        const responseCreate = await fetch(url_api_create, {
            method: "POST",
            header: {
                "Content-type": "application/json"
            },
            body:{
                "name": username,
                "password": encryptPassword,
                "r_nummer": rNumber
            }
        });

        // get reponse data
        returnCreate = await responseCreate.json()


        // storage user local
        localStorage.setItem("username", returnCreate["name"]);
        localStorage.setItem("rnumber", returnCreate["r_nummer"]);
        localStorage.setItem("isLoggedIn", returnCreate["isSucces"]);
        localStorage.setItem("credits", returnCreate["credit"]);

        if (returnCreate["isSucces"] === 0) {
            // redirect to order page
            window.location.replace("http:/192.168.1.44/order.html")
        }
    }


})


