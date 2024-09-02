import React, {useState} from "react";
import { TouchableNativeFeedback, TextInput, Text, View, Image, StyleSheet, Dimensions } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const InputLabel = ( props : any ) => {
    return (
        <View>
            <Text>
                {label}
            </Text>
            <TextInput>
                {}
            </TextInput>
        </View>

    );
}

const styles = StyleSheet.create({
    button:{
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        flexDirection: 'row', 
        height: 50,
        borderWidth: 0.5,
        borderColor: 'grey',
    },
    buttonText:{
        fontFamily: 'Itim-Regular',
        justifyContent: 'center',
        color: 'black',
        alignSelf: 'center',
        fontSize: 20,
    },
    
});

