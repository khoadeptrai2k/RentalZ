import React from "react";
import { StyleSheet, Text, View} from "react-native";

export default function Header() {
    return(
        <View style={styles.theme}>
            <Text style={styles.text}>RentalZ - TCD0301</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    theme:{
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
    },

    text:{
        fontSize: 30,
        textTransform: "uppercase",
        color: "black",
        fontWeight: "bold",
    },
});
