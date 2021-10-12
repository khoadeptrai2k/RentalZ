import React from 'react'
import {View, Text, StyleSheet } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
        fontSize: hp('2%') // End result looks like the provided UI mockup

    }
})

export default TextCustom