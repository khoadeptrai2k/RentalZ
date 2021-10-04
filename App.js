import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import Home from "./screens/Home";
import Detail from "./screens/Detail";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DeleteDetail from "./functions/DeleteDetail";


const Stack = createBottomTabNavigator();

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
          name="Result"
          component={Detail}
          options={{ title: 'My Result' }}
        />
        <Stack.Screen name="DeleteDetail" 
        component={DeleteDetail} />

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