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
            "DELETE FROM Detail WHERE Id = ?",
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
          
          <View style={styles.viewItem}>
            <Text style={styles.header}>Id: </Text>
            <Text style={styles.textItem}>{item.Id}</Text>
          </View>

          <View style={styles.viewItem}>
            <Text style={styles.header}>Property type: </Text>
            <Text style={styles.textItem}>{item.type_detail}</Text>
          </View>

          <View style={styles.viewItem}>
            <Text style={styles.header}>Bedrooms: </Text>
            <Text style={styles.textItem}>{item.bedroom_detail}</Text>
          </View>

          <View style={styles.viewItem}>
            <Text style={styles.header}>Date: </Text>
            <Text style={styles.textItem}>{item.date_detail}</Text>
          </View>

          <View style={styles.viewItem}>
            <Text style={styles.header}>Monthly price: </Text>
            <Text style={styles.textItem}>{item.price_detail}</Text>
          </View>

          <View style={styles.viewItem}>
            <Text style={styles.header}>Furniture: </Text>
            <Text style={styles.textItem}>{item.furniture_detail}</Text>
          </View>

          <View style={styles.viewItem}>
            <Text style={styles.header}>Notes: </Text>
            <Text style={styles.textItem}>{item.note_detail}</Text>
          </View>

          <View style={styles.viewItem}>
            <Text style={styles.header}>Name of the reporter: </Text>
            <Text style={styles.textItem}>{item.name_detail}</Text>
          </View>

          <View style={styles.CustomButton}>
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
  viewItem:{
    flexDirection: "row",
  },
  header: {
    color: '#111',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textItem: {
    color: "black",
    fontSize: 20,
  },
  CustomButton:{
    marginTop: 40,
    paddingRight: 35,
    flex:1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'space-around'
  }
});

export default showDetail;