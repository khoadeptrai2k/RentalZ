import * as SQLite from "expo-sqlite";
import React, { useState } from 'react';
import { Alert, StyleSheet, TextInput, View } from "react-native";
import ButtonPress from "../components/ButtonPress";

const db = SQLite.openDatabase("dbName", 1.0);

const DeleteDetail = ({ navigation }) => {
  const [inputDetailId, setInputDetailId] = useState('');

  const deleteDetail = () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "DELETE FROM table_detail WHERE Id = ?",
          [inputDetailId],
          (tx, results) => {
            console.log('Results', results.rowsAffected);
            if (results.rowsAffected > 0) {
              Alert.alert(
                'Detail deleted successfully',
                [
                  {
                    text: 'Ok',
                    onPress: () => navigation.navigate('Detail'),
                  },
                ],
                { cancelable: false }
              );
            } else {
              alert('Please insert a valid User Id');
            }
          }
        );
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.body}>
        <TextInput
            placeholder="Enter User Id"
            onChangeText={
              (inputDetailId) => setInputDetailId(inputDetailId)
        }/>
        <ButtonPress title="Delete This User" handlePress={deleteDetail} />
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

export default DeleteDetail;