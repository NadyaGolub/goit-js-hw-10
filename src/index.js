import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';


const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const input = document.querySelector('#search-box');
const countryInfo = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

input.addEventListener(`input`, debounce(onFormInput, DEBOUNCE_DELAY));

function onFormInput(event) {
    event.preventDefault();

    const name = input.value.trim();
  if (!name) {
    clear(); 
    return;
  }
  fetchCountries(name)
    .then(data => country(data))
    .catch(err => clear());
}

function country(countries) {
  if (countries.length === 1) {
    countryList.innerHTML = '';
    oneCountry(countries);
  }
  if (countries.length > 1 && countries.length <= 10) {
    countryInfo.innerHTML = '';
    listOfCountries(countries);
  }
  if (countries.length > 10) {
    clear();
    manyMatchesFound()
  }
}

function oneCountry(country) {
  return (countryInfo.innerHTML = country
    .map(
      ({
        flags: { svg },
        name: { official },
        capital,
        population,
        languages,
      }) => `<ul class="country-info-list">
    <li><h2>
        <img src="${svg}" alt="flag" width="50" height="30" />
        ${official}</h2></li>
    <li><h3>Capital: ${capital}</h3></li>
    <li><h3>Population: ${population}</h3></li>
    <li><h3>Languages: ${Object.values(languages)}</h3></li>
    </ul>`
    )
    .join(''));
}

function listOfCountries(list) {
  return (countryList.innerHTML = list
    .map(
      ({ flags: { svg }, name: { common } }) => `<li class="country-list-li">
        <h2>
        <img src="${svg}" alt="flag" width="50" height="30" />
        ${common}</h2>
        </li>`
    )
    .join(''));
}

function manyMatchesFound() {
  return Notiflix.Notify.info(
    'Too many matches found. Please enter a more specific name.'
  );
}

function clear() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}