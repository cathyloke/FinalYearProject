import React, { useState } from "react";
import { TouchableOpacity, TextInput, Text, View, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';
//import { CheckBox } from 'react-native-elements';
import CheckBox from "expo-checkbox";
import { ScrollView } from "react-native-gesture-handler";
import axios from 'axios'

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

type Props = {
    navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {

    const [isChecked, setIsChecked] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repassword, setRepassword] = useState('');
    const [message, setMessage] = useState('');

    const handleCheckBoxChange = () => {
        setIsChecked(!isChecked);
        navigation.navigate('TNC');
    };

    const isValidEmail = (email: any) => {
        // Regular expression for basic email validation
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    const registerAccount = async () => {
        try {
            if (password !== repassword) {
                throw new Error('Password not the same')
            }

            if (!isValidEmail(email)) {
                throw new Error('Email is not valid')
            }

            const userData = {
                name: name,
                email: email,
                password: password
            };


            axios.post('http://192.168.1.17:3000/register', userData)
                .then(res => {
                    console.log('Successfully register : ' + res)
                    console.log(JSON.stringify(res))
                    navigation.navigate('Menu')
                })
                .catch(error => {
                    console.error('Error:', error.message);
                });




        } catch (error) {
            console.error('Error registering user:', error);
            setMessage('Error registering user.');
        }

    }


    return (
        <ScrollView style={styles.container}>
            <View style={{
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Text style={styles.header}>Hi, Ferianto!!</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Name</Text>
                    <TextInput
                        keyboardType='email-address'
                        placeholder='Enter your name'
                        placeholderTextColor="#C37BC3"
                        style={styles.inputBox}
                        value={name}
                        onChangeText={text => setName(text)}
                    >
                    </TextInput>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                        keyboardType="email-address"
                        placeholder="Enter your email"
                        placeholderTextColor="#C37BC3"
                        style={styles.inputBox}
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput
                        keyboardType="visible-password"
                        placeholder="Enter your password"
                        placeholderTextColor="#C37BC3"
                        style={styles.inputBox}
                        value={password}
                        onChangeText={text => setPassword(text)}
                        secureTextEntry
                    />
                    <Text style={styles.inputLabel}>Re-Password</Text>
                    <TextInput
                        keyboardType="visible-password"
                        placeholder="Re-Enter your password"
                        placeholderTextColor="#C37BC3"
                        style={styles.inputBox}
                        value={repassword}
                        onChangeText={text => setRepassword(text)}
                        secureTextEntry
                    />

                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => registerAccount()}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                {/* {message && <Text>{message}</Text>} */}

                <Text style={{ fontFamily: 'Itim-Regular' }}>Already have an account?</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={[{ textDecorationLine: 'underline' }, { fontFamily: 'Itim-Regular' }]}>Log in now!</Text>
                </TouchableOpacity>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={isChecked}
                        onValueChange={handleCheckBoxChange}
                        color={isChecked ? '#C8A1E0' : 'grey'}
                    >
                    </CheckBox>
                    <Text style={styles.checkboxText}>I had read the <Text style={{ textDecorationLine: 'underline' }} onPress={handleCheckBoxChange}>terms and conditions</Text></Text>
                </View>
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7EFE5',

    },
    header: {
        fontSize: 40,
        fontFamily: 'Itim-Regular',
        color: 'black',
    },
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 25,
        fontFamily: 'Itim-Regular',
        color: 'black',
    },
    inputBox: {
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
    button: {
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
    buttonText: {
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