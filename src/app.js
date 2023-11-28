let request = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita";

fetch(request).then((response) => {
    console.log(response);
    response.json().then((data) => {
        console.log(data);
    });
});