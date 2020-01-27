const container = document.querySelector('.countries');
const searchBtn = document.querySelector('.btn-search');
const startBtn = document.querySelector('.btn-start');
const nameBtn = document.querySelector('.btn-name');
const searchInput = document.querySelector('.search__control');

startBtn.addEventListener('click', () => {
    searchInput.addEventListener('input', () => {
        renderSortedArray('start');
    });
});

nameBtn.addEventListener('click', () => {
    searchInput.addEventListener('input', () => {
        renderSortedArray('any');
    });
});

function showCountries (array) {
    array.forEach((item) => {
        let block = document.createElement('div');
        block.classList.add('countries__item');
        block.textContent = item;
        container.append(block);

    })
}

const sortAnySymbols = (arr, match) => {
    console.log(arr);
    let sortedArr = arr.filter((item) => {
        return item.includes(match);
    });
    let container = document.querySelector('.countries');
    container.innerHTML = '';

    return sortedArr
};

const sortStartLetter = (arr, match) => {
  let sortedArr = arr.filter((item) => {
      return item.toUpperCase().startsWith(match)
  });
  let container = document.querySelector('.countries');
  container.innerHTML = '';
  return sortedArr
};

showCountries(countries);

const renderSortedArray = (type) => {
    let value = document.querySelector('.search__control').value;
    let upperCasedValue = value.toUpperCase();
    if(type === 'start') {
        console.log(value);
        let sortedArray = sortStartLetter(countries, upperCasedValue);
        showCountries(sortedArray);
    } else if(type === 'any') {
        console.log(value);
        let sortedArray = sortAnySymbols(countries, value);
        showCountries(sortedArray);
    } else {
        console.log(value);
        let sortedArray = sortAnySymbols(countries, value);
        showCountries(sortedArray);
    }
};