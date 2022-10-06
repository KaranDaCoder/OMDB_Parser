const refactorJsonResponse = (jsonArray) => {
  const formattedData = jsonArray.map((movie) => {
    let {
      releaseYear,
      imdbRating,
      cast,
      director,
      writer,
      runtime,
      genres,
      imdbVotes,
      language,
      totalCollection,
      country,
    } = movie;
    releaseYear = releaseYear === 'N/A' ? 2999 : Number(releaseYear);
    imdbRating = imdbRating === 'N/A' ? 0.1 : parseFloat(imdbRating);
    imdbVotes = imdbVotes === 'N/A' ? 0 : parseInt(imdbVotes.replace(/,/g, ''));
    cast = cast.split(',');
    director = director.split(',');
    genres = genres.split(',');
    writer = writer.split(',');
    language = language === 'N/A' ? 'English' : language.split(',');
    runtime = runtime === 'N/A' ? 99999 : Number(runtime.replace('min', ''));
    country = country === 'N/A' ? 'United States' : country.split(',');
    totalCollection =
      totalCollection === 'N/A'
        ? 0
        : parseFloat(totalCollection.replace(/,/g, '').replace(/\$/g, ''));
    return {
      ...movie,
      releaseYear,
      imdbRating,
      imdbVotes,
      cast,
      director,
      writer,
      genres,
      runtime,
      totalCollection,
      country,
      language,
    };
  });
  return JSON.stringify(formattedData);
};

module.exports = refactorJsonResponse;
