const BASE_URL = 'https://restcountries.com';
export default function fetchCountries(searchQuery) {
       return fetch(`${BASE_URL}/v2/name/${searchQuery}?fields=name,capital,population,languages,flag`)
              
}