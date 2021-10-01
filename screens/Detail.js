import * as SQLite from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";
import CustomButton from "../components/ButtonPress";

const db = SQLite.openDatabase("dbName", 1.0);

const Detail = ({ navigation }) => {
    const [type, setType] = useState('');
    const Bedrooms = ["One Room", "Two Rooms", "Three Rooms"]
    const Furniture = ["Classic", "Advance", "Normal" ]
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [price, setPrice] = useState('');
    const [note, setNote] = useState('');
    const [name, setName] = useState('');

  // Call only one time when the component is loaded
  useEffect(() => {
    getData();
  }, []);

  const showDetail = () => {
    navigation.navigate("Detail");
  };

  const getData = () => {
    try {
      db.transaction((tx) => {
        console.log(123);
        tx.executeSql("Detail", [], (tx, result) => {
          console.log(JSON.stringify(result.rows));
          var len = result.rows.length;
          console.log(len);
          if (len > 0) {
            const detailType = result.rows.item(0).Type;
            const detailName = result.rows.item(0).Name;
            setName(detailName);
            setType(detailType);
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    // AsyncStorage
    // try {
    //   await AsyncStorage.removeItem("Username");
    //   Alert.alert("Removed !!!. Your name is removed !!!");
    //   setName("");
    //   navigation.navigate("Login");
    // } catch (error) {
    //   console.log(error);
    // }

    // SQLite
    try {
      db.transaction((tx) => {
        tx.executeSql("DELETE FROM Users WHERE id = 1", [], (tx, result) => {
          navigation.navigate("Detail");
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateData = async () => {
    // AsyncStorage
    // if (name.length === 0) {
    //   Alert.alert("Please enter your name");
    // } else {
    //   await AsyncStorage.setItem("Username", name);
    //   Alert.alert("Your name is updated !!!");
    // }

    // SQLite
    if (name.length === 0) {
      Alert.alert("Please enter your updated name");
    } else {
      try {
        db.transaction((tx) => {
          tx.executeSql(
            "UPDATE Users set name=? WHERE id = 2",
            [name],
            (tx, result) => {
              Alert.alert("Your name is updated !!!");
            }
          );
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.body}>
      <Text style={styles.text}>Welcome: {type}</Text>
      <Text style={styles.text}>Your Type: {name}</Text>

      <CustomButton title="Logout" handlePress={logout} />
      <View style={styles.updateInput}>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          onChangeText={(value) => setName(value)}
        />
        <View style={{ marginBottom: 15 }}>
          <CustomButton title="Update" handlePress={updateData} />
        </View>
        <CustomButton title="Show Users" handlePress={showDetail} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    margin: 10,
    justifyContent: "center",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    height: 50,
    width: 300,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 20,
    marginBottom: 15,
    marginTop: 15,
  },
  updateInput: {
    alignItems: "center",
  },
});

export default Detail;