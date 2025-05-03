import React, { useState, useEffect } from "react";
import {
    TouchableOpacity,
    TextInput,
    Text,
    View,
    StyleSheet,
    Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../assets/Types";
import { ScrollView } from "react-native-gesture-handler";
import { getSession, saveSession } from "../../assets/asyncStorageData";
import axios from "axios";

type AccountDataManageScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "AccountDataManage"
>;

type Props = {
    navigation: AccountDataManageScreenNavigationProp;
};

const AccountDataManageScreen: React.FC<Props> = ({ navigation }) => {
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const retrieveSessionData = async () => {
        console.log("Retrieve session data and read user");
        const session = await getSession();
        if (!session || !session.userId) {
            Alert.alert("No user session data. Please log in");
            navigation.navigate("Cover");
            return;
        }

        const { userId: userId } = session;
        axios
            .get(`http://192.168.1.8:3000/read/${userId}`)
            .then((res) => {
                // console.log('User:', res.data);
                setName(res.data.data.name);
                setGender(res.data.data.gender);
                setEmail(res.data.data.email);
                setPassword(res.data.data.password);
            })
            .catch((error) => {
                Alert.alert(`${error.response?.data || error.message}`);
            });
    };

    useEffect(() => {
        retrieveSessionData();
    }, []);

    const isValidEmail = (email: any) => {
        // Regular expression for basic email validation
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    const saveData = async () => {
        try {
            const session = await getSession();
            if (!session || !session.userId) {
                Alert.alert("No user session data. Please log in");
                navigation.navigate("Cover");
                return;
            }

            const { userId: userId } = session;

            if (!name || !gender || !email || !password) {
                throw new Error("Missing value. Please check your input.");
            }

            const formattedGender =
                gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();

            if (
                formattedGender !== "Male" &&
                formattedGender !== "Female" &&
                formattedGender !== "Other"
            ) {
                throw new Error("Gender not correct.");
            }

            if (!isValidEmail(email)) {
                throw new Error("Email is not valid");
            }

            const userData = {
                name: name,
                gender: formattedGender,
                email: email.toLowerCase(),
                password: password,
            };
            console.log(JSON.stringify(userData));
            axios
                .put(`http://192.168.1.8:3000/update/${userId}`, userData)
                .then((res) => {
                    console.log("Successfully update user : " + res);
                    console.log(JSON.stringify(res.data));
                    Alert.alert("Data successfully updated");
                    navigation.navigate("Account");
                })
                .catch((error) => {
                    Alert.alert(`${error.message}`);
                });
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
            <View style={styles.content}>
                <View>
                    <Text style={styles.inputLabel}>Name</Text>
                    <TextInput
                        keyboardType="email-address"
                        onChangeText={(text) => setName(text)}
                        placeholder="Enter your name"
                        placeholderTextColor="#C37BC3"
                        style={styles.inputBox}
                    >
                        {name}
                    </TextInput>
                </View>
                <TextInput
                    keyboardType="email-address"
                    placeholder="Enter your gender (Female/Male/Other)"
                    placeholderTextColor="#C37BC3"
                    style={styles.inputBox}
                    value={gender}
                    onChangeText={setGender}
                />
                <View>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput
                        keyboardType="email-address"
                        onChangeText={(text) => setEmail(text)}
                        placeholder="Enter your email"
                        placeholderTextColor="#C37BC3"
                        style={styles.inputBox}
                    >
                        {email}
                    </TextInput>
                </View>
                <View>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput
                        keyboardType="visible-password"
                        onChangeText={(text) => setPassword(text)}
                        placeholder="Enter your password"
                        placeholderTextColor="#C37BC3"
                        style={styles.inputBox}
                        secureTextEntry={true}
                    >
                        {password}
                    </TextInput>
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        saveData();
                    }}
                >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
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
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
        gap: 10,
    },
    inputLabel: {
        textAlign: "center",
        fontSize: 18,
        fontFamily: "Roboto",
        color: "black",
    },
    inputBox: {
        fontFamily: "Roboto",
        color: "#C37BC3",
        fontSize: 15,
        margin: 20,
        textAlign: "center",
        borderColor: "black",
        borderRadius: 10,
        borderWidth: 1,
        width: 270,
        height: 40,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#C37BC3",
        width: 200,
        height: 50,
        marginTop: 20,
        borderRadius: 10,
        borderWidth: 1,
    },
    buttonText: {
        fontFamily: "Roboto",
        justifyContent: "center",
        color: "white",
        alignSelf: "center",
        fontSize: 18,
    },
});

export default AccountDataManageScreen;
