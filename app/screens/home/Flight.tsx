import React, { useState } from "react";
import {
    ScrollView,
    TextInput,
    Text,
    View,
    StyleSheet,
    Alert,
    Modal,
    Image,
    TouchableOpacity,
    FlatList,
    Dimensions,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../assets/Types";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomStartEndDatePicker } from "../../components/CustomDatePicker";

type FlightNavigationProp = StackNavigationProp<RootStackParamList, "Flight">;

type Props = {
    navigation: FlightNavigationProp;
};

const screenWidth = Dimensions.get("window").width;

const Flight: React.FC<Props> = ({ navigation }) => {
    const [destination, setDestination] = useState("");
    const [loading, setLoading] = useState(false);
    const [flightDestinations, setFlightDestinations] = useState<any[]>([]);

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const [departureId, setDepartureId] = useState("");
    const [arrivalId, setArrivalId] = useState("");

    const [departureDestination, setDepartureDestination] = useState("");
    const [arrivalDestination, setArrivalDestination] = useState("");

    const [departureSuggestions, setDepartureSuggestions] = useState<any[]>([]);
    const [arrivalSuggestions, setArrivalSuggestions] = useState<any[]>([]);

    const fetchDestinations = async (type: string, query: string) => {
        // setLoading(true);
        try {
            const url = `https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination?query=${encodeURIComponent(
                query
            )}`;
            const options = {
                method: "GET",
                headers: {
                    "x-rapidapi-key":
                        "a230c9ccd7mshb07ccda32616866p1f0411jsn819da13c3d68",
                    "x-rapidapi-host": "booking-com15.p.rapidapi.com",
                },
            };

            const response = await axios.get(url, options);
            // console.log(response.data.data);
            if (response.status && response.data.data) {
                switch (type) {
                    case "departure":
                        setDepartureSuggestions(response.data.data);
                        break;
                    case "arrival":
                        setArrivalSuggestions(response.data.data);
                        break;
                    default:
                        break;
                }
            }
        } catch (error: any) {
            console.error("Error fetching destinations:", error);
        } finally {
            // setLoading(false);
        }
    };

    const handleDestinationInput = (
        type: "departure" | "arrival",
        text: string
    ) => {
        if (type === "departure") {
            // console.log(text);
            setDepartureDestination(text);
            if (text.length >= 2) {
                fetchDestinations("departure", text);
            } else {
                setDepartureSuggestions([]);
            }
        } else {
            setArrivalDestination(text);
            if (text.length >= 2) {
                fetchDestinations("arrival", text);
            } else {
                setArrivalSuggestions([]);
            }
        }
    };

    const handleDepartureSelect = (item: any) => {
        console.log("selected item id is : ", item.id);
        setDepartureDestination(item.name);
        setDepartureId(item.id);
        setDepartureSuggestions([]);
    };

    const handldArrivalSelect = (item: any) => {
        console.log("selected item id is : ", item.id);
        setArrivalDestination(item.name);
        setArrivalId(item.id);
        setArrivalSuggestions([]);
    };

    const fetchFlights = async () => {
        try {
            setLoading(true);
            if (!startDate || !endDate || !departureId || !arrivalId) {
                throw new Error(`Missing details`);
            }

            const departure_date = startDate.toISOString().split("T")[0];
            const arrival_date = endDate.toISOString().split("T")[0];

            const url = `https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights?fromId=${departureId}&toId=${arrivalId}&departDate=${departure_date}&returnDate=${arrival_date}&pageNo=1&adults=1&children=0%2C17&currency_code=USD`;
            const options = {
                method: "GET",
                headers: {
                    "x-rapidapi-key":
                        "a230c9ccd7mshb07ccda32616866p1f0411jsn819da13c3d68",
                    "x-rapidapi-host": "booking-com15.p.rapidapi.com",
                },
            };

            const response = await axios.get(url, options);
            console.log("flights offer here");
            console.log(JSON.stringify(response.data.data.flightOffers));
            setFlightDestinations(response.data.data.flightOffers);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            Alert.alert(`${error}`);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <CustomStartEndDatePicker
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={(date) => setStartDate(date)}
                onEndDateChange={(date) => setEndDate(date)}
            />
            <View style={styles.content}>
                <Modal
                    visible={loading}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setLoading(false)}
                >
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color="#C37BC3" />
                        <Text style={styles.loadingText}>
                            Searching Flights ...
                        </Text>
                    </View>
                </Modal>

                <Text style={styles.heading}>Search Flights</Text>
                <Text style={styles.subheading}>Departure Destination</Text>

                <View style={{ flexDirection: "row" }}>
                    <TextInput
                        style={[styles.input, { width: screenWidth * 0.7 }]}
                        placeholder="Enter departure destination (e.g. Kuala Lumpur)"
                        placeholderTextColor="#C37BC3"
                        value={departureDestination}
                        onChangeText={setDepartureDestination}
                    />
                    <TouchableOpacity
                        onPress={() =>
                            handleDestinationInput(
                                "departure",
                                departureDestination
                            )
                        }
                        style={styles.inputSearch}
                    >
                        <Text>Search</Text>
                    </TouchableOpacity>
                </View>

                {departureSuggestions.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.item}
                        onPress={() => handleDepartureSelect(item)}
                    >
                        <Image
                            source={{ uri: item.photoUri }}
                            style={styles.thumbnail}
                        />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.details}>
                                {item.regionName}, {item.countryName}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}

                <Text style={styles.subheading}>Arrival Destination</Text>
                <View style={{ flexDirection: "row" }}>
                    <TextInput
                        style={[styles.input, { width: screenWidth * 0.7 }]}
                        placeholder="Enter arrival destination (e.g. Kuala Lumpur)"
                        placeholderTextColor="#C37BC3"
                        value={arrivalDestination}
                        onChangeText={setArrivalDestination}
                    />
                    <TouchableOpacity
                        onPress={() =>
                            handleDestinationInput(
                                "arrival",
                                arrivalDestination
                            )
                        }
                        style={styles.inputSearch}
                    >
                        <Text>Search</Text>
                    </TouchableOpacity>
                </View>

                {arrivalSuggestions.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.item}
                        onPress={() => handldArrivalSelect(item)}
                    >
                        <Image
                            source={{ uri: item.photoUri }}
                            style={styles.thumbnail}
                        />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.details}>
                                {item.regionName}, {item.countryName}
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}

                <TouchableOpacity style={styles.button} onPress={fetchFlights}>
                    <Text style={styles.buttonText}>Search Flights</Text>
                </TouchableOpacity>

                {flightDestinations.length > 0 && (
                    <View>
                        <Text style={[styles.heading, { marginVertical: 10 }]}>
                            Search Results
                        </Text>

                        <ScrollView>
                            {flightDestinations.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.item}
                                    onPress={() =>
                                        navigation.navigate("FlightDetails", {
                                            token: item.token,
                                        })
                                    }
                                >
                                    {/* <Image
                                        source={{ uri: item.photoUri }}
                                        style={styles.thumbnail}
                                    /> */}

                                    <View style={{ flex: 1, paddingBottom: 5 }}>
                                        {/* Route info */}
                                        <Text style={styles.route}>
                                            Departure{" "}
                                        </Text>

                                        <Text>
                                            🗓
                                            {
                                                item.segments[0].departureTime
                                            } - {item.segments[0].arrivalTime}
                                        </Text>

                                        <Text>
                                            📍
                                            {
                                                item.segments[0]
                                                    .departureAirport.code
                                            }
                                            {"-"}
                                            {
                                                item.segments[0]
                                                    .departureAirport.type
                                            }{" "}
                                            ({" "}
                                            {
                                                item.segments[0]
                                                    .departureAirport.cityName
                                            }
                                            ,{" "}
                                            {
                                                item.segments[0]
                                                    .departureAirport
                                                    .countryName
                                            }{" "}
                                            )
                                        </Text>
                                        <Text>
                                            📍
                                            {
                                                item.segments[0].arrivalAirport
                                                    .code
                                            }
                                            {"-"}
                                            {
                                                item.segments[0].arrivalAirport
                                                    .type
                                            }{" "}
                                            ({" "}
                                            {
                                                item.segments[0].arrivalAirport
                                                    .cityName
                                            }
                                            ,{" "}
                                            {
                                                item.segments[0].arrivalAirport
                                                    .countryName
                                            }{" "}
                                            )
                                        </Text>

                                        <Text style={styles.route}>
                                            Arrival
                                        </Text>

                                        <Text>
                                            🗓
                                            {
                                                item.segments[
                                                    item.segments.length - 1
                                                ].departureTime
                                            }{" "}
                                            -{" "}
                                            {
                                                item.segments[
                                                    item.segments.length - 1
                                                ].arrivalTime
                                            }
                                        </Text>
                                        <Text>
                                            📍
                                            {
                                                item.segments[
                                                    item.segments.length - 1
                                                ].departureAirport.code
                                            }
                                            {"-"}
                                            {
                                                item.segments[
                                                    item.segments.length - 1
                                                ].departureAirport.type
                                            }{" "}
                                            ({" "}
                                            {
                                                item.segments[
                                                    item.segments.length - 1
                                                ].departureAirport.cityName
                                            }
                                            ,{" "}
                                            {
                                                item.segments[
                                                    item.segments.length - 1
                                                ].departureAirport.countryName
                                            }{" "}
                                            )
                                        </Text>
                                        <Text>
                                            📍
                                            {
                                                item.segments[
                                                    item.segments.length - 1
                                                ].arrivalAirport.code
                                            }
                                            {"-"}
                                            {
                                                item.segments[
                                                    item.segments.length - 1
                                                ].arrivalAirport.type
                                            }{" "}
                                            ({" "}
                                            {
                                                item.segments[
                                                    item.segments.length - 1
                                                ].arrivalAirport.cityName
                                            }
                                            ,{" "}
                                            {
                                                item.segments[
                                                    item.segments.length - 1
                                                ].arrivalAirport.countryName
                                            }{" "}
                                            )
                                        </Text>

                                        {/* Times and duration
                                        <Text style={styles.times}>
                                            {item.segments[0].departureTime} -{" "}
                                            {
                                                item.segments[
                                                    item.segments.length - 1
                                                ].arrivalTime
                                            }
                                        </Text>

                                        <Text style={styles.duration}>
                                            Duration: {item.duration}
                                        </Text> */}

                                        {/* Airline and price */}
                                        {/* <Text style={styles.airline}>
                                            {item.airline}
                                        </Text>
                                        <Text style={styles.price}>
                                            ${item.price}
                                        </Text> */}
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7EFE5",
    },
    content: {
        flex: 1,
        padding: 20,
    },
    loadingOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 18,
        color: "#fff",
    },
    // heading: {
    //     fontSize: 20,
    //     fontWeight: "bold",
    //     marginBottom: 10,
    // },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        backgroundColor: "#fff",
    },
    inputSearch: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        // padding: 10,
        marginLeft: 20,
        marginBottom: 10,
        borderRadius: 8,
        backgroundColor: "#fff",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#C37BC3",
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
    card: {
        flexDirection: "row",
        padding: 10,
        marginVertical: 5,
        backgroundColor: "#fff",
        borderRadius: 8,
        elevation: 2,
    },
    cityImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    textContainer: {
        marginLeft: 10,
        justifyContent: "center",
        flex: 1,
    },
    cityName: {
        fontFamily: "Roboto",
        fontSize: 18,
        fontWeight: "bold",
    },
    cityLabel: {
        fontFamily: "Roboto",
        color: "#666",
    },
    cityFlights: {
        marginTop: 4,
        fontSize: 14,
        color: "#888",
    },
    footerText: {
        marginTop: 30,
        textAlign: "center",
        fontSize: 16,
        color: "#666",
    },
    name: {
        fontSize: 16,
        fontWeight: "500",
    },
    details: {
        fontSize: 12,
        color: "#555",
    },
    heading: { fontSize: 18, fontWeight: "bold" },
    subheading: { fontSize: 15, fontWeight: "bold", marginVertical: 10 },
    item: {
        flexDirection: "row",
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#ccc",
    },
    thumbnail: { width: 50, height: 50 },
    route: { fontSize: 16, fontWeight: "600" },
    times: { fontSize: 14, color: "#555" },
    duration: { fontSize: 14, color: "#777" },
    airline: { fontSize: 14, color: "#333" },
    price: { fontSize: 16, fontWeight: "bold", color: "#0a7" },
});

export default Flight;
