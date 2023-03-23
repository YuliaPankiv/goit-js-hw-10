function markupCountryInfo(country){
    return `
    <h2>${country.name}</h2>
    <p><strong>Capital:</strong> ${country.capital}</p>
    <p><strong>Population:</strong> ${country.population}</p>
    <div><strong>Languages:</strong> ${country.languages
      .map(language => language.name)
      .join(', ')}</div>
    <div><img src="${country.flag}" alt="${country.name}" width="200"></div>
  `;
}

export {markupCountryInfo};