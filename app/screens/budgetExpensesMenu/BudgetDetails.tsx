import React, { useCallback, useState } from "react";
import {
    Alert,
    Text,
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../assets/Types";
import { FlatList, ScrollView } from "react-native-gesture-handler";
// import { Entypo } from "@expo/vector-icons";
import {
    MenuProvider,
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from "react-native-popup-menu";

import UpperTab from "../../components/UpperTab";
import { SafeAreaView } from "react-native-safe-area-context";
import { getSession } from "../../assets/asyncStorageData";
import axios from "axios";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

type BudgetDetailsNavigationProp = StackNavigationProp<
    RootStackParamList,
    "BudgetDetails"
>;

type Props = {
    navigation: BudgetDetailsNavigationProp;
    route: RouteProp<RootStackParamList, "BudgetDetails">;
};

type ExpenseCategoryDetail = {
    name: string;
    dateCreated: Date;
    amount: number;
};

type ExpenseCategory = {
    _id: string;
    expensesCategoryName: string;
    expensesCategoryAmount: number;
    expensesCategoryDetail: ExpenseCategoryDetail[];
};

const BudgetDetails: React.FC<Props> = ({ navigation, route }) => {
    const { budgetName } = route.params;

    const [budgetAmount, setBudgetAmount] = useState<number>(0);
    const [expensesAmount, setExpensesAmount] = useState<number>(0);

    const [expensesCategory, setExpensesCategory] =
        useState<ExpenseCategory[]>();

    const loadData = async () => {
        const session = await getSession();
        if (!session || !session.userId) {
            Alert.alert("No user session data. Please log in");
            navigation.navigate("Cover");
            return;
        }

        const { userId: userId } = session;

        // console.log('user id : ', userId)

        axios
            .get(`http://10.0.2.2:3000/budget/${userId}/${budgetName}`)
            .then((res) => {
                console.log(res.data.data);
                setBudgetAmount(res.data.data.budgetAmount);
                setExpensesAmount(res.data.data.expensesAmount);
                setExpensesCategory(res.data.data.expensesCategory);
            })
            .catch((error) => {
                Alert.alert(`Error: ${error.response?.data || error.message}`);
            });
    };

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerBar}>
                <Text style={styles.headerInfo}>Budget: RM{budgetAmount}</Text>
                <Text style={styles.headerInfo}>
                    Expenses: RM{expensesAmount}
                </Text>
            </View>

            <View style={styles.subHeaderBar}>
                <Text style={styles.subHeader}>Your Expenses</Text>
                <TouchableOpacity
                    style={{ alignSelf: "center" }}
                    onPress={() => {
                        navigation.navigate("AddExpenses", {
                            budgetName: budgetName,
                        });
                    }}
                >
                    <Entypo name="plus" size={35} color="black"></Entypo>
                </TouchableOpacity>
            </View>
            <FlatList
                style={styles.infoBar}
                data={expensesCategory}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.infoCategory}
                        onPress={() => {
                            navigation.navigate("CategoryDetails", {
                                budgetName: budgetName,
                                categoryName: item.expensesCategoryName,
                            });
                        }}
                    >
                        <Text style={styles.info}>
                            {item.expensesCategoryName}
                        </Text>
                        <View style={{ alignSelf: "center" }}>
                            <Text style={styles.info}>
                                RM{item.expensesCategoryAmount}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item._id.toString()}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#C37BC3",
    },
    headerBar: {
        backgroundColor: "#F7EFE5",
        width: "80%",
        alignItems: "center",
        alignSelf: "center",
        height: 80,
        borderRadius: 30,
        justifyContent: "center",
        marginTop: 20,
    },
    headerInfo: {
        fontFamily: "Itim-Regular",
        fontSize: 25,
    },
    subHeaderBar: {
        backgroundColor: "#F7EFE5",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomWidth: 1,
        borderColor: "grey",
        marginTop: 20,
        height: 60,
        alignItems: "center",
    },
    subHeader: {
        fontFamily: "Itim-Regular",
        fontSize: 25,
    },
    infoBar: {
        backgroundColor: "#F7EFE5",
        // justifyContent: "space-between",
    },
    infoCategory: {
        borderColor: "grey",
        borderBottomWidth: 1,
        height: 100,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    info: {
        fontFamily: "Itim-Regular",
        fontSize: 22,
        padding: 20,
    },
});

export default BudgetDetails;
