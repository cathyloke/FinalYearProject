import React from "react";
import { TouchableOpacity, TextInput, Text, View, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';
import { ScrollView } from "react-native-gesture-handler";

type HelpCentreScreenNavigationProp = StackNavigationProp<RootStackParamList, 'HelpCentre'>;

type Props = {
  navigation: HelpCentreScreenNavigationProp;
};

const HelpCentreScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>  
      <View style={styles.content}>
        <Text style={styles.header}>Help Centre</Text>
        <Text style={[styles.header, {fontSize: 20}]}>What can we help you?</Text>
        <TextInput 
          multiline= {true}
          keyboardType='email-address' 
          placeholder='Write down your problem' 
          placeholderTextColor="grey" 
          selectionColor={'#C37BC3'}
          style={styles.input}
        ></TextInput>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Account')}
        >
          <Text style={styles.buttonText}>Submit</Text>
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
  content:{
    alignItems: 'center',
    justifyContent: 'center',
  },
  header:{
    marginTop: 10,
    fontSize: 30,
    fontFamily: 'Itim-Regular',
    color: 'black',
  },
  input:{
    fontFamily: 'Itim-Regular',
    fontSize: 18,
    marginTop: 10,
    padding: 10,
    borderWidth: 1.5,
    borderRadius: 8,
    width: '90%',
    height: 300,
    textAlignVertical: 'top',
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

export default HelpCentreScreen;