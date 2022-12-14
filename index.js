const top100Movies = require('./data-set/top250IndianIDs.json');
const axios = require('axios');
const fs = require('fs').promises;
const dotenv = require('dotenv').config();
const refactorJsonResponse = require('./formatter');

// API : http://www.omdbapi.com/?i=tt3896198&type=movie&plot=long&apikey=e5c767eb
//API:Plot-full: https://www.omdbapi.com/?i=tt1166100&type=movie&plot=full&apikey=e5c767eb

const API_KEY = process.env.API_KEY || 'createOne';

let parsedBollywood = [];
const formRequestUrl = async (id) => {
  let base_url = 'http://www.omdbapi.com/';
  let request_url = `${base_url}?i=${id}&type=movie&apikey=${API_KEY}&plot=full`;

  let getMovieRequest = {
    method: 'GET',
    url: request_url.replace(' ', ''),
  };
  /*   console.log(getMovieRequest);
   */ return getMovieRequest;
};

const makeGetRequest = async function (requestPayload) {
  return axios(requestPayload)
    .then((responseReceived) => {
      if (responseReceived.status != 200) {
        console.log('Error fetching information!!');
      } else {
        const {
          Title: title,
          Year: releaseYear,
          Released: releaseDate,
          Runtime: runtime,
          Genre: genres,
          Director: director,
          Writer: writer,
          Actors: cast,
          Plot: plot,
          Language: language,
          Country: country,
          Awards: awards,
          Poster: image_url,
          Ratings: ratings,
          imdbRating,
          imdbVotes,
          imdbID,
          Type: watchAs,
          BoxOffice: totalCollection,
        } = responseReceived.data;
        let resp = {
          title,
          releaseYear,
          releaseDate,
          runtime,
          genres,
          director,
          writer,
          cast,
          plot,
          language,
          country,
          awards,
          image_url,
          ratings,
          imdbRating,
          imdbVotes,
          imdbID,
          watchAs,
          totalCollection,
          isPopular100Movies: true,
          isTop250Movies: false,
          isTop250IndianMovies: true,
          isTop250Shows: false,
        };
        return resp;
      }
    })
    .then((res) => {
      parsedBollywood.push(res);
    })
    .catch((error) => {
      console.log('ERROR : ' + error);
    });
};

/* makeGetRequest(
  'https://www.omdbapi.com/?i=tt10731256&type=movie&plot=full&apikey=e5c767eb'
); */

/* const fetchImdbIDs = async () => {
  return top100Movies.map((movie) => movie.id);
}; */

const getResponse = async () => {
  for (let i = 0; i < top100Movies.length; i++) {
    let request = await formRequestUrl(top100Movies[i]);
    response = await makeGetRequest(request);
  }
  const key = 'imdbID';
  const unique = [
    ...new Map(parsedBollywood.map((movie) => [movie[key], movie])).values(),
  ];
  let jsonData = refactorJsonResponse(unique);
  fs.appendFile('IndianMoviesTop250.json', jsonData);
};

getResponse();
