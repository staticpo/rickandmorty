import axios from 'axios';

const CHARACTERS_URL = "https://rickandmortyapi.com/api/character/?page=";

/**
 *
 * @param {number} currentPage The page number we should look up in the Characters API
 * @param {function} handler The function that will execute once we're done with the requests; in this case, it sets the state of the main component
 */
const parser = (currentPage, handler) => {
  // Get the required page of character results
  axios.get(CHARACTERS_URL + currentPage)
    .then(function (response) {

      const pages = {
        currentPage
      };
      let profiles = [];

      // Adding params for the pages component
      pages.pages = response.data.info.pages;
      pages.prev = getPageNumberFromURL(response.data.info.prev);
      pages.next = getPageNumberFromURL(response.data.info.next);

      profiles = response.data.results;

      // Iterate the profiles and get their locations, origins and episodes
      for(let key in profiles) {

        // If it has a location and/or an origin, look them up.
        const locationPromise = profiles[key].location.url ? axiosGet(profiles[key].location.url) : axiosGet("", false);
        const originPromise = profiles[key].origin.url ? axiosGet(profiles[key].origin.url) : axiosGet("", false);

        // Get the actual info with axios
        axios.all([
          locationPromise,
          originPromise,
        ])
          .then(axios.spread((locResp, origResp) => {
            // If we retrieved the location data, populate it.
            if(locResp && locResp.status === 200) {
              // add the type and dimension attributes to the location object on each profile
              profiles[key].location = {
                name: profiles[key].location.name,
                type: locResp.data.type,
                dimension: locResp.data.dimension,
              };
            }

            // If we retrieved the origin data, populate it.
            if(origResp && origResp.status === 200) {
              profiles[key].origin = {
                name: profiles[key].origin.name,
                type: origResp.data.type,
                dimension: origResp.data.dimension,
              };
            }
          }))
          .then(() => {
            //Iterate over episodes and get their names
            let episodesURLArray = profiles[key].episode.map(url => axios.get(url));
            axios.all(episodesURLArray)
              .then((epResponse) => {
                const names = epResponse.map(r => r.data.name);
                profiles[key].episodes = names;

                // Return all the data we've compiled to the handler function
                handler({profiles, pages});
              })
          });
      }
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
};

/**
 * Get the Page number from a URL
 * @param {string} url
 */
const getPageNumberFromURL = (url) => {
  const page = url.match(/page=([0-9]+)/);
  return page ? parseInt(page[1]) : undefined;
};

/**
 *  Returns an axios promise, to use inside an axios.all call
 */
const axiosGet = (url, enabled = true) => {
  if(enabled) {
    return axios.get(url);
  } else {
    return Promise.resolve(undefined);
  }
}

export default parser;
