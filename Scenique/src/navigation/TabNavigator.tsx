import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DashboardScreen from "../screens/DashboardScreen";
import LikesScreen from "../screens/LikesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import iconSet from "@expo/vector-icons/build/Fontisto";
import { View } from "react-native-reanimated/lib/typescript/Animated";

type TabParamList = {
  Dashboard: undefined;
  Likes: undefined;
  Profile: undefined;
};

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = focused ? "view-dashboard" : "view-dashboard-outline";
          } else if (route.name === "Likes") {
            iconName = focused ? "cards-heart" : "cards-heart-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "account" : "account-outline";
          }

          return (
            <MaterialCommunityIcons
              name={iconName}
              size={size}
              color={color}
              style={styles.icon}
            />
          );
        },
        // tabBarLabelStyle: {
        //   fontFamily: "CG_Regular",
        //   marginTop: 5,
        //   fontSize: 12,
        // },
        tabBarLabel: "",
        tabBarActiveTintColor: "#32BAE8",
        tabBarInactiveTintColor: "#e0e0e0",
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          headerTitleStyle: {
            fontFamily: "CG_Bold",
            color: "#fff",
          },
          headerStyle: { backgroundColor: "#363B40" },
        }}
      />
      <Tab.Screen
        name="Likes"
        component={LikesScreen}
        options={{
          headerTitleStyle: { fontFamily: "CG_Bold", color: "#fff" },
          headerStyle: { backgroundColor: "#363B40" },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerTitleStyle: { fontFamily: "CG_Bold", color: "#fff" },
          headerStyle: { backgroundColor: "#363B40" },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#363B40",
    height: 60,
  },
  icon: {
    height: "100%",
    marginTop: "50%",
  },
});
