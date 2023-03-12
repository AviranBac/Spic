import axios from 'axios';

const accessKey: string | undefined = process.env.UNSPLASH_API_URL;
const apiUrl: string | undefined = process.env.UNSPLASH_API_KEY;

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