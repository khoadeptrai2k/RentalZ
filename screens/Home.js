import { View, Text, StyleSheet, Button, Platform, TextInput, Picker, Alert } from "react-native";
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from "react-native-select-dropdown";
import ButtonPress from "../components/ButtonPress";

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
    const [submitted, setSubmitted] = useState(false);
    
    const handleSubmit = () => {
      if (type.length === 0 ){
        Alert.alert("Please enter your PropertyType")
      }else{
        setSubmitted(!submitted);
        if(submitted){
          setType("");
          setMode("");
        }
      };
    }

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
      <Text>Home Screen</Text>
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
        handlePress={handleSubmit} title="Submited"
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
});

export default Home;
