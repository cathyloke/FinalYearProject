import React, { useCallback, useEffect, useState } from "react";
import {
    Dimensions,
    TouchableOpacity,
    TextInput,
    Text,
    View,
    Image,
    StyleSheet,
    Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../assets/Types";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import UpperTab from "../../components/UpperTab";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { getSession } from "../../assets/asyncStorageData";
import { SafeAreaView } from "react-native-safe-area-context";

type PreferencesScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "Preferences"
>;

type Props = {
    navigation: PreferencesScreenNavigationProp;
};

type TravelMode = {
    _id: string;
    name: string;
};

type Interest = {
    _id: string;
    name: string;
};

type UserPreference = {
    interests: Interest[];
    travelModes: TravelMode[];
};

const PreferencesScreen: React.FC<Props> = ({ navigation }) => {
    const [travelModes, setTravelModes] = useState<TravelMode[]>();
    const [interests, setInterests] = useState<Interest[]>();
    const [userPreferences, setUserPreferences] = useState<UserPreference>();

    const loadData = async () => {
        try {
            const travelModeRes = await axios.get(
                `http://10.0.2.2:3000/preferences/travelMode`
            );

            console.log(travelModeRes.data.data);
            const travelModeData = travelModeRes.data.data;
            setTravelModes(travelModeData);

            const interestRes = await axios.get(
                `http://10.0.2.2:3000/preferences/interest`
            );

            console.log(interestRes.data.data);
            const interestData = interestRes.data.data;
            setInterests(interestData);

            const session = await getSession();
            if (!session || !session.userId) {
                Alert.alert("No user session data. Please log in");
                navigation.navigate("Cover");
                return;
            }
            const { userId: userId } = session;

            axios
                .get(`http://10.0.2.2:3000/read/${userId}`)
                .then((res) => {
                    console.log(res.data.data);
                    setUserPreferences(res.data.data.preferences);
                })
                .catch((error) => {
                    Alert.alert(
                        `Error: ${error.response?.data || error.message}`
                    );
                });
        } catch (error) {
            Alert.alert(`Error: ${error}`);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.info}>My preferences is</Text>
            </View>
            <FlatList
                //    style={styles.infoBar}
                data={travelModes}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.name != null ? item.name : "None"}</Text>
                    </View>
                )}
                keyExtractor={(item) => item._id.toString()}
            />
            <View>
                <Text style={styles.info}>My interest</Text>
            </View>
            <FlatList
                //    style={styles.infoBar}
                data={interests}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.name != null ? item.name : "None"}</Text>
                    </View>
                )}
                keyExtractor={(item) => item._id.toString()}
            />
        </SafeAreaView>
    );
};

const screenHeight = Dimensions.get("window").height;

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
    info: {
        fontSize: 18,
        fontFamily: "Itim-Regular",
        color: "black",
        textAlign: "justify",
        margin: 20,
    },
    image: {
        width: "50%",
        height: screenHeight * 0.25,
        borderRadius: 60,
        marginTop: 20,
    },
});

export default PreferencesScreen;
