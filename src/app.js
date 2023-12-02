let request =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";
let randomCocktail = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
let tabIngredients = [];
let tabAllIngredients = [];

// API request to get the cocktail
fetch(randomCocktail).then((response) => {
  response.json().then((data) => {
    getInfo(data);
  });
});

// We get the name of the cocktail and the first 5 ingredients
function getInfo(data) {
  let name = document.getElementById("nameCocktail");
  name.innerHTML = data.drinks[0].strDrink;
  for (let i = 1; i <= 5; i++) {
    let ingredient = data.drinks[0]["strIngredient" + i];
    if (ingredient != null) {
      tabIngredients.push(ingredient);
    }
  }
  createListIngredients();
}

// We create a list of random ingredients so the user can have options
// We want 12 ingredients in total, 5 of them are the ingredients of the main cocktail
function createListIngredients() {
  let randomLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  let randomRequest =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=" + randomLetter;
  fetch(randomRequest).then((response) => {
    response.json().then((data) => {
      if (
        data.drinks.length > 12 - tabIngredients.length 
      ) {
        for (let i = 0; i < 12 - tabIngredients.length; i++) {
          if (
            !tabIngredients.includes(data.drinks[i].strIngredient1) &&
            !tabAllIngredients.includes(data.drinks[i].strIngredient1)
          )
            tabAllIngredients.push(data.drinks[i].strIngredient1);
        }
      } else createListIngredients();
    });
  });

  setTimeout(function () {
    displayIngredients();
  }, 100);
}

// We display the ingredients in the HTML to create a list
function displayIngredients() {
  tabAllIngredients = tabAllIngredients.concat(tabIngredients);
  let listIngredients = document.getElementById("listIngredients");
  listIngredients.innerHTML = "";
  for (let i = 0; i < tabAllIngredients.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = tabAllIngredients[i];
    listIngredients.appendChild(li);
  }
}
