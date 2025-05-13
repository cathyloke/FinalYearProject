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
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../assets/Types";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomStartEndDatePicker } from "../../components/CustomDatePicker";

type HotelNavigationProp = StackNavigationProp<RootStackParamList, "Hotel">;

type Props = {
    navigation: HotelNavigationProp;
};

const Hotel: React.FC<Props> = ({ navigation }) => {
    const [destination, setDestination] = useState("");
    const [loading, setLoading] = useState(false);
    const [hotelDestinations, setHotelDestinations] = useState<any[]>([]);

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const fetchHotels = async () => {
        try {
            setLoading(true);
            setHotelDestinations([]);

            if (!destination) {
                throw new Error(
                    "Missing location input. Please enter the location name."
                );
            }

            const url = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchDestination?query=${destination}`;
            const options = {
                method: "GET",
                headers: {
                    "x-rapidapi-key": "YOURRAPIDAPIKEY",
                    "x-rapidapi-host": "booking-com15.p.rapidapi.com",
                },
            };

            const response = await axios.get(url, options);
            const fetchedData = response.data?.data || [];
            setHotelDestinations(fetchedData);

            console.log(JSON.stringify(fetchedData));
            setLoading(false);
        } catch (error) {
            setLoading(false);
            Alert.alert(`${error}`);
        }
    };

    const navigateToListings = async (id: string, type: string) => {
        try {
            if (!startDate || !endDate || !id || !type) {
                throw new Error(`Missing details`);
            }

            navigation.navigate("HotelListings", {
                arrival_date: startDate.toISOString().split("T")[0],
                departure_date: endDate.toISOString().split("T")[0],
                dest_id: id,
                search_type: type,
            });
        } catch (error) {
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
                            Searching Destination ...
                        </Text>
                    </View>
                </Modal>

                <Text style={styles.heading}>Search Destinations</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter destination (e.g. New York)"
                    value={destination}
                    onChangeText={setDestination}
                />

                <TouchableOpacity style={styles.button} onPress={fetchHotels}>
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>

                <View style={{ paddingVertical: 20, paddingBottom: 40 }}>
                    {hotelDestinations.map((item) => (
                        <TouchableOpacity
                            key={item.dest_id}
                            style={styles.card}
                            onPress={() =>
                                navigateToListings(
                                    item.dest_id,
                                    item.search_type
                                )
                            }
                        >
                            <Image
                                source={{ uri: item.image_url }}
                                style={styles.cityImage}
                                resizeMode="cover"
                            />
                            <View style={styles.textContainer}>
                                <Text style={styles.cityName}>{item.name}</Text>
                                <Text style={styles.cityLabel}>
                                    {item.label}
                                </Text>
                                <Text style={styles.cityHotels}>
                                    Hotels: {item.hotels}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
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
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
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
    cityHotels: {
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
});

export default Hotel;
