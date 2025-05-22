async function fetchRecettes() {
  let res = await fetch("assets/data/recette.json");
  let data = await res.json();

  return data.recipes;
}

function renderRecettes(recipes) {
  const recipesContainer = document.getElementById("recipesContainer");

  // Create the article for each recipe

  recipes.forEach((element) => {
    console.log(element);
    let recipeDiv = document.createElement("article");
    recipeDiv.classList.add("recipe-card");

    let recipeTitle = document.createElement("h2");
    recipeTitle.innerText = element.name;

    recipeDiv.appendChild(recipeTitle);

    let peopleNumber = document.createElement("p");
    peopleNumber.innerHTML = `<strong>Nombre de personnes : </strong>${element.servings}`;

    recipeDiv.appendChild(peopleNumber);

    let ingredientList = document.createElement("ul");

    element.ingredients.forEach(
      ({ unit = "", quantity = "", ingredient: name }) => {
        const li = document.createElement("li");
        li.innerText = unit
          ? `${quantity} ${unit} de ${name}`
          : `${quantity} ${unit} ${name}`;
        ingredientList.appendChild(li);
      }
    );

    recipeDiv.appendChild(ingredientList);

    // Add article to container
    recipesContainer.appendChild(recipeDiv);
  });
}

async function main() {
  const recettes = await fetchRecettes();
  renderRecettes(recettes);
}

main();
