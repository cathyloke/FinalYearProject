import React, { useCallback, useState } from "react";
import {
    Alert,
    TextInput,
    Text,
    View,
    Platform,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../../assets/Types";
import { ScrollView } from "react-native-gesture-handler";
// import { Entypo } from "@expo/vector-icons";
import {
    MenuProvider,
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from "react-native-popup-menu";

import UpperTab from "../../../components/UpperTab";
import { SafeAreaView } from "react-native-safe-area-context";
import { Picker } from "@react-native-picker/picker";
import { Dropdown } from "react-native-element-dropdown";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { getSession } from "../../../assets/asyncStorageData";
import { Ionicons } from "@expo/vector-icons";
// import { Ionicons } from '@expo/vector-icons';

type UpdateExpensesNavigationProp = StackNavigationProp<
    RootStackParamList,
    "UpdateExpenses"
>;

type Props = {
    navigation: UpdateExpensesNavigationProp;
    route: RouteProp<RootStackParamList, "UpdateExpenses">;
};

const categories = [
    { label: "Flights", value: "Flights" },
    { label: "Food and Beverage", value: "Food and Beverage" },
    { label: "Accommodation", value: "Accommodation" },
    { label: "Souvenir", value: "Souvenir" },
    { label: "Snacks", value: "Snacks" },
    { label: "Petrol", value: "Petrol" },
    { label: "Other", value: "Other" },
];

const UpdateExpenses: React.FC<Props> = ({ navigation, route }) => {
    const { budgetName, categoryName, detailId } = route.params;

    const [name, setName] = useState("");
    const [payer, setPayer] = useState("");
    const [category, setCategory] = useState(categoryName);
    const [amount, setAmount] = useState("");
    const [date, setDate] = useState(new Date());
    const onChangeDate = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    };

    const DatePickerOS = () => {
        if (Platform.OS === "ios") {
            return (
                <View>
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display="default"
                        onChange={onChangeDate}
                    />
                </View>
            );
        } else {
            return (
                <View>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={"#C37BC3"}
                        placeholder="Enter payer name"
                    >
                        {date.toDateString()}
                    </TextInput>
                </View>
            );
        }
    };

    const handleUpdateExpenses = async () => {
        try {
            const session = await getSession();
            if (!session || !session.userId) {
                Alert.alert("No user session data. Please log in");
                navigation.navigate("Cover");
                return;
            }

            const { userId: userId } = session;

            const amountRegex = /^\d+(\.\d{1,2})?$/;
            if (!amountRegex.test(amount)) {
                Alert.alert("Amount must be a number, e.g. 5.50");
                return;
            }

            if (!category || !name || !amount || !date) {
                Alert.alert("Missing value. Please check your input.");
                return;
            }

            const expensesDetails = {
                id: detailId,
                name: name,
                amount: Number(amount),
                payer: payer,
                date: date,
            };

            axios
                .put(
                    `http://172.20.10.2:3000/expenses/${userId}/${budgetName}/${categoryName}`,
                    expensesDetails
                )
                .then((res) => {
                    console.log(expensesDetails);
                    console.log(JSON.stringify(res.data));

                    Alert.alert("Expenses Updated");
                    navigation.navigate("CategoryDetails", {
                        budgetName: budgetName,
                        categoryName: categoryName,
                    });
                })
                .catch((error) => {
                    //   Alert.alert(`${error.response?.data || error.message}`)
                    Alert.alert("Error in updating data");
                });
        } catch (error: any) {
            console.log(JSON.stringify(error));
            Alert.alert(
                `Error: ${
                    error.response?.data.toString() || error.message.toString()
                }`
            );
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    const loadData = async () => {
        try {
            const session = await getSession();
            if (!session || !session.userId) {
                Alert.alert("No user session data. Please log in");
                navigation.navigate("Cover");
                return;
            }

            const { userId: userId } = session;

            const response = await axios.get(
                `http://172.20.10.2:3000/expenses/${userId}/${budgetName}/${categoryName}/${detailId}`
            );

            if (response) {
                console.log(response.data);
                setName(response.data.data.name);
                setPayer(response.data.data.payer);
                setAmount(response.data.data.amount);
                setDate(new Date(response.data.data.dateCreated));
            }
        } catch (error: any) {
            Alert.alert("Error", error);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <SafeAreaView>
                <View style={styles.inputContainer}>
                    <View style={{ flexDirection: "row" }}>
                        <Text style={styles.header}>Date</Text>
                        <Ionicons
                            name="calendar"
                            size={25}
                            color="black"
                            style={{ marginLeft: 10 }}
                        />
                    </View>
                    {DatePickerOS()}
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.headerBox}>
                        <Text style={styles.header}>Category</Text>
                    </View>

                    <TextInput
                        style={styles.input}
                        value={category}
                        editable={false}
                        pointerEvents="none"
                    ></TextInput>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.headerBox}>
                        <Text style={styles.header}>Name</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={"#C37BC3"}
                        placeholder="Enter expenses name"
                        value={name}
                        onChangeText={(text) => setName(text)}
                    ></TextInput>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.headerBox}>
                        <Text style={styles.header}>Amount</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={"#C37BC3"}
                        placeholder="Enter amount"
                        keyboardType="numeric"
                        value={amount.toString()}
                        onChangeText={setAmount}
                    ></TextInput>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.headerBox}>
                        <Text style={styles.header}>Pay by</Text>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={"#C37BC3"}
                        placeholder="Enter payer name"
                        value={payer}
                        onChangeText={(text) => setPayer(text)}
                    ></TextInput>
                </View>

                {/* <View style={styles.fileContainer}>
                <Ionicons name="add" size={40} color="black" style={{ marginLeft: 10 }} />
            </View> */}

                <View style={styles.actionContainer}>
                    <TouchableOpacity
                        style={styles.action}
                        onPress={() => {
                            Alert.alert("Cancel adding expenses");
                            navigation.navigate("BudgetDetails", {
                                budgetName: budgetName,
                            });
                        }}
                    >
                        <Text style={styles.actionText}>Cancel</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.action}
                        onPress={() => handleUpdateExpenses()}
                    >
                        <Text style={styles.actionText}>Update</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7EFE5",
    },
    actionContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 10,
        marginBottom: 20,
    },
    action: {
        borderWidth: 1,
        marginHorizontal: 30,
        borderRadius: 10,
        width: 120,
        height: 40,
        backgroundColor: "#E2BFD9",
        justifyContent: "center",
        alignItems: "center",
    },
    actionText: {
        fontFamily: "Itim-Regular",
        fontSize: 20,
    },
    dropdown: {
        height: 40,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        width: 250,
    },
    placeholderText: {
        fontFamily: "Roboto",
        fontSize: 15,
        color: "#C37BC3",
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
        width: 250,
        height: 40,
        paddingLeft: 10,
        color: "black",
    },
    fileContainer: {
        borderWidth: 1,
        margin: 20,
        height: 200,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
    },
});

export default UpdateExpenses;
