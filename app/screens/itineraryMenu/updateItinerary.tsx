import React, {useState} from "react";
import { Button, TextInput, Text, View, Platform,Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { CustomStartEndDatePicker } from "../../components/CustomDatePicker";

type UpdateItineraryNavigationProp = StackNavigationProp<RootStackParamList, 'UpdateItinerary'>;

type Props = {
  navigation: UpdateItineraryNavigationProp;
};

const UpdateItinerary: React.FC<Props> = ({ navigation }) => { 

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Trip Name</Text>
        <TextInput keyboardType='email-address' placeholder='Penang Trip' placeholderTextColor="#C37BC3" style={styles.inputBox} />
        
        <CustomStartEndDatePicker />

        <Text style={[styles.inputLabel, {marginTop: 20}]}>Location</Text>
        <TextInput keyboardType='email-address' placeholder='Penang' placeholderTextColor="#C37BC3" style={styles.inputBox} />
        

        <Text style={[styles.inputLabel, {marginTop: 20}]}>Description</Text>
        <TextInput keyboardType='email-address' placeholder='Sembreak holiday' placeholderTextColor="#C37BC3" style={styles.descriptionBox} multiline />
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Alert.alert('Trip Updated Successfully');
            navigation.goBack();
          }}
        >
          <Text style={styles.buttonText}>Update Trip</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#F7EFE5',
  },
  headerContainer:{
    alignSelf:'center',
    marginTop: 20,
  },
  header:{
    fontFamily: 'Itim-Regular',
    fontSize: 18,
    color: '#454745'
  },
  inputContainer:{
    alignItems: 'center',
    marginTop:10,
    paddingBottom: 40,
  },
  inputLabel:{
    fontSize: 20,
    fontFamily: 'Itim-Regular',
    color: 'black',
  },
  inputBox:{
    fontFamily: 'Itim-Regular',
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 2, 
    width: 270,
    height: 50,
  },
  descriptionBox:{
    textAlignVertical: 'top',
    fontFamily: 'Itim-Regular',
    color: 'black',
    fontSize: 18,
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 2, 
    width: '90%',
    height: 200,
    marginTop: 10,
    padding: 10,
  },
  button:{
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#C37BC3',
    width: 200, 
    height: 50,
    marginTop: 20,
    borderRadius: 40,
    borderWidth: 1.5, 
  },
  buttonText:{
    fontFamily: 'Itim-Regular',
    justifyContent: 'center',
    color: 'white',
    alignSelf: 'center',
    fontSize: 20,
  },
});

export default UpdateItinerary;