import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import ButtonPress from '../components/ButtonPress';
import {DatabaseConnected} from '../database/database'

const db =  DatabaseConnected.getConnection()

const showDetail = ({ route, navigation }) => {
  const {item} = route.params

    const deleteDetail = () => {
        try {
          db.transaction((tx) => {
            tx.executeSql(
              "DELETE FROM detail WHERE Id = ?",
              [item.Id],
              (tx, result) => {
                Alert.alert("Deleted !!!");
              }
            );
          });
        } catch (error) {
          console.log(error);
        }
        navigation.navigate("Home");
      };

  return (
    <View style={styles.body}>
      <View style={styles.listItem}>
        <Text>{item.Id}</Text>
        <Text>{item.type_detail}</Text>
        <Text>{item.bedroom_detail}</Text>
        <Text>{item.furniture_detail}</Text>
        <Text>{item.date_detail}</Text>
        <Text>{item.price_detail}</Text>
        <Text>{item.note_detail}</Text>
        <Text>{item.name_detail}</Text>
      <ButtonPress title="Delete" handlePress={deleteDetail} />
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
});

export default showDetail;