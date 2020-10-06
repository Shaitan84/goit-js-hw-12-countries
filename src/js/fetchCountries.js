const urlApiCountry = 'https://restcountries.eu/rest/v2/name/';

export default {
  urlApiCountry,
  searchedCountry: '',
  sendRequest() {
    return fetch(urlApiCountry + this.searchedCountry).then(res => res.json());
  },
};
