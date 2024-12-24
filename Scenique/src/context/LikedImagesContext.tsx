import React, { createContext, useState, useEffect } from "react";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export const LikedImagesContext = createContext<any>(null);

export const LikedImagesProvider = ({ children }) => {
  const [likedImages, setLikedImages] = useState([]);
  const [userId, setUserId] = useState<string | null>(null); // Track user ID

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setUserId(user.uid); // Set user ID when authenticated
      } else {
        setUserId(null); // Clear user ID if not authenticated
        setLikedImages([]); // Clear liked images if user logs out
      }
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Fetch liked images from Firestore when the user is authenticated
  useEffect(() => {
    const fetchLikedImages = async () => {
      if (!userId) return;

      const userDoc = doc(FIREBASE_DB, "users", userId);

      try {
        const docSnapshot = await getDoc(userDoc);
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setLikedImages(data.likedImages || []);
        } else {
          console.log("User document does not exist, initializing...");
          await setDoc(userDoc, { likedImages: [] });
        }
      } catch (error) {
        console.error("Error fetching liked images:", error);
      }
    };

    fetchLikedImages();
  }, [userId]);

  // Toggle like for an image and sync with Firestore
  const toggleLike = async (image) => {
    if (!userId) {
      console.error("User ID is missing!");
      return;
    }

    const userDoc = doc(FIREBASE_DB, "users", userId);
    const isLiked = likedImages.some((img) => img.id === image.id);

    // console.log(
    //   `Toggling like for image ${image.id}, currently liked: ${isLiked}`
    // );

    try {
      if (isLiked) {
        await updateDoc(userDoc, {
          likedImages: arrayRemove(image),
        });
        setLikedImages((prev) => prev.filter((img) => img.id !== image.id));
        // console.log(`Image ${image.id} removed from likes.`);
      } else {
        await updateDoc(userDoc, {
          likedImages: arrayUnion(image),
        });
        setLikedImages((prev) => [...prev, image]);
        // console.log(`Image ${image.id} added to likes.`);
      }
    } catch (error) {
      if (error.code === "not-found") {
        console.warn("Document not found; creating a new one.");
        await setDoc(userDoc, { likedImages: [image] });
        setLikedImages([image]);
      } else {
        console.error("Error updating liked images:", error);
      }
    }
  };

  return (
    <LikedImagesContext.Provider value={{ likedImages, toggleLike }}>
      {children}
    </LikedImagesContext.Provider>
  );
};
