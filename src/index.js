import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './modules/fetchCountries';
import Notiflix from 'notiflix';
import { markupList } from './modules/markupList';
import { markupCountryInfo } from './modules/markupCountryInfo';
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
  const markup = markupList(countries);

  refs.countryList.innerHTML = markup;
  refs.countryInfo.innerHTML = '';
}

function renderCountryInfo(country) {
  const markup = markupCountryInfo(country);
  refs.countryInfo.innerHTML = markup;
  refs.countryList.innerHTML = '';
}

function clearPage() {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}
