import React, { useCallback, useState } from "react";
import {
    Alert,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../assets/Types";
import { Entypo, Ionicons } from "@expo/vector-icons";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from "react-native-popup-menu";
import UpperTab from "../../components/UpperTab";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { getSession } from "../../assets/asyncStorageData";

type ItineraryScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Itinerary"
>;

type Props = {
    navigation: ItineraryScreenNavigationProp;
};

const ItineraryScreen: React.FC<Props> = ({ navigation }) => {
    const handleUpdateTrip = (itineraryId: string) => {
        navigation.navigate("UpdateItinerary", { itineraryId: itineraryId });
    };
    const handleDeleteTrip = async (itineraryId: string) => {
        try {
            Alert.alert(
                "Are you sure to delete this trip?",
                "You will not be able to recover the trip once it is deleted.",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel",
                    },
                    {
                        text: "Yes",
                        onPress: async () => {
                            console.log("Delete Trip");

                            const session = await getSession();
                            if (!session || !session.userId) {
                                Alert.alert(
                                    "No user session data. Please log in"
                                );
                                navigation.navigate("Cover");
                                return;
                            }

                            const { userId: userId } = session;

                            const res = await axios.delete(
                                `http://192.168.1.18:3000/itinerary/${userId}/${itineraryId}`
                            );

                            await loadData();
                        },
                    },
                ]
            );
        } catch (error) {
            Alert.alert(`${error}`);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    const [plans, setPlans] = useState();

    const loadData = async () => {
        try {
            console.log("loading data");

            const session = await getSession();
            if (!session || !session.userId) {
                Alert.alert("No user session data. Please log in");
                navigation.navigate("Cover");
                return;
            }

            const { userId: userId } = session;

            const response = await axios.get(
                `http://192.168.1.18:3000/itinerary/${userId}`
            );
            
            setPlans(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            Alert.alert(`${error}`);
        }
    };

    function renderMenuOption(text: string, type: "Manual" | "AI") {
        return (
            <MenuOption
                onSelect={() =>
                    navigation.navigate("CreateItinerary", { type })
                }
                text={text}
            />
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <UpperTab navigation={navigation}></UpperTab>
            <View style={styles.headerBar}>
                <Text style={styles.header}>My Trips</Text>
                <View style={{ alignSelf: "center" }}>
                    <Menu>
                        <MenuTrigger>
                            <Entypo name="plus" size={30} color="black" />
                        </MenuTrigger>
                        <MenuOptions customStyles={optionsStyle}>
                            {renderMenuOption("Create Manually", "Manual")}
                            {renderMenuOption("Create through AI", "AI")}
                        </MenuOptions>
                    </Menu>
                </View>
            </View>

            <FlatList
                data={plans}
                renderItem={({ item }) => (
                    <View style={styles.content}>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("ViewItinerary", {
                                    itineraryId: item._id.toString(),
                                })
                            }
                        >
                            <View style={{ marginTop: 5 }}>
                                <Text style={styles.infoLabel}>
                                    {item.name}
                                </Text>

                                <Text style={styles.info}>
                                    <Ionicons
                                        name="calendar-outline"
                                        size={18}
                                        color="black"
                                    />{" "}
                                    {new Date(
                                        item.startDate
                                    ).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                    {" - "}
                                    {new Date(item.endDate).toLocaleDateString(
                                        "en-GB",
                                        {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                        }
                                    )}{" "}
                                    ({item.days} days)
                                </Text>

                                <Text style={styles.info}>
                                    <Ionicons
                                        name="location"
                                        size={18}
                                        color="black"
                                    />{" "}
                                    {item.destination}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{ marginTop: 5 }}>
                            <Menu>
                                <MenuTrigger>
                                    <Entypo
                                        name="dots-three-horizontal"
                                        size={20}
                                        color="black"
                                    />
                                </MenuTrigger>
                                <MenuOptions customStyles={optionsStyle}>
                                    {/* change to function */}
                                    <MenuOption
                                        onSelect={() => {
                                            handleUpdateTrip(
                                                item._id.toString()
                                            );
                                        }}
                                        text="Edit Trip"
                                    />
                                    <MenuOption
                                        onSelect={() =>
                                            handleDeleteTrip(
                                                item._id.toString()
                                            )
                                        }
                                        text="Delete Trip"
                                    />
                                </MenuOptions>
                            </Menu>
                        </View>
                    </View>
                )}
                keyExtractor={(item) => item._id.toString()}
            ></FlatList>
        </SafeAreaView>
    );
};

const optionsStyle = {
    optionsContainer: {
        backgroundColor: "#f2f2f2",
        padding: 5,
        borderRadius: 15,
    },
    optionWrapper: {
        padding: 10,
    },
    optionText: {
        color: "black",
        fontFamily: "Itim-Regular",
        fontSize: 18,
    },
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
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 5,
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        marginHorizontal: 20,
        height: 100,
    },
    headerBar: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "grey",
        marginHorizontal: 20,
        justifyContent: "space-between",
    },
    header: {
        fontSize: 25,
        padding: 5,
        margin: 8,
        fontFamily: "Itim-Regular",
        color: "black",
    },

    infoLabel: {
        fontFamily: "Roboto",
        paddingHorizontal: 10,
        textAlignVertical: "center",
        fontWeight: "bold",
        fontSize: 18,
        color: "black",
        marginBottom: 5,
    },
    info: {
        fontFamily: "Roboto",
        color: "#424242",
        fontSize: 15,
        paddingHorizontal: 10,
        textAlignVertical: "center",
    },
});

export default ItineraryScreen;
