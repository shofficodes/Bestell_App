function addToBasket(i) {
    burgerHouseDishes[i].amount++;
    saveToLocalStorage();
    if (window.matchMedia("(min-width: 769px)").matches) {
        init();
    }
    else {
        getDishesFromLocalStorage();
        renderDishes();
    }
}

function renderBasket() {
    basketDishesRef = document.getElementById("addedDishes");
    basketDishesRef.innerHTML = "";

    for (let i = 0; i < burgerHouseDishes.length; i++) {
        if (burgerHouseDishes[i].amount > 0 && burgerHouseDishes[i].amount < 2) {
            basketDishesRef.innerHTML += basketTemplate(i);
        }
        else if (burgerHouseDishes[i].amount > 1) {
            basketDishesRef.innerHTML += secondBasketTemplate(i);
        }
    }

    getBasketLayout(basketDishesRef.innerHTML);
}

function getBasketLayout(basketDishesRef) {
    let basketRef = document.getElementById("basket");
    let emptyBasketRef = document.getElementById("emptyBasket");

    if (basketDishesRef == "") {
        basketRef.classList.add("hidden");
        basketRef.classList.remove("flex-visible");

        emptyBasketRef.classList.remove("hidden");
        emptyBasketRef.classList.add("flex-visible");
    } else {
        basketRef.classList.remove("hidden");
        basketRef.classList.add("flex-visible");

        emptyBasketRef.classList.add("hidden");
        emptyBasketRef.classList.remove("flex-visible");
    }
}

function checkForReload() {
    const navEntry = performance.getEntriesByType("navigation")[0];
    const isReload = navEntry && navEntry.type === "reload";

    const naviEntry = performance.getEntriesByType("navigation")[0];
    const isFirstLoad = naviEntry && naviEntry.type === "navigate";

    if (isReload || isFirstLoad) {
        hideBasket();
    }
}

function addAmount(i) {
    burgerHouseDishes[i].amount++;
    saveToLocalStorage();
    mobileInit();
}

function reduceAmount(i) {
    burgerHouseDishes[i].amount--;
    saveToLocalStorage();
    mobileInit();
}

function deleteFromBasket(i) {
    burgerHouseDishes[i].amount = 0;
    saveToLocalStorage();
    mobileInit();
}

function renderPrices() {
    let subtotalRef = document.getElementById("subtotal");
    let deliveryFeeRef = document.getElementById("deliveryFee");
    let totalRef = document.getElementById("total");

    subtotalRef.innerHTML = "";
    deliveryFeeRef.innerHTML = "";
    totalRef.innerHTML = "";

    subtotalRef.innerHTML = getSubtotal();
    deliveryFeeRef.innerHTML = getDeliveryFee(subtotalRef.innerHTML);
    totalRef.innerHTML = formatPrice(parsePrice(subtotalRef.innerHTML) + parsePrice(deliveryFeeRef.innerHTML));
}

function getSubtotal() {
    let subtotal = 0;
    for (let i = 0; i < burgerHouseDishes.length; i++) {
        if (burgerHouseDishes[i].amount > 0) {
            subtotal += burgerHouseDishes[i].amount * burgerHouseDishes[i].price;
        }
    }
    return formatPrice(subtotal);
}

function getDeliveryFee(subtotal) {
    deliveryFee = 4.99;
    if (parsePrice(subtotal) > 50) {
        deliveryFee = 0;
    }
    return formatPrice(deliveryFee);
}

function parsePrice(priceString) {
    if (!priceString) return 0;

    const cleaned = priceString
        .replace(/\s/g, "")
        .replace(/€/g, "")
        .replace(/\./g, "")
        .replace(",", ".")
        .match(/-?\d+(\.\d+)?/);

    return cleaned ? Number(cleaned[0]) : 0;
}

function changeIcon() {
    const img = document.getElementById("deleteIconImg");
    if (img) {
        img.addEventListener("mousedown", () => {
            img.src = "./assets/icons/buttons/delete_active.svg";
        });

        img.addEventListener("mouseup", () => {
            img.src = "./assets/icons/buttons/delete.svg";
        });

        img.addEventListener("mouseleave", () => {
            img.src = "./assets/icons/buttons/delete.svg";
        });
    }
}

function openDialog(id) {
    let dialogRef = document.getElementById(id);
    dialogRef.showModal();
}

function closeDialog(id) {
    let dialogRef = document.getElementById(id);
    dialogRef.close();
    clearShoppingCart();
}

function enableDialogOutsideClickClose(i) {
    const dialogs = document.querySelectorAll("dialog");

    dialogs.forEach((dialog) => {
        dialog.addEventListener("click", function (event) {
            const rect = dialog.getBoundingClientRect();

            const isInDialog =
                event.clientX >= rect.left &&
                event.clientX <= rect.right &&
                event.clientY >= rect.top &&
                event.clientY <= rect.bottom;

            if (!isInDialog) {
                dialog.close();
            }
        });
    });
}

function clearShoppingCart() {
    for (let i = 0; i < burgerHouseDishes.length; i++) {
        burgerHouseDishes[i].amount = 0;
    }

    saveToLocalStorage();
    if (window.matchMedia("(min-width: 769px)").matches) {
        init();
    }
    else {
        getDishesFromLocalStorage();
        renderDishes();
    }
}

function getExampleOrder() {
    burgerHouseDishes[0].amount = 2;
    burgerHouseDishes[4].amount = 1;
    burgerHouseDishes[9].amount = 1;

    saveToLocalStorage();
    mobileInit();
}

function openBasket() {
    getDishesFromLocalStorage();
    mobileInit();
}

function hideBasket() {

    let basketRef = document.getElementById("basket");
    let emptyBasketRef = document.getElementById("emptyBasket");

    basketRef.classList.add("hidden");
    basketRef.classList.remove("flex-visible");

    emptyBasketRef.classList.add("hidden");
    emptyBasketRef.classList.remove("flex-visible");
}

function buyNow() {
    openDialog("dialogId");

    if (window.matchMedia("(max-width: 768px)").matches) {
        hideBasket();
    }
}

function isBasketInnerButton(event) {
    return !!(
        event.target.closest(".addButton") ||
        event.target.closest(".reduceButton") ||
        event.target.closest(".deleteBtn")
    );
}

function handleBasketOutsideClick(event) {
    const basket = document.getElementById("basket");
    const emptyBasket = document.getElementById("emptyBasket");
    const openBasket = document.getElementById("basketButton");

    if (!basket || !emptyBasket) return;

    const clickedInsideBasket = basket.contains(event.target);
    const clickedInsideEmptyBasket = emptyBasket.contains(event.target);
    const clickedBasketButton = openBasket.contains(event.target);

    if (clickedBasketButton) return;

    if (!clickedInsideBasket && !clickedInsideEmptyBasket && !isBasketInnerButton(event)) {
        hideBasket();
        document.removeEventListener("click", handleBasketOutsideClick);
    }
}

function enableBasketOutsideClickClose() {
    document.addEventListener("click", handleBasketOutsideClick);
}
