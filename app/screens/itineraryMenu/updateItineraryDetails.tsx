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
import Ionicons from "react-native-vector-icons/Ionicons";

type UpdateItineraryDetailsNavigationProp = StackNavigationProp<
    RootStackParamList,
    "UpdateItineraryDetails"
>;

type Props = {
    navigation: UpdateItineraryDetailsNavigationProp;
    route: RouteProp<RootStackParamList, "UpdateItineraryDetails">;
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

const UpdateItineraryDetails: React.FC<Props> = ({ navigation, route }) => {
    const { itineraryId } = route.params;

    const [tripDays, setTripDays] = useState(0);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");

    const [itinerary, setItinerary] = useState<ItineraryDay[]>([]);

    useEffect(() => {
        if (itinerary.length === 0 && tripDays > 0) {
            setItinerary(
                Array.from({ length: tripDays }, (_, i) => ({
                    day: i + 1,
                    activities: itinerary[i]?.activities || [], // Preserve existing activities
                }))
            );
        }
        console.log("now the itinerary are");
        console.log(itinerary);
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
            setItinerary(response.data.data.itinerary);
            console.log("finish load data");
            console.log(itinerary);
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
        const timeRegex = /^(0[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;

        if (!timeRegex.test(activity.time)) {
            Alert.alert(
                "Invalid Time",
                "Please enter time in HH:MM AM/PM format."
            );
            return;
        }

        setItinerary((prevItinerary) =>
            prevItinerary.map((day, index) => {
                if (index === dayIndex) {
                    const updatedActivities = [...day.activities, activity];

                    // Sort activities by time
                    updatedActivities.sort(
                        (a, b) =>
                            convertTo24Hour(a.time) - convertTo24Hour(b.time)
                    );

                    return { ...day, activities: updatedActivities };
                }
                return day;
            })
        );

        const convertTo24Hour = (time: string) => {
            const [_, hours, minutes, period] =
                time.match(/(\d+):(\d+)\s?(AM|PM)/i) || [];

            if (!hours || !minutes || !period) return 0; // Fallback for invalid time

            let hourNum = parseInt(hours, 10);
            let minuteNum = parseInt(minutes, 10);

            if (period.toUpperCase() === "PM" && hourNum !== 12) {
                hourNum += 12;
            } else if (period.toUpperCase() === "AM" && hourNum === 12) {
                hourNum = 0;
            }

            return hourNum * 60 + minuteNum; // Convert time to minutes for sorting
        };
        console.log("now is ");
        console.log(JSON.stringify(itinerary));
    };

    const removeActivity = (dayIndex: number, activityIndex: number) => {
        setItinerary((prevItinerary) =>
            prevItinerary.map((day, index) =>
                index === dayIndex
                    ? {
                          ...day,
                          activities: day.activities.filter(
                              (_, i) => i !== activityIndex
                          ),
                      }
                    : day
            )
        );
    };

    const handleSubmit = async () => {
        try {
            const session = await getSession();
            if (!session || !session.userId) {
                Alert.alert("No user session data. Please log in");
                navigation.navigate("Cover");
                return;
            }

            const { userId: userId } = session;
            console.log("the final itinerary to submit is ");
            console.log(JSON.stringify(itinerary));

            const response = await axios.put(
                `http://10.0.2.2:3000/itinerary/details/${userId}/${itineraryId}`,
                { itinerary }
            );

            if (response) {
                Alert.alert(
                    "Success",
                    "Itinerary details edited successfully!"
                );
                navigation.navigate("Itinerary");
            }
        } catch (error: any) {
            Alert.alert(
                "Error",
                `Failed to save itinerary details: ${error.message}`
            );
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>
                    Build your itinerary by filling details below
                </Text>
            </View>

            <FlatList
                data={itinerary}
                keyExtractor={(item) => item.day.toString()}
                renderItem={({ item, index }) => (
                    <View style={{ flex: 1 }}>
                        <Text style={styles.dateLabel}>
                            Day {item.day} :{" "}
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

                        <FlatList
                            data={item.activities}
                            keyExtractor={(activity, idx) => idx.toString()}
                            renderItem={({
                                item: activity,
                                index: activityIndex,
                            }) => (
                                <View style={styles.activityItem}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            removeActivity(index, activityIndex)
                                        }
                                        style={{ marginRight: 5 }}
                                    >
                                        <Ionicons
                                            name="trash-bin"
                                            size={24}
                                            color="#FF6347"
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.activityText}>
                                        {activity.time} - {activity.activity} @{" "}
                                        {activity.location}
                                    </Text>
                                </View>
                            )}
                        />
                    </View>
                )}
            />

            <View style={[styles.buttonContainer, { marginVertical: 15 }]}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        handleSubmit();
                    }}
                >
                    <Text style={styles.buttonText}>Save Itinerary</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
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
                    onChangeText={(text) => setTime(text)}
                />
            </View>

            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputLabel}>Activity</Text>
                <TextInput
                    style={styles.inputBox}
                    placeholder="Enter Activity"
                    value={activity}
                    onChangeText={(text) => setActivity(text)}
                />
            </View>

            <View style={{ flexDirection: "row" }}>
                <Text style={styles.inputLabel}>Location</Text>
                <TextInput
                    style={styles.inputBox}
                    placeholder="Enter Location"
                    value={location}
                    onChangeText={(text) => setLocation(text)}
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
    activityItem: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E6E6FA",
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 8,
        borderWidth: 1,
    },
    activityText: {
        fontSize: 16,
        fontFamily: "Roboto",
        color: "black",
    },
    buttonContainer: {
        // flex: 1,
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
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 5,
    },
    actionButton: {
        padding: 5,
        borderRadius: 5,
        width: 70,
        alignItems: "center",
    },
    editButton: {
        backgroundColor: "#FFD700",
    },
    deleteButton: {
        backgroundColor: "#FF6347",
    },
});

export default UpdateItineraryDetails;
