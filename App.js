import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";

import Main from "./src/screens/Main";
import Feed from "./src/screens/Feed";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Ponche") {
              iconName = focused ? "key" : "key";
            } else if (route.name === "Avisos") {
              iconName = focused ? "newspaper-o" : "newspaper-o";
            }
            return <Icon name={iconName} size={20} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="Ponche" component={Main} />
        <Tab.Screen name="Avisos" component={Feed} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
