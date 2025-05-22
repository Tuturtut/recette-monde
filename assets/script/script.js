async function fetchRecettes() {
  let res = await fetch("assets/data/recette.json");
  let data = await res.json();

  return data.recipes;
}

function renderRecettes(recipes) {
  const recipesContainer = document.getElementById("recipesContainer");

  // Create the article for each recipe
  recipesContainer.innerHTML = "";

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

    recipeDiv.addEventListener("click", () => {
      renderRecettesDetails(element);
    });

    recipeDiv.appendChild(ingredientList);

    // Add article to container
    recipesContainer.appendChild(recipeDiv);
  });
}

function renderRecettesDetails(recipe) {
  console.log(recipe);
  let popup = document.getElementById("popup");
  popup.style.display = "flex";

  let popupTitle = document.getElementById("popupTitle");
  popupTitle.innerText = recipe.name;

  let servings = document.getElementById("servings");
  servings.innerText = "Nombre de personnes : " + recipe.servings;

  let ingredients = document.getElementById("ingredients");
  ingredients.innerText = "Ingrédients : ";

  let ingredientList = document.getElementById("ingredientList");
  ingredientList.innerHTML = "";

  recipe.ingredients.map(({ unit = "", quantity = "", ingredient: name }) => {
    const li = document.createElement("li");
    li.innerText = unit
      ? `${quantity} ${unit} de ${name}`
      : `${quantity} ${unit} ${name}`;
    ingredientList.appendChild(li);
  });

  let popupInstruction = document.getElementById("popupInstruction");
  popupInstruction.innerText = "Contenu de la recette : " + recipe.description;

  let appliance = document.getElementById("appliance");
  appliance.innerText = "Outils : " + recipe.appliance;

  let ustensils = document.getElementById("ustensils");
  ustensils.innerText = "Ustensiles : " + recipe.ustensils.join(", ");

  let time = document.getElementById("time");
  time.innerText = "Temps de cuisson : " + recipe.time + " min";
}

function closePopup() {
  let popup = document.getElementById("popup");
  popup.style.display = "none";
}

document.getElementById("closePopup").addEventListener("click", closePopup);

async function main() {
  const recettes = await fetchRecettes();

  let searchBarValue = document.getElementById("searchInput");

  renderRecettes(recettes);

  searchBarValue.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
    const filteredRecettes = recettes.filter((recette) =>
      recette.name.toLowerCase().includes(value)
    );
    renderRecettes(filteredRecettes);
  });
}

main();
