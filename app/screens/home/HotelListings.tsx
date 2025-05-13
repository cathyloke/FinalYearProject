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
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../assets/Types";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type HotelListingsNavigationProp = StackNavigationProp<
    RootStackParamList,
    "HotelListings"
>;

type Props = {
    navigation: HotelListingsNavigationProp;
    route: RouteProp<RootStackParamList, "HotelListings">;
};

const HotelListings: React.FC<Props> = ({ navigation, route }) => {
    const { departure_date, arrival_date, dest_id, search_type } = route.params;

    const [loading, setLoading] = useState(false);
    const [hotels, setHotels] = useState<any[]>([]);

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const loadData = async (pageNum = 1) => {
        try {
            if (loading) return;

            setLoading(true);

            if (!dest_id) {
                throw new Error(
                    "Missing location input. Please enter the location name."
                );
            }

            if (!search_type) {
                throw new Error("Missing input. Please check your input.");
            }

            if (!departure_date) {
                throw new Error("Missing start date. Please check your input.");
            }

            if (!arrival_date) {
                throw new Error("Missing end date. Please check your input.");
            }

            const url = `https://booking-com15.p.rapidapi.com/api/v1/hotels/searchHotels?dest_id=${dest_id}&search_type=${search_type}&arrival_date=${arrival_date}&departure_date=${departure_date}&room_qty=1&page_number=${pageNum}&languagecode=en-us&currency_code=USD`;

            const options = {
                method: "GET",
                headers: {
                    "x-rapidapi-key": "YOURBOOKINGCOMAPIKEY",
                    "x-rapidapi-host": "booking-com15.p.rapidapi.com",
                },
            };

            const response = await axios.get(url, options);
            const fetchedData = response.data?.data?.hotels || [];

            if (fetchedData.length > 0) {
                setHotels((prev) => [...prev, ...fetchedData]);
                setPage(pageNum); // update current page
            } else {
                setHasMore(false); // no more data
            }
        } catch (error) {
            Alert.alert(`${error}`);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            setPage(1);
            setHotels([]);
            setHasMore(true);
            loadData(1);
        }, [])
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Modal visible={loading} transparent animationType="fade">
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color="#C37BC3" />
                        <Text style={styles.loadingText}>
                            Loading hotels...
                        </Text>
                    </View>
                </Modal>

                <Text style={styles.heading}>Search Hotels</Text>

                <View style={styles.scrollArea}>
                    {hotels.map((hotel, index) => {
                        const property = hotel.property;
                        return (
                            <TouchableOpacity
                                key={index}
                                style={styles.card}
                                onPress={() =>
                                    navigation.navigate("HotelDetails", {
                                        hotel: hotel.property,
                                    })
                                }
                            >
                                <Image
                                    source={{ uri: property.photoUrls[0] }}
                                    style={styles.cityImage}
                                />
                                <View style={styles.textContainer}>
                                    <Text style={styles.cityName}>
                                        {property.name}
                                    </Text>
                                    <Text style={styles.cityLabel}>
                                        {property.reviewScoreWord} (
                                        {property.reviewScore})
                                    </Text>
                                    <Text style={styles.cityHotels}>
                                        Reviews: {property.reviewCount}
                                    </Text>
                                    <Text style={styles.cityHotels}>
                                        Price: $
                                        {property.priceBreakdown.grossPrice.value.toFixed(
                                            2
                                        )}{" "}
                                        USD
                                    </Text>
                                    <Text style={styles.cityHotels}>
                                        Dates: {property.checkinDate} -{" "}
                                        {property.checkoutDate}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                {hasMore && !loading && (
                    <TouchableOpacity
                        style={styles.loadMoreBtn}
                        onPress={() => loadData(page + 1)}
                    >
                        <Text style={styles.loadMoreText}>Load More</Text>
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7EFE5",
        padding: 20,
    },
    content: {
        marginBottom: 20,
    },
    scrollArea: {
        marginTop: 20,
    },
    loadingOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.4)",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 18,
        color: "#fff",
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        backgroundColor: "#fff",
        padding: 10,
        marginTop: 12,
    },
    button: {
        backgroundColor: "#C37BC3",
        padding: 12,
        borderRadius: 10,
        marginTop: 15,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
    },
    card: {
        flexDirection: "row",
        marginVertical: 8,
        backgroundColor: "#fff",
        borderRadius: 8,
        elevation: 2,
        padding: 10,
    },
    cityImage: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: "space-around",
    },
    cityName: {
        fontSize: 16,
        fontWeight: "bold",
    },
    cityLabel: {
        color: "#666",
    },
    cityHotels: {
        fontSize: 13,
        color: "#888",
    },
    loadMoreBtn: {
        marginVertical: 20,
        padding: 12,
        backgroundColor: "#C37BC3",
        borderRadius: 10,
        alignItems: "center",
    },
    loadMoreText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default HotelListings;
