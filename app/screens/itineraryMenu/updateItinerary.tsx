import React, {useState} from "react";
import { Button, TextInput, Text, View, Platform,Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

type UpdateItineraryNavigationProp = StackNavigationProp<RootStackParamList, 'UpdateItinerary'>;

type Props = {
  navigation: UpdateItineraryNavigationProp;
};

const UpdateItinerary: React.FC<Props> = ({ navigation }) => { 
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStart, setShowStart] = useState(false);
  const [showEnd, setShowEnd] = useState(false);

  const onChangeStartDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || startDate;
    setShowStart(Platform.OS === 'ios');
    setStartDate(currentDate);
  };

  const onChangeEndDate = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || endDate;
    setShowEnd(Platform.OS === 'ios');
    setEndDate(currentDate);
  };

  const showStartDatepicker = () => {
    setShowStart(true);
  };

  const showEndDatepicker = () => {
    setShowEnd(true);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Trip Name</Text>
        <TextInput keyboardType='email-address' placeholder='Penang Trip' placeholderTextColor="#C37BC3" style={styles.inputBox} />
        
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <View style={{alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.inputLabel}>Start Date</Text>
              <TouchableOpacity onPress={showStartDatepicker}>
                <Ionicons name="calendar" size={25} color="black" style={{marginLeft: 10}} />
              </TouchableOpacity>
            </View>
            {showStart && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display="default"
                  onChange={onChangeStartDate}
                />
              )}
            <Text style={styles.dateInput}>{startDate.toDateString()}</Text>

          </View>
          <View style={{alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.inputLabel}>End Date</Text>
              <TouchableOpacity onPress={showEndDatepicker}>
                <Ionicons name="calendar" size={25} color="black" style={{marginLeft: 10}} />
              </TouchableOpacity>
            </View>
            {showEnd && (
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  display="default"
                  onChange={onChangeEndDate}
                />
              )}
            <Text style={styles.dateInput}>{endDate.toDateString()}</Text>
          </View>
        </View>

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
    color: '#C37BC3',
    fontSize: 18,
    backgroundColor: '#F1E4E4',
    textAlign: 'center',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 2, 
    width: 270,
    height: 50,
  },
  dateInput:{
    fontFamily: 'Itim-Regular',
    color: '#C37BC3',
    fontSize: 18,
    margin:10,
    textAlign: 'center',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 2, 
    width: 170,
    height: 50,
    lineHeight: 50,
    backgroundColor: '#F1E4E4',
  },
  descriptionBox:{
    textAlignVertical: 'top',
    fontFamily: 'Itim-Regular',
    color: '#C37BC3',
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