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
import { ScrollView } from "react-native-gesture-handler";
import { CustomStartEndDatePicker } from "../../components/CustomDatePicker";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";

type CreateItineraryNavigationProp = StackNavigationProp<
    RootStackParamList,
    "CreateItinerary"
>;

type Props = {
    navigation: CreateItineraryNavigationProp;
    route: RouteProp<RootStackParamList, "CreateItinerary">;
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

const CreateItinerary: React.FC<Props> = ({ navigation, route }) => {
    const { type } = route.params;
    /**
     *  {
     *      name
            days: { type: Number },
            destination: { type: String },
            budget: {
                type: String,
                enum: ["High", "Medium", "Low"],
            },
            travelModes: [String],
            interests: [String],
            itinerary: [
                {
                    day: { type: Number },
                    activities: [
                        {
                            time: { type: Date },
                            activity: { type: String },
                            location: { type: String },
                        },
                    ],
                },
            ],
        }
        
     */

    if (type === "Manual") {
        return <ManualItinerary navigation={navigation} />;
    } else if (type === "AI") {
        return <AIItinerary navigation={navigation} />;
    } else {
        return (
            <View>
                <Text>Invalid route parameter</Text>
            </View>
        );
    }
};

const ManualItinerary = ({
    navigation,
}: {
    navigation: CreateItineraryNavigationProp;
}) => {
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

    useEffect(() => {
        // console.log("Updated interests:", interests);
    }, [interests]);

    const loadData = async () => {
        try {
            console.log("loading data");
            const travelModeRes = await axios.get(
                `http://10.0.2.2:3000/preferences/travelMode`
            );

            // console.log(travelModeRes.data.data);
            const travelModeData = travelModeRes.data.data;
            setTravelModes(travelModeData);

            const interestRes = await axios.get(
                `http://10.0.2.2:3000/preferences/interest`
            );

            // console.log(interestRes.data.data);
            const interestData = interestRes.data.data;
            setInterests(interestData);

            // console.log("interest");

            // console.log(interests);
        } catch (error) {
            Alert.alert(`Error: ${error}`);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>
                    Build your trip by filling details below
                </Text>
            </View>

            <CustomStartEndDatePicker />

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Trip Name</Text>
                <TextInput
                    keyboardType="email-address"
                    placeholder="Enter trip name"
                    placeholderTextColor="#C37BC3"
                    style={styles.inputBox}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Destination</Text>
                <TextInput
                    keyboardType="email-address"
                    placeholder="Enter trip destination"
                    placeholderTextColor="#C37BC3"
                    style={styles.inputBox}
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
                    data={travelModes}
                    labelField="name"
                    valueField="_id"
                    placeholder="Select Travel Mode"
                    value={selectedTravelMode}
                    onChange={(item) => {
                        setSelectedTravelMode(item._id);
                    }}
                    placeholderStyle={styles.placeholderText}
                />
            </View>

            {/* name, days, destination, budget, travelModes, interests, itinerary */}

            <View style={styles.multiSelect}>
                <Text style={styles.inputLabel}>Interests</Text>

                <ScrollView
                    style={{ maxHeight: 300 }}
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

                {/* <Text style={{ marginTop: 20, fontSize: 16 }}>
                    Selected: {selectedInterests.join(", ") || "None"}
                </Text> */}
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        Alert.alert("Trip Created Successfully");
                        navigation.goBack();
                    }}
                >
                    <Text style={styles.buttonText}>Create Trip</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const AIItinerary = ({
    navigation,
}: {
    navigation: CreateItineraryNavigationProp;
}) => {
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

    useEffect(() => {
        // console.log("Updated interests:", interests);
    }, [interests]);

    const loadData = async () => {
        try {
            console.log("loading data");
            const travelModeRes = await axios.get(
                `http://10.0.2.2:3000/preferences/travelMode`
            );

            // console.log(travelModeRes.data.data);
            const travelModeData = travelModeRes.data.data;
            setTravelModes(travelModeData);

            const interestRes = await axios.get(
                `http://10.0.2.2:3000/preferences/interest`
            );

            // console.log(interestRes.data.data);
            const interestData = interestRes.data.data;
            setInterests(interestData);

            // console.log("interest");

            // console.log(interests);
        } catch (error) {
            Alert.alert(`Error: ${error}`);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Build your trip through AI</Text>
            </View>

            <CustomStartEndDatePicker />

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Trip Name</Text>
                <TextInput
                    keyboardType="email-address"
                    placeholder="Enter trip name"
                    placeholderTextColor="#C37BC3"
                    style={styles.inputBox}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>Destination</Text>
                <TextInput
                    keyboardType="email-address"
                    placeholder="Enter trip destination"
                    placeholderTextColor="#C37BC3"
                    style={styles.inputBox}
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
                    data={travelModes}
                    labelField="name"
                    valueField="_id"
                    placeholder="Select Travel Mode"
                    value={selectedTravelMode}
                    onChange={(item) => {
                        setSelectedTravelMode(item._id);
                    }}
                    placeholderStyle={styles.placeholderText}
                />
            </View>

            {/* name, days, destination, budget, travelModes, interests, itinerary */}

            <View style={styles.multiSelect}>
                <Text style={styles.inputLabel}>Interests</Text>

                <ScrollView
                    style={{ maxHeight: 300 }}
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
                        Alert.alert("Trip Generated Successfully");
                        navigation.goBack();
                    }}
                >
                    <Text style={styles.buttonText}>Generate Trip</Text>
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
        borderColor: "black",
        borderRadius: 10,
        borderWidth: 1.5,
        // width: screenWidth * 0.7,
        height: 50,
    },
    placeholderText: {
        fontFamily: "Roboto",
        fontSize: 15,
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

export default CreateItinerary;
