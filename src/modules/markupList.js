function markupList(countries){
   const markup=countries.map(country => {
        return `<li><img src="${country.flag}" alt="" width="50"> ${country.nativeName}</li>`;
      })
      .join('');
      return markup;
}

export {markupList};