const loadData = async (link) => {
    const URL = `https://restcountries.com/v3.1/${link}`;
    const res = await fetch(URL);
    const data = await res.json();
    showData(data);
};

const showData = (countries) => {
    const cards = document.getElementById("cards");
    cards.innerHTML = "";
    // console.log(countries);
    countries.forEach((country) => {
        const card = document.createElement("div");
        card.classList.add("col");
        card.innerHTML = `
        <div class="card">
            <img src="${country.flags.png}" class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">${country.name.common}</h5>
                <p class="card-text">
                    Continent: ${country.continents[0]}
                </p>
                <button type="button" onclick="detailsBtn('${country.cca2}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#mealDetail">
                Show Details
                </button>
            </div>
        </div>
        `;
        cards.appendChild(card);
        // console.log(country.cca2);
    });
};

const modalContainer = document.getElementById("mealDetail");
const detailsBtn = async (link) => {
    const URL = `https://restcountries.com/v3.1/alpha/${link}`;
    const details = await fetch(URL);
    const data = await details.json();
    showDetails(data);
};
const showDetails = (data) => {
    const countryName = document.getElementById("countryName");
    countryName.innerText = data[0].name.common;
    document.getElementById("modal-body").innerText =
        "Their currency is " + Object.keys(data[0].currencies)[0];
    console.log(Object.keys(data[0].currencies)[0]);
};

const showRegion = (id) => {
    loadData("region/" + id);
};

loadData("all");
