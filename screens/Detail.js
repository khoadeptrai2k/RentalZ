import React, { useEffect, useState } from "react";
import {TouchableOpacity, Alert, StyleSheet, Text, TextInput, View, FlatList } from "react-native";
import ButtonPress from "../components/ButtonPress";
import {DatabaseConnected} from '../database/database'

const db =  DatabaseConnected.getConnection()

const Detail = ({ navigation }) => {
    const [listDetail, setListDetail] = useState([])

  // Call only one time when the component is loaded
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM Detail',
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
      <TouchableOpacity onPress={() => navigation.navigate("InfoDetail", { item })}>
      <View
        key={item.Id}
        style={{ backgroundColor: 'white', padding: 20, flexDirection: "column",  
        flexWrap: "wrap", }}>
        <Text>Id: {item.Id}</Text>
        <Text>Type: {item.type_detail}</Text>
        <Text>BedRooms: {item.bedroom_detail}</Text>
        <Text>Furniture: {item.furniture_detail}</Text>
      </View>
      </TouchableOpacity>
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

    borderRadius: 4,
    
  },
  
  text: {
    fontSize: 40,
    fontWeight: "bold",
    margin: 10,
    justifyContent: "flex-start",
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