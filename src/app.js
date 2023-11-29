let request = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";
let randomRequest = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

/*fetch(request).then((response) => {
    console.log(response);
    response.json().then((data) => {
        console.log(data);
    });
});*/

fetch(randomRequest).then((response) => {
  response.json().then((data) => {
    getInfo(data);
  });
});

function getInfo(data) {
  let name = document.getElementById("nameCocktail");
  name.innerHTML = data.drinks[0].strDrink;

  let tabIngredients = [];
  for (let i = 1; i <= 5; i++) {
    let ingredient = data.drinks[0]["strIngredient" + i];
    if (ingredient != null) {
      tabIngredients.push(ingredient);
      console.log(ingredient);
    }
  }
}
