import React from "react";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import RootNavigator from "./src/navigation/RootNavigator";
import Toast from "react-native-toast-message";
import { LikedImagesProvider } from "./src/context/LikedImagesContext";
import { FilterProvider } from "./src/context/FiltersContext";

export default function App() {
  const [loaded] = useFonts({
    CG_Regular: require("./assets/fonts/ClashGrotesk-Regular.otf"),
    CG_Medium: require("./assets/fonts/ClashGrotesk-Medium.otf"),
    CG_Bold: require("./assets/fonts/ClashGrotesk-Bold.otf"),
    Lexend_Regular: require("./assets/fonts/Lexend-Regular.ttf"),
    Lexend_Medium: require("./assets/fonts/Lexend-Medium.ttf"),
    Lexend_Bold: require("./assets/fonts/Lexend-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <>
      <FilterProvider>
        <LikedImagesProvider>
          <RootNavigator />
          <Toast />
          <StatusBar style="light" />
        </LikedImagesProvider>
      </FilterProvider>
    </>
  );
}
