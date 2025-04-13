import React, { useCallback, useRef, useState } from "react";
import {
    ScrollView,
    Text,
    View,
    Image,
    StyleSheet,
    Alert,
    Dimensions,
    NativeSyntheticEvent,
    NativeScrollEvent,
    Modal,
    FlatList
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../assets/Types";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";

type AttractionDetailsNavigationProp = StackNavigationProp<
    RootStackParamList,
    "AttractionDetails"
>;

type Props = {
    navigation: AttractionDetailsNavigationProp;
    route: RouteProp<RootStackParamList, "AttractionDetails">;
};

const screenWidth = Dimensions.get("window").width;

const AttractionDetails: React.FC<Props> = ({ navigation, route }) => {
    const { productSlug } = route.params;

    const [products, setProducts] = useState<any[]>([]);
    const [attractionDetails, setAttractionDetails] = useState<any>();
    const [photos, setPhotos] = useState<string[]>([]);
    const [reviews, setReviews] = useState<any[]>([]);

    const loadData = async () => {
        try {
            setLoading(true);
            setProducts([]);

            const url = `https://booking-com15.p.rapidapi.com/api/v1/attraction/getAttractionDetails?slug=${productSlug}&currency_code=USD`;
            const options = {
                method: "GET",
                headers: {
                    "x-rapidapi-key":
                        "a230c9ccd7mshb07ccda32616866p1f0411jsn819da13c3d68",
                    "x-rapidapi-host": "booking-com15.p.rapidapi.com",
                },
            };

            const response = await axios.get(url, options);
            const attractionDet = response.data?.data || [];
            setAttractionDetails(attractionDet);

            console.log("Attraction Details");
            console.log(JSON.stringify(attractionDet));

            setReviews(attractionDet.reviews.reviews);

            setPhotos(attractionDet.photos.map((photo: any) => photo.small));
            setLoading(false);
        } catch (error) {
            Alert.alert(`${error}`);
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const index = Math.round(
            event.nativeEvent.contentOffset.x / screenWidth
        );
        setActiveIndex(index);
    };
    const [loading, setLoading] = useState(false);

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
                            Sending Attraction Data ...
                        </Text>
                    </View>
                </Modal>

                <Text style={styles.heading}>
                    {attractionDetails?.name ? attractionDetails?.name : "N/A"}
                </Text>
                {/* <Text style={styles.details}>{productSlug}</Text> */}

                {/* Carousel */}
                <View>
                    <FlatList
                        ref={flatListRef}
                        data={photos}
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(_, index) => index.toString()}
                        onScroll={handleScroll}
                        renderItem={({ item }) => (
                            <Image
                                source={{ uri: item }}
                                style={{
                                    width: screenWidth,
                                    height: 200,
                                    resizeMode: "cover",
                                }}
                            />
                        )}
                    />

                    {/* Dots */}
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "center",
                            marginTop: 10,
                        }}
                    >
                        {photos.map((_, index) => (
                            <View
                                key={index}
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: 4,
                                    marginHorizontal: 4,
                                    backgroundColor:
                                        activeIndex === index ? "#333" : "#ccc",
                                }}
                            />
                        ))}
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Description</Text>

                <Text style={styles.details}>
                    {attractionDetails?.description
                        ? attractionDetails?.description
                        : "asd"}
                </Text>

                <Text style={styles.sectionTitle}>Reviews</Text>

                {reviews.length === 0 ? (
                    <Text style={styles.reviewText}>N/A</Text>
                ) : (
                    reviews
                        .filter((review) => review.user?.name?.trim())
                        .map((review) => (
                            <View key={review.id} style={styles.review}>
                                <Text style={styles.reviewName}>
                                    {review.user.name} — Rating:{" "}
                                    {review.numericRating}{" "}
                                    <Ionicons
                                        name="star"
                                        size={12}
                                        color="gold"
                                    />
                                </Text>
                                <Text style={styles.reviewText}>
                                    {review.content}
                                </Text>
                            </View>
                        ))
                )}

                <Text style={styles.sectionTitle}>Operated By</Text>
                <Text style={styles.reviewText}>
                    {attractionDetails?.operatedBy
                        ? attractionDetails?.operatedBy
                        : "N/A"}
                </Text>
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
    heading: {
        fontSize: 20,
        fontFamily: "Roboto",
        fontWeight: "bold",
        marginBottom: 10,
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
        marginTop: 16,
        borderBottomWidth: 1,
    },
    text: {
        fontFamily: "Roboto",
        fontSize: 16,
    },
    review: {
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    reviewName: {
        fontFamily: "Roboto",
        fontWeight: "bold",
        fontSize: 14,
    },
    reviewText: {
        fontSize: 14,
        textAlign: "justify",
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
});

export default AttractionDetails;
