import React, { useCallback, useState } from "react";
import {
    Button,
    Modal,
    TouchableOpacity,
    TextInput,
    Text,
    View,
    Image,
    StyleSheet,
    Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../assets/Types";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import UpperTab from "../../components/UpperTab";
import { SafeAreaView } from "react-native-safe-area-context";
// import { Entypo } from "@expo/vector-icons";
import {
    MenuProvider,
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from "react-native-popup-menu";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { getSession } from "../../assets/asyncStorageData";
import axios from "axios";

type CategoryDetailsScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "CategoryDetails"
>;

type Props = {
    navigation: CategoryDetailsScreenNavigationProp;
    route: RouteProp<RootStackParamList, "CategoryDetails">;
};

type ExpenseCategoryDetail = {
    _id: string;
    name: string;
    amount: number;
    dateCreated: Date;
    payer: string;
};

type ExpenseCategory = {
    _id: string;
    expensesCategoryName: string;
    expensesCategoryAmount: number;
    expensesCategoryDetail: ExpenseCategoryDetail[];
};

const CategoryDetails: React.FC<Props> = ({ navigation, route }) => {
    const { budgetName, categoryName } = route.params;

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedExpensesDetailsId, setSelectedExpensesDetailsId] =
        useState("");

    const [expensesCategory, setExpensesCategory] =
        useState<ExpenseCategory[]>();
    const [expenseCategoryDetail, setExpensesCategoryDetail] =
        useState<ExpenseCategoryDetail[]>();

    const handleUpdateExpenses = (detailsId: string) => {
        setModalVisible(false);

        navigation.navigate("UpdateExpenses", {
            budgetName: budgetName,
            categoryName: categoryName,
            detailId: detailsId,
        });
    };

    const handleDeleteExpenses = async (detailsId: any) => {
        setModalVisible(false);

        const session = await getSession();
        if (!session || !session.userId) {
            Alert.alert("No user session data. Please log in");
            navigation.navigate("Cover");
            return;
        }

        const { userId: userId } = session;

        axios
            .delete(
                `http://10.0.2.2:3000/expenses/${userId}/${budgetName}/${categoryName}/${detailsId}`
            )
            .then((res) => {
                Alert.alert("Expenses Deleted");
                loadData();
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

    const loadData = async () => {
        const session = await getSession();
        if (!session || !session.userId) {
            Alert.alert("No user session data. Please log in");
            navigation.navigate("Cover");
            return;
        }

        const { userId: userId } = session;

        axios
            .get(
                `http://10.0.2.2:3000/expenses/${userId}/${budgetName}/${categoryName}`
            )
            .then((res) => {
                console.log(res.data.data);
                setExpensesCategory(res.data.data);
                setExpensesCategoryDetail(res.data.data.expensesCategoryDetail);
            })
            .catch((error) => {
                Alert.alert(`Error: ${error.response?.data || error.message}`);
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                // style={styles.infoBar}
                data={expenseCategoryDetail}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => {
                            setSelectedExpensesDetailsId(item._id);
                            setModalVisible(true);
                        }}
                        style={styles.content}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text style={styles.info}>{item.name}</Text>
                            <Text style={styles.info}>RM{item.amount}</Text>
                        </View>
                        <View>
                            <Text style={styles.subInfo}>
                                Pay by: {item.payer}
                            </Text>
                            <Text style={styles.subInfo}>
                                Date Created:{" "}
                                {new Date(item.dateCreated).toLocaleDateString(
                                    "en-GB",
                                    {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    }
                                )}{" "}
                                (
                                {new Date(item.dateCreated).toLocaleDateString(
                                    "en-GB",
                                    {
                                        weekday: "long",
                                    }
                                )}
                                )
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item._id.toString()}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBox}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalText}>
                            What do you want to do?
                        </Text>
                        <Button
                            title="Update Expenses"
                            onPress={() =>
                                handleUpdateExpenses(selectedExpensesDetailsId)
                            } // Hide modal on button press
                        />
                        <Button
                            title="Delete Expenses"
                            onPress={() =>
                                handleDeleteExpenses(selectedExpensesDetailsId)
                            }
                        />
                        <Button
                            title="Cancel"
                            onPress={() => {
                                setModalVisible(false);
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7EFE5",
    },
    upperTab: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#E2BFD9",
        height: 85,
    },
    content: {
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        height: 100,
        justifyContent: "space-between",
        padding: 10,
    },
    info: {
        fontFamily: "Itim-Regular",
        fontSize: 20,
    },
    subInfo: {
        fontFamily: "Roboto",
        fontSize: 15,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    },
    modalContent: {
        width: 300,
        padding: 20,
        backgroundColor: "white",
        borderRadius: 10,
        alignItems: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});

export default CategoryDetails;
