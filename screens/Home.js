import { View, Text, StyleSheet, Button, Platform, TextInput, Picker } from "react-native";
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from "react-native-select-dropdown";

const Home = ({navigation }) => {
    const [type, setType] = useState('');
    const Bedrooms = ["One Room", "Two Rooms", "Three Rooms"]
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
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
  
    const showTimepicker = () => {
      showMode('time');
    };
    
  
  return (
    <View style={styles.HomeContainer}>
      <Text>Home Screen</Text>
      <TextInput style={{height:40}} placeholder="Property Type"  
      onChangeText={(value) => setType(value)} />
      
      <SelectDropdown
      	data={Bedrooms}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index)
        }}
      />
      <Button
        title="My Profile"
        onPress={() => navigation.navigate('Profile')}
      />
      <View>
      <View>
        <Button onPress={showDatepicker} title="Booking Date" />
      </View>
      <View>
        <Button onPress={showTimepicker} title="Show time picker!" />
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  HomeContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  ButtonStyle: {
    backgroundColor: "red",
    alignItems: "center",
  },
});

export default Home;
