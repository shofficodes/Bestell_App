function saveToLocalStorage() {
    localStorage.setItem("burgerHouseCategories", JSON.stringify(burgerHouseCategories));
    localStorage.setItem("burgerHouseDishes", JSON.stringify(burgerHouseDishes));
}

function getCategoriesFromLocalStorage(pushError = false) {
    try {
        let data = localStorage.getItem("burgerHouseCategories");

        if (data === null) {
            return;
        }

        let myArr = JSON.parse(data);

        if (Array.isArray(myArr) && myArr.length > 0) {
            burgerHouseCategories = myArr;
        }
    } catch (error) {
        if (pushError) {
            console.log("Kein gültiger localStorage gefunden:", error);
        }
    }
}

function getDishesFromLocalStorage(pushError = false) {
    try {
        let data = localStorage.getItem("burgerHouseDishes");

        if (data === null) {
            return;
        }

        let myArr = JSON.parse(data);

        if (Array.isArray(myArr) && myArr.length > 0) {
            burgerHouseDishes = myArr;
        }
    } catch (error) {
        if (pushError) {
            console.log("Kein gültiger localStorage gefunden:", error);
        }
    }
}

