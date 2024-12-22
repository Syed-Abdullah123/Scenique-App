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
