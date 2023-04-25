import { ContentFilter, createApi, Language } from 'unsplash-js';
import * as PhotoApi from "unsplash-js/dist/methods/photos/types";
import fetch from "node-fetch";

const keys = [
  process.env.UNSPLASH_API_KEY_1 || '',
  process.env.UNSPLASH_API_KEY_2 || '',
  process.env.UNSPLASH_API_KEY_3 || '',
  process.env.UNSPLASH_API_KEY_4 || '',
  process.env.UNSPLASH_API_KEY_5 || ''
];

let currentKeyIndex = 0;

const unsplashInstances = keys.map((key) => {
  return createApi({
    accessKey: key,
    fetch
  });
});

const getPhotos = async (searchQuery: string): Promise<string[]> => {
  let photos: string[] = [];
  try {
    const response = await unsplashInstances[currentKeyIndex].search.getPhotos({
      query: `${searchQuery} cartoon`,
      perPage: 10,
      contentFilter: 'high' as ContentFilter,
      lang: 'he' as Language
    });

    photos = response.response?.results.map((result: PhotoApi.Basic) => result.urls.regular) ?? [];
    console.log(`Got ${photos.length} photos from Unsplash API, searchQuery: ${searchQuery}`);
  } catch (error) {
    console.log(`Failed while fetching photos with searchQuery ${searchQuery}. Error: ${JSON.stringify(error)}`);
    currentKeyIndex = (currentKeyIndex + 1) % keys.length;
    console.log(`Switched to Unsplash API key ${currentKeyIndex}`);
    return getPhotos(searchQuery);
  }

  currentKeyIndex = (currentKeyIndex + 1) % keys.length;
  console.log(`Switched to Unsplash API key ${currentKeyIndex}`);

  return photos;
};

export { getPhotos };
