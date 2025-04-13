import React, { useRef, useState, useEffect, useCallback } from "react";
import {
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions,
    TouchableNativeFeedback,
    Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../assets/Types";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import UpperTab from "../../components/UpperTab";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";
import { getSession } from "../../assets/asyncStorageData";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
    navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const [budgets, setBudgets] = useState();
    const [errors, setErrors] = useState([]);
    const loadData = async () => {
        try {
            const session = await getSession();
            if (!session || !session.userId) {
                Alert.alert("No user session data. Please log in");
                navigation.navigate("Cover");
                return;
            }

            const { userId: userId } = session;

            axios
                .get(`http://10.0.2.2:3000/read/${userId}`)
                .then((res) => {
                    const budgetsData = res.data.data.budgets;
                    setBudgets(budgetsData);

                    const errorMessages = budgetsData
                        .filter(
                            (budget: any) =>
                                budget.budgetAmount <= budget.expensesAmount
                        )
                        .map(
                            (budget: any) =>
                                `Your budget "${budget.name}" has been fully used or exceeded. Please check your pocket.`
                        );

                    setErrors(errorMessages);
                })
                .catch((error) => {
                    Alert.alert(
                        `Error: ${error.response?.data || error.message}`
                    );
                });
        } catch (error) {
            Alert.alert(`${error}`);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            <UpperTab navigation={navigation} />
            <ScrollView>
                <View style={styles.content}>
                    {errors.length > 0 && (
                        <View style={styles.errorContainer}>
                            <Text
                                style={[
                                    styles.sectionHeader,
                                    { color: "#cc0000" },
                                ]}
                            >
                                Notifications ⚠️
                            </Text>
                            {errors.map((err, index) => (
                                <View key={index} style={styles.errorItem}>
                                    <Text style={styles.errorText}>
                                        • {err}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    )}

                    <Text style={styles.sectionHeader}>
                        Plan Your Trip Starting With :
                    </Text>

                    <View style={styles.OptionContainer}>
                        <TouchableNativeFeedback
                            onPress={() => navigation.navigate("Hotel")}
                        >
                            <View style={styles.bookingOptionWrapper}>
                                <MaterialCommunityIcons
                                    name="bed-queen"
                                    size={50}
                                    color="black"
                                />
                                <Text style={styles.bookingOption}>Hotel</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            onPress={() => navigation.navigate("Attraction")}
                        >
                            <View style={styles.bookingOptionWrapper}>
                                <MaterialCommunityIcons
                                    name="ticket"
                                    size={50}
                                    color="black"
                                />
                                <Text style={styles.bookingOption}>
                                    Attraction
                                </Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            onPress={() => navigation.navigate("Weather")}
                        >
                            <View style={styles.bookingOptionWrapper}>
                                <MaterialCommunityIcons
                                    name="cloud"
                                    size={50}
                                    color="black"
                                />
                                <Text style={styles.bookingOption}>
                                    Weather
                                </Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>

                    <View style={styles.OptionContainer}>
                        <TouchableNativeFeedback
                            onPress={() => navigation.navigate("Flight")}
                        >
                            <View style={styles.bookingOptionWrapper}>
                                <MaterialCommunityIcons
                                    name="airplane"
                                    size={50}
                                    color="black"
                                />
                                <Text style={styles.bookingOption}>Flight</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            onPress={() =>
                                navigation.navigate("BudgetExpenses")
                            }
                        >
                            <View style={styles.bookingOptionWrapper}>
                                <MaterialCommunityIcons
                                    name="cash"
                                    size={50}
                                    color="black"
                                />
                                <Text style={styles.bookingOption}>Pocket</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            onPress={() => navigation.navigate("Itinerary")}
                        >
                            <View style={styles.bookingOptionWrapper}>
                                <MaterialCommunityIcons
                                    name="book"
                                    size={50}
                                    color="black"
                                />
                                <Text style={styles.bookingOption}>
                                    Itinerary
                                </Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </View>
            </ScrollView>
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
        // alignItems: "center",
        justifyContent: "center",
    },
    sectionHeader: {
        fontSize: 20,
        fontFamily: "Itim-Regular",
        color: "black",
        alignSelf: "flex-start",
        paddingTop: 10,
        paddingLeft: 15,
    },
    OptionContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    bookingOptionWrapper: {
        flex: 1,
        margin: 15,
        height: 120,
        maxWidth: screenWidth * 0.33,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 30,
        backgroundColor: "#E2BFD9",
    },
    bookingOption: {
        fontSize: 18,
        fontFamily: "Itim-Regular",
        paddingVertical: 10,
        color: "black",
    },

    errorContainer: {
        padding: 10,
        backgroundColor: "#ffe6e6",
        borderRadius: 8,
        // borderColor: "#ff4d4d",
        borderWidth: 1,
        margin: 10,
    },

    errorItem: {
        // marginBottom: 4,
        paddingVertical: 4,
    },
    errorText: {
        fontSize: 14,
        color: "#990000",
        paddingHorizontal: 5,
        textAlign: "justify",
    },
});

export default HomeScreen;
