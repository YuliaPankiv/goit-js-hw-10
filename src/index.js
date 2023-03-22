import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './modules/fetchCountries';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  const searchQuery = event.target.value.trim();

  if (!searchQuery) {
    clearPage();
    return;
  }
  fetchCountries(searchQuery)
    .then(data => {
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        clearPage();
        return;
      }

      if (data.length === 1) {
        renderCountryInfo(data[0]);
        return;
      }

      renderCountryList(data);
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure('Oops, something went wrong!');
    });
}

function renderCountryList(countries) {
  const markup = countries
    .map(country => {
      return `<li><img src="${country.flag}" alt="" width="50"> ${country.nativeName}</li>`;
    })
    .join('');
  refs.countryList.innerHTML = markup;
  refs.countryInfo.innerHTML = '';
}

function renderCountryInfo(country) {
  const markup = `
    <h2>${country.name}</h2>
    <p><strong>Capital:</strong> ${country.capital}</p>
    <p><strong>Population:</strong> ${country.population}</p>
    <div><strong>Languages:</strong> ${country.languages
      .map(language => language.name)
      .join(', ')}</div>
    <div><img src="${country.flag}" alt="${country.name}" width="200"></div>
  `;
  refs.countryInfo.innerHTML = markup;
  refs.countryList.innerHTML = '';
}

function clearPage() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
