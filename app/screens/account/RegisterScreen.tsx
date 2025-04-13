import React, { useState } from "react";
import {
    TouchableOpacity,
    TextInput,
    Dimensions,
    Text,
    View,
    StyleSheet,
    Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../assets/Types";
//import { CheckBox } from 'react-native-elements';
import CheckBox from "expo-checkbox";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import { saveSession } from "../../assets/asyncStorageData";

type RegisterScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Register"
>;

type Props = {
    navigation: RegisterScreenNavigationProp;
};

const screenWidth = Dimensions.get("window").width;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [message, setMessage] = useState("");

    const handleCheckBoxChange = () => {
        setIsChecked(!isChecked);
        if (!isChecked) {
            navigation.navigate("TNC");
        }
    };

    const isValidEmail = (email: any) => {
        // Regular expression for basic email validation
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegex.test(email);
    };

    const registerAccount = async () => {
        try {
            if (password !== repassword) {
                throw new Error("Password not the same");
            }

            if (!isValidEmail(email)) {
                throw new Error("Email is not valid");
            }

            if (gender !== "Male" && gender !== "Female") {
                throw new Error("Gender not correct");
            }

            const userData = {
                name: name,
                gender: gender,
                email: email,
                password: password,
            };

            const response = await axios.post(
                "http://10.0.2.2:3000/register",
                userData
            );
            saveSession(response.data.data._id);

            navigation.navigate("Menu");
        } catch (error) {
            Alert.alert(`${error}`);
        }
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ justifyContent: "center" }}
        >
            <View
                style={{
                    alignItems: "center",
                }}
            >
                <Text style={styles.header}>Hi, Ferianto!!</Text>
                <View style={styles.inputContainer}>
                    {/* <Text style={styles.inputLabel}>Name</Text> */}
                    <TextInput
                        keyboardType="email-address"
                        placeholder="Enter your name"
                        placeholderTextColor="#C37BC3"
                        style={styles.inputBox}
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />

                    {/* <Text style={styles.inputLabel}>Gender</Text> */}
                    {/* <View
                        style={[styles.inputBox, { justifyContent: "center" }]}
                    >
                        <Picker
                            selectedValue={gender}
                            // style={styles.inputBox}
                            onValueChange={(itemValue, itemIndex) =>
                                setGender(itemValue)
                            }
                            itemStyle={{ textAlign: "center" }}
                        >
                            <Picker.Item label="Select Gender" value="" />
                            <Picker.Item label="Male" value="Male" />
                            <Picker.Item label="Female" value="Female" />
                            <Picker.Item label="Other" value="Other" />
                        </Picker>
                    </View> */}
                    <TextInput
                        keyboardType="email-address"
                        placeholder="Enter your gender (Female/Male)"
                        placeholderTextColor="#C37BC3"
                        style={styles.inputBox}
                        value={gender}
                        onChangeText={setGender}
                    />

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

                    <TextInput
                        keyboardType="visible-password"
                        placeholder="Re-Enter your password"
                        placeholderTextColor="#C37BC3"
                        style={styles.inputBox}
                        value={repassword}
                        onChangeText={(text) => setRepassword(text)}
                        secureTextEntry={true}
                    />
                </View>

                <View style={styles.checkboxContainer}>
                    <CheckBox
                        value={isChecked}
                        onValueChange={handleCheckBoxChange}
                        color={isChecked ? "#C8A1E0" : "grey"}
                    ></CheckBox>
                    <Text style={styles.checkboxText}>
                        I had read the{" "}
                        <Text
                            style={{ textDecorationLine: "underline" }}
                            onPress={handleCheckBoxChange}
                        >
                            terms and conditions
                        </Text>
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => registerAccount()}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>

                <View>
                    <Text style={{ fontFamily: "Itim-Regular" }}>
                        Already have an account?
                    </Text>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                    <Text
                        style={[
                            { textDecorationLine: "underline" },
                            { fontFamily: "Itim-Regular" },
                        ]}
                    >
                        Log in now!
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        // flexGlow: 1,
        backgroundColor: "#F7EFE5",
        paddingTop: 20,
        paddingBottom: 50,
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
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 10,
    },
    checkboxText: {
        fontFamily: "Itim-Regular",
        paddingLeft: 5,
        fontSize: 15,
        color: "black",
    },
});

export default RegisterScreen;
