import React, {useState} from "react";
import { Button, TextInput, Text, View, Platform,Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';
import { RouteProp } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';

type CreateItineraryNavigationProp = StackNavigationProp<RootStackParamList, 'CreateItinerary'>;

type Props = {
  navigation: CreateItineraryNavigationProp;
  route: RouteProp<RootStackParamList, 'CreateItinerary'>;
};

const CreateItinerary: React.FC<Props> = ({ navigation, route }) => {
  const { type } = route.params;
  
  if (type === 'Manual') {
    return <ManualItinerary />;
  } else if (type === 'AI') {
    return <AIItinerary />;
  } else {
    return (
      <View>
        <Text>Invalid route parameter</Text>
      </View>
    );
  }
};


const ManualItinerary = () => {

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

  return(
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Build your trip by filling details below</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Trip Name</Text>
        <TextInput keyboardType='email-address' placeholder='Example: Trip to Malaysia' placeholderTextColor="#C37BC3" style={styles.inputBox} />
        
        
        <View style={{flexDirection: 'row', marginTop: 20}}>
          <View style={{alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.inputLabel}>Start Date</Text>
              <TouchableOpacity onPress={showStartDatepicker}>
                <Ionicons name="calendar" size={25} color="black" style={{marginLeft: 10}} />
              </TouchableOpacity>
              {showStart && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display="default"
                  onChange={onChangeStartDate}
                />
              )}
            </View>
            <Text style={styles.dateInput}>{startDate.toDateString()}</Text>

          </View>
          <View style={{alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>
                
                <Text style={styles.inputLabel}>End Date</Text>
                <TouchableOpacity onPress={showEndDatepicker}>
                  <Ionicons name="calendar" size={25} color="black" style={{marginLeft: 10}} />
                </TouchableOpacity>
   
              {showEnd && (
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  display="default"
                  onChange={onChangeEndDate}
                />
              )}
            </View>
            <Text style={styles.dateInput}>{endDate.toDateString()}</Text>
          </View>
        </View>

        <Text style={[styles.inputLabel, {marginTop: 20}]}>Location</Text>
        <TextInput keyboardType='email-address' placeholder='Destination City' placeholderTextColor="#C37BC3" style={styles.inputBox} />
        

        <Text style={[styles.inputLabel, {marginTop: 20}]}>Description</Text>
        <TextInput keyboardType='email-address' placeholder='Description' placeholderTextColor="#C37BC3" style={styles.descriptionBox} multiline />
        
        <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert('Generate Trip')}    //navigate to create itinerary details
          >
            <Text style={styles.buttonText}>Generate Trip</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
    
  )
}

const AIItinerary = () => {

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

  return(
    <ScrollView style={styles.container}>
    <View style={styles.headerContainer}>
      <Text style={styles.header}>Build your trip through AI</Text>
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>Trip Name</Text>
      <TextInput keyboardType='email-address' placeholder='Example: Trip to Malaysia' placeholderTextColor="#C37BC3" style={styles.inputBox} />
      
      <View style={{flexDirection: 'row', marginTop: 20}}>
        <View style={{alignItems: 'center'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.inputLabel}>Start Date</Text>
            <TouchableOpacity onPress={showStartDatepicker}>
              <Ionicons name="calendar" size={25} color="black" style={{marginLeft: 10}} />
            </TouchableOpacity>
            {showStart && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={onChangeStartDate}
              />
            )}
          </View>
          <Text style={styles.dateInput}>{startDate.toDateString()}</Text>

          </View>
          <View style={{alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>
                
                <Text style={styles.inputLabel}>End Date</Text>
                <TouchableOpacity onPress={showEndDatepicker}>
                  <Ionicons name="calendar" size={25} color="black" style={{marginLeft: 10}} />
                </TouchableOpacity>
   
              {showEnd && (
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  display="default"
                  onChange={onChangeEndDate}
                />
              )}
            </View>
            <Text style={styles.dateInput}>{endDate.toDateString()}</Text>
          </View>
        </View>

      <Text style={[styles.inputLabel, {marginTop: 20}]}>Location</Text>
      <TextInput keyboardType='email-address' placeholder='Destination City' placeholderTextColor="#C37BC3" style={styles.inputBox} />
      

      
      
      <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('Generate Trip')}    //navigate to create itinerary details
        >
          <Text style={styles.buttonText}>Generate Trip</Text>
      </TouchableOpacity>

      </View>
    </ScrollView>
  )
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

export default CreateItinerary;