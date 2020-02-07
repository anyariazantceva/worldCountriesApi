const container = document.querySelector('.countries');
const reverseBtn = document.querySelector('.btn-reverse');
const searchInput = document.querySelector('.search__control');
const countryNameBtn = document.querySelector('.btn-countryname');
const capitalBtn = document.querySelector('.btn-capital');
const populationBtn = document.querySelector('.btn-population');
const chartBtn = document.querySelector('.btn-chart');
let check;

const list = 'https://restcountries.eu/rest/v2/all';

function loadData () {
    fetch(list)
        .then(response => response.json())
        .then(countries => {
            showCountries(countries);
            showTotal(countries);
            countryNameBtn.addEventListener('click', () => {
                searchInput.addEventListener('input', () => {
                    renderSortedArray('name', countries);
                });
            });
            capitalBtn.addEventListener('click', () => {
                searchInput.addEventListener('input', () => {
                    renderSortedArray('capital', countries);
                });
            });
            populationBtn.addEventListener('click', () => {
                renderSortedArray('population', countries);
            });
            reverseBtn.addEventListener('click', () => {
                reverseArray(countries)
            });
            chartBtn.addEventListener('click', () => {
                clearContainer();
                showGraph(countries);

            })


        })
        .catch(error => console.log(error))
}

loadData();

const reverseArray = (arr) => {
    let reversedCountries = arr.reverse();
    clearContainer();
    showCountries(reversedCountries);
};

function showCountries (array) {
    array.forEach((item) => {
        let block = document.createElement('div');
        let imageBlock = document.createElement('div');
        let imagePic = document.createElement('img');
        let textBlock = document.createElement('div');
        let capitalBlock = document.createElement('div');
        let populationBlock = document.createElement('div');
        block.classList.add('countries__item');
        imageBlock.classList.add('countries__image');
        imagePic.classList.add('countries__pic');
        imagePic.setAttribute('src', `${item.flag}`);
        textBlock.classList.add('countries__name');
        textBlock.textContent = item.name;
        capitalBlock.classList.add('countries__capital');
        capitalBlock.textContent = item.capital !=='' ? `Capital: ${item.capital}`: 'There is no capital';
        populationBlock.classList.add('countries__population');
        populationBlock.textContent = `Population: ${item.population}`;
        imageBlock.append(imagePic);
        block.append(imageBlock, textBlock, capitalBlock, populationBlock);
        container.append(block);

    })
}

const renderSortedArray = (type, countries) => {
    let value = document.querySelector('.search__control').value;
    if(type === 'name') {
        let sortedArray = sortAnySymbols(countries, value);
        showCountries(sortedArray);
        showTotal(sortedArray);
        reverseBtn.addEventListener('click', () => {
            reverseArray(sortedArray)
        });
        let ctx = document.getElementById('myChart');
        ctx.innerHTML = '';
    } else if(type === 'capital') {
        let sortedArray = sortByCapital(countries, value);
        showCountries(sortedArray);
        showTotal(sortedArray);
        reverseBtn.addEventListener('click', () => {
            reverseArray(sortedArray)
        });
        let ctx = document.getElementById('myChart');
        ctx.innerHTML = '';
    } else if(type === 'population') {
        let sortedArray = check ? sortByPopulationDown(countries) : sortByPopulationUp(countries);
        showCountries(sortedArray);
        showTotal(sortedArray);
        reverseBtn.addEventListener('click', () => {
            reverseArray(sortedArray);
        });
        let ctx = document.getElementById('myChart');
        ctx.innerHTML = '';
    }
};

const sortByPopulationDown = (arr) => {
    check = false;
    let sortedArr = arr.sort((a, b) => {
        return a.population - b.population
    });

    clearContainer();
    return sortedArr
};

const sortByPopulationUp = (arr) => {
    check = true;
    let sortedArr = arr.sort((a, b) => {
        return b.population - a.population
    });
    clearContainer();
    return sortedArr
};

const sortByCapital = (arr, match) => {
    let sortedArr = arr.filter((item) => {
       return item.capital.toLowerCase().startsWith(match)
    });
    clearContainer();
    console.log(sortedArr);
    return sortedArr
};

const sortAnySymbols = (arr, match) => {
    let loweredValue = match.toLowerCase();
    let loweredArr = arr.filter((item) => {
        return item.name.includes(loweredValue);
    });
    let normalArr = loweredArr.filter((item) => {
        return item.name[0].toUpperCase();
    });
    clearContainer();

    return normalArr
};

const clearContainer = () => {
    let container = document.querySelector('.countries');
    container.innerHTML = '';
};

const showTotal = (arr) => {
    let total = document.querySelector('.search__total');
    total.textContent = `Total number of countries: ${arr.length}`
};

const pickPopulated = (arr) => {
   let sortedArr = sortByPopulationUp(arr);
   let tenCountries = [];
   for(let i = 0; i<10; i++) {
       tenCountries.push(sortedArr[i]);
   }
   return tenCountries
};

const showGraph = (arr) => {
    let sortedArr = pickPopulated(arr);
    let names = [];
    let population = [];
    let obj = {};

    for(let i = 0; i < 10; i++) {
        names.push(sortedArr[i].name);
        population.push(sortedArr[i].population);
    }

    obj.names = names;
    obj.population = population;
    console.log(obj.names);
    console.log(obj.population);
    let ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: obj.names,
            datasets: [{
                label: '10 Most Populated Countries',
                data: obj.population,
                backgroundColor: [
                    'rgb(255,62,33)',
                    'rgb(255,230,27)',
                    'rgb(255,62,33)',
                    'rgb(255,230,27)',
                    'rgb(255,62,33)',
                    'rgb(255,230,27)',
                    'rgb(255,62,33)',
                    'rgb(255,230,27)',
                    'rgb(255,62,33)',
                    'rgb(255,230,27)'


                ],
                borderColor: [
                    'rgb(255,244,168)'
                ],
                borderWidth: 1,
                barPercentage: 10,
                barThickness: 30,
                maxBarThickness: 30,
                minBarLength: 2
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    type: 'category',
                    labels: obj.names
                }],
            }
        }
    });
};



