import React, { useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { RootStackParamList } from "../../assets/Types";
import { StackNavigationProp } from "@react-navigation/stack";

type HotelDetailsNavigationProp = StackNavigationProp<
    RootStackParamList,
    "HotelDetails"
>;
type Props = {
    navigation: HotelDetailsNavigationProp;
    route: RouteProp<RootStackParamList, "HotelDetails">;
};
const HotelDetails: React.FC<Props> = ({ navigation, route }) => {
    const { hotel } = route.params;

    const loadData = () => {
        console.log(JSON.stringify(hotel));
    };
    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Image
                    source={{ uri: hotel.photoUrls[0] }}
                    style={styles.mainImage}
                />
                <Text style={styles.name}>{hotel.name}</Text>
                <Text style={styles.location}>📍 {hotel.wishlistName}</Text>
                <Text style={styles.score}>
                    ⭐ {hotel.reviewScoreWord} ({hotel.reviewScore}) -{" "}
                    {hotel.reviewCount} Reviews
                </Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>💵 Pricing</Text>
                    <Text>
                        Original: $
                        {hotel.priceBreakdown?.strikethroughPrice?.value ||
                            " - "}
                    </Text>
                    <Text>
                        Discounted: $
                        {hotel.priceBreakdown?.grossPrice?.value.toFixed(2)}
                    </Text>
                    <Text>
                        Taxes & Charges: $
                        {hotel.priceBreakdown?.excludedPrice?.value.toFixed(2)}
                    </Text>
                    <Text style={styles.deal}>
                        🔖 {hotel.priceBreakdown?.benefitBadges?.[0]?.text}
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>🗓 Stay Dates</Text>
                    <Text>
                        Check-in: {hotel.checkinDate} at{" "}
                        {hotel.checkin.fromTime}
                    </Text>
                    <Text>
                        Check-out: {hotel.checkoutDate} by{" "}
                        {hotel.checkout.untilTime}
                    </Text>
                </View>

                {/* <View style={styles.section}>
                    <Text style={styles.sectionTitle}>📷 Gallery</Text>
                    <ScrollView horizontal>
                        {hotel.photoUrls.map((url: string, idx: number) => (
                            <Image
                                key={idx}
                                source={{ uri: url }}
                                style={styles.galleryImage}
                            />
                        ))}
                    </ScrollView>
                </View> */}
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
        paddingBottom: 20,
    },
    mainImage: {
        width: "100%",
        height: 220,
        borderRadius: 12,
        marginBottom: 12,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
    },
    location: {
        fontSize: 16,
        color: "gray",
        marginBottom: 4,
    },
    score: {
        fontSize: 16,
        marginBottom: 12,
    },
    section: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 6,
    },
    deal: {
        color: "green",
        fontWeight: "bold",
        marginTop: 4,
    },
    galleryImage: {
        width: 150,
        height: 100,
        marginRight: 8,
        borderRadius: 10,
    },
});

export default HotelDetails;
