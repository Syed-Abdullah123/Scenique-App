import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";
import DetailsScreen from "../screens/DetailsScreen";
import CategoryDetails from "../screens/CategoryDetailsScreen";

const RootNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthNavigator} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
