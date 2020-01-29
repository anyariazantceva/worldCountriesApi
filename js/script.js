const container = document.querySelector('.countries');
const startBtn = document.querySelector('.btn-start');
const nameBtn = document.querySelector('.btn-name');
const reverseBtn = document.querySelector('.btn-reverse');
const searchInput = document.querySelector('.search__control');
const list = 'https://restcountries.eu/rest/v2/all';

function loadData () {
    fetch(list)
        .then(response => response.json())
        .then(countries => {
            showCountries(countries);
            showTotal(countries);
            startBtn.addEventListener('click', () => {
                searchInput.addEventListener('input', () => {
                    renderSortedArray('start', countries);
                });
            });
            nameBtn.addEventListener('click', () => {
                searchInput.addEventListener('input', () => {
                    renderSortedArray('any', countries);
                });
            });
            reverseBtn.addEventListener('click', () => {
                reverseArray(countries)
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
        block.classList.add('countries__item');
        imageBlock.classList.add('countries__image');
        imagePic.classList.add('countries__pic');
        imagePic.setAttribute('src', `${item.flag}`);
        textBlock.classList.add('countries__name');
        textBlock.textContent = item.name;
        capitalBlock.classList.add('countries__capital');
        capitalBlock.textContent = item.capital !=='' ? `Capital: ${item.capital}`: 'There is no capital'
        imageBlock.append(imagePic);
        block.append(imageBlock, textBlock, capitalBlock);
        container.append(block);

    })
}

const renderSortedArray = (type, countries) => {
    let value = document.querySelector('.search__control').value;
    let upperCasedValue = value.toUpperCase();
    if(type === 'start') {
        let sortedArray = sortStartLetter(countries, upperCasedValue);
        showCountries(sortedArray);
        showTotal(sortedArray);
        reverseBtn.addEventListener('click', () => {
            reverseArray(sortedArray)
        })

    } else if(type === 'any') {
        let sortedArray = sortAnySymbols(countries, value);
        showCountries(sortedArray);
        showTotal(sortedArray);
        reverseBtn.addEventListener('click', () => {
            reverseArray(sortedArray)
        })
    } else {
        let sortedArray = sortAnySymbols(countries, value);
        showCountries(sortedArray);
        showTotal(sortedArray);
        reverseBtn.addEventListener('click', () => {
            reverseArray(sortedArray)
        })
    }
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

const sortStartLetter = (arr, match) => {
  let sortedArr = arr.filter((item) => {
      return item.name.toUpperCase().startsWith(match)
  });
  clearContainer();
  return sortedArr
};

const showTotal = (arr) => {
    let total = document.querySelector('.search__total');
    total.textContent = `Total number of countries: ${arr.length}`
};




