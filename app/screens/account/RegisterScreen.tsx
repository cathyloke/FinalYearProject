import React, {useState} from "react";
import { TouchableOpacity, TextInput, Text, View, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';
//import { CheckBox } from 'react-native-elements';
import CheckBox from "expo-checkbox";
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
            <Text style={{fontFamily: 'Itim-Regular'}}>Already have an account?</Text>
            <TouchableOpacity 
                onPress={() => navigation.navigate('Login')}
            >
                <Text style={[{textDecorationLine: 'underline'}, {fontFamily: 'Itim-Regular'}]}>Log in now!</Text>
            </TouchableOpacity>

            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={isChecked}
                    onValueChange={handleCheckBoxChange}
                    color={isChecked ? '#C8A1E0': 'grey'}
                >   
                </CheckBox>
                <Text style={styles.checkboxText}>I had read the <Text style={{textDecorationLine: 'underline'}} onPress={handleCheckBoxChange}>terms and conditions</Text></Text>
            </View>
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
    checkboxContainer: {
        flexDirection: 'row',
    },
    checkboxText: {
        paddingLeft: 5,
        fontSize: 15, 
        fontFamily: 'Itim-Regular',
        color: 'black', 
    },
});

export default RegisterScreen;