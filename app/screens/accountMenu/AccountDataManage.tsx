import React from "react";
import { TouchableOpacity, TextInput, Text, View, StyleSheet, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';
import { ScrollView } from "react-native-gesture-handler";

type AccountDataManageScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AccountDataManage'>;

type Props = {
  navigation: AccountDataManageScreenNavigationProp;
};

const AccountDataManageScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>  
      <View style={styles.content}>
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput keyboardType='email-address' placeholder='Enter your name' placeholderTextColor="#C37BC3" style={styles.inputBox}></TextInput>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput keyboardType='email-address' placeholder='Enter your email' placeholderTextColor="#C37BC3" style={styles.inputBox}></TextInput>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput keyboardType='visible-password' placeholder='Enter your password' placeholderTextColor="#C37BC3" style={styles.inputBox}></TextInput>
        <TouchableOpacity
          style={styles.button}
          onPress={() => Alert.alert('Data saved')}
        >
          <Text style={styles.buttonText}>Save</Text>
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
    marginTop: 50
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
  inputLabel:{
    fontSize: 25,
    fontFamily: 'Itim-Regular',
    color: 'black',
  },
  inputBox:{
      fontFamily: 'Itim-Regular',
      color: '#C37BC3',
      fontSize: 20,
      margin: 20,
      textAlign: 'center',
      borderColor: 'black',
      borderRadius: 40,
      borderWidth: 2, 
      width: 270,
      height: 65,
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

export default AccountDataManageScreen;