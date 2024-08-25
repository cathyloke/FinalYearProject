import React, {useState} from "react";
import { TouchableNativeFeedback, TextInput, Text, View, Image, StyleSheet, Dimensions } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const CustomButton = ( props : any ) => {
    return (
        <TouchableNativeFeedback
            onPress={props.onPress}
        >
            <View style={styles.button}>
                <Text style={styles.buttonText}>{props.title}</Text>
                <MaterialCommunityIcons name='arrow-right' size={30} color='grey'/>
            </View>
        </TouchableNativeFeedback>

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

export default CustomButton;