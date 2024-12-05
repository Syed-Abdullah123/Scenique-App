import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TabNavigator from "./TabNavigator";
import DetailsScreen from "../screens/DetailsScreen";
import CategoryDetails from "../screens/CategoryDetailsScreen";
import AllCategories from "../screens/AllCategoriesScreen";

const RootNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Cat_Details" component={CategoryDetails} />
        <Stack.Screen name="AllCategories" component={AllCategories} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
