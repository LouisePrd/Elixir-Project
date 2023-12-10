window.onload = function () {
    let tabCocktails = [];
    let nbCocktails = 5;
    for (let i = 0; i < nbCocktails; i++) {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php").then((response) => {
            response.json().then((data) => {
                if (data.drinks != null) {
                    let cocktail = data.drinks[0];
                    if (!tabCocktails.includes(cocktail)) {
                        tabCocktails.push(cocktail);
                        createRecipeCard(cocktail);
                    } else nbCocktails++;
                }
            });
        });
        console.log(tabCocktails);
    }
}

function createRecipeCard(cocktail) {
    // Variables
    let recipeCard = document.createElement("div");
    recipeCard.className = "recipe-card";
    let recipeName = document.createElement("h3");
    recipeName.innerHTML = cocktail.strDrink;
    let recipeImg = document.createElement("img");
    recipeImg.src = cocktail.strDrinkThumb;
    recipeImg.alt = cocktail.strDrink;
    let recipeIngredients = document.createElement("ul");
    let recipeInstructions = document.createElement("p");

     // Filling
    recipeInstructions.innerHTML = cocktail.strInstructions;
    recipeCard.appendChild(recipeName);
    recipeCard.appendChild(recipeImg);
    recipeCard.appendChild(recipeIngredients);
    recipeCard.appendChild(recipeInstructions);
    document.getElementById("recipes").appendChild(recipeCard);
     // Ingrédients
    for (let i = 1; i <= 15; i++) {
        let ingredient = cocktail["strIngredient" + i];
        let measure = cocktail["strMeasure" + i];
        if (ingredient != null && ingredient != "") {
            let ingredientItem = document.createElement("li");
            ingredientItem.innerHTML = measure + " " + ingredient;
            recipeIngredients.appendChild(ingredientItem);
        }
    }
}