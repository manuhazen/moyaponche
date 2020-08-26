import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-community/async-storage";

import Main from "./src/screens/Main";
import Feed from "./src/screens/Feed";
import Login from "./src/screens/Login";

const Tab = createBottomTabNavigator();
const AuthStack = createStackNavigator();

const App = (props) => {
  const [user, setUser] = useState(true);

  const login = async (credentials) => {
    try {
      const user = JSON.stringify(credentials);
      await AsyncStorage.setItem("user", user);
      setUser(false);
    } catch (error) {
      alert(error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(true);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    async function getUser() {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user !== null) {
          setUser(false);
        } else {
          setUser(true);
        }
      } catch (error) {
        alert(error);
      }
    }
    getUser();
  });

  return (
    <NavigationContainer>
      {user ? (
        <AuthStack.Navigator headerMode="none" initialRouteName="Login">
          <AuthStack.Screen name="Login">
            {({ navigation, route }) => (
              <Login login={login} navigation={navigation} route={route} />
            )}
          </AuthStack.Screen>
        </AuthStack.Navigator>
      ) : (
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
      )}
    </NavigationContainer>
  );
};

export default App;
