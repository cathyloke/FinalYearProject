import React, {useState} from "react";
import { TouchableOpacity, TextInput, Text, View, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';
// import { CheckBox } from 'react-native-elements';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckBoxChange = () => {
      setIsChecked(!isChecked);
      navigation.navigate('TNC');
    };

    return (
        <View style={styles.container}>
        <Text style={styles.header}>Hi, Ferianto!!</Text>
        <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput keyboardType='email-address' placeholder='Enter your email' placeholderTextColor="#C37BC3" style={styles.inputBox}></TextInput>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput keyboardType='visible-password' placeholder='Enter your password' placeholderTextColor="#C37BC3" style={styles.inputBox}></TextInput>
            <Text style={styles.inputLabel}>Re-Password</Text>
            <TextInput keyboardType='visible-password' placeholder='Re-Enter your password' placeholderTextColor="#C37BC3" style={styles.inputBox}></TextInput>
        </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Menu')}
            >
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <Text>Already have an account?</Text>
            <TouchableOpacity 
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={{textDecorationLine: 'underline'}}>Log in now!</Text>
            </TouchableOpacity>

            <CheckBox
                title="I had read the terms and conditions"
                checked={isChecked}
                onPress={handleCheckBoxChange}
                containerStyle={styles.checkboxContainer}
                textStyle={styles.checkboxText}
                checkedColor="#C8A1E0"
                uncheckedColor="grey"
                checkedIcon="check-circle"
                uncheckedIcon="circle" 
            />
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
        marginTop: 10,
        marginBottom: 20,
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
        backgroundColor: '#F7EFE5',
        width: 270, 
        height: 65,
        marginBottom: 20,
        borderRadius: 40,
        borderWidth: 2,                 
        elevation: 15,                          //android
        shadowColor: '#000',                    //ios
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3.84,
    },
    buttonText:{
        fontFamily: 'Itim-Regular',
        justifyContent: 'center',
        color: 'black',
        alignSelf: 'center',
        fontSize: 40,
    },
    checkboxContainer: {
        backgroundColor: 'transparent',
        borderColor: 'transparent',
    },
    checkboxText: {
        fontSize: 15, 
        color: 'black', 
    },
});

export default RegisterScreen;