import * as React from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import { Avatar, ListItem, Card } from "@rneui/themed";
import { Lora_600SemiBold } from "@expo-google-fonts/lora";
import {
  Poppins_600SemiBold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

function App() {
  let [fontsLoaded] = useFonts({
    Lora_600SemiBold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) return <AppLoading />;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MapView
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Marker
          title="New test"
          description="test Description"
          coordinate={{ latitude: 51.5078788, longitude: -0.0877321 }}
        >
          <Callout tooltip>
            <Card
              containerStyle={styles.listitem}
              wrapperStyle={{ borderWidth: 0 }}
            >
              <ListItem pad={25}>
                <Avatar
                  size={86}
                  source={{
                    uri: "https://cdn.pixabay.com/photo/2016/11/21/12/42/beard-1845166_1280.jpg",
                  }}
                  key="11"
                  avatarStyle={{ borderRadius: 10 }}
                />
                <ListItem.Content>
                  <ListItem.Title style={{ marginBottom: 5 }}>
                    <Text style={styles.contextTextBig}>"Drowsy Driving"</Text>
                  </ListItem.Title>
                  <ListItem.Subtitle style={styles.contextTexSmall}>
                    <Text style={styles.contentLabel}>"Eyes Closed"</Text>
                  </ListItem.Subtitle>
                  <ListItem.Subtitle style={styles.contextTexSmall}>
                    <Text style={styles.contentLabel}>
                      "21st September,2022"
                    </Text>
                  </ListItem.Subtitle>
                  <ListItem.Subtitle style={styles.contextTexSmall}>
                    <Text style={styles.contentLabel}>"09:45 A.M"</Text>
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </Card>
          </Callout>
        </Marker>
      </MapView>
    </View>
  );
}

export default App;

const styles = StyleSheet.create({
  listitem: {
    backgroundColor: "white",
    borderWidth: 0,
    borderRadius: 20,
    margin: 5,
    padding: 5,
  },
  contextTextBig: {
    color: "#000000",
    fontSize: 18,
    fontFamily: "Lora_600SemiBold",
  },
  contextTexSmall: {
    color: "#747474",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
});
