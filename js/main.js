"use strict";
(() => {
    function renderCoffee(coffee) {  //creates inner html for coffees
        let html = `<div class="col-12 col-lg-6 shadow-sm"><h2 class="mt-2">${coffee.name}</h2><p class="ms-3 mt2">${coffee.roast}</p></div>`

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
            searchCoffees(e)
        } else {
            coffees.forEach(coffee => {
                if (coffee.roast === selectedRoast) {
                    filteredCoffees.push(coffee);
                }
            });
            tbody.innerHTML = renderCoffees(filteredCoffees);
            searchCoffees(e)
        }
    }

    function searchCoffees(e) {//function to search coffees by name and roast
        e.preventDefault()
        let filterCoffee = []
        let input = nameSelection.value.toLowerCase()
        for (let i = 0; i < coffees.length; i++) {
            let coffee = coffees[i].name;
            if (roastSelection.value === 'all' && coffee.toLowerCase().includes(input)) {
                filterCoffee.push(coffees[i])
            } else if (coffee.toLowerCase().includes(input) && coffees[i].roast === roastSelection.value) {
                filterCoffee.push(coffees[i])
            }
            tbody.innerHTML = renderCoffees(filterCoffee);
        }
    }

    function addCoffee(e) {//function to add a coffee to the page
        e.preventDefault();
        const newCoffee = document.querySelector("#addType").value;
        const newRost = document.querySelector("#roast-add").value;
        const newObject = {
            id: coffees.length + 1,
            name: newCoffee,
            roast: newRost,
        }
        if (newCoffee === "") {
            alert("please add a coffee name");
        } else {
            coffees.push(newObject)
            document.querySelector("#addType").value = "";
            coffees.sort((a, b) => a.id - b.id);
            coffees.reverse((a, b) => a.id - b.id);
            updateCoffees(e)
        }
    }

// variables
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

    const addCoffeeButton = document.querySelector("#addCoffee");
    const tbody = document.querySelector('#coffees');
    const nameSelection = document.querySelector('#coffee-search');
    const roastSelection = document.querySelector('#roast-selection');

//event listeners
    addCoffeeButton.addEventListener("click", addCoffee);
    roastSelection.addEventListener('change', updateCoffees);
    nameSelection.addEventListener('keyup', searchCoffees);
//initial page load follows
    coffees.reverse((a, b) => a.id - b.id);
    tbody.innerHTML = renderCoffees(coffees);
})()