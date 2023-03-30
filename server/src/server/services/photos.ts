import { ContentFilter, createApi, Language } from 'unsplash-js';
import * as PhotoApi from "unsplash-js/dist/methods/photos/types";
import fetch from "node-fetch";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_API_KEY || '',
  fetch
});

const getPhotos = async (searchQuery: string): Promise<string[]> => {
  let photos: string[] = [];
  try {
    const response = await unsplash.search.getPhotos({
      query: searchQuery,
      perPage: 10,
      contentFilter: 'high' as ContentFilter,
      lang: 'he' as Language
    });

    photos = response.response?.results.map((result: PhotoApi.Basic) => result.urls.regular) ?? [];
    console.log(`Got ${photos.length} photos from Unsplash API, searchQuery: ${searchQuery}`);
  } catch (error) {
    console.log(`Failed while fetching photos: ${error}`);
  }
  return photos;
};

export { getPhotos };