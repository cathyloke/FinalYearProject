import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
    TouchableOpacity,
    TextInput,
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions,
    Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../assets/Types";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import UpperTab from "../../components/UpperTab";
import { AcountMenuButton } from "../../components/CustomButton";
import DrawerNavigator from "../../navigations/AccountNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { getSession } from "../../assets/asyncStorageData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";

type AccountScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Account"
>;

type Props = {
    navigation: AccountScreenNavigationProp;
};

const AccountScreen: React.FC<Props> = ({ navigation }) => {
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");

    const retrieveSessionData = async () => {
        console.log("Retrieve session data and read user");
        const session = await getSession();
        if (!session || !session.userId) {
            Alert.alert("No user session data. Please log in");
            navigation.navigate("Cover");
            return;
        }

        const { userId: userId } = session;
        // console.log('user id : ', userId)

        axios
            .get(`http://172.20.10.2:3000/read/${userId}`)
            .then((res) => {
                // console.log('User:', res.data);
                setName(res.data.data.name);
                setGender(res.data.data.gender);
                setEmail(res.data.data.email);
            })
            .catch((error) => {
                Alert.alert(`${error.response?.data || error.message}`);
            });
    };

    // useEffect(() => {
    //     retrieveSessionData();
    // }, []);

    useFocusEffect(
        useCallback(() => {
            retrieveSessionData();
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            <UpperTab navigation={navigation}></UpperTab>

            <ScrollView>
                <View style={styles.infoContent}>
                    <View style={styles.info}>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("AccountDataManage")
                            }
                            style={{
                                flexDirection: "row",
                                justifyContent: "flex-end",
                                paddingRight: 10,
                                paddingTop: 10,
                            }}
                        >
                            <Entypo name="pencil" size={20} color="#3789BB" />
                        </TouchableOpacity>

                        <View style={styles.infoText}>
                            <Text style={styles.infoLabel}>Name</Text>
                            <Text style={styles.infoLabel}>{name}</Text>
                        </View>
                        <View style={styles.infoText}>
                            <Text style={styles.infoLabel}>Gender</Text>
                            <Text style={styles.infoLabel}>{gender}</Text>
                        </View>
                        <View style={styles.infoText}>
                            <Text style={styles.infoLabel}>Email</Text>
                            <Text style={styles.infoLabel}>{email}</Text>
                        </View>
                    </View>
                </View>

                <Text style={styles.header}>What's about Ferio?</Text>

                <View style={styles.options}>
                    <AcountMenuButton
                        title={"My preferences"}
                        onPress={() => {
                            navigation.navigate("Preferences");
                        }}
                    ></AcountMenuButton>
                    <AcountMenuButton
                        title={"About Us"}
                        onPress={() => {
                            navigation.navigate("AboutUs");
                        }}
                    ></AcountMenuButton>
                    <AcountMenuButton
                        title={"Privacy Agreement"}
                        onPress={() => {
                            navigation.navigate("PrivacyAgreement");
                        }}
                    ></AcountMenuButton>
                    <AcountMenuButton
                        title={"User Agreement"}
                        onPress={() => {
                            navigation.navigate("UserAgreement");
                        }}
                    ></AcountMenuButton>
                    <AcountMenuButton
                        title={"Help Centre"}
                        onPress={() => {
                            navigation.navigate("HelpCentre");
                        }}
                    ></AcountMenuButton>
                    <AcountMenuButton
                        title={"Feedback"}
                        onPress={() => {
                            navigation.navigate("Feedback");
                        }}
                    ></AcountMenuButton>
                    <AcountMenuButton
                        title={"Terms and Conditions"}
                        onPress={() => {
                            navigation.navigate("TNC");
                        }}
                    ></AcountMenuButton>
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
    infoContent: {
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15,
    },
    header: {
        fontSize: 25,
        fontFamily: "Itim-Regular",
        color: "black",
        paddingLeft: 15,
    },
    image: {
        width: 120,
        height: 120,
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 60,
        marginTop: 30,
    },
    info: {
        marginTop: 20,
        borderWidth: 1.5,
        width: "90%",
        borderRadius: 20,
        marginBottom: 10,
    },
    infoLabel: {
        margin: 10,
        fontFamily: "Roboto",
        color: "black",
        fontSize: 16,
    },
    infoText: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    options: {
        paddingBottom: 20,
        marginTop: 10,
    },
});

export default AccountScreen;
