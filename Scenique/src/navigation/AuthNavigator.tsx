import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "../screens/WelcomeScreen";
import Signup from "../screens/SignupScreen";
import Signin from "../screens/SigninScreen";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Welcome"
        component={Welcome}
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ animation: "slide_from_right" }}
      />
      <Stack.Screen
        name="Signin"
        component={Signin}
        options={{ animation: "slide_from_right" }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
