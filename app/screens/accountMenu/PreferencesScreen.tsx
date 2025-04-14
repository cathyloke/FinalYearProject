import React, { useCallback, useEffect, useState } from "react";
import {
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
    Alert,
    FlatList,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../assets/Types";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import UpperTab from "../../components/UpperTab";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { getSession } from "../../assets/asyncStorageData";
import { SafeAreaView } from "react-native-safe-area-context";
import { Checkbox } from "react-native-paper";

type PreferencesScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Preferences"
>;

type Props = {
    navigation: PreferencesScreenNavigationProp;
};

type TravelMode = {
    _id: string;
    name: string;
};

type Interest = {
    _id: string;
    name: string;
};

type UserPreference = {
    interests: string[];
    travelModes: string[];
};

const PreferencesScreen: React.FC<Props> = ({ navigation }) => {
    const [travelModes, setTravelModes] = useState<TravelMode[]>();
    const [interests, setInterests] = useState<Interest[]>();
    const [userPreferences, setUserPreferences] = useState<UserPreference>();

    const [selectedTravelModes, setSelectedTravelModes] = useState<{
        [key: string]: boolean;
    }>({});
    const [selectedInterests, setSelectedInterests] = useState<{
        [key: string]: boolean;
    }>({});

    const toggleTravelMode = (id: string) => {
        setSelectedTravelModes((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const toggleInterest = (id: string) => {
        setSelectedInterests((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    useEffect(() => {
        console.log("updating the travelmodes");
        if (travelModes && userPreferences) {
            const selected: { [key: string]: boolean } = {};

            travelModes.forEach((mode) => {
                const isSelected = userPreferences.travelModes.some(
                    (pref) => pref == mode._id.toString()
                );

                selected[mode._id] = isSelected;
            });

            setSelectedTravelModes(selected);
        }
    }, [travelModes, userPreferences]);

    useEffect(() => {
        console.log("updating the interest");

        if (interests && userPreferences) {
            const selected: { [key: string]: boolean } = {};

            interests.forEach((mode) => {
                const isSelected = userPreferences.interests.some(
                    (pref) => pref == mode._id.toString()
                );

                selected[mode._id] = isSelected;
            });

            setSelectedInterests(selected);
        }
    }, [interests, userPreferences]);

    const loadData = async () => {
        try {
            console.log("loading data");
            const travelModeRes = await axios.get(
                `http://192.168.1.12:3000/preferences/travelMode`
            );

            // console.log(travelModeRes.data.data);
            const travelModeData = travelModeRes.data.data;
            setTravelModes(travelModeData);

            const interestRes = await axios.get(
                `http://192.168.1.12:3000/preferences/interest`
            );

            // console.log(interestRes.data.data);
            const interestData = interestRes.data.data;
            setInterests(interestData);

            const session = await getSession();
            if (!session || !session.userId) {
                Alert.alert("No user session data. Please log in");
                navigation.navigate("Cover");
                return;
            }
            const { userId: userId } = session;

            const userRes = await axios.get(
                `http://192.168.1.12:3000/read/${userId}`
            );
            console.log(userRes.data.data);
            const data = userRes.data.data.preferences;
            setUserPreferences(data);

            console.log("this is the user presferences");
            console.log(userPreferences);
        } catch (error) {
            Alert.alert(`${error}`);
        }
    };

    const saveData = async () => {
        try {
            const selectedTravelModeIds = Object.keys(
                selectedTravelModes
            ).filter((key) => selectedTravelModes[key]);

            const selectedInterestIds = Object.keys(selectedInterests).filter(
                (key) => selectedInterests[key]
            );

            const preferences = {
                travelModes: selectedTravelModeIds,
                interests: selectedInterestIds,
            };

            //call api
            const session = await getSession();
            if (!session || !session.userId) {
                Alert.alert("No user session data. Please log in");
                navigation.navigate("Cover");
                return;
            }

            const { userId: userId } = session;

            const updateData = {
                preferences: preferences,
            };

            axios
                .put(`http://192.168.1.12:3000/update/${userId}`, updateData)
                .then((res) => {
                    console.log("Successfully update user : " + res);
                    console.log(JSON.stringify(res));
                    Alert.alert(`Data successfully updated`);
                    navigation.navigate("Account");
                })
                .catch((error) => {
                    throw new Error(error.message);
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
            <View>
                <Text style={styles.info}>My preferred travel mode</Text>
            </View>
            <FlatList
                data={travelModes}
                renderItem={({ item }) => (
                    <View style={styles.checkboxlist}>
                        <Checkbox
                            status={
                                selectedTravelModes[item._id.toString()]
                                    ? "checked"
                                    : "unchecked"
                            }
                            onPress={() =>
                                toggleTravelMode(item._id.toString())
                            }
                        />
                        <Text style={styles.checkboxtext}>
                            {item.name.toLocaleUpperCase() || "None"}
                        </Text>
                    </View>
                )}
                keyExtractor={(item) => item._id.toString()}
            />

            <View>
                <Text style={styles.info}>My interest</Text>
            </View>
            <FlatList
                data={interests}
                renderItem={({ item }) => (
                    <View style={styles.checkboxlist}>
                        <Checkbox
                            status={
                                selectedInterests[item._id.toString()]
                                    ? "checked"
                                    : "unchecked"
                            }
                            onPress={() => toggleInterest(item._id.toString())}
                        />
                        <Text style={styles.checkboxtext}>
                            {item.name.toLocaleUpperCase() || "None"}
                        </Text>
                    </View>
                )}
                keyExtractor={(item) => item._id.toString()}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        saveData();
                    }}
                >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

// const screenHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7EFE5",
    },
    checkboxlist: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
        padding: 2,
        paddingHorizontal: 20,
    },
    checkboxtext: {
        textAlignVertical: "center",
    },
    info: {
        fontSize: 18,
        fontFamily: "Itim-Regular",
        color: "black",
        padding: 20,
    },
    buttonContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#C37BC3",
        width: 200,
        height: 50,
        marginTop: 20,
        borderRadius: 10,
        borderWidth: 1,
    },
    buttonText: {
        fontFamily: "Roboto",
        justifyContent: "center",
        color: "white",
        alignSelf: "center",
        fontSize: 18,
    },
});

export default PreferencesScreen;
