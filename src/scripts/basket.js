function addToBasket(i) {
    burgerHouseDishes[i].amount++;
    saveToLocalStorage();
    init();
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
    const basketRef = document.getElementById("basket");
    const emptyBasketRef = document.getElementById("emptyBasket");

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

function addAmount(i) {
    burgerHouseDishes[i].amount++;
    saveToLocalStorage();
    init();
}

function reduceAmount(i) {
    burgerHouseDishes[i].amount--;
    saveToLocalStorage();
    init();
}

function deleteFromBasket(i) {
    burgerHouseDishes[i].amount = 0;
    saveToLocalStorage();
    init();
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

function openDialog() {
    let dialogRef = document.getElementById("dialogId");
    dialogRef.showModal();
}

function closeDialog() {
    let dialogRef = document.getElementById("dialogId");
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
    init();
}

function getExampleOrder() {
    burgerHouseDishes[0].amount = 2;
    burgerHouseDishes[4].amount = 1;
    burgerHouseDishes[9].amount = 1;

    saveToLocalStorage();
    init();
}