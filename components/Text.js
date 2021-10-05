import React from 'react'
import {View, Text, StyleSheet } from 'react-native'

const TextCustom = (props) => {
    return (
        <Text style={styles.text}>
            {props.text}
        </Text>
    )
}

const styles = StyleSheet.create({
    text: {
        color: "black",
        fontWeight: "bold",
        fontSize: 20,
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 5,
    }
})

export default TextCustom