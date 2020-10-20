const debounce = require('lodash.debounce');

import fetchCountries from './fetchCountries';
import countriesMarkupTMPT from '../tamplates/country.hbs';
import { success, error, alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
countryContainer: document.querySelector('.country__container'),
input: document.querySelector('#input'),
inputList: document.querySelector('.input-list')
}

refs.input.addEventListener('input', debounce(handleGenerateListFromResponse, 1500));

function handleGenerateListFromResponse(event) {
  let inputValue = event.target.value.trim();

  if (!inputValue) {      
    error({
      text: 'Try again, please',
      hide: true,
      delay: 2000,
      width: '280px',
    });
    return;
  }
    getCountriesList(inputValue)
}

function addFullCoutryInfo(country) {
  const markup = countriesMarkupTMPT(country)
  refs.countryContainer.insertAdjacentHTML('beforeend', markup);
}

function clearContent(){
  refs.input.value = '';
  refs.inputList.innerHTML = '';
  refs.countryContainer.innerHTML = '';  
}

function selectTypeOutputInfo(numberOfCountries) {
  if (numberOfCountries.length > 10) {
    alert({
      text: 'To many matches found. Please enter a more specific query!',
      delay: 2000,
      width: '280px',
    });
    return;
  }

  if (numberOfCountries.length < 2) {
    clearContent();
    addFullCoutryInfo(numberOfCountries);
    success({
      text: 'Your query is successful!',
      hide: true,
      delay: 2000,
      width: '280px',
    });
    return;
  }

  if(numberOfCountries.length >= 2 && numberOfCountries.length <= 10) {
        clearContent();                    
        numberOfCountries.forEach(country => {
            refs.inputList.insertAdjacentHTML('beforeend',`<li>${country.name}</li>`)
        });             

        refs.inputList.addEventListener('click', e => {                         
            const getInputValue = refs.input.value = e.target.textContent;
            clearContent();

            numberOfCountries.forEach(country => {                
                if(country.name === getInputValue) {
                    addFullCoutryInfo({country})                    
                }                
            });  
        })                 
  }
  alert({
               text: 'Found several options',
               hide: true,
              delay: 2000,
               width: '280px',
  });
}

function getCountriesList(value) {
  fetchCountries(value)
    .then(countries => selectTypeOutputInfo(countries))
    .catch(error => alert(error));
}
