import tempateItem from './templates/templateItem.hbs';
import fetch from './fetchCountries';
import { debounce } from 'debounce';
import './css/styles.css';

const DEBOUNCE_DELAY = 300;


const refs = {
    inputSearch: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
};

refs.inputSearch.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput (event) {
    event.preventDefault();
    const nameCountry = event.target.value.trim();
    fetch.fetchCountries(nameCountry)
        .then((country) => {
            console.log(country)
            if (nameCountry === '') {
                refs.countryInfo.innerHTML = '';
                refs.countryList.innerHTML = '';
                return;
            }
            if (country.length === 1) {
                const markup = tempateItem(country);
                refs.countryInfo.innerHTML = markup;
            }
        })
        .catch();
}
