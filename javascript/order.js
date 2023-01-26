//test
const btnTest = document.getElementById("test")
const divOptions = document.getElementById('options')
const page = document.getElementById('pageOrder')

btnTest.addEventListener('click', function (e){
    divOptions.classList.add('visible')
    divOptions.classList.remove('invisible')
    page.classList.add('notUsedPage')


})


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


