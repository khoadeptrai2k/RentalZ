import React from 'react';
import { View, TextInput } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const TextInputCustom = (props) => {
    return (
      <View
        style={{
            borderColor: "gray",
            width: "90%",
            borderWidth: 1,
            borderRadius: 10,
            padding: 5,
        }}>
        <TextInput
          placeholder={props.placeholder}
          onChangeText={props.onChangeText}
          numberOfLines={props.numberOfLines}
          style={props.style}
          value={props.value}
          multiline={props.multiline}
        />
      </View>
    );
  };
  
  export default TextInputCustom;