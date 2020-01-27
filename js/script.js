const container = document.querySelector('.countries');
const searchBtn = document.querySelector('.btn-search');
const startBtn = document.querySelector('.btn-start');
const nameBtn = document.querySelector('.btn-name');
const searchInput = document.querySelector('.search__control');

const lowerCaseCountries = countries.map((item) => {
    return item.toLowerCase();
});

startBtn.addEventListener('click', () => {
    searchInput.addEventListener('input', () => {
        let value = document.querySelector('.search__control').value.toLowerCase();
        console.log( typeof value);
        let sortedArray = sortStartLetter(lowerCaseCountries, value);
        let container = document.querySelector('.countries');
        container.innerHTML = '';
        showCountries(sortedArray);

    });
});

nameBtn.addEventListener('click', () => {
    searchInput.addEventListener('input', () => {
        let value = document.querySelector('.search__control').value.toLowerCase();
        console.log( typeof value);
        let sortedArray = sortAnySymbols(lowerCaseCountries, value);
        let container = document.querySelector('.countries');
        container.innerHTML = '';
        showCountries(sortedArray);

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

    return sortedArr
};

const sortStartLetter = (arr, match) => {
  let sortedArr = arr.filter((item) => {
      return item.startsWith(match)
  });
    return sortedArr
};

showCountries(countries);

searchInput.addEventListener('input', () => {
    let value = document.querySelector('.search__control').value.toLowerCase();
    console.log(typeof value);
    let sortedArray = sortAnySymbols(countries, value);
    let container = document.querySelector('.countries');
    container.innerHTML = '';
    showCountries(sortedArray);

});