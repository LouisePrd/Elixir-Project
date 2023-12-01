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
  let randomLetter = String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  let randomRequest =
    "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=" + randomLetter;
  fetch(randomRequest).then((response) => {
    response.json().then((data) => {
      if (data.drinks != null && data.drinks.length > 3) console.log(data);
      else createListIngredients();
    });
  });
  displayIngredients();
}

function displayIngredients() {
  //console.log(tabIngredients);
  //console.log(tabAllIngredients);
  let listIngredients = document.getElementById("listIngredients");
  listIngredients.innerHTML = "";
  for (let i = 0; i < tabIngredients.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = tabIngredients[i];
    listIngredients.appendChild(li);
  }
}
