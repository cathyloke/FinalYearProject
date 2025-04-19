import React, { useCallback, useState } from "react";
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
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { CustomStartEndDatePicker } from "../../components/CustomDatePicker";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";
import { getSession } from "../../assets/asyncStorageData";

type UpdateItineraryNavigationProp = StackNavigationProp<
    RootStackParamList,
    "UpdateItinerary"
>;

type Props = {
    navigation: UpdateItineraryNavigationProp;
    route: RouteProp<RootStackParamList, "UpdateItinerary">;
};

type TravelMode = {
    _id: string;
    name: string;
};

type Interest = {
    _id: string;
    name: string;
};

const screenWidth = Dimensions.get("window").width;

const UpdateItinerary: React.FC<Props> = ({ navigation, route }) => {
    const { itineraryId } = route.params;

    const [budget, setBudget] = useState("");

    const budgetCategories = [
        { label: "Low", value: "low" },
        { label: "Medium", value: "medium" },
        { label: "High", value: "high" },
    ];

    const [selectedInterests, setSelectedInterests] = useState<String[]>([]);
    const [selectedTravelMode, setSelectedTravelMode] = useState("");

    const toggleMode = (mode: string) => {
        setSelectedInterests((prev) =>
            prev.includes(mode)
                ? prev.filter((item) => item !== mode)
                : [...prev, mode]
        );
    };

    const [travelModes, setTravelModes] = useState<TravelMode[]>([]);
    const [interests, setInterests] = useState<Interest[]>([]);

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    const loadData = async () => {
        try {
            console.log("Loading data");

            const travelModeRes = await axios.get(
                `http://192.168.1.18:3000/preferences/travelMode`
            );

            // console.log(travelModeRes.data.data);
            const travelModeData = travelModeRes.data.data;
            setTravelModes(travelModeData);

            const interestRes = await axios.get(
                `http://192.168.1.18:3000/preferences/interest`
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

            const response = await axios.get(
                `http://192.168.1.18:3000/itinerary/${userId}/${itineraryId}`
            );

            setStartDate(new Date(response.data.data.startDate));
            setEndDate(new Date(response.data.data.endDate));
            setName(response.data.data.name);
            setDestination(response.data.data.destination);
            setBudget(response.data.data.budget);
            setSelectedInterests(response.data.data.interests);
            setSelectedTravelMode(response.data.data.travelModes[0]);
        } catch (error) {
            Alert.alert(`${error}`);
        }
    };

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const [name, setName] = useState("");
    const [destination, setDestination] = useState("");

    const calculateDuration = () => {
        if (!startDate || !endDate) return null;
        const diffTime = endDate.getTime() - startDate.getTime();
        return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24) + 1), 1); // Minimum 1 day
    };

    const updateTrip = async () => {
        try {
            const session = await getSession();
            if (!session || !session.userId) {
                Alert.alert("No user session data. Please log in");
                navigation.navigate("Cover");
                return;
            }
            const { userId: userId } = session;

            if (
                !startDate ||
                !endDate ||
                !name ||
                !destination ||
                !budget ||
                !selectedTravelMode ||
                !selectedInterests
            ) {
                Alert.alert("Please check the missing details");
                return;
            }

            if (endDate < startDate) {
                Alert.alert("End date must be later than start date.");
                return;
            }

            const tripDays = calculateDuration();

            const planData = await axios.get(
                `http://192.168.1.18:3000/itinerary/${userId}/${itineraryId}`
            );

            if (planData.data.data.itinerary.length > Number(tripDays)) {
                Alert.alert(
                    "Are you sure to edit this trip?",
                    "Your itinerary details have more days than the trip day you set.",
                    [
                        {
                            text: "Cancel",
                            onPress: () => {
                                console.log("Cancel Pressed");
                                return;
                            },
                            style: "cancel",
                        },
                        {
                            text: "Yes",
                            onPress: async () => {
                                console.log("Edit Trip");

                                planData.data.data.itinerary =
                                    planData.data.data.itinerary.slice(
                                        0,
                                        Number(tripDays)
                                    );

                                const updatedData = {
                                    name: name,
                                    days: tripDays,
                                    startDate: startDate,
                                    endDate: endDate,
                                    destination: destination,
                                    budget: budget,
                                    travelModes: selectedTravelMode,
                                    interests: selectedInterests,
                                    itinerary: planData.data.data.itinerary,
                                };

                                const response = await axios.put(
                                    `http://192.168.1.18:3000/itinerary/${userId}/${itineraryId}`,
                                    updatedData
                                );

                                Alert.alert("Trip Updated Successfully");
                                navigation.navigate("Itinerary");
                            },
                        },
                    ]
                );
                return;
            }

            const updatedData = {
                name: name,
                days: tripDays,
                startDate: startDate,
                endDate: endDate,
                destination: destination,
                budget: budget,
                travelModes: selectedTravelMode,
                interests: selectedInterests,
                itinerary: planData.data.data.itinerary,
            };

            console.log("sadkashdkajhdkajhdkjh");
            console.log(updatedData);

            const response = await axios.put(
                `http://192.168.1.18:3000/itinerary/${userId}/${itineraryId}`,
                updatedData
            );

            Alert.alert("Trip Updated Successfully");
            navigation.navigate("Itinerary");
        } catch (error) {
            Alert.alert(`${error}`);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>
                    Build your trip by filling details below
                </Text>
            </View>

            <CustomStartEndDatePicker
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={(date) => setStartDate(date)}
                onEndDateChange={(date) => setEndDate(date)}
            />

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Trip Name</Text>
                <TextInput
                    keyboardType="email-address"
                    placeholder="Enter trip name"
                    placeholderTextColor="#C37BC3"
                    style={styles.inputBox}
                    value={name}
                    onChangeText={(text) => setName(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Destination</Text>
                <TextInput
                    keyboardType="email-address"
                    placeholder="Enter trip destination"
                    placeholderTextColor="#C37BC3"
                    style={styles.inputBox}
                    value={destination}
                    onChangeText={(text) => setDestination(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Budget Category</Text>

                <Dropdown
                    style={styles.inputBox}
                    data={budgetCategories}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Budget"
                    value={budget}
                    onChange={(item) => {
                        setBudget(item.value);
                    }}
                    placeholderStyle={styles.placeholderText}
                ></Dropdown>
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Travel Mode</Text>

                <Dropdown
                    style={styles.inputBox}
                    data={travelModes.map((item) => ({
                        ...item,
                        name:
                            item.name.charAt(0).toUpperCase() +
                            item.name.slice(1).toLowerCase(),
                    }))}
                    labelField="name"
                    valueField="name"
                    placeholder="Select Travel Mode"
                    value={selectedTravelMode}
                    onChange={(item) => {
                        setSelectedTravelMode(item.name);
                    }}
                    placeholderStyle={styles.placeholderText}
                />
            </View>

            {/* name, days, destination, budget, travelModes, interests, itinerary */}

            <View style={styles.multiSelect}>
                <Text style={styles.inputLabel}>Interests</Text>

                <ScrollView
                    style={{ maxHeight: 200 }}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    showsVerticalScrollIndicator={true}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            justifyContent: "center",
                        }}
                    >
                        {interests.map((interest) => (
                            <TouchableOpacity
                                key={interest._id}
                                onPress={() => toggleMode(interest.name)}
                                style={{
                                    width: "30%",
                                    margin: "1.5%",
                                    padding: 10,
                                    backgroundColor: selectedInterests.includes(
                                        interest.name
                                    )
                                        ? "#C37BC3"
                                        : "#DDDDDD",
                                    borderRadius: 5,
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 15,
                                        textAlign: "center",
                                        color: selectedInterests.includes(
                                            interest.name
                                        )
                                            ? "white"
                                            : "black",
                                    }}
                                >
                                    {interest.name.charAt(0).toUpperCase() +
                                        interest.name.slice(1).toLowerCase()}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        updateTrip();
                    }}
                >
                    <Text style={styles.buttonText}>Update Trip</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
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
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
    },
    multiSelect: {
        marginTop: 20,
    },
    inputLabel: {
        marginHorizontal: 10,
        fontSize: 18,
        fontFamily: "Itim-Regular",
        color: "black",
        width: screenWidth * 0.35,
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
    placeholderText: {
        fontFamily: "Roboto",
        fontSize: 15,
        color: "#C37BC3",
    },
    buttonContainer: { alignItems: "center", marginBottom: 20 },
    button: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#C37BC3",
        width: 200,
        height: 40,
        marginTop: 20,
        borderRadius: 10,
        borderWidth: 1.5,
    },
    buttonText: {
        fontFamily: "Itim-Regular",
        justifyContent: "center",
        color: "white",
        alignSelf: "center",
        fontSize: 20,
    },
});

export default UpdateItinerary;
