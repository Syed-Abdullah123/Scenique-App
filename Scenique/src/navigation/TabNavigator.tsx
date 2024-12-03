import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import DashboardScreen from "../screens/DashboardScreen";
import LikesScreen from "../screens/LikesScreen";
import SearchScreen from "../screens/ProfileScreen";

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "Likes") {
            iconName = focused ? "heart" : "heart-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          }

          return (
            <Ionicons
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
        name="Search"
        component={SearchScreen}
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
