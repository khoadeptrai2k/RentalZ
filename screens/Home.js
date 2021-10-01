import { View, Text, StyleSheet, Button, Platform, TextInput, Picker, Alert } from "react-native";
import React, {useEffect, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from "react-native-select-dropdown";
import ButtonPress from "../components/ButtonPress";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("dbName", 1.0);

const Home = ({navigation }) => {
    const [type, setType] = useState('');
    const Bedrooms = ["One Room", "Two Rooms", "Three Rooms"]
    const Furniture = ["Classic", "Advance", "Normal" ]
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [price, setPrice] = useState('');
    const [note, setNote] = useState('');
    const [name, setName] = useState('');
    
    useEffect(() => {
      createTable();
      submitted();
    }, []);

    const submitted = () => {
      /* AsyncStorage */
      // try {
      //   const value = await AsyncStorage.getItem("Username");
      //   if (value !== null) {
      //     navigation.navigate("Home");
      //   }
      // } catch (error) {
      //   console.log(error);
      // }
      /* SQLite */
      try {
        db.transaction((tx) => {
          tx.executeSql("Home Type", [], (tx, result) => {
            var len = result.rows.length;
            if (len > 0) {
              navigation.navigate("Home");
            }
          });
        });
      } catch (error) {
        console.log(error);
      }
    };
  
    const home = () => {
      if (type.length === 0 || Bedrooms.length === 0 || Furniture.length === 0 || 
          show.length === 0 || price.length === 0 || note.length === 0 || name.length === 0 ) {
        Alert.alert("Warning !!!. Please  !!!");
      } else {
        try {
          db.transaction((tx) => {
            tx.executeSql(
              "INSERT INTO Home (Type, Bedrooms, Furniture, show, price, note, name) VALUES (?,?,?,?,?,?,?);",
              [type, Bedrooms, Furniture, show, price, note, name],
              (tx, results) => {
                console.log(results.rowsAffected);
              }
            );
          });
          navigation.navigate("Home");
        } catch (error) {
          console.log(error);
        }
      }
    };
  
    const createTable = () => {
      db.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS Users(Id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Type TEXT);"
        );
      });
    };
    // const handleSubmit = () => {
    //   if (type.length === 0 ){
    //     Alert.alert()
    //   }else{
    //     setSubmitted(!submitted);
    //     if(submitted){
    //       setType("");
    //       setMode("");
    //       Alert.alert("Submitted")
    //     }
    //   };
    // }

    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };
  
    const showMode = (currentMode) => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
  
  return (
    <View style={styles.HomeContainer}>
      <TextInput value={type} style={{height:40}} placeholder="Property Type"  
      onChangeText={(value) => setType(value)} />
      <View>
        <Text>Bedrooms</Text>
        <SelectDropdown
          data={Bedrooms}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }}
        />
      </View>
      <View>
        <Button onPress={showDatepicker} title="Booking Date" />
        {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          display="default"
          onChange={onChange}
        />
      )}
      </View>
      <TextInput style={{height:40}} placeholder="Monthly Rent Price"  
      onChangeText={(value) => setPrice(value)} />
      <SelectDropdown
      	data={Furniture}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index)
        }}
      />
      <TextInput style={{height:40}} placeholder="Monthly Rent Price"  
      onChangeText={(value) => setNote(value)} />
      <TextInput style={{height:40}} placeholder="Monthly Rent Price"  
      onChangeText={(value) => setName(value)} />
      <ButtonPress
        handlePress={home} title="Submited"

      />
      <View>
      <Text style={styles.text}>day la type cua ban :{type}</Text>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  HomeContainer: {
    paddingLeft: 20,
    flex: 1,
    alignItems: "baseline",
    justifyContent: "space-around",
    backgroundColor: "#fff",
  },
  ButtonStyle: {
    backgroundColor: "red",
    alignItems: "center",
  },
});

export default Home;
