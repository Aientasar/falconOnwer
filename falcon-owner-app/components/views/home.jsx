import React from "react";
import { Image, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Lora_700Bold } from "@expo-google-fonts/lora";
import { useFonts, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { initState } from "../../services/config";
import AddEditDevice from "./addEdit";
import ListDevice from "./list";
import AppLoading from "expo-app-loading";

const Home = () => {
  let [fontsLoaded] = useFonts({
    Lora_700Bold,
    Poppins_600SemiBold,
  });

  const Tab = createBottomTabNavigator();

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <Tab.Navigator
      style={{ margin: 10 }}
      screenOptions={{
        headerShown:false,
        tabBarStyle: {
          height: 75,
          margin: 15,
          borderRadius: 50,
          backgroundColor: "black",
          position: "absolute",
          paddingBottom: 5,
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Poppins_600SemiBold",
        },
      }}
    >
      <Tab.Screen
        name="Trips"
        initialParams={initState.packages}
        component={ListDevice}
        options={{
          tabBarLabel: "Trips",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 35,
                height: 35,
                backgroundColor: focused ? "white" : "black",
                borderRadius: 35,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? "black" : "white",
                  resizeMode: "contain",
                }}
                source={require("../../assets/images/trip.png")}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Vehciles"
        component={ListDevice}
        initialParams={initState.packages}
        options={{
          tabBarLabel: "Vehciles",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 35,
                height: 35,
                backgroundColor: focused ? "white" : "black",
                borderRadius: 35,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? "black" : "white",
                  resizeMode: "contain",
                }}
                source={require("../../assets/images/vehcile.png")}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Drivers"
        component={AddEditDevice}
        initialParams={initState.vehicles}
        options={{
          tabBarLabel: "Drivers",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 35,
                height: 35,
                backgroundColor: focused ? "white" : "black",
                borderRadius: 35,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? "black" : "white",
                  resizeMode: "contain",
                }}
                source={require("../../assets/images/driver.png")}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={ListDevice}
        initialParams={initState.packages}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 35,
                height: 35,
                backgroundColor: focused ? "white" : "black",
                borderRadius: 35,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? "black" : "white",
                  resizeMode: "contain",
                }}
                source={require("../../assets/images/owner.png")}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Home;
