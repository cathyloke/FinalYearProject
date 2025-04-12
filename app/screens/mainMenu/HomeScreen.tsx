import React, { useRef, useState, useEffect } from "react";
import {
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions,
    TouchableNativeFeedback,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../assets/Types";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import UpperTab from "../../components/UpperTab";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
    navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <UpperTab navigation={navigation} />
            <ScrollView>
                <View style={styles.content}>
                    <Text style={styles.sectionHeader}>
                        Plan Your Trip Starting With :
                    </Text>

                    <View style={styles.OptionContainer}>
                        <TouchableNativeFeedback
                            onPress={() => navigation.navigate("Hotel")}
                        >
                            <View style={styles.bookingOptionWrapper}>
                                <MaterialCommunityIcons
                                    name="bed-queen"
                                    size={50}
                                    color="black"
                                />
                                <Text style={styles.bookingOption}>Hotel</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            onPress={() => navigation.navigate("Attraction")}
                        >
                            <View style={styles.bookingOptionWrapper}>
                                <MaterialCommunityIcons
                                    name="ticket"
                                    size={50}
                                    color="black"
                                />
                                <Text style={styles.bookingOption}>
                                    Attraction
                                </Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            onPress={() => navigation.navigate("Weather")}
                        >
                            <View style={styles.bookingOptionWrapper}>
                                <MaterialCommunityIcons
                                    name="cloud"
                                    size={50}
                                    color="black"
                                />
                                <Text style={styles.bookingOption}>
                                    Weather
                                </Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>

                    <View style={styles.OptionContainer}>
                        <TouchableNativeFeedback>
                            <View style={styles.bookingOptionWrapper}>
                                <MaterialCommunityIcons
                                    name="airplane"
                                    size={50}
                                    color="black"
                                />
                                <Text style={styles.bookingOption}>Flight</Text>
                            </View>
                        </TouchableNativeFeedback>
                        <TouchableNativeFeedback
                            onPress={() => navigation.navigate("Hotel")}
                        >
                            <View style={styles.bookingOptionWrapper}>
                                <MaterialCommunityIcons
                                    name="car"
                                    size={50}
                                    color="black"
                                />
                                <Text style={styles.bookingOption}>Car</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>

                    <Text style={styles.sectionHeader}>
                        Check Your Pocket Here
                    </Text>

                    <Text style={styles.sectionHeader}>
                        Check Your Itinerary Here
                    </Text>

                    {/* <View
                        style={[
                            styles.OptionContainer,
                            { maxWidth: screenWidth * 0.33 },
                        ]}
                    >
                        <TouchableNativeFeedback
                            onPress={() => navigation.navigate("Weather")}
                        >
                            <View style={styles.bookingOptionWrapper}>
                                <MaterialCommunityIcons
                                    name="cloud"
                                    size={50}
                                    color="black"
                                />
                                <Text style={styles.bookingOption}>
                                    Weather
                                </Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7EFE5",
    },
    upperTab: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#E2BFD9",
        height: 85,
    },
    content: {
        alignItems: "center",
        justifyContent: "center",
    },
    sectionHeader: {
        fontSize: 25,
        fontFamily: "Itim-Regular",
        color: "black",
        alignSelf: "flex-start",
        paddingLeft: 15,
        paddingTop: 15,
    },
    OptionContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly",
    },
    bookingOptionWrapper: {
        flex: 1,
        margin: 15,
        height: 120,
        maxWidth: screenWidth * 0.33,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 30,
        backgroundColor: "#E2BFD9",
    },
    bookingOption: {
        fontSize: 18,
        fontFamily: "Itim-Regular",
        paddingVertical: 10,
        color: "black",
    },
    imageContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    activitiesOptionWrapper: {
        width: 180,
        height: 150,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        overflow: "hidden",
        marginHorizontal: 10,
        borderRadius: 20,
    },
    activitiesOption: {
        fontSize: 20,
        fontFamily: "Itim-Regular",
        paddingVertical: 5,
        paddingLeft: 15,
        color: "white",
    },
    backgroundImage: {
        position: "absolute",
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
});

export default HomeScreen;
