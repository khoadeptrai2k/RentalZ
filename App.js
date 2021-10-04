import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import Home from "./screens/Home";
import Detail from "./screens/Detail";
import InfoDetail from "./screens/InfoDetail";
import SearchInfoDetail from "./screens/SearchInfoDetail";
import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'My home' }}
        />
          <Stack.Screen
          name="Detail"
          component={Detail}
          options={{ title: 'My Detail' }}
        />
        <Stack.Screen name="InfoDetail" 
        component={InfoDetail} />
        <Stack.Screen name="SearchInfoDetail" 
        component={SearchInfoDetail} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;