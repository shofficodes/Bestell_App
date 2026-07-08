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

