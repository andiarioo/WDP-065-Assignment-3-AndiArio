// // const files = "https://reqres.in/api/users";
// const files = "https://covid-193.p.rapidapi.com/history?country=usa&day=2020-06-02";
// const options = {
//   method: "GET",
//   headers: {
//     "X-RapidAPI-Key": "179f270156msh239fb9ffc639653p126469jsn1384dd3d56ee",
//     "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
//   },
// };

// fetch(files, options)
//   .then((items) => items.json())
//   .then((final) => {
//     console.log(final.response);
//   });

const url = "https://covid-193.p.rapidapi.com/statistics";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "179f270156msh239fb9ffc639653p126469jsn1384dd3d56ee",
    "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
  },
};

const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-country-cards-container]");
const searchInput = document.querySelector("[data-search]");

let countries = [];

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  countries.forEach((country) => {
    const isVisible = country.country.toLowerCase().includes(value);
    country.element.classList.toggle("hide", !isVisible);
  });
});

fetch(url, options)
  .then((res) => res.json())
  .then((data) => {
    countries = data.response.map((country) => {
      const card = userCardTemplate.content.cloneNode(true).children[0];
      const title = card.querySelector("[data-title]");
      const active_cases = card.querySelector("[data-active-cases]");
      const new_cases = card.querySelector("[data-new-cases]");
      const recovered_cases = card.querySelector("[data-recovered-cases]");
      const total_cases = card.querySelector("[data-total-cases]");
      const total_deaths = card.querySelector("[data-total-deaths]");
      const total_tests = card.querySelector("[data-total-tests]");
      // console.log(country);
      title.textContent = country.country;
      active_cases.textContent = `Active cases : ${country.cases.active}`;
      new_cases.textContent = `New cases : ${country.cases.new}`;
      recovered_cases.textContent = `Recovered cases : ${country.cases.recovered}`;
      total_cases.textContent = `Total cases : ${country.cases.total}`;
      total_deaths.textContent = `Total deaths : ${country.deaths.total}`;
      total_tests.textContent = `Total tests : ${country.tests.total}`;
      userCardContainer.append(card);
      return { country: country.country, active_cases: country.cases.active, element: card };
    });
  });
