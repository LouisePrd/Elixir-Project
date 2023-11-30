let request =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";
let randomRequest = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
let tabIngredients = [];
let tabAllIngredients = [];

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
    }
  }
  createListIngredients();
}

function createListIngredients() {
  // we get 12 - tabIngredients.length random ingredients
  let randomIngredients = 12 - tabIngredients.length;
  for (let i = 0; i < randomIngredients; i++) {
    fetch(randomRequest).then((response) => {
      response.json().then((data) => {
        let ingredient = data.drinks[0].strIngredient1;
        if (ingredient != null) {
          tabAllIngredients.push(ingredient);
        }
      });
    });
  }
  displayIngredients();
}

function displayIngredients() {
  console.log(tabIngredients);
  console.log(tabAllIngredients);
  let listIngredients = document.getElementById("listIngredients");
  listIngredients.innerHTML = "";
  for (let i = 0; i < tabIngredients.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = tabIngredients[i];
    listIngredients.appendChild(li);
  }
}
