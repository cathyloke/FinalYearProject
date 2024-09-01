import React, {useState} from "react";
import { TouchableOpacity, TextInput, Text, View, Image, StyleSheet, Dimensions } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hi, Ferianto!!</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput keyboardType='email-address' placeholder='Enter your email' placeholderTextColor="#C37BC3" style={styles.inputBox}></TextInput>
        <Text style={styles.inputLabel}>Password</Text>
        <TextInput keyboardType='visible-password' placeholder='Enter your password' placeholderTextColor="#C37BC3" style={styles.inputBox}></TextInput>
      </View>
      <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Menu')}
        >
            <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>
        <Text style={{fontFamily: 'Itim-Regular'}}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}><Text style={{textDecorationLine: 'underline', fontFamily: 'Itim-Regular'}}>Register now!</Text></TouchableOpacity>

        
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F7EFE5',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    header:{
        fontSize: 40,
        fontFamily: 'Itim-Regular',
        color: 'black',
    },
    inputContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 50,
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
        width: 250, 
        height: 65,
        marginBottom: 20,
        borderRadius: 40,               
        elevation: 15,                          //android
        shadowColor: '#000',                    //ios
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3.84,
    },
    buttonText:{
        fontFamily: 'Itim-Regular',
        justifyContent: 'center',
        color: 'white',
        alignSelf: 'center',
        fontSize: 30,
    },
    
});

export default LoginScreen;