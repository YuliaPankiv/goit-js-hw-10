const baseUrl = 'https://restcountries.com/v2';
const endpoint = '/name';

export function fetchCountries(name) {
  const fields = '?nativeName,flag,capital,population,languages';

  return fetch(`${baseUrl}${endpoint}/${name}${fields}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .catch(error => {
      console.error(error);
    });
}
