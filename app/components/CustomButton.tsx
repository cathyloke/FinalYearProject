import React, {useState} from "react";
import { TouchableNativeFeedback, TextInput, Text, View, Image, StyleSheet, Dimensions } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export const AcountMenuButton = ( props : any ) => {
    return (
        <View style={{paddingHorizontal:10}}>
            <TouchableNativeFeedback
                onPress={props.onPress}
            >
                <View style={styles.button}>
                    <Text style={styles.buttonText}>{props.title}</Text>
                    <MaterialCommunityIcons name='arrow-right' size={30} color='grey'/>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    button:{
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        flexDirection: 'row', 
        height: 50,
        borderBottomWidth: 0.5,
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

