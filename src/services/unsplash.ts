import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: import.meta.env.VITE_UNSPLASH_ACCESS_KEY || ''
});

export async function getTopicImages(topic: string, count: number = 1) {
  try {
    const result = await unsplash.search.getPhotos({
      query: topic,
      perPage: count,
      orientation: 'landscape',
    });

    if (!result.response) {
      throw new Error('Failed to fetch images');
    }

    return result.response.results.map(photo => ({
      url: photo.urls.regular,
      alt: photo.alt_description,
      credit: photo.user.name,
    }));
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
} 