const cardsRow = document.getElementById("cardsRow");
const filterDropdown = document.getElementById("filterDropdown");
let pokemons = [];

async function getPokemonData(id) {
const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
const data = await res.json();
return {
    name: data.name,
    image: data.sprites.front_default,
    ability: data.abilities[0]?.ability.name || "Unknown",
};
}

async function loadPokemons() {
for (let i = 1; i <= 15; i++) {
    const data = await getPokemonData(i);
    pokemons.push(data);
    const li = document.createElement("li");
    li.innerHTML = `<a class="dropdown-item" href="#" data-value="${data.name}">${data.name}</a>`;
    filterDropdown.appendChild(li);
}
renderCards("all");
}

function renderCards(filter) {
cardsRow.innerHTML = "";
const filtered = filter === "all" ? pokemons : pokemons.filter(p => p.name === filter);

filtered.forEach(pokemon => {
    const col = document.createElement("div");
    col.className = "col-12 col-sm-6 col-md-4 col-lg-4 d-flex justify-content-center";

    col.innerHTML = `
    <div class="border border-warning card bg-dark text-white shadow-sm" style="width: 18rem;">
        <img src="${pokemon.image}" class="card-img-top mx-auto mt-3" style="width: 120px;" alt="${pokemon.name}">
        <div class="card-body text-center">
        <h5 class="card-title text-capitalize">${pokemon.name}</h5>
        <p class="card-text"><strong>Habilidad:</strong> ${pokemon.ability}</p>
        </div>
    </div>`;

    cardsRow.appendChild(col);
});
}

filterDropdown.addEventListener("click", (e) => {
if (e.target.matches(".dropdown-item")) {
    const value = e.target.getAttribute("data-value");
    renderCards(value);
}
});

loadPokemons();
