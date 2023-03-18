import { createApi, Language, ContentFilter } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_API_KEY || ''
});

const getPhotos = async (searchQuery: string): Promise<string[]> => {
  let photos: string[] = [];
  try {
    const response = await unsplash.search.getPhotos({
      query: searchQuery,
      perPage: 5,
      contentFilter: 'high' as ContentFilter,
      lang: 'he' as Language
    });
    console.log(response)
    photos = response.response?.results.map((result) => result.urls.regular) ?? [];
    console.log(`Got ${photos.length} photos from Unsplash-api`);
  } catch (error) {
    console.log(`Failed while fetching photos: ${error}`);
  }
  return photos;
};

export { getPhotos };