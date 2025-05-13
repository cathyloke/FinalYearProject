import React, { useCallback, useState } from "react";
import {
    ScrollView,
    TextInput,
    Text,
    View,
    StyleSheet,
    Alert,
    Modal,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../assets/Types";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

type AttractionNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Attraction"
>;

type Props = {
    navigation: AttractionNavigationProp;
};

const Attraction: React.FC<Props> = ({ navigation }) => {
    const [destination, setDestination] = useState("");
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState<any[]>([]);

    const fetchAttractions = async () => {
        try {
            setLoading(true);
            setProducts([]);

            if (!destination) {
                throw new Error(
                    "Missing location input. Please enter the location name."
                );
            }

            const url = `https://booking-com15.p.rapidapi.com/api/v1/attraction/searchLocation?query=${encodeURIComponent(
                destination
            )}&languagecode=en-us`;

            const options = {
                headers: {
                    "x-rapidapi-key": "YOURRAPIDAPIKEY",
                    "x-rapidapi-host": "booking-com15.p.rapidapi.com",
                },
            };

            const response = await axios.get(url, options);
            const fetchedProducts = response.data?.data?.products || [];
            setProducts(fetchedProducts);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            Alert.alert(`${error}`);
        }
    };

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
                            Searching Attraction ...
                        </Text>
                    </View>
                </Modal>

                <Text style={styles.heading}>Search Attractions</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter destination (e.g. New York)"
                    value={destination}
                    onChangeText={setDestination}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={fetchAttractions}
                >
                    <Text style={styles.buttonText}>Search</Text>
                </TouchableOpacity>

                {products.length > 0 && (
                    <View style={styles.results}>
                        {products.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.resultItem}
                                onPress={() =>
                                    navigation.navigate("AttractionDetails", {
                                        productSlug: item.productSlug,
                                    })
                                }
                            >
                                <Text style={styles.resultText}>
                                    {item.title}
                                </Text>
                                <Text style={styles.metaText}>
                                    {item.cityName},{" "}
                                    {item.countryCode.toUpperCase()}
                                </Text>
                                <Text style={styles.slugText}>
                                    Category:{" "}
                                    {item.taxonomySlug.replace("-", " ")}
                                </Text>
                                <Text style={styles.linkText}>
                                    Slug: {item.productSlug}
                                </Text>
                            </TouchableOpacity>
                        ))}
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
        padding: 20,
    },
    content: {
        marginBottom: 20,
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
    error: {
        color: "red",
        marginTop: 10,
    },
    results: {
        marginTop: 20,
    },
    resultItem: {
        backgroundColor: "#fff",
        padding: 12,
        marginBottom: 12,
        borderRadius: 10,
        borderColor: "#ddd",
        borderWidth: 1,
    },
    resultText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
    },
    metaText: {
        fontSize: 14,
        color: "#666",
    },
    slugText: {
        fontSize: 13,
        color: "#999",
        marginTop: 2,
    },
    linkText: {
        fontSize: 12,
        color: "#007BFF",
        marginTop: 2,
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

export default Attraction;
