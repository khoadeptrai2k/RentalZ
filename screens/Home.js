import { View, Text, StyleSheet, Button, Platform, TextInput, Alert, SnapshotViewIOSComponent } from "react-native";
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-datepicker';import SelectDropdown from "react-native-select-dropdown";
import ButtonPress from "../components/ButtonPress";
import {Picker} from '@react-native-picker/picker';
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("dbName", 1.0);

const Home = ({navigation }) => {
    const [type, setType] = useState('');
    const [Bedrooms, setBedroom] = useState('');
    const [Furniture, setFurniture]= useState('');
    const [date, setDate] = useState('01-01-2021');
    const [price, setPrice] = useState('');
    const [note, setNote] = useState('');
    const [name, setName] = useState('');
    
    useEffect(() => {
      createTable();
      checkData();
      submitted();
    }, []);

    const checkData = () => {

      try {
        db.transaction((tx) => {
          tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='table_detail'", [], (tx, result) => {
            console.log('item:', result.rowsAffected.length);
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
  
    const submitted = () => {
      if (type.length === 0 || Bedrooms.length === 0 || Furniture.length === 0 || 
          date.length === 0 || price.length === 0 || note.length === 0 || name.length === 0 ) {
        Alert.alert("Warning !!!. Please  !!!");
      } else {
        try {
          db.transaction((tx) => {
            tx.executeSql(
              "INSERT INTO table_detail (type_detail, bedroom_detail, furniture_detail, show_detail, price_detail, note_detail, name_detail) VALUES (?,?,?,?,?,?,?)",
              [type, Bedrooms, Furniture, date, price, note, name],
              (tx, results) => {
                console.log(results.rowsAffected);
              }
            );
          });
          navigation.navigate("Home")
        } catch (error) {
          console.log(error);
        }
      }
    };

    const createTable = () => {
      db.transaction((tx) => {
        tx.executeSql(
          "CREATE TABLE IF NOT EXISTS table_detail(Id INTEGER PRIMARY KEY AUTOINCREMENT, type_detail VARCHAR(255), bedroom_detail VARCHAR(255), furniture_detail VARCHAR(255), date_detail TEXT, price_detail INT(10), note_detail VARCHAR(555), name_detail VARCHAR(20))",
          
        );
      });
    };

  
  
  return (
    <View style={styles.HomeContainer}>
      
      <TextInput value={type} style={{height:40}} placeholder="Property Type"  
      onChangeText={(type) => setType(type)} />
      
      <Picker
                selectedValue={Bedrooms}
                style={{ width: 150,
                        marginTop: 10, borderWidth: 1,borderRadius: 3,
                      }}
                onValueChange={(itemValue, itemIndex) => setBedroom(itemValue)}>
                <Picker.Item label="Bedrooms" value="" />
                <Picker.Item label="1 bedroom" value="room1" />
                <Picker.Item label="2 bedrooms" value="room2" />
                <Picker.Item label="3 bedrooms" value="room3" />
      </Picker>

      <View>
      <DatePicker
          style={styles.datePickerStyle}
          date={date} // Initial date from state
          mode="date" // The enum of date, datetime and time
          placeholder="select date"
          format="DD-MM-YYYY"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={(date) => {
            setDate(date);
          }}
        />
      </View>
      <TextInput style={{height:40}} placeholder="Monthly Rent Price"  
      onChangeText={(price) => setPrice(price)} />
      
      <Picker
                mode='dialog'
                selectedValue={Furniture}
                style={{ width: 150,
                        marginTop: 10, borderWidth: 1,borderRadius: 3,
                      }}
                onValueChange={(itemValue, itemIndex) => setFurniture(itemValue)}>

                <Picker.Item label="Furnitures" value="" />
                <Picker.Item label="Classic" value="Classic" />
                <Picker.Item label="Formal" value="Formal" />
                <Picker.Item label="Modern" value="Modern" />
      </Picker>

      <TextInput style={{height:40}} placeholder="Note"  
      onChangeText={(note) => setNote(note)} />
      <TextInput style={{height:40}} placeholder="Name"  
      onChangeText={(name) => setName(name)} />
      <ButtonPress
        handlePress={submitted} title="Submited"
      />
      <View>
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
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
});

export default Home;
