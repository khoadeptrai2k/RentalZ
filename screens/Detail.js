import * as SQLite from "expo-sqlite";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View, FlatList } from "react-native";
import ButtonPress from "../components/ButtonPress";

const db = SQLite.openDatabase("dbName", 1.0);

const Detail = ({ navigation }) => {
    const [listDetail, setListDetail] = useState([])

  // Call only one time when the component is loaded
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_detail',
        [],
        (tx, results) => {
          var detailItemp = [];
          for (let i = 0; i < results.rows.length; ++i)
          detailItemp.push(results.rows.item(i));
          setListDetail(detailItemp);
        }
      );
    });
  }, []);
  let listViewItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.2,
          width: '100%',
          backgroundColor: '#808080'
        }}
      />
    );
  };
  
  const listItemView = (item) => {
    return (
      <View
        key={item.Id}
        style={{ backgroundColor: 'white', padding: 20 }}>
        <Text>Id: {item.Id}</Text>
        <Text>Type: {item.type_detail}</Text>
        <Text>BedRooms: {item.bedroom_detail}</Text>
        <Text>Furniture: {item.furniture_detail}</Text>
        <Text>DateTime: {item.date_detail}</Text>
        <Text>Price: {item.price_detail}</Text>
        <Text>Note: {item.note_detail}</Text>
        <Text>Name: {item.name_detail}</Text>
      </View>
    );
  };

  return (
    <View style={styles.body}>
      <FlatList
            data={listDetail}
            ItemSeparatorComponent={listViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => listItemView(item)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    margin: 10,
    justifyContent: "center",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    height: 50,
    width: 300,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 20,
    marginBottom: 15,
    marginTop: 15,
  },
  updateInput: {
    alignItems: "center",
  },
});

export default Detail;