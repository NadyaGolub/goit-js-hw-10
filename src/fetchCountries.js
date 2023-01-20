import Notiflix from 'notiflix';
export { fetchCountries };


const fetchCountries = name => {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=capital,population,languages,name,flags`
  ).then(response => {
    if (!response.ok) {
      throw new Error(
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
    }
    return response.json();
  });
};