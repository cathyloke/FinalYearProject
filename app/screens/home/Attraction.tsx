import React, { useState } from "react";
import { ScrollView, TextInput, Text, View, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../assets/Types";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

type AttractionNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Attraction"
>;

type Props = {
    navigation: AttractionNavigationProp;
};

const Attraction: React.FC<Props> = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text>this is the attraction pgae</Text>
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
    buttonContainer: { alignItems: "center" },
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
    error: {
        color: "red",
        textAlign: "center",
        marginTop: 20,
    },
    AttractionCard: {
        marginVertical: 20,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
        alignItems: "center",
        justifyContent: "center",
    },
    cityName: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10,
    },
    currentTemp: {
        fontSize: 40,
        fontWeight: "bold",
        color: "#f39c12",
    },
    feelsLike: {
        fontSize: 16,
        color: "#666",
        marginTop: 5,
        fontFamily: "Itim-Regular",
    },
    label: {
        fontSize: 18,
        marginTop: 20,
        fontWeight: "bold",
        textAlign: "left",
        width: "100%",
        fontFamily: "Roboto",
    },
    daylightStatus: {
        fontSize: 17,
        color: "#f39c12",
        marginTop: 5,
    },
    dailyForecast: {
        marginTop: 10,
        width: "100%",
    },
    dailyItem: {
        marginTop: 10,
        padding: 10,
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        marginBottom: 10,
    },
    dailyDate: {
        textAlign: "center",
        fontSize: 17,
        fontFamily: "Itim-Regular",
    },
});

export default Attraction;
