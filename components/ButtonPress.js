import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const ButtonPress = (props) => {
    return (
        <TouchableOpacity onPress={props.handlePress}
        style ={styles.button}>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button:{
        width: 100 ,height: 40,
        elevation: 8,
        backgroundColor: "black",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: "center",
    },
    text:{
        fontSize:17,
        color:"white",
        fontWeight:"bold",
        textTransform: "uppercase",
        }   
});
export default ButtonPress;