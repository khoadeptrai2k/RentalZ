import * as SQLite from "expo-sqlite";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import ButtonPress from '../components/ButtonPress';

const db = SQLite.openDatabase("dbName", 1.0);

const showDetail = ({ route, navigation }) => {
  const {item} = route.params

    const deleteDetail = () => {
        try {
          db.transaction((tx) => {
            tx.executeSql(
              "DELETE FROM table_detail WHERE Id = ?",
              [item.Id],
              (tx, result) => {
                alert("Deleted !!!");
              }
            );
          });
        } catch (error) {
          console.log(error);
        }
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
      <ButtonPress title="Delete This Detail" handlePress={deleteDetail} />
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