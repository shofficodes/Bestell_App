function init(){
    renderDishes();
}

function renderDishes(){
    dishCategoryRef = document.getElementById("dishCategory");
    dishCategoryRef.innerHTML = "";

    for (let i = 0; i < burgerHouseCategories.length; i++){
        dishCategoryRef.innerHTML += categoryTemplate(i);
    }
}

function getDishButton(dishIndex){
    if(burgerHouseDishes[dishIndex].amount == 0){
        return `
            <buttom class="addBtn">Add to basket</buttom>
        `
    }
    else if (burgerHouseDishes[dishIndex].amount > 0){
        return `
            <buttom class="addedBtn">Added ${burgerHouseDishes[dishIndex].amount}</buttom>
        `
    }
}

function getCategoryDishes(cat){
    let dishHTML = "";
    for (let i = 0; i < burgerHouseDishes.length; i++){
        if (cat == burgerHouseDishes[i].category){
            dishHTML += dishesTemplate(i);
        }
    }
    return dishHTML;
}

function checkSubtitle(i){
    return burgerHouseCategories[i].subtitle != "" ? burgerHouseCategories[i].subtitle : "";
}