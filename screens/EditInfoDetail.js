import React, { useState, useEffect } from 'react';
import {View,Text} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import TextInput from "../components/TextInput"
import { DatabaseConnected } from '../database/database';
import ButtonPress from '../components/ButtonPress';
import DatePicker from 'react-native-datepicker';

const db = DatabaseConnected.getConnection()
  
const editInfoDetail = ({route, navigation }) => {
  const [detailId, setDetailId] = useState('');
  const [type, setType] = useState('');
  const [Bedrooms, setBedroom] = useState('');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('');
  const [Furniture, setFurniture]= useState('');
  const [note, setNote] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    setDetailId(route.params.Id);
    setType(route.params.type_detail);
    setBedroom(route.params.bedroom_detail);
    setDate(route.params.date_detail);
    setPrice(route.params.price_detail);
    setFurniture(route.params.furniture_detail);
    setNote(route.params.note_detail);
    setName(route.params.name_detail);
  }, []);

  // type_detail, bedroom_detail, furniture_detail,
  // date_detail, price_detail, note_detail, name_detail
    const editInfo = () => {
        if(!type) {
            alert("Please enter property type !")
            return
        }
        if(!Bedrooms) {
            alert("Please enter bedrooms !")
            return
        }
        if(!date) {
            alert("Please enter date and time !")
            return
        }
        if(!price) {
            alert("Please enter monthly rent price !")
            return
        }
        if(!name) {
            alert("Please enter your name or reporter !")
            return
        } else {
                db.transaction((tx) => {
                tx.executeSql('UPDATE Detail SET type_detail = ? , bedroom_detail = ? , date_detail = ? , price_detail = ? , furniture_detail = ? , note_detail = ? , name_detail = ? where Id = ?',
                [type, Bedrooms, date, price, Furniture, note, name, detailId], 
                (tx, results) => {
                    console.log('Results', results.rowsAffected);
          });
        });
        navigation.navigate("Home")
        navigation.navigate("Detail")
    };
    };
    return(
    <View style={{flex :1, backgroundColor: 'white'}}>
     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      
      <Text text="Property Type"/>
      <TextInput value={type} style={{height:40}}
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
          selectedValue={date}
      />

      <Text text="Price Monthly"/>
      <TextInput style={{height:40}}
      onChangeText={(price) => setPrice(price)} value={price.toString()} />
      
      <Text text="Furniture"/>
      <Picker   selectedValue={Furniture}
                itemStyle={{height:40}}
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
      <TextInput value={note} style={{height:40}} numberOfLines={5} 
      multiline={true}  
      onChangeText={(note) => setNote(note)} />
      
      <Text text="Name of the Reported"/>      
      <TextInput value={name} style={{height:40}} 
      onChangeText={(name) => setName(name)} /> 
        
        <ButtonPress title="Edit" handlePress={editInfo}/>

    </View>
    </View>
    );
};
export default editInfoDetail;
