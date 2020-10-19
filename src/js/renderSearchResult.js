import * as _debounce from 'lodash.debounce';
import countries from './fetchCountries';
import templateItems from '../tamplates/countries-list.hbs';
import templateCountry from '../tamplates/country.hbs';
import { error, success, alert} from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
  input: document.querySelector('input[name="search"]'),
  searchHintsUl: document.querySelector('.js-search-result'),
  article: document.querySelector('.js-country'),
};

const debouncedSearch = _debounce(() => {
  // clearSearch();
  countries.searchedCountry = refs.input.value;
  countries.sendRequest().then(countries => {
    renderResult(countries);
  });
}, 1000);

refs.input.addEventListener('input', debouncedSearch);

function clearSearch() {
  refs.input.value = '';
  refs.article.innerHTML = '';
  refs.searchHintsUl.innerHTML = '';
}

function renderResult(countries) {
  if (countries.length > 10) {
    // clearSearch();
    alert({
      text: 'To many matches found. Please enter a more specific query!',
      delay: 2000,
      width: '280px',
    });
    return;
  }
  if (countries.length < 2) {
    clearSearch();
    refs.article.insertAdjacentHTML('beforeend', templateCountry(countries));

    success({
      text: 'Your query is successful!',
      hide: true,
      delay: 2000,
      width: '280px',
  });
  return;
}
  if (countries.length >= 2 && countries.length <= 10) {
      countries.forEach(countries => {
      refs.article.insertAdjacentHTML('beforeend', templateCountry(countries));
      // console.log(countries);
    });
    refs.article.addEventListener('click', e => {                         
      const getInputValue = refs.input.value = e.target.textContent;
      clearSearch();

      article.forEach(countries => {                
          if(countries === getInputValue) {
            refs.article.insertAdjacentHTML('beforeend', templateCountry(countries));                    
          }           
      });
    alert({
      text: 'Found several options',
      hide: true,
      delay: 2000,
      width: '280px',
    });
  })
  }
  else {
    error({
      text: 'Ooops, Invalid request entered',
      hide: true,
      delay: 2000,
      width: '280px',
    });
  }
  // clearSearch(countries);
  refs.searchHintsUl.insertAdjacentHTML('beforeend', templateItems(countries));
  }