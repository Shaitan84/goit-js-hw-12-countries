'use strict'
const debounce = require('lodash.debounce');

import fetchCountries from './fetchCountries';
import countriesTamplates from '../tamplates/country.hbs';
import { success, error, alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
countryContainer: document.querySelector('.country__container'),
input: document.querySelector('#input'),
inputList: document.querySelector('.input-list')
}

refs.input.addEventListener('input', debounce(generatingListCountries, 1500));

function generatingListCountries(event) {
  let inputValue = event.target.value.trim();

  if (!inputValue) {  
    errorIncorrect();
    return;
  }
    getCountriesList(inputValue)
}
function errorIncorrect(err) {
  clearSearch();
  error({
      text: 'Invalid request, please try again',
      hide: true,
      delay: 2000,
      width: '320px',
    });
}

function displayInformationAboutTheCountry(country) {
  const markup = countriesTamplates(country)
  refs.countryContainer.insertAdjacentHTML('beforeend', markup);
}

function clearSearch(){
  refs.input.value = '';
  refs.inputList.innerHTML = '';
  refs.countryContainer.innerHTML = '';  
}

function selectTypeOutputInfo(listCountries) {
  if (listCountries.length < 2) {
    clearSearch();
    displayInformationAboutTheCountry(listCountries);
    success({
      text: 'Your query is successful!',
      hide: true,
      delay: 2000,
      width: '280px',
    });
    return;
  }
  
  if (listCountries.length > 10) {
    alert({
      text: 'To many matches found. Please enter a more specific query!',
      delay: 2000,
      width: '280px',
    });
    return;
  }

  if(listCountries.length >= 2 && listCountries.length <= 10) {
        clearSearch();                    
        listCountries.forEach(country => {
            refs.inputList.insertAdjacentHTML('beforeend',`<li>${country.name}</li>`)
        });             

        refs.inputList.addEventListener('click', e => {                         
            const getInputValue = refs.input.value = e.target.textContent;
            clearSearch();

            listCountries.forEach(country => {                
                if(country.name === getInputValue) {
                    displayInformationAboutTheCountry({country})                    
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
    .catch(error => errorIncorrect(error));
}
