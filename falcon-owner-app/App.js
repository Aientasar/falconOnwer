import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./components/views/home";
import Details from "./components/views/details";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts, Lora_700Bold } from "@expo-google-fonts/lora";
import AppLoading from "expo-app-loading";

export default () => {
  const Stack = createNativeStackNavigator(); // creates object for Stack Navigator
  let [fontsLoaded] = useFonts({
    Lora_700Bold,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: "center",
            title: "Falcon",
            headerTitle: "Falcon",
            headerTitleStyle: {
              fontFamily: "Lora_700Bold",
              alignContent: "center",
              textAlign: "center",
              fontSize: 26,
            },
            headerTintColor: "#000",
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen
            options={{ headerShown: false }}
            name="login"
            component={Details}
          />
        </Stack.Navigator>
      </SafeAreaProvider>
    </NavigationContainer>
  );
};
