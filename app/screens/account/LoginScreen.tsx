import React, { useState, useEffect } from "react";
import {
    Alert,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../assets/Types";
import axios from "axios";
import { getSession, saveSession } from "../../assets/asyncStorageData";

type LoginScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Login"
>;

type Props = {
    navigation: LoginScreenNavigationProp;
};

const screenWidth = Dimensions.get("window").width;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const retrieveSessionData = async () => {
        const session = await getSession();
        if (!session || !session.userId) {
            console.log("No user found in session");
            return;
        } else {
            navigation.navigate("Menu");
        }
    };

    useEffect(() => {
        retrieveSessionData();
    }, []);

    const isValidEmail = (email: any) => {
        // Regular expression for basic email validation
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    const loginAccount = async () => {
        try {
            console.log("logging in");
            if (!email || !password) {
                throw new Error("Missing login details");
            }

            if (!isValidEmail(email)) {
                throw new Error("Email is not valid.");
            }

            const userData = {
                email: email.toLowerCase(),
                password: password,
            };

            const response = await axios.post(
                "http://192.168.1.18:3000/login",
                userData
            );
            saveSession(response.data.data._id);
            navigation.navigate("Menu");
        } catch (error: any) {
            let err;
            if (error.response) {
                console.log(
                    "Server responded with:",
                    error.response.data.message
                );
                err = error.response.data.message;
            } else if (error.request) {
                console.log("No response received:", error.request);
                err = error.request;
            } else {
                console.log("Error setting up request:", error.message);
                err = error.message;
            }
            Alert.alert(`${err}`);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View
                style={{
                    alignItems: "center",
                }}
            >
                <Text style={styles.header}>Welcome, Ferianto!!</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        keyboardType="email-address"
                        placeholder="Enter your email"
                        placeholderTextColor="#C37BC3"
                        style={styles.inputBox}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />

                    <TextInput
                        keyboardType="visible-password"
                        placeholder="Enter your password"
                        placeholderTextColor="#C37BC3"
                        style={styles.inputBox}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true}
                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => loginAccount()}
                >
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableOpacity>

                <Text style={{ fontFamily: "Itim-Regular", marginBottom: 5 }}>
                    Don't have an account?
                </Text>

                <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text
                        style={{
                            textDecorationLine: "underline",
                            fontFamily: "Itim-Regular",
                        }}
                    >
                        Register now!
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F7EFE5",
        paddingTop: 100,
    },
    header: {
        fontSize: 40,
        fontFamily: "Itim-Regular",
        color: "black",
    },
    inputContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        marginBottom: 20,
        rowGap: 20,
    },
    inputLabel: {
        fontSize: 18,
        fontFamily: "Roboto",
        color: "black",
        height: 40,
        textAlignVertical: "center",
        borderWidth: 1,
        marginRight: 10,
    },
    inputBox: {
        fontFamily: "Roboto",
        color: "black",
        fontSize: 15,
        textAlign: "center",
        borderColor: "black",
        borderRadius: 10,
        borderWidth: 1,
        width: screenWidth * 0.7,
        height: 40,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#C37BC3",
        width: screenWidth * 0.7,
        height: 50,
        marginBottom: 20,
        borderRadius: 10,
        elevation: 15, //android
        shadowColor: "#000", //ios
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3.84,
    },
    buttonText: {
        fontFamily: "Roboto",
        justifyContent: "center",
        color: "white",
        alignSelf: "center",
        fontSize: 20,
    },
});

export default LoginScreen;
