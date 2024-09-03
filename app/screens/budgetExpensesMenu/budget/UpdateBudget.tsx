import React, {useState} from "react";
import { Alert, TextInput, Text, View, Platform, StyleSheet, TouchableOpacity, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../../assets/Types';
import { ScrollView } from "react-native-gesture-handler";

type UpdateBudgetNavigationProp = StackNavigationProp<RootStackParamList, 'UpdateBudget'>;

type Props = {
  navigation: UpdateBudgetNavigationProp;
};

const UpdateBudget: React.FC<Props> = ({ navigation }) => {
    const handleUpdateBudget = () => {
        Alert.alert('Budget Updated')
        navigation.navigate('BudgetExpenses')
    }

    return (
        <ScrollView style={styles.container}>
        <View style={styles.inputContainer}>
            <View style={styles.headerBox}>
            <Text style={styles.header}>Budget Name</Text>
            </View>
            <TextInput style={styles.input} placeholderTextColor={'#C37BC3'} placeholder='Flights' >
            </TextInput>
        </View>
        <View style={styles.inputContainer}>
            <View style={styles.headerBox}>
            <Text style={styles.header}>Budget Amount</Text>
            </View>
            <TextInput style={styles.input} placeholderTextColor={'#C37BC3'} placeholder='RM50.00' >
            </TextInput>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleUpdateBudget}>
            <Text style={styles.buttonText}>Update Budget</Text>
        </TouchableOpacity>
            
        </ScrollView>
    );
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#F7EFE5', 
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginVertical: 20
  },
  header:{ 
    fontFamily: 'Itim-Regular', 
    fontSize: 20, 
    borderColor: 'black',
  },
  headerBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    fontFamily: 'Itim-Regular', 
    fontSize: 20, 
    borderColor: 'black',
    borderWidth: 1, 
    borderRadius: 10,
    width: 180,
    height: 40,
    backgroundColor: '#F1E4E4',
    textAlign:'center',
  },
  button: {
    borderWidth: 1,
    borderRadius: 10,
    width: 180,
    height: 50,
    backgroundColor: '#C37BC3',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontFamily: 'Itim-Regular',
    fontSize: 20,
    color: 'white'
  }
});

export default UpdateBudget;