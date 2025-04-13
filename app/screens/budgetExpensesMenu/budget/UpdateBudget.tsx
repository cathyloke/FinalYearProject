import React, { useCallback, useState } from "react";
import {
    Alert,
    TextInput,
    Text,
    View,
    Platform,
    StyleSheet,
    TouchableOpacity,
    Button,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../assets/Types";
import { ScrollView } from "react-native-gesture-handler";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { getSession } from "../../../assets/asyncStorageData";

type UpdateBudgetNavigationProp = StackNavigationProp<
    RootStackParamList,
    "UpdateBudget"
>;

type Props = {
    navigation: UpdateBudgetNavigationProp;
    route: RouteProp<RootStackParamList, "UpdateBudget">;
};

const UpdateBudget: React.FC<Props> = ({ navigation, route }) => {
    const { budgetName } = route.params;

    const [name, setName] = useState("");
    const [budgetAmount, setBudgetAmount] = useState("");

    const loadData = async () => {
        const session = await getSession();
        if (!session || !session.userId) {
            Alert.alert("No user session data. Please log in");
            navigation.navigate("Cover");
            return;
        }

        const { userId: userId } = session;

        axios
            .get(`http://192.168.1.12:3000/read/${userId}`)
            .then((res) => {
                console.log(res.data.data);
                const data = res.data.data.budgets.find(
                    (res: any) => res.name === budgetName
                );
                setName(data.name);
                setBudgetAmount(data.budgetAmount);
            })
            .catch((error) => {
                Alert.alert(`${error.response?.data || error.message}`);
            });
    };

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    const handleUpdateBudget = async () => {
        const session = await getSession();
        if (!session || !session.userId) {
            Alert.alert("No user session data. Please log in");
            navigation.navigate("Cover");
            return;
        }

        const { userId: userId } = session;

        const amountRegex = /^\d+(\.\d{1,2})?$/;
        if (!amountRegex.test(budgetAmount)) {
            Alert.alert("Amount must be a number, e.g. 5.50");
            return;
        }

        const budgetData = {
            name: name,
            budgetAmount: Number(budgetAmount),
        };

        axios
            .put(`http://192.168.1.12:3000/budget/${userId}`, budgetData)
            .then((res) => {
                // console.log(res.data.data)

                Alert.alert("Budget Updated");
                navigation.navigate("BudgetExpenses");
            })
            .catch((error) => {
                //   Alert.alert(`${error.response?.data || error.message}`)
                Alert.alert("Error in updating data");
            });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputContainer}>
                <View style={styles.headerBox}>
                    <Text style={styles.header}>Budget Name</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholderTextColor={"#C37BC3"}
                    placeholder="Enter budget name"
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.headerBox}>
                    <Text style={styles.header}>Budget Amount</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholderTextColor={"#C37BC3"}
                    placeholder="Enter amount"
                    keyboardType="numeric"
                    value={budgetAmount.toString()}
                    onChangeText={setBudgetAmount}
                />
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={handleUpdateBudget}
            >
                <Text style={styles.buttonText}>Update Budget</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7EFE5",
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 20,
        marginVertical: 20,
    },
    header: {
        fontFamily: "Itim-Regular",
        fontSize: 20,
        borderColor: "black",
    },
    headerBox: {
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        fontFamily: "Roboto",
        fontSize: 15,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        width: 180,
        height: 40,
        padding: 10,
    },
    button: {
        borderWidth: 1,
        borderRadius: 10,
        width: 180,
        height: 50,
        backgroundColor: "#C37BC3",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        fontFamily: "Itim-Regular",
        fontSize: 20,
        color: "white",
    },
});

export default UpdateBudget;
