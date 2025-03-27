import React, { useCallback, useEffect, useState } from "react";
import {
    Button,
    TextInput,
    Text,
    View,
    Platform,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Dimensions,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../assets/Types";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { CustomStartEndDatePicker } from "../../components/CustomDatePicker";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";
import { getSession } from "../../assets/asyncStorageData";
import { SafeAreaView } from "react-native-safe-area-context";

type CreateItineraryDetailsNavigationProp = StackNavigationProp<
    RootStackParamList,
    "CreateItineraryDetails"
>;

type Props = {
    navigation: CreateItineraryDetailsNavigationProp;
    route: RouteProp<RootStackParamList, "CreateItineraryDetails">;
};

interface Activity {
    time: string;
    activity: string;
    location: string;
}

interface ItineraryDay {
    day: number;
    activities: Activity[];
}

const screenWidth = Dimensions.get("window").width;

const CreateItineraryDetails: React.FC<Props> = ({ navigation, route }) => {
    const { itineraryId } = route.params;

    const [tripDays, setTripDays] = useState(0);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);

    useEffect(() => {
        setItinerary(
            Array.from({ length: tripDays }, (_, i) => ({
                day: i + 1,
                activities: [],
            }))
        );
    }, [tripDays]);

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
                `http://10.0.2.2:3000/itinerary/${userId}/${itineraryId}`
            );
            setTripDays(response.data.data.days);
            setStartDate(response.data.data.startDate);
            setEndDate(response.data.data.endDate);
        } catch (error) {
            Alert.alert(`Error: ${error}`);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    const addActivity = (dayIndex: number, activity: Activity) => {
        const newItinerary = [...itinerary];
        newItinerary[dayIndex].activities.push(activity);
        setItinerary(newItinerary);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.put(
                `http://10.0.2.2:3000/itinerary/details/${itineraryId}`,
                { itinerary }
            );

            if (response.status === 200) {
                Alert.alert("Success", "Itinerary details saved successfully!");
                navigation.navigate("Home");
            }
        } catch (error: any) {
            Alert.alert(
                "Error",
                `Failed to save itinerary details: ${error.message}`
            );
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>
                    Build your itinerary by filling details below
                </Text>
            </View>

            <View style={{ flex: 1 }}>
                <FlatList
                    data={itinerary}
                    keyExtractor={(item) => item.day.toString()}
                    renderItem={({ item, index }) => (
                        <View>
                            <Text style={styles.dateLabel}>
                                Day {item.day}:{" "}
                                {new Date(
                                    new Date(startDate).setDate(
                                        new Date(startDate).getDate() + index
                                    )
                                ).toDateString()}
                            </Text>
                            <ActivityInput
                                dayIndex={index}
                                addActivity={addActivity}
                            />
                        </View>
                    )}
                />
            </View>

            <View style={[styles.buttonContainer, { marginTop: 15 }]}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        // handleSubmit();
                        Alert.alert("Saved the itinerary");
                    }}
                >
                    <Text style={styles.buttonText}>Save Itinerary</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

interface ActivityInputProps {
    dayIndex: number;
    addActivity: (dayIndex: number, activity: Activity) => void;
}

const ActivityInput: React.FC<ActivityInputProps> = ({
    dayIndex,
    addActivity,
}) => {
    const [time, setTime] = useState("");
    const [activity, setActivity] = useState("");
    const [location, setLocation] = useState("");

    return (
        <View style={{ gap: 10 }}>
            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputLabel}>Time</Text>
                <TextInput
                    style={styles.inputBox}
                    placeholder="Enter Time (HH:MM AM/PM)"
                    value={time}
                    onChangeText={setTime}
                />
            </View>

            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputLabel}>Activity</Text>
                <TextInput
                    style={styles.inputBox}
                    placeholder="Enter Activity"
                    value={activity}
                    onChangeText={setActivity}
                />
            </View>

            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputLabel}>Location</Text>
                <TextInput
                    style={styles.inputBox}
                    placeholder="Enter Location"
                    value={location}
                    onChangeText={setLocation}
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        if (!time || !activity || !location) {
                            Alert.alert("Error", "All fields are required");
                            return;
                        }
                        addActivity(dayIndex, { time, activity, location });
                        setTime("");
                        setActivity("");
                        setLocation("");
                    }}
                >
                    <Text style={styles.buttonText}>Add Activity</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7EFE5",
    },
    headerContainer: {
        alignSelf: "center",
        marginTop: 20,
    },
    header: {
        fontFamily: "Itim-Regular",
        fontSize: 18,
        color: "#454745",
    },
    dateLabel: {
        marginHorizontal: 10,
        fontSize: 18,
        fontFamily: "Itim-Regular",
        color: "black",
        height: 50,
        textAlignVertical: "center",
        flex: 1,
    },
    inputLabel: {
        marginHorizontal: 10,
        fontSize: 18,
        fontFamily: "Itim-Regular",
        color: "black",
        width: screenWidth * 0.2,
        height: 50,
        textAlignVertical: "center",
    },
    inputBox: {
        flex: 1,
        fontFamily: "Roboto",
        color: "black",
        fontSize: 15,
        textAlign: "left",
        paddingLeft: 20,
        marginRight: 10,
        borderColor: "black",
        borderRadius: 10,
        borderWidth: 1.5,
        // width: screenWidth * 0.7,
        height: 50,
    },
    buttonContainer: {
        flex: 1,
        alignItems: "center",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#C37BC3",
        width: screenWidth * 0.9,
        height: 50,
        // marginTop: 20,
        borderRadius: 10,
        borderWidth: 1,
    },
    buttonText: {
        fontFamily: "Itim-Regular",
        justifyContent: "center",
        color: "white",
        alignSelf: "center",
        fontSize: 20,
    },
});

export default CreateItineraryDetails;
