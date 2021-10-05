import { View, StyleSheet, Alert,  } from "react-native";
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-datepicker';
import ButtonPress from "../components/ButtonPress";
import {Picker} from '@react-native-picker/picker';
import TextInput from "../components/TextInput"
import Text from "../components/Text"
import {DatabaseConnected} from '../database/database'

const db =  DatabaseConnected.getConnection()

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
    }, []);

    const checkData = () => {

      try {
        db.transaction((tx) => {
          tx.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name='detail'", [], (tx, result) => {
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
              "INSERT INTO detail (type_detail, bedroom_detail, furniture_detail, date_detail, price_detail, note_detail, name_detail) VALUES (?,?,?,?,?,?,?)",
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
          "CREATE TABLE IF NOT EXISTS detail(Id INTEGER PRIMARY KEY AUTOINCREMENT, type_detail VARCHAR(255), bedroom_detail VARCHAR(255), furniture_detail VARCHAR(255), date_detail VARCHAR(255), price_detail INT(10), note_detail VARCHAR(555), name_detail VARCHAR(20))",
          
        );
      });
    };

  
  
  return (
    <View style={styles.HomeContainer}>

      <Text text="Property Type"/>
      <TextInput value={type} style={{height:40}} placeholder="Property Type"  
      onChangeText={(type) => setType(type)} />
      
      <Text text="Bedrooms"/>
      <Picker   itemStyle={{height:40}}
                selectedValue={Bedrooms}
                style={{width: "90%", padding:5, borderColor: "gray",
                         borderWidth: 1,borderRadius: 10, paddingBottom:5,
                      }}
                onValueChange={(itemValue, itemIndex) => setBedroom(itemValue)}>
                <Picker.Item label="Bedrooms" value="" />
                <Picker.Item label="1 bedroom" value="room1" />
                <Picker.Item label="2 bedrooms" value="room2" />
                <Picker.Item label="3 bedrooms" value="room3" />
      </Picker>

      <Text text="Date Booking"/>
      <DatePicker
          style={{backgroundColor: 'white',
                  width: "90%", padding:5,
                  borderWidth: 1,borderRadius: 10,
                  borderColor: "gray",
                  paddingBottom:5,}}
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

      <Text text="Price Monthly"/>
      <TextInput style={{height:40}} placeholder="Monthly Rent Price"  
      onChangeText={(price) => setPrice(price)} />
      
      <Text text="Furniture"/>
      <Picker   itemStyle={{height:40}}
                selectedValue={Furniture}
                style={{ width: "90%", padding:5, paddingBottom:5,
                         borderWidth: 1,borderRadius: 10, backgroundColor: '#FFFFFF',
                  borderColor: "gray",
                }}
                onValueChange={(itemValue, itemIndex) => setFurniture(itemValue)}>

                <Picker.Item label="Furnitures" value="" />
                <Picker.Item label="Classic" value="Classic" />
                <Picker.Item label="Formal" value="Formal" />
                <Picker.Item label="Modern" value="Modern" />
      </Picker>

      <Text text="Note"/>
      <TextInput style={{height:40}} numberOfLines={5} 
      multiline={true} placeholder="Note"  
      onChangeText={(note) => setNote(note)} />
      
      <Text text="Name of the Reported"/>      
      <TextInput style={{height:40}} placeholder="Name"  
      onChangeText={(name) => setName(name)} />
      
      <View style={styles.CustomButton}>
        <ButtonPress 
          handlePress={submitted} title="Submit"
        />
        <ButtonPress 
          handlePress={() => navigation.navigate('Detail')}
          title="Detail"
        />
        <ButtonPress 
          handlePress={() => navigation.navigate('SearchInfoDetail')}
          title="Search"
        />
      </View>
  </View>
  );
};

const styles = StyleSheet.create({
  HomeContainer: {
    paddingLeft: 30,
    flex: 1,
    // alignItems: "center",
    backgroundColor: "white",
  },
  CustomButton:{
    paddingRight: 35,
    flex:1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'space-around'
  }

});

export default Home;
