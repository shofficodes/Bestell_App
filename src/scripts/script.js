function init() {
    getDishesFromLocalStorage();
    renderDishes();
    renderBasket();
    checkForReload();
    renderPrices();
    changeIcon();
    enableDialogOutsideClickClose();
    enableBasketOutsideClickClose();
    setupSwitchToMobileListener();
}

function mobileInit(){
    getDishesFromLocalStorage();
    renderDishes();
    renderBasket();
    renderPrices();
    changeIcon();
    enableDialogOutsideClickClose();
    enableBasketOutsideClickClose();
}

function renderDishes() {
    dishCategoryRef = document.getElementById("dishCategory");
    dishCategoryRef.innerHTML = "";

    for (let i = 0; i < burgerHouseCategories.length; i++) {
        dishCategoryRef.innerHTML += categoryTemplate(i);
    }
}

function getDishButton(dishIndex) {
    if (burgerHouseDishes[dishIndex].amount == 0) {
        return `
            <button class="addBtn" onclick="addToBasket(${dishIndex})">Add to basket</button>
        `
    }
    else if (burgerHouseDishes[dishIndex].amount > 0) {
        return `
            <button class="addedBtn" onclick="addToBasket(${dishIndex})">Added ${burgerHouseDishes[dishIndex].amount}</button>
        `
    }
}

function getCategoryDishes(cat) {
    let dishHTML = "";
    for (let i = 0; i < burgerHouseDishes.length; i++) {
        if (cat == burgerHouseDishes[i].category) {
            dishHTML += dishesTemplate(i);
        }
    }
    return dishHTML;
}

function checkSubtitle(i) {
    return burgerHouseCategories[i].subtitle != "" ? burgerHouseCategories[i].subtitle : "";
}

function formatPrice(amount) {
    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
        showBasket();
    }
});