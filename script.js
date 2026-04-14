const url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// SEARCH FUNCTION
async function searchMeals(query) {
  const res = await fetch(url + query);
  const data = await res.json();
  displayMeals(data.meals);
}

// DISPLAY FUNCTION
function displayMeals(meals) {
  const results = document.getElementById("results");
  results.innerHTML = "";

  meals.forEach(meal => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <h3>${meal.strMeal}</h3>
      <img src="${meal.strMealThumb}">
      <p>${meal.strCategory}</p>
      <button onclick="saveMeal('${meal.strMeal}')">Save</button>
    `;

    results.appendChild(div);
  });
}

// EVENTS
document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchInput").value;
  searchMeals(query);
  saveSearch(query);
});

window.addEventListener("DOMContentLoaded", () => {
  loadSearch();
});

// LOCAL STORAGE
function saveSearch(query) {
  localStorage.setItem("lastSearch", query);
}

function loadSearch() {
  const saved = localStorage.getItem("lastSearch");
  if (saved) {
    searchMeals(saved);
  }
}

function saveMeal(meal) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites.push(meal);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  alert("Saved!");
}
