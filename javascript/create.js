// variables
// input
var inputRnumber = null;
var inputUsername = null;
var inputPassword = null;
var inputRepeatPassword = null;

// html elements
const btnCreate = document.getElementById('createUser')
const errorCreate = document.getElementById('errorCreate')
const url_api_create = "http://172.24.192.125:8000/register_user"

// encryption
var encryptPassword = null;




// create a new user
btnCreate.addEventListener('click', async function (e) {
    // get values from form
    inputRnumber = document.getElementById('rNumber').value;
    inputUsername = document.getElementById('userName').value;
    inputPassword = document.getElementById('userPassword').value;
    inputRepeatPassword = document.getElementById('userRepeatPassword').value;

    // check input
    if (inputRnumber === "") {
        errorCreate.innerHTML = "NO R-NUMBER";
    } else if (inputUsername === "") {
        errorCreate.innerHTML = "NO USERNAME";
    } else if (inputPassword === "") {
        errorCreate.innerHTML = "NO PASSWORD";
    } else if (inputRepeatPassword === "") {
        errorCreate.innerHTML = "REPEAT YOUR PASSWORD";
    } else if (inputPassword !== inputRepeatPassword) {
        errorCreate.innerHTML = "PASSWORDS ARE NOT THE SAME!";
    } else {
        // encrypt password
        encryptPassword = btoa(inputPassword);

        async function api(){
            // sent data to api
            const responseCreate = await fetch(url_api_create, {
                method: 'POST',
                headers: {
                    "Content-type": 'application/json; charset=UTF-8',
                },
                body:JSON.stringify({
                    name : inputUsername,
                    r_number: inputRnumber,
                    password: encryptPassword,
                }),
            });
            // get reponse data
            const data = await responseCreate.json();
            console.log(data)

            // storage user local
            localStorage.setItem("username", data["name"]);
            localStorage.setItem("rnumber", data["r_nummer"]);
            localStorage.setItem("isLoggedIn", data["isSucces"]);
            localStorage.setItem("credits", data["credit"]);

            if (data["isSucces"] === 1) {
                // redirect to order page
                window.location.replace("http://localhost:63342/html/order.html")
            }
        }
        api();





        // storage user local
        // localStorage.setItem("username", returnCreate["name"]);
        // localStorage.setItem("rnumber", returnCreate["r_nummer"]);
        // localStorage.setItem("isLoggedIn", returnCreate["isSucces"]);
        // localStorage.setItem("credits", returnCreate["credit"]);




    }


})


