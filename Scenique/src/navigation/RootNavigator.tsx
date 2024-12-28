import React from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useAuth } from "../context/AuthenticationContext";
import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";
import DetailsScreen from "../screens/DetailsScreen";
import CategoryDetails from "../screens/CategoryDetailsScreen";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#363B40",
        }}
      >
        <ActivityIndicator size="large" color="#32BAE8" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <>
            <Stack.Screen
              name="Home"
              component={TabNavigator}
              options={{ animation: "fade_from_bottom" }}
            />
            <Stack.Screen
              name="Details"
              component={DetailsScreen}
              options={{ animation: "slide_from_right" }}
            />
            <Stack.Screen
              name="Cat_Details"
              component={CategoryDetails}
              options={{ animation: "none" }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
