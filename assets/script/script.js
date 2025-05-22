async function fetchRecettes() {
  let res = await fetch("assets/data/recette.json");
  let data = await res.json();

  return data.recipes;
}
