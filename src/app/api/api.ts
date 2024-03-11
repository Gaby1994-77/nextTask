const movieDetailsUrl = 'https://al-mashhad-dev-bucket.s3-eu-west-1.amazonaws.com/section/1660293321383_evFBg_large.jpeg';

export interface MovieDetails {
  image: string;
}
const fetchMovieDetails = async (): Promise<MovieDetails> => {
  try {
    const response = await fetch(movieDetailsUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonResponse = await response.json();
    const data: MovieDetails = {
      image: jsonResponse.data.result.image,
    };
    return data;
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error);
    throw error;
  }
};
export { fetchMovieDetails };

