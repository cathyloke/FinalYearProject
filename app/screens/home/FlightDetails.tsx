import React, { useCallback, useState } from "react";
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
    Dimensions,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../assets/Types";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomStartEndDatePicker } from "../../components/CustomDatePicker";
import { RouteProp, useFocusEffect } from "@react-navigation/native";

type FlightDetailsNavigationProp = StackNavigationProp<
    RootStackParamList,
    "FlightDetails"
>;

type Props = {
    navigation: FlightDetailsNavigationProp;
    route: RouteProp<RootStackParamList, "FlightDetails">;
};

const screenWidth = Dimensions.get("window").width;

const FlightDetails: React.FC<Props> = ({ navigation, route }) => {
    const token = route?.params?.token;

    const [loading, setLoading] = useState(false);

    const [flightDetails, setFlightDetails] = useState<any>();

    const loadData = async () => {
        try {
            setLoading(true);

            if (!token) {
                throw new Error(
                    "Missing token. Please search the flight again."
                );
            }

            const url = `https://booking-com15.p.rapidapi.com/api/v1/flights/getFlightDetails?token=${token}&currency_code=USD`;
            const options = {
                method: "GET",
                headers: {
                    "x-rapidapi-key":
                        "a230c9ccd7mshb07ccda32616866p1f0411jsn819da13c3d68",
                    "x-rapidapi-host": "booking-com15.p.rapidapi.com",
                },
            };

            const response = await axios.get(url, options);
            setFlightDetails(response.data.data);

            setLoading(false);
        } catch (error) {
            setLoading(false);
            Alert.alert(`${error}`);
            navigation.goBack();
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    return (
        <ScrollView style={styles.container}>
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
                            Sending Flight Data ...
                        </Text>
                    </View>
                </Modal>
                <Text style={styles.heading}>Flights Details</Text>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={styles.sectionDirection}>
                        {
                            flightDetails?.segments?.[0]?.departureAirport
                                .cityName
                        }{" "}
                        -{" "}
                        {flightDetails?.segments?.[0]?.arrivalAirport.cityName}
                    </Text>
                </View>

                <Text style={styles.sectionTitle}>Departure</Text>
                <Text style={styles.details}>
                    {flightDetails?.segments?.[0]?.departureTime || "N/A"}
                </Text>

                <Text style={styles.details}>
                    {flightDetails?.segments?.[0]?.departureAirport.code}
                    {"-"}
                    {flightDetails?.segments?.[0]?.departureAirport.type}
                </Text>

                <Text style={styles.details}>
                    {flightDetails?.segments?.[0]?.departureAirport.cityName}
                    {", "}
                    {flightDetails?.segments?.[0]?.departureAirport.province}
                    {", "}
                    {flightDetails?.segments?.[0]?.departureAirport.countryName}
                </Text>

                <Text style={styles.sectionTitle}>Arrival</Text>
                <Text style={styles.details}>
                    {flightDetails?.segments?.[0]?.arrivalTime || "N/A"}
                </Text>

                <Text style={styles.details}>
                    {flightDetails?.segments?.[0]?.arrivalAirport.code}
                    {"-"}
                    {flightDetails?.segments?.[0]?.arrivalAirport.type}
                </Text>
                <Text style={styles.details}>
                    {flightDetails?.segments?.[0]?.arrivalAirport.cityName}
                    {", "}
                    {flightDetails?.segments?.[0]?.arrivalAirport.province}
                    {", "}
                    {flightDetails?.segments?.[0]?.arrivalAirport.countryName}
                </Text>

                <Text style={styles.sectionTitle}>Flight Info</Text>
                <Text>
                    Flight Number:{" "}
                    {
                        flightDetails?.segments?.[0]?.legs?.[0]?.flightInfo
                            ?.flightNumber
                    }
                </Text>
                <Text>
                    Cabin Class:{" "}
                    {flightDetails?.segments?.[0]?.legs?.[0]?.cabinClass}
                </Text>

                <Text style={styles.sectionTitle}>Carrier Info</Text>
                {flightDetails?.segments?.[0]?.legs?.[0]?.carriersData
                    .length === 0 ? (
                    <Text>N/A</Text>
                ) : (
                    flightDetails?.segments?.[0]?.legs?.[0]?.carriersData.map(
                        (carrier: any, index: number) => (
                            <View
                                style={{ flexDirection: "row" }}
                                key={`${carrier.code}-${index}`}
                            >
                                <Image
                                    source={{ uri: carrier.logo }}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        resizeMode: "cover",
                                    }}
                                />
                                <View>
                                    <Text>Code: {carrier.code}</Text>
                                    <Text>Name: {carrier.name}</Text>
                                </View>
                            </View>
                        )
                    )
                )}

                {/* return */}
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.sectionDirection}>
                        {
                            flightDetails?.segments?.[
                                flightDetails.segments.length - 1
                            ]?.departureAirport.cityName
                        }{" "}
                        -{" "}
                        {
                            flightDetails?.segments?.[
                                flightDetails.segments.length - 1
                            ]?.arrivalAirport.cityName
                        }
                    </Text>
                </View>

                <Text style={styles.sectionTitle}>Departure</Text>
                <Text style={styles.details}>
                    {
                        flightDetails?.segments?.[
                            flightDetails.segments.length - 1
                        ]?.departureTime
                    }
                </Text>
                <Text style={styles.details}>
                    {
                        flightDetails?.segments?.[
                            flightDetails.segments.length - 1
                        ]?.departureAirport.code
                    }
                    {"-"}
                    {
                        flightDetails?.segments?.[
                            flightDetails.segments.length - 1
                        ]?.departureAirport.type
                    }
                </Text>
                <Text style={styles.details}>
                    {
                        flightDetails?.segments?.[
                            flightDetails.segments.length - 1
                        ]?.departureAirport.cityName
                    }
                    {", "}
                    {
                        flightDetails?.segments?.[
                            flightDetails.segments.length - 1
                        ]?.departureAirport.province
                    }
                    {", "}
                    {
                        flightDetails?.segments?.[
                            flightDetails.segments.length - 1
                        ]?.departureAirport.countryName
                    }
                </Text>

                <Text style={styles.sectionTitle}>Arrival</Text>
                <Text style={styles.details}>
                    {
                        flightDetails?.segments?.[
                            flightDetails.segments.length - 1
                        ]?.arrivalTime
                    }
                </Text>
                <Text style={styles.details}>
                    {
                        flightDetails?.segments?.[
                            flightDetails.segments.length - 1
                        ]?.arrivalAirport.code
                    }
                    {"-"}
                    {
                        flightDetails?.segments?.[
                            flightDetails.segments.length - 1
                        ]?.arrivalAirport.type
                    }
                </Text>
                <Text style={styles.details}>
                    {
                        flightDetails?.segments?.[
                            flightDetails.segments.length - 1
                        ]?.arrivalAirport.cityName
                    }
                    {", "}
                    {
                        flightDetails?.segments?.[
                            flightDetails.segments.length - 1
                        ]?.arrivalAirport.province
                    }
                    {", "}
                    {
                        flightDetails?.segments?.[
                            flightDetails.segments.length - 1
                        ]?.arrivalAirport.countryName
                    }
                </Text>

                <Text style={styles.sectionTitle}>Flight Info</Text>
                <Text>
                    Flight Number:{" "}
                    {
                        flightDetails?.segments?.[
                            flightDetails.segments.length - 1
                        ]?.legs?.[0]?.flightInfo?.flightNumber
                    }
                </Text>
                <Text>
                    Cabin Class:{" "}
                    {
                        flightDetails?.segments?.[
                            flightDetails.segments.length - 1
                        ]?.legs?.[0]?.cabinClass
                    }
                </Text>

                <Text style={styles.sectionTitle}>Carrier Info</Text>

                {flightDetails?.segments?.[flightDetails.segments.length - 1]
                    ?.legs?.[0]?.carriersData.length === 0 ? (
                    <Text>N/A</Text>
                ) : (
                    flightDetails?.segments?.[
                        flightDetails.segments.length - 1
                    ]?.legs?.[0]?.carriersData.map(
                        (carrier: any, index: number) => (
                            <View
                                style={{ flexDirection: "row" }}
                                key={`${carrier.code}-${index}`}
                            >
                                <Image
                                    source={{ uri: carrier.logo }}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        resizeMode: "cover",
                                    }}
                                />
                                <View>
                                    <Text>Code: {carrier.code}</Text>
                                    <Text>Name: {carrier.name}</Text>
                                </View>
                            </View>
                        )
                    )
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
    heading: {
        fontSize: 20,
        fontWeight: "bold",
    },
    details: {
        fontSize: 15,
        fontFamily: "Roboto",
        textAlign: "justify",
    },
    sectionTitle: {
        fontFamily: "Itim-Regular",
        fontSize: 20,
        fontWeight: "600",
        marginTop: 14,
        borderBottomWidth: 1,
    },
    sectionDirection: {
        fontFamily: "Itim-Regular",
        fontSize: 20,
        fontWeight: "600",
        marginTop: 16,
    },
});

export default FlightDetails;
