function categoryTemplate(catIndex){
    return `        
            <div class="bannerWrapper">
                <header class="catBanner">
                    <img class="catIcon" src="${burgerHouseCategories[catIndex].icon_path}" alt="${burgerHouseCategories[catIndex].icon_alt}">
                    <div class="catTitleWrapper">
                        <h2 class="catTitle">${burgerHouseCategories[catIndex].title} ${checkSubtitle(catIndex)}</h2>
                    </div>
                </header>
                <div class="bannerBackground"></div>
            </div>

            <section class="dishes">
                ${getCategoryDishes(burgerHouseCategories[catIndex].tag)}
            </section>
    `
}

function dishesTemplate(dishIndex){
    return `
        <div class="dish">
                        <img src="${burgerHouseDishes[dishIndex].img_path}"
                            alt="${burgerHouseDishes[dishIndex].img_alt}">
                        <div class="dishTextWrapper">
                            <div class="dishText">
                                <h3>${burgerHouseDishes[dishIndex].name}</h3>
                                <h4>${burgerHouseDishes[dishIndex].describtion}</h4>
                            </div>
                            <div class="dishInteraction">
                                <p>${formatPrice(burgerHouseDishes[dishIndex].price)}</p>
                                ${getDishButton(dishIndex)}
                            </div>
                        </div>
        </div>
    `
}

function basketTemplate(i){
    return `
        <div class="addedDish">
            <p>${burgerHouseDishes[i].amount} x ${burgerHouseDishes[i].name}</p>
            <div class="rowWrapper">
                <div class="addRemoveBtn">
                    <button class="deleteBtn" onclick="reduceAmount(${i})"><img id="deleteIconImg" src="./assets/icons/buttons/delete.svg" alt="delete_icon"></button>
                     ${burgerHouseDishes[i].amount} 
                    <button onclick="addAmount(${i})">+</button>
                </div>
                <p>${formatPrice(burgerHouseDishes[i].price)}</p>
            </div>
        </div>
    `
}

function secondBasketTemplate(i){
    return `
        <div class="addedDish">
            <div class=firstRowWrapper>
                <p>${burgerHouseDishes[i].amount} x ${burgerHouseDishes[i].name}</p>
                <button class="deleteBtn" onclick="deleteFromBasket(${i})"><img id="deleteIconImg" src="./assets/icons/buttons/delete.svg" alt="delete_icon"></button>
            </div>
            <div class="rowWrapper">
                <div class="addRemoveBtn">
                    <button onclick="reduceAmount(${i})">-</button>
                     ${burgerHouseDishes[i].amount} 
                    <button onclick="addAmount(${i})">+</button>
                </div>
                <p>${formatPrice(burgerHouseDishes[i].price)}</p>
            </div>
        </div>
    `
}