let request =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";
let randomRequest = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
let tabIngredients = [];
let tabAllIngredients = [];
let length = 0;

fetch(randomRequest).then((response) => {
  response.json().then((data) => {
    getInfo(data);
  });
});

function getInfo(data) {
  let name = document.getElementById("nameCocktail");
  name.innerHTML = data.drinks[0].strDrink;
  for (let i = 1; i <= 5; i++) {
    let ingredient = data.drinks[0]["strIngredient" + i];
    if (ingredient != null) {
      tabIngredients.push(ingredient);
      tabAllIngredients.push(ingredient);
      length++;
    }
  }
  createListIngredients();
}

function createListIngredients() {
  for (let i = 0; i < 10 - length; i++) {
    fetch(randomRequest).then((response) => {
      response.json().then((data) => {
        if (data.drinks[0].strIngredient1 != null)
          tabAllIngredients.push(data.drinks[0].strIngredient1);
      });
    });
  }
}

function displayIngredients() {}
console.log(tabAllIngredients);
