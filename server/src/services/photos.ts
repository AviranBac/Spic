import { ContentFilter, createApi, Language } from 'unsplash-js';
import * as PhotoApi from "unsplash-js/dist/methods/photos/types";
import fetch from "node-fetch";

const apiKeys = process.env.UNSPLASH_API_KEYS.split(',');
let currentKeyIndex = 0;

const unsplashInstances = apiKeys.map((accessKey: string) => createApi({accessKey, fetch}));

const getPhotos = async (searchQuery: string, keyIndex = currentKeyIndex, retryNumber = 0): Promise<string[]> => {
  if (retryNumber === apiKeys.length) {
    currentKeyIndex = (keyIndex + 1) % apiKeys.length;
    throw new Error('All Unsplash API keys failed');
  }

  if (retryNumber !== 0) {
    console.log(`Trying another Unsplash API key, index: ${keyIndex}, total retry number: ${retryNumber}`);
  }

  let photos: string[] = [];
  try {
    const response = await unsplashInstances[keyIndex].search.getPhotos({
      query: searchQuery,
      perPage: 10,
      contentFilter: 'high' as ContentFilter,
      lang: 'he' as Language
    });

    photos = response.response?.results.map((result: PhotoApi.Basic) => result.urls.regular) ?? [];
    console.log(`Got ${photos.length} photos from Unsplash API, searchQuery: ${searchQuery}`);
  } catch (error) {
    console.log(`Failed while fetching photos with searchQuery ${searchQuery}. Error: ${JSON.stringify(error)}`);
    return getPhotos(searchQuery, (keyIndex + 1) % apiKeys.length, retryNumber + 1);
  }

  currentKeyIndex = (keyIndex + 1) % apiKeys.length;
  console.log(`Switched current Unsplash API key to index ${currentKeyIndex}`);

  return photos;
};

export { getPhotos };
