import axios from 'axios';

const accessKey = process.env.UNSPLASH_API_KEY;
const apiUrl =  process.env.UNSPLASH_API_URL;

console.log(apiUrl);

const getImages = (searchQuery: string, callback: (results: any[]) => any): any =>
  axios.get(`${apiUrl}/search/photos`, {
    params: {
      query: searchQuery,
      per_page: 5,
      safe: true,
    },
    headers: {
      Authorization: `Client-ID ${accessKey}`,
    },
  })
    .then((response) => callback(response.data.results))
    .catch((error) => {
      console.error(error);
    });

export { getImages };