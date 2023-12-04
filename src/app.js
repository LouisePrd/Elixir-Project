let randomRequest =
  "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=" +
  String.fromCharCode(Math.floor(Math.random() * 26) + 97);
let tabIngredients = [];
let tabAllIngredients = [];

// API request to get the cocktail
fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php").then(
  (response) => {
    response.json().then((data) => {
      getInfo(data);
    });
  }
);

// Get the name of the cocktail and the first 5 ingredients
function getInfo(data) {
  let name = document.getElementById("nameCocktail");
  name.innerHTML = data.drinks[0].strDrink;
  for (let i = 1; i <= 5; i++) {
    let ingredient = data.drinks[0]["strIngredient" + i];
    if (ingredient != null && data.drinks != null) {
      tabIngredients.push(ingredient);
    }
  }
  createListIngredients();
}

// Create a list of random ingredients for user options, 12 ingredients in total
function createListIngredients() {
  tabAllIngredients = tabAllIngredients.concat(tabIngredients);

  fetch(randomRequest).then((response) => {
    response.json().then((data) => {
      if (data.drinks.length > 12 - tabIngredients.length) {
      } else createListIngredients();
    });
  });

  // Wait 100ms to be sure that the list is created
  setTimeout(function () {
    displayIngredients();
  }, 100);
}

// Display the ingredients in the HTML to create a list
function displayIngredients() {
  let listIngredients = document.getElementById("listIngredients");
  for (let i = 0; i < tabAllIngredients.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = tabAllIngredients[i];
    listIngredients.appendChild(li);

    li.addEventListener("click", function () {
      addIngredient(tabAllIngredients[i]);
    });
  }
}

// Add an ingredient to the user recipe
function addIngredient(ingredient) {
  let choice = document.getElementById("recipe");
  let li = document.createElement("li");
  li.innerHTML = ingredient;
  choice.appendChild(li);
  li.addEventListener("click", function () {
    deleteIngredient(ingredient);
  });
}

// Delete an ingredient from the user recipe
function deleteIngredient(ingredient) {
  let place = document.getElementById("recipe").getElementsByTagName("li");
  for (let i = 0; i < place.length; i++) {
    if (place[i].innerHTML == ingredient) {
      place[i].remove();
    }
  }
}
