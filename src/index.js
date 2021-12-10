import tempateItem from './templates/templateItem.hbs';
import templatesList from './templates/templatesList.hbs';
import fetch from './fetchCountries';
import { debounce } from 'debounce';
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;


const refs = {
    inputSearch: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info')
};
// console.log(refs.countryInfo.value.event)
refs.inputSearch.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput (event) {
    event.preventDefault();
    const nameCountry = event.target.value.trim();
    console.log(nameCountry);
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
        fetch.fetchCountries(nameCountry)
        .then((country) => {
            if (country.length === 1) {
                const markup = tempateItem(country);
                refs.countryInfo.innerHTML = markup;
            }
            if (country.length > 1) {
                const marlup = templatesList(country);
                refs.countryList.innerHTML = marlup;
            }
            if (country.length > 10) {
                return Notify.info('Too many matches found. Please enter a more specific name.');
            }
        })
        .catch(error);
}

function onClearList() {

}

function error() {
    return Notify.failure("Oops, there is no country with that name")
};