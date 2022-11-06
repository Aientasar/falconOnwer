import React from "react";
import { Text, ScrollView, StyleSheet } from "react-native";
import { Avatar, ListItem, Card } from "@rneui/themed";
import { Lora_600SemiBold } from "@expo-google-fonts/lora";
import {
  Poppins_600SemiBold,
  Poppins_400Regular,
} from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";
import MOCK_DATA from "../../services/MOCK_DATA.json";
import AppLoading from "expo-app-loading";

const Details = (props) => {
  console.log("enter details" + props);
  let [fontsLoaded] = useFonts({
    Lora_600SemiBold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  let detailsdata = MOCK_DATA[0];
  let schema = props.route.params.details;

  if (!fontsLoaded) return <AppLoading />;
  return (
    <ScrollView style={{ marginBottom: 100, marginTop: 20 }}>
      {schema.map((detailItem) => {
        return (
          <Card
            containerStyle={styles.listitem}
            wrapperStyle={{ borderWidth: 0 }}
          >
            <ListItem pad={15}>
              <Avatar
                size={88}
                avatarStyle={{ borderRadius: 10 }}
                source={{
                  uri: "https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg",
                }}
              />
              <ListItem.Content>
                <ListItem.Title>
                  <Text style={styles.contextTextBig}>
                    {detailsdata[detailItem.title]}
                  </Text>
                </ListItem.Title>

                {detailItem.subtitles.map((row) => {
                  return (
                    <ListItem.Subtitle>
                      <Text style={styles.contextTexSmall}>
                        {detailsdata[row]}
                      </Text>
                    </ListItem.Subtitle>
                  );
                })}
              </ListItem.Content>
            </ListItem>
            {detailItem.list.map((row) => {
              return (
                <Text style={styles.contextTexSmall}>
                  {row.label} :
                  <Text style={{ fontFamily: "Poppins_400Regular" }}>
                    {"   " + detailsdata[row.value]}
                  </Text>
                </Text>
              );
            })}
          </Card>
        );
      })}
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  listitem: {
    borderRadius: 15,
    borderWidth: 0,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  contextTextBig: {
    color: "#000000",
    fontSize: 18,
    fontFamily: "Lora_700Bold",
    margin:0
    
  },
  contextTexSmall: {
    color: "#747474",
    marginTop: 10,
    marginLeft: 15,
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
});
