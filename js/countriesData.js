const url = 'https://restcountries.eu/rest/v2/all';
async function getData () {
    const response = await fetch(url);
    if (response.ok) {
        let data = await response.json();
        let newData = data.map((item) => {
            return item.name
        });
        return newData
    } else {
       return "Ошибка HTTP: " + response.status;
    }
}


