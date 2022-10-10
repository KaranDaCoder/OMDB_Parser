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

const filterByLanguageAndGenreRefactored = (data, industry, genre) => {
  return data.filter((movie) => {
    if (
      movie.language.length > 0 &&
      (movie.language[0] === industry || movie.language[1] === industry) &&
      movie.genres.length > 0 &&
      movie.genres.includes(genre)
    ) {
      return movie;
    } else {
      return false;
    }
  });
};
const filterMovieBollyComedy = filterByLanguageAndGenreRefactored(
  INDIAN,
  'Hindi',
  'Banana'
);

console.log(filterMovieBollyComedy.length);
console.log(JSON.stringify(filterMovieBollyComedy));

//const [movieIndustry, setMovieIndustry] = useState('');
//const [movieLanguage, setMovieLanguage] = useState('Hindi');
