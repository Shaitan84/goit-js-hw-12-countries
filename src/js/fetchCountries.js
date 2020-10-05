const baseUrl = 'https://restcountries.eu/rest/v2/name/';

export default {
  baseUrl,
  searchedCountry: '',
  sendRequest() {
    return fetch(baseUrl + this.searchedCountry).then(res => res.json());
  },
};
