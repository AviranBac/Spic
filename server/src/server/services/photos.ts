import axios, { AxiosResponse } from 'axios';

const accessKey: string = process.env.UNSPLASH_API_KEY || '';
const apiUrl: string = process.env.UNSPLASH_API_URL || '';

interface UnsplashPhoto {
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  }
}

const getPhotos = async (searchQuery: string): Promise<UnsplashPhoto[]> => {
  let photos: UnsplashPhoto[] = [];
  try {
    console.log("Requesting photos from Unsplash-api");
    const response: AxiosResponse = await axios.get(`${apiUrl}/search/photos`, {
      params: {
        query: searchQuery,
        per_page: 5,
        safe: true,
        lang: 'he'
      },
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      }
    });
    photos = response.data.results.map((photo: UnsplashPhoto) => photo.urls.regular);
    console.log(`Got ${photos.length} photos from Unsplash-api`);
  } catch (error) {
    console.log(`Failed while fetching photos: ${error}`);
  }
  return photos;
};

export { getPhotos };
