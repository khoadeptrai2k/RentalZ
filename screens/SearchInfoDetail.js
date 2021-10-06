import React, { useState } from 'react';
import { Text, View, SafeAreaView, TextInput } from 'react-native';
import ButtonPress from '../components/ButtonPress';
import {DatabaseConnected} from '../database/database'

const db =  DatabaseConnected.getConnection()

const viewDetail = () => {
  const [inputResultType, setInputResultType] = useState('');
  const [detailData, setDetailData] = useState({});

  const searchType = () => {
    console.log(inputResultType);
    setDetailData({});
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Detail where type_detail = ?',
        [inputResultType],
        (tx, results) => {
          var leng = results.rows.length;
          console.log('leng', leng);
          if (leng > 0) {
            setDetailData(results.rows.item(0));
          } else {
            alert('No user found');
          }
        }
      );
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <TextInput
            placeholder="Enter Type Detail"
            onChangeText={
              (inputResultType) => setInputResultType(inputResultType)
            }
            style={{ padding: 10 }}
          />
          <ButtonPress title="Search User" handlePress={searchType} />
          <View
            style={{
              marginLeft: 35,
              marginRight: 35,
              marginTop: 10
            }}>
                <Text>{detailData.Id}</Text>
                <Text>{detailData.type_detail}</Text>
                <Text>{detailData.bedroom_detail}</Text>
                <Text>{detailData.furniture_detail}</Text>
                <Text>{detailData.date_detail}</Text>
                <Text>{detailData.price_detail}</Text>
                <Text>{detailData.note_detail}</Text>
                <Text>{detailData.name_detail}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default viewDetail;