//variable
var jsonOrder = null;

// function open new window
function open_options_window(clicked_id){
    jsonOrder = "{id:" + clicked_id + "}"
    divOptions.classList.add('visible')
    divOptions.classList.remove('invisible')
    page.classList.add('notUsedPage')
}

// load options
window.api_1 = function api_1() {
    const producten_container = document.getElementById('producten-container');
    const url_api = "http://127.0.0.1:8000/products";

    async function api_1() {
        // const response = await fetch(url_api, {
        //     "method": "GET"
        // });
        // const data = await response.json();
        const data = [{'id': 0, 'name': 'Cappucino', 'prijs': 3.0, 'land': 'Italy', 'discription': 'Empty', 'iscoffee': true}, {'id': 1, 'name': 'Espresso', 'prijs': 2.0, 'land': 'Duitsland', 'discription': 'Empty', 'iscoffee': true}, {'id': 2, 'name': 'Groene_thee', 'prijs': 2.5, 'land': 'Taiwan', 'discription': 'Empty', 'iscoffee': false}, {'id': 3, 'name': 'Ijskoffie', 'prijs': 3.5, 'land': 'België', 'discription': 'Koude koffie met ijs klontjes', 'iscoffee': true}, {'id': 4, 'name': 'Lungo', 'prijs': 1.5, 'land': 'België', 'discription': 'Empty', 'iscoffee': true}, {'id': 5, 'name': 'Munt_thee', 'prijs': 1.2, 'land': 'Nederland', 'discription': 'Thee van munt bladeren', 'iscoffee': false}, {'id': 6, 'name': 'Ristretto', 'prijs': 2.2, 'land': 'Nederland', 'discription': 'Empty', 'iscoffee': true}]
        // Clear section for next output
        producten_container.innerHTML = "";

        // console.log(data)
        for (var i in data) {
            // console.log(data[i].name)

            // Create new elements
            var newDiv_product = document.createElement('div');
            newDiv_product.className = 'producten_inner_container';
            newDiv_product.classList.add('col-3')
            // newDiv_product.classList.add('mx-auto')
            newDiv_product.classList.add('justify-content-around"')
            newDiv_product.classList.add('row')


            var newH1_titel = document.createElement('h1');
            newH1_titel.className = 'product-name';
            newH1_titel.classList.add('col-12')

            var newP_land = document.createElement('p');
            newP_land.className = 'product-land';
            newP_land.classList.add('col-12')

            var newP_prijs = document.createElement('p');
            newP_prijs.className = 'product-prijs';
            newP_prijs.classList.add('col-12')

            var newP_description = document.createElement('p');
            newP_description.className = 'product-discription';
            newP_description.classList.add('col-12')

            var newbutton = document.createElement('button');


            newbutton.className = 'test';
            newbutton.classList.add('col-6')
            newbutton.classList.add('mx-auto')


            newH1_titel.innerHTML = data[i].name;
            newP_land.innerHTML = "Country: " + data[i].land;
            newP_prijs.innerHTML = "Price: \u20AC " + data[i].prijs;
            newP_description.innerHTML ="Description: " + data[i].discription;
            newbutton.innerHTML = "order"

            newbutton.id = data[i].id


            newbutton.setAttribute("onclick","open_options_window(this.id)");

            newDiv_product.appendChild(newH1_titel);
            newDiv_product.appendChild(newP_land);
            newDiv_product.appendChild(newP_prijs);
            newDiv_product.appendChild(newP_description);
            newDiv_product.appendChild(newbutton);

            producten_container.appendChild(newDiv_product);
            console.log("Gedaan")
        }
        return data

    }
    api_1()
}

// act upon opening page
api_1()


// show options
//test
const divOptions = document.getElementById('options')
const page = document.getElementById('pageOrder')



// size order
var sizeCoffee = null

//buttons
const btnSmall = document.getElementById("buttonSmall")
const btnMedium = document.getElementById("buttonMedium")
const btnLarge = document.getElementById("buttonLarge")

//size small selected
btnSmall.addEventListener('click', function (e){
    //add classes
    btnSmall.classList.add('selectedButton')
    btnMedium.classList.add('notUsed')
    btnLarge.classList.add('notUsed')

    //remove classes
    btnSmall.classList.remove('notUsed')
    btnMedium.classList.remove('selectedButton')
    btnLarge.classList.remove('selectedButton')


})

//size medium selected
btnMedium.addEventListener('click', function (e){
    //remove classes

    //add classes
    btnMedium.classList.add('selectedButton')
    btnSmall.classList.add('notUsed')
    btnLarge.classList.add('notUsed')

    // //remove classes
    btnSmall.classList.remove('selectedButton')
    btnMedium.classList.remove('notUsed')
    btnLarge.classList.remove('selectedButton')
})
//size large selected
btnLarge.addEventListener('click', function (e){
    //add classes
    btnLarge.classList.add('selectedButton')
    btnMedium.classList.add('notUsed')
    btnSmall.classList.add('notUsed')

    // //remove classes
    btnSmall.classList.remove('selectedButton')
    btnMedium.classList.remove('selectedButton')
    btnLarge.classList.remove('notUsed')
})




