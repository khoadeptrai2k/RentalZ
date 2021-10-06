import React, { useEffect, useState } from "react";
import { Text, Alert, StyleSheet, View } from "react-native";
import ButtonPress from '../components/ButtonPress';
import {DatabaseConnected} from '../database/database'


const db =  DatabaseConnected.getConnection()

const showDetail = ({ route, navigation }) => {
  const {item} = route.params

  const editDetail = (idInfo, typeInfo, bedroomInfo, dateInfo, priceInfo, furnitureInfo, noteInfo, nameInfo) => {
    navigation.navigate('EditInfoDetail', {
      Id: idInfo, type_detail: typeInfo,
      bedroom_detail: bedroomInfo, date_detail: dateInfo,
      price_detail: priceInfo, furniture_detail: furnitureInfo,
      note_detail: noteInfo, name_detail: nameInfo,
    })
  };

  const deleteDetail = () => {
      try {
        db.transaction((tx) => {
          tx.executeSql(
            "DELETE FROM detail WHERE Id = ?",
            [item.Id],
            (tx, result) => {
              alert("Deleted !!!");
            }
          );
        });
      } catch (error) {
        console.log(error);
      }
      navigation.navigate("Home");
      navigation.navigate("Detail");
    };


  return (
    <View style={styles.container}>
        <View style={styles.listItem}>
          <Text style={styles.textHeader}>Id </Text>
          <Text style={styles.textBottom}>{item.Id}</Text>

          <Text style={styles.textHeader}>Property type</Text>
          <Text style={styles.textBottom}>{item.type_detail}</Text>

          <Text style={styles.textHeader}>Bedrooms</Text>
          <Text style={styles.textBottom}>{item.bedroom_detail}</Text>

          <Text style={styles.textHeader}>Date</Text>
          <Text style={styles.textBottom}>{item.date_detail}</Text>

          <Text style={styles.textHeader}>Monthly price</Text>
          <Text style={styles.textBottom}>{item.price_detail}</Text>

          <Text style={styles.textHeader}>Furniture</Text>
          <Text style={styles.textBottom}>{item.furniture_detail}</Text>

          <Text style={styles.textHeader}>Notes</Text>
          <Text style={styles.textBottom}>{item.note_detail}</Text>

          <Text style={styles.textHeader}>Name of the reporter</Text>
          <Text style={styles.textBottom}>{item.name_detail}</Text>

      <ButtonPress title="Edit" handlePress={() => editDetail(item.Id, item.type_detail, item.bedroom_detail, item.date_detail, item.price_detail, item.furniture_detail, item.note_detail, item.name_detail)}/>
      <ButtonPress title="Delete" handlePress={deleteDetail} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  listItem: {
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: 'white',
  },
  textHeader: {
    color: '#111',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default showDetail;