import React, { useCallback, useState } from "react";
import { Alert, TextInput, Text, View, Platform, StyleSheet, TouchableOpacity, Button } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../../assets/Types';
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { getSession } from "../../../assets/asyncStorageData";
import { useFocusEffect } from "@react-navigation/native";

type CreateBudgetNavigationProp = StackNavigationProp<RootStackParamList, 'CreateBudget'>;

type Props = {
    navigation: CreateBudgetNavigationProp;
};

const categories = [
    { label: 'Flights', value: 'Flights' },
    { label: 'Food and Beverage', value: 'Food and Beverage' },
    { label: 'Accommodation', value: 'Accommodation' },
    { label: 'Souvenir', value: 'Souvenir' },
    { label: 'Snacks', value: 'Snacks' },
    { label: 'Petrol', value: 'Petrol' },
    { label: 'Other', value: 'Other' },
];

const CreateBudget: React.FC<Props> = ({ navigation }) => {

    const [name, setName] = useState('')
    const [budgetAmount, setBudgetAmount] = useState<number>(0);

    const handleBudget = async () => {

        // Alert.alert('Budget created');

        if (!name || !budgetAmount) {
            throw new Error('Missing budget creation details')
        }

        const session = await getSession();
        if (!session || !session.userId) {
            Alert.alert('No user session data. Please log in')
            navigation.navigate('Cover')
            return;
        }

        const { userId: userId } = session;

        const budget = {
            name: name,
            budgetAmount: budgetAmount
        };

        axios.put(`http://10.0.2.2:3000/budget/${userId}`, budget)
            .then(res => {
                console.log('Successfully create/edit budget : ' + res)
                // saveSession(res.data.data._id)
                navigation.navigate('BudgetExpenses')
            })
            .catch(error => {
                Alert.alert(`Error: ${error.message}`)
            });

        navigation.navigate("BudgetExpenses");
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputContainer}>
                <View style={styles.headerBox}>
                    <Text style={styles.header}>Budget Name</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholderTextColor={'#C37BC3'}
                    placeholder='Enter budget name'
                    value={name}
                    onChangeText={text => setName(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.headerBox}>
                    <Text style={styles.header}>Budget Amount</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholderTextColor={'#C37BC3'}
                    placeholder='Enter amount'
                    keyboardType="numeric"
                    value={budgetAmount.toString()}
                    onChangeText={text => setBudgetAmount(parseFloat(text) || 0)}
                />
            </View>


            {/* 
                budgets: [{
                    name: { type: String },
                    budgetAmount: { type: Number },
                    expensesAmount: { type: Number },
                    expensesCategory: [{
                        expensesCategoryName: { type: String },
                        expensesCategoryAmount: { type: Number },
                        expensesCategoryDetail: [{
                            name: { type: String },
                            dateCreated: { type: Date },
                            amount: { type: Number },
                        }]
                    }]
                }]
            */}

            <TouchableOpacity style={styles.button} onPress={handleBudget}>
                <Text style={styles.buttonText}>Create Budget</Text>
            </TouchableOpacity>

        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7EFE5',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 20
    },
    header: {
        fontFamily: 'Itim-Regular',
        fontSize: 20,
        borderColor: 'black',
    },
    headerBox: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        fontFamily: 'Itim-Regular',
        fontSize: 20,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        width: 180,
        height: 40,
        textAlign: 'center',
    },
    button: {
        borderWidth: 1,
        borderRadius: 10,
        width: 180,
        height: 50,
        backgroundColor: '#C37BC3',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        fontFamily: 'Itim-Regular',
        fontSize: 20,
        color: 'white'
    },




});

export default CreateBudget;