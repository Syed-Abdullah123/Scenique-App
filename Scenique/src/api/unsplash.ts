import axios from "axios";

const UNSPLASH_ACCESS_KEY = "T74aLY6AtwmyeraxmZy5IXqq4JFZgBLRDN4uH8wzA4M";
const BASE_URL = "https://api.unsplash.com";

export interface UnsplashPhoto {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    name: string;
    username: string;
  };
  description: string;
  alt_description: string;
}

interface FetchOptions {
  query?: string;
  page?: number;
  perPage?: number;
  orderBy?: "latest" | "relevant" | "popular";
}

// Fetch wallpapers with search
export const fetchWallpapers = async ({
  query,
  page = 1,
  perPage = 10,
  orderBy = "relevant",
}: FetchOptions): Promise<UnsplashPhoto[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/search/photos`, {
      params: {
        query,
        page,
        per_page: perPage,
        order_by: orderBy,
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching wallpapers:", error);
    throw error; // Let the component handle the error
  }
};

// Fetch random wallpapers (useful for "Best of the month" section)
export const fetchRandomWallpapers = async (
  count: number = 10
): Promise<UnsplashPhoto[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/photos/random`, {
      params: {
        count,
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching random wallpapers:", error);
    throw error;
  }
};

// Fetch wallpapers by category
export const fetchWallpapersByCategory = async (
  category: string,
  page: number = 1,
  perPage: number = 10
): Promise<UnsplashPhoto[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/photos`, {
      params: {
        page,
        per_page: perPage,
        collections: category,
      },
      headers: {
        Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching category wallpapers:", error);
    throw error;
  }
};
