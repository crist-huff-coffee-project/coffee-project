"use strict"

function renderCoffee(coffee) {  //creates inner html for coffees
    let html = `<div class="col-3">${coffee.name}</div>
    <div class="col 3">${coffee.roast}</div>`

    return html;
}

function renderCoffees(coffees) { //creates coffee names from coffees object
    let html = '';
    for (let i = coffees.length - 1; i >= 0; i--) {
        html += renderCoffee(coffees[i]);
    }
    return html;
}

function updateCoffees(e) { //update coffee list by roast selection
    e.preventDefault(); // don't submit the form, we just want to update the data
    const selectedRoast = roastSelection.value;
    const filteredCoffees = [];
    if (selectedRoast === 'all') {
        tbody.innerHTML = renderCoffees(coffees);

    } else {
        coffees.forEach(coffee => {
            if (coffee.roast === selectedRoast) {
                filteredCoffees.push(coffee);
            }
        });
        tbody.innerHTML = renderCoffees(filteredCoffees);
    }
}
function searchCoffees(e){
    e.preventDefault()
    let filterCoffee = []
    let input = nameSelection.value.toLowerCase()
    console.log(input)
    console.log(filterCoffee)
    for (let i = 0; i < coffees.length; i++) {
        let coffee = coffees[i].name;
        if (coffee.toLowerCase().includes(input)) {
            filterCoffee.push(coffees[i].name)
        }
        tbody.innerHTML = renderCoffees(filterCoffee);
    }
}

// from http://www.ncausa.org/About-Coffee/Coffee-Roasts-Guide
const coffees = [
    {id: 1, name: 'Light City', roast: 'light'},
    {id: 2, name: 'Half City', roast: 'light'},
    {id: 3, name: 'Cinnamon', roast: 'light'},
    {id: 4, name: 'City', roast: 'medium'},
    {id: 5, name: 'American', roast: 'medium'},
    {id: 6, name: 'Breakfast', roast: 'medium'},
    {id: 7, name: 'High', roast: 'dark'},
    {id: 8, name: 'Continental', roast: 'dark'},
    {id: 9, name: 'New Orleans', roast: 'dark'},
    {id: 10, name: 'European', roast: 'dark'},
    {id: 11, name: 'Espresso', roast: 'dark'},
    {id: 12, name: 'Viennese', roast: 'dark'},
    {id: 13, name: 'Italian', roast: 'dark'},
    {id: 14, name: 'French', roast: 'dark'},
];

const tbody = document.querySelector('#coffees');
const nameSelection = document.querySelector('#coffee-search');
const roastSelection = document.querySelector('#roast-selection');


roastSelection.addEventListener('change', updateCoffees);
nameSelection.addEventListener('keyup', searchCoffees);

coffees.reverse((a, b) => a.id - b.id);
tbody.innerHTML = renderCoffees(coffees);
