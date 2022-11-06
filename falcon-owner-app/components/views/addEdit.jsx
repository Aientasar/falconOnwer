import React from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Switch,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AntDesign } from "@expo/vector-icons";
import { Lora_600SemiBold } from "@expo-google-fonts/lora";
import { Poppins_600SemiBold } from "@expo-google-fonts/poppins";
import { useFonts } from "expo-font";

const AddEditDevice = (props) => {
  let [fontsLoaded] = useFonts({
    Lora_600SemiBold,
    Poppins_600SemiBold,
  });

  const [state, setState] = React.useState(props.route.params);

  let ShowDate = false;

  let handleChange = (item, newValue) => {
    console.log(newValue);
    const form = state.form.map((x) =>
      x.name === item.name ? { ...x, value: newValue } : x
    );
    setState({ form: form });
  };

  let writeData = async () => {
    try {
      let db = props.firebaseDB;
      let docRef = doc(db, String(state.path), state.data[state.keyName]);
      console.log(docRef);
      let docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Duplicate Data exists");
        return;
      } else {
        await setDoc(docRef, state.data, { merge: true });
        console.log("Document written");
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  let getData = async () => {
    try {
      let docSnap = await getDoc(
        doc(props.firebaseDB, String(state.path), props.match.params.id)
      );
      if (!docSnap.exists()) {
        swal("No Data exists");
        props.history.push("/" + props.initState.url);
        return;
      }
      let form = state.form.map((formItem) => {
        formItem.value = docSnap.data()[formItem.name];
        return formItem;
      });
      state.data = docSnap.data();
      setState({ form, data: state.data });
    } catch (e) {
      swal("Error loading data");
      props.history.push("/" + props.initState.url);
      return;
    }
  };

  let handleSubmit = (value) => {
    const form = state.form;
    let isInvalid = false;
    form.map((item) => {
      item.isDirty = true;
      if (
        item.isRequired &&
        (!item.value || item.value == "" || item?.value.value == "")
      )
        isInvalid = true;
      state.data[item["name"]] = item["value"];
    });
    setState({ form, data: state.data });
  };

  return (
    <ScrollView style={{ marginBottom: 100, marginTop: 40 }}>
      {state.form.map((item) => {
        switch (item.type) {
          case "number":
            return (
              <View style={styles.inputGroup}>
                <Text style={styles.headerLabel}>
                  {item.label}
                  <Text style={styles.headerStar}>
                    {!item.isRequired ? " *" : ""}
                  </Text>
                </Text>
                <View style={styles.inputText}>
                  <TextInput
                    style={[styles.textFeild]}
                    keyboardType="numeric"
                    placeholder={item.placeHolder}
                    value={item.value}
                    onChange={(e) => {
                      item.isDirty = true;
                      handleChange(item, e.nativeEvent.text);
                    }}
                    minLength={0}
                  />
                </View>
                <Text style={styles.errorLabel}>
                  {item.isRequired &&
                  item.isDirty &&
                  (!item.value || item.value == 0)
                    ? "Required Feild"
                    : ""}
                </Text>
              </View>
            );
          case "text":
            return (
              <View style={styles.inputGroup}>
                <Text style={[styles.headerLabel, { paddingBottom: 0 }]}>
                  {item.label}
                  <Text style={{ fontSize: 16, color: "red" }}>
                    {!item.isRequired ? " *" : ""}
                  </Text>
                </Text>
                <View
                  style={[
                    styles.inputText,
                    { borderRadius: item.isMulti ? 10 : 30 },
                  ]}
                >
                  <TextInput
                    style={styles.textFeild}
                    placeholder={item.placeHolder}
                    value={item.value}
                    numberOfLines={item.isMulti ? 10 : 1}
                    multiline={item.isMulti}
                    onChange={(e) => {
                      item.isDirty = true;
                      handleChange(item, e.nativeEvent.text);
                    }}
                  />
                </View>

                <Text style={styles.errorLabel}>
                  {item.isRequired &&
                  item.isDirty &&
                  (!item.value || item.value == 0)
                    ? "Required Feild"
                    : ""}
                </Text>
              </View>
            );
          case "checkbox":
            return (
              <View
                style={[
                  styles.inputGroup,
                  {
                    flexDirection: "row",
                    alignItems: "center",
                    marginBottom: 15,
                    paddingHorizontal: 5,
                  },
                ]}
              >
                <Switch
                  trackColor={{ true: "#A43144" }}
                  thumbColor="black"
                  ios_backgroundColor="black"
                  value={item.value}
                  onValueChange={(e) => {
                    item.isDirty = true;
                    handleChange(item, e);
                  }}
                />
                <Text
                  style={{
                    paddingHorizontal: 10,
                    color: "#7B7A7A",
                    fontFamily: "Poppins_600SemiBold",
                    fontSize: 16,
                  }}
                >
                  {item.label}
                  <Text style={{ fontSize: 16, color: "red" }}>
                    {!item.isRequired ? " *" : ""}
                  </Text>
                </Text>
              </View>
            );
          case "date":
            return (
              <View style={styles.inputGroup}>
                <Text style={styles.headerLabel}>
                  {item.label}
                  <Text style={styles.headerStar}>
                    {!item.isRequired ? " *" : ""}
                  </Text>
                </Text>
                <View style={styles.inputText}>
                  <Text style={[styles.textFeild]}>
                    {item.value
                      ? new Date(item.value).toLocaleDateString()
                      : new Date().toLocaleDateString()}
                  </Text>
                  <AntDesign
                    style={[styles.textFeild]}
                    name="calendar"
                    size={20}
                    color="black"
                  />
                </View>
                {ShowDate && (
                  <TouchableHighlight onPress={(ShowDate = true)}>
                    <DateTimePicker
                      value={item.value ? new Date(item.value) : new Date()}
                      mode="date"
                      is24Hour={true}
                      onChange={(e) => {
                        ShowDate = false;
                        item.isDirty = true;
                        handleChange(item, e.nativeEvent.timestamp);
                      }}
                    />
                  </TouchableHighlight>
                )}
                <Text style={styles.errorLabel}>
                  {item.isRequired &&
                  item.isDirty &&
                  (!item.value || item.value == 0)
                    ? "Required Feild"
                    : ""}
                </Text>
              </View>
            );
        }
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    marginVertical: 0,
    marginHorizontal: 15,
  },
    headerLabel: {
      paddingHorizontal: 15,
      marginBottom: 10,
      color: "#7B7A7A",
      fontFamily: "Poppins_600SemiBold",
    },
  headerStar: { fontSize: 16, color: "red" },
  inputText: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    borderRadius: 30,
  },
  textFeild: {
    paddingVertical: 10,
    fontFamily: "Lora_600SemiBold",
    fontSize: 18,
    paddingHorizontal: 5,
    textAlignVertical: "top",
  },
  errorLabel: {
    fontSize: 12,
    color: "red",
    fontFamily: "Poppins_600SemiBold",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});

export default AddEditDevice;
