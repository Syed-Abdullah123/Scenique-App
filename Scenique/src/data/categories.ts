// types.ts
export interface Category {
  id: string;
  title: string;
  query: string;
  coverImage?: string;
}

// categories.ts
export const WALLPAPER_CATEGORIES: Category[] = [
  { id: "1", title: "Abstract", query: "abstract background" },
  { id: "2", title: "Nature", query: "nature landscape" },
  { id: "3", title: "Animals", query: "wildlife animals" },
  { id: "4", title: "Space", query: "space galaxy" },
  { id: "5", title: "Architecture", query: "architecture modern" },
  { id: "6", title: "Cars", query: "luxury cars" },
  { id: "7", title: "Minimal", query: "minimal wallpaper" },
  { id: "8", title: "Technology", query: "technology modern" },
  { id: "9", title: "Art", query: "digital art" },
  { id: "10", title: "Dark", query: "dark aesthetic" },
  { id: "11", title: "Neon", query: "neon city" },
  { id: "12", title: "Ocean", query: "ocean waves" },
  { id: "13", title: "Mountains", query: "mountains peaks landscape" },
  { id: "14", title: "Cities", query: "cityscape urban architecture" },
  { id: "15", title: "Flowers", query: "flowers botanical nature" },
  { id: "16", title: "Fantasy", query: "fantasy magical mystical" },
  { id: "17", title: "Patterns", query: "geometric patterns abstract" },
  { id: "18", title: "Anime", query: "anime aesthetic art" },
  { id: "19", title: "Food", query: "delicious food photography" },
  { id: "20", title: "Sports", query: "sports action athletic" },
  { id: "21", title: "Vintage", query: "vintage retro classic" },
  { id: "22", title: "Cyberpunk", query: "cyberpunk futuristic neon" },
  { id: "23", title: "Sunset", query: "sunset golden hour nature" },
  { id: "24", title: "Waterfall", query: "waterfall nature scenic" },
  { id: "25", title: "Gaming", query: "gaming wallpapers" },
  { id: "26", title: "Movies", query: "movie posters" },
  { id: "27", title: "Celebrities", query: "celebrity portraits" },
  { id: "28", title: "Music", query: "music themes" },
  { id: "29", title: "Travel", query: "travel destinations" },
  { id: "30", title: "Textures", query: "textured backgrounds" },
  { id: "31", title: "Typography", query: "typography quotes" },
  { id: "32", title: "3D", query: "3D illustrations" },
  { id: "33", title: "Rain", query: "rainy days" },
  { id: "34", title: "Beaches", query: "beautiful beaches" },
  { id: "35", title: "Deserts", query: "desert landscapes" },
  { id: "36", title: "Forests", query: "dense forests" },
  { id: "37", title: "Cities", query: "urban cityscapes" },
  { id: "38", title: "Clouds", query: "cloudy skies" },
  { id: "39", title: "Fire", query: "fire and flames" },
  { id: "40", title: "Aurora", query: "northern lights aurora" },
  { id: "41", title: "Futuristic", query: "futuristic sci-fi" },
  { id: "42", title: "Superheroes", query: "superhero characters" },
];

import { useState, useEffect } from "react";
import { fetchWallpapers } from "../api/unsplash";

export const useCategories = (initialCategories: Category[]) => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryCovers = async () => {
      try {
        setLoading(true);
        const updatedCategories = await Promise.all(
          categories.map(async (category) => {
            const photos = await fetchWallpapers({
              query: category.query,
              perPage: 1,
            });
            return {
              ...category,
              coverImage: photos[0]?.urls.regular,
            };
          })
        );
        setCategories(updatedCategories);
      } catch (err) {
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryCovers();
  }, []);

  return { categories, loading, error };
};
