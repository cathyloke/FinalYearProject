import React from "react";
import { ScrollView, TextInput, Text, View, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';

type TNCNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

type Props = {
  navigation: TNCNavigationProp;
};
const terms = require('../../assets/T&C.json');

const TNC: React.FC<Props> = ({ navigation }) => {

    const termsData = terms.TermsAndConditions;
  
    return ( 
        <ScrollView style={styles.container}>
        {Object.entries(termsData).map(([section, { text }]) => (
            <View key={section} style={styles.section}>
                <Text style={styles.header}>{section}</Text>
                {Array.isArray(text) ? (
                    text.map((line, index) => (
                        <Text key={index} style={styles.text}>{line}</Text>
                    ))
                ) : (
                    <Text style={styles.text}>{text}</Text>
                )}
            </View>
        ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F7EFE5',
        padding: 20,
    },
    section: {
        marginBottom: 20,
    },
    header:{
        fontSize: 30,
        fontFamily: 'Itim-Regular',
        color: 'black',
    },
    text:{
        fontSize: 15,
        fontFamily: 'Itim-Regular',
        color: 'black',
        textAlign: 'justify',
    },
   
});

export default TNC;