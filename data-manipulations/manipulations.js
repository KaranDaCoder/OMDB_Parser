const INDIAN = require('../parsed-data/IndianMoviesTop250.json');

// By Film Industry and then Categories.

const filterByIndustryLanguageAndGenre = (dataArr, lang, genre) => {
  return dataArr.filter((movie) => {
    let language = movie.language;
    let genres = movie.genres;
    if (
      // language.length === 1 &&
      language.includes(lang) &&
      genres.includes(genre)
    ) {
      return movie;
    }
  });
};

const filterMovieBollyComedy = filterByIndustryLanguageAndGenre(
  INDIAN,
  'Bengali',
  'Drama'
);

console.log(filterMovieBollyComedy.length);
console.log(JSON.stringify(filterMovieBollyComedy));
