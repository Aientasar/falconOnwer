import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Text, Avatar, ListItem, TouchableHighlight } from "@rneui/themed";
import { Lora_700Bold, Lora_600SemiBold } from "@expo-google-fonts/lora";
import { useFonts, Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";

const ListItemPopl = ({ item }) => {
  let localKey = item.runningKey;
  item.runningKey = item.runningKey + 1;
  return (
    <ListItem
      key={
        Math.floor(Math.random() * 100) + 1 + item[item.table.content.titleId]
      }
      Component={TouchableHighlight}
      containerStyle={styles.listitem}
      disabledStyle={{ opacity: 0.5 }}
      onPress={() => item.navigation.navigate("Details", item)}
      pad={25}
    >
      {item.table.left.avatar ? (
        <Avatar
          size={64}
          rounded
          source={{
            uri: item[item.table.left.avatar],
          }}
          title="A"
        ></Avatar>
      ) : (
        <Avatar containerStyle={{ justifyContent: "flex-end" }}>
          <Text style={styles.avatarTextBig}>
            {item[item.table.left.title]}
          </Text>
          <Text style={styles.avatarTextSmall}>
            {item[item.table.left.sub]}
          </Text>
        </Avatar>
      )}
      <ListItem.Content>
        <ListItem.Title numberOfLines={2} style={{ marginBottom: 5 }}>
          <Text style={styles.contextTextBig}>
            {item[item.table.content.titleId]}
          </Text>
        </ListItem.Title>

        {item.table.content.subTitles.map((row) => {
          return (
            <ListItem.Subtitle
              key={Math.floor(Math.random() * 100) + 1 + item[row]}
              numberOfLines={1}
            >
              <Text style={styles.contextTexSmall}>{item[row]}</Text>
            </ListItem.Subtitle>
          );
        })}
      </ListItem.Content>

      {item.table.rightId ? (
        <ListItem.Content right>
          <Text numberOfLines={1} style={styles.contentRight}>
            9
          </Text>
        </ListItem.Content>
      ) : null}
    </ListItem>
  );
};

const ListDevice = (props) => {
  let [fontsLoaded] = useFonts({
    Lora_700Bold,
    Lora_600SemiBold,
    Poppins_600SemiBold,
  });
  currentModule = "";
  isLoading = false;

  const renderItem = ({ item }) => {
    item.type = state.url;
    item.table = state.table;
    item.details = state.details;
    item.runningKey = 0;
    item.navigation = props.navigation;
    return <ListItemPopl item={item} />;
  };

  let state = props.route.params;

  let queryData = async (url) => {
    // setState({ apiData: [], apiData: [] });
    // isLoading = true;
    // try {
    //   // let data = await axios.get(url);
    //   // isLoading = false;
    //   // console.log(data);
    //   // setState({ apiData: [], apiData: [] });
    // } catch (error) {
    //   console.log(error);
    // }
  };

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <FlatList
      style={{ marginTop: 10 }}
      data={state.apiData}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  listitem: {
    background: "#f6f6f6",
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingVertical:20,
    margin: 10,
  },
  avatarTextBig: {
    color: "#000000",
    fontSize: 26,
    textAlign: "center",
    fontFamily: "Lora_600SemiBold",
  },
  avatarTextSmall: {
    color: "#000000",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Lora_700Bold",
  },
  contextTextBig: {
    color: "#000000",
    fontSize: 18,
    fontFamily: "Lora_700Bold",
  },
  contextTexSmall: {
    color: "#747474",
    marginTop: 10,
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
  contentRight: {
    color: "#fff",
    fontSize: 14,
    borderRadius: 10,
    width: 40,
    fontFamily: "Poppins_600SemiBold",
    padding: 10,
    textAlignVertical: "center",
    textAlign: "center",
    backgroundColor: "#A43144",
  },
});

export default ListDevice;
