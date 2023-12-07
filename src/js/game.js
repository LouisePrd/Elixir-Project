window.onload = function () {
    let randomRequest =
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=" +
      String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    let tabAllIngredients = [];
    let tabGoodIngredients = [];
    let tabUserIngredients = [];
    let btnStart = document.getElementById("start");
    let gameDiv = document.getElementsByClassName("game")[0];
    gameDiv.style.display = "none";
  
    // API request to get the cocktail
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php").then(
      (response) => {
        response.json().then((data) => {
          getInfo(data);
        });
      }
    );
  
    // Get the name of the cocktail and first 5 ingredients
    function getInfo(data) {
      let name = document.getElementById("nameCocktail");
      name.innerHTML = data.drinks[0].strDrink;
      for (let i = 1; i <= 5; i++) {
        let ingredient = data.drinks[0]["strIngredient" + i];
        if (ingredient != null && data.drinks != null) {
          tabAllIngredients.push(ingredient);
          tabGoodIngredients.push(ingredient);
        }
      }
      createListIngredients();
    }
  
    // Create a list of random ingredients for user options, 12 ingredients in total
    function createListIngredients() {
      let nbIngredients = 12 - tabAllIngredients.length;
      fetch(randomRequest).then((response) => {
        response.json().then((data) => {
          if (data.drinks != null && data.drinks.length > nbIngredients) {
            for (let i = 0; i < nbIngredients; i++) {
              if (data.drinks[i] != null) {
                let ingredient = data.drinks[i].strIngredient1;
                if (!tabAllIngredients.includes(ingredient))
                  tabAllIngredients.push(ingredient);
                else nbIngredients++;
              }
            }
          } else createListIngredients();
        });
      });
    }
  
    btnStart.addEventListener("click", function () {
      btnStart.style.display = "none";
      gameDiv.style.display = "flex";
      displayIngredients();
    });
  
    // Display the ingredients in the HTML to create a list
    function displayIngredients() {
      tabAllIngredients.sort(() => Math.random() - 0.5);
      let listIngredients = document.getElementById("listIngredients");
      for (let i = 0; i < tabAllIngredients.length; i++) {
        let li = document.createElement("li");
        let btn = document.createElement("button");
        btn.classList.add("btnAdd");
        btn.innerHTML = tabAllIngredients[i];
        li.appendChild(btn);
        listIngredients.appendChild(li);
  
        li.addEventListener("click", function () {
          if (!tabUserIngredients.includes(tabAllIngredients[i])) {
            addIngredient(tabAllIngredients[i]);
            li.style.textDecoration = "line-through";
            tabUserIngredients.push(tabAllIngredients[i]);
          }
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
        let place = document
          .getElementById("listIngredients")
          .getElementsByTagName("li");
        for (let i = 0; i < place.length; i++) {
          if (place[i].innerHTML == ingredient) {
            place[i].style.textDecoration = "none";
          }
        }
        deleteIngredient(ingredient);
        tabUserIngredients.splice(tabUserIngredients.indexOf(ingredient), 1);
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
  
    document.querySelector("#btnValidate").addEventListener("click", function () {
      if (tabUserIngredients.length < 2) {
        alert("You need at least 2 ingredients");
      } else {
        let goodRecipe = true;
        for (let i = 0; i < tabUserIngredients.length; i++) {
          if (!tabGoodIngredients.includes(tabUserIngredients[i])) {
            goodRecipe = false;
          }
        }
        if (goodRecipe) {
          alert("Well done !! You are the best 😍");
          location.reload();
        } else {
          alert("Not this time !! Try harder 💀");
          location.reload();
        }
      }
    });
  };
  