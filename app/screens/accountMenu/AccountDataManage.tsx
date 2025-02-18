import React, { useState, useEffect } from "react";
import { TouchableOpacity, TextInput, Text, View, StyleSheet, Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';
import { ScrollView } from "react-native-gesture-handler";
import { getSession, saveSession } from "../../assets/asyncStorageData";
import axios from 'axios'

type AccountDataManageScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AccountDataManage'>;

type Props = {
    navigation: AccountDataManageScreenNavigationProp;
};

const AccountDataManageScreen: React.FC<Props> = ({ navigation }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const retrieveSessionData = async () => {
        console.log('Retrieve session data and read user')
        const session = await getSession();
        if (!session || !session.userId) {
            console.error('No user found in session');
            return;
        }

        const { userId: userId } = session;
        axios.get(`http://10.0.2.2:3000/read/${userId}`)
            .then(res => {
                // console.log('User:', res.data);
                setName(res.data.data.name)
                setEmail(res.data.data.email)
                setPassword(res.data.data.gender)
            })
            .catch(error => {
                console.error('Error:', error.response?.data || error.message);
            });

    };

    useEffect(() => {
        retrieveSessionData();
    }, []);

    const isValidEmail = (email: any) => {
        // Regular expression for basic email validation
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    const saveData = async () => {
        const session = await getSession();
        if (!session || !session.userId) {
            console.error('No user found in session');
            return;
        }

        const { userId: userId } = session;

        if (!isValidEmail(email)) {
            throw new Error('Email is not valid')
        }

        const userData = {
            name: name,
            email: email,
            password: password
        }

        axios.put(`http://10.0.2.2:3000/update/${userId}`, userData)
            .then(res => {
                console.log('Successfully update user : ' + res)
                console.log(JSON.stringify(res))

                navigation.navigate('Account')
            })
            .catch(error => {
                console.error('Error:', error.message);
            });

        console.log(name)
        // navigation.navigate('Account')
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <View>
                    <Text style={styles.inputLabel}>Name</Text>
                    <TextInput keyboardType='email-address' onChangeText={text => setName(text)} placeholder='Enter your name' placeholderTextColor="#C37BC3" style={styles.inputBox}>{name}</TextInput>
                </View>
                <View>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput keyboardType='email-address' onChangeText={text => setEmail(text)} placeholder='Enter your email' placeholderTextColor="#C37BC3" style={styles.inputBox}>{email}</TextInput>
                </View>
                <View>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput keyboardType='visible-password' onChangeText={text => setPassword(text)} placeholder='Enter your password' placeholderTextColor="#C37BC3" style={styles.inputBox}>{password}</TextInput>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => { saveData() }}
                >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7EFE5',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
        gap: 10
    },
    inputLabel: {
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'Roboto',
        color: 'black',
    },
    inputBox: {
        fontFamily: 'Roboto',
        color: '#C37BC3',
        fontSize: 15,
        margin: 20,
        textAlign: 'center',
        borderColor: 'black',
        borderRadius: 10,
        borderWidth: 1,
        width: 270,
        height: 40,
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C37BC3',
        width: 200,
        height: 50,
        marginTop: 20,
        borderRadius: 10,
        borderWidth: 1,
    },
    buttonText: {
        fontFamily: 'Roboto',
        justifyContent: 'center',
        color: 'white',
        alignSelf: 'center',
        fontSize: 18,
    },

});

export default AccountDataManageScreen;