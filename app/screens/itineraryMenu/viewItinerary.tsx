import React, { useCallback, useRef, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Alert,
    FlatList,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../assets/Types";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useFocusEffect } from "@react-navigation/native";
import { getSession } from "../../assets/asyncStorageData";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";

type ViewItineraryNavigationProp = StackNavigationProp<
    RootStackParamList,
    "ViewItinerary"
>;

type Props = {
    navigation: ViewItineraryNavigationProp;
    route: RouteProp<RootStackParamList, "ViewItinerary">;
};

type Plan = {
    _id: String;
    name: String;
    days: Number;
    startDate: Date;
    endDate: Date;
    destination: String;
    budget: String;
    travelModes: [String];
    interests: [String];
    itinerary: [
        {
            _id: String;
            day: Number;
            activities: [
                {
                    _id: String;
                    time: String;
                    activity: String;
                    location: String;
                }
            ];
        }
    ];
};

const ViewItinerary: React.FC<Props> = ({ navigation, route }) => {
    const { itineraryId } = route.params;

    const [plan, setPlan] = useState<Plan>();

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [])
    );

    const loadData = async () => {
        try {
            console.log(itineraryId);
            const session = await getSession();
            if (!session || !session.userId) {
                Alert.alert("No user session data. Please log in");
                navigation.navigate("Cover");
                return;
            }

            const { userId: userId } = session;

            const response = await axios.get(
                `http://192.168.1.18:3000/itinerary/${userId}/${itineraryId}`
            );

            console.log(JSON.stringify(response.data.data));
            setPlan(response.data.data);
        } catch (error) {
            Alert.alert(`${error}`);
        }
    };

    const generateDateRange = (startDate: Date, endDate: Date) => {
        const start = moment(startDate).startOf("day");
        const end = moment(endDate).startOf("day");
        const dates = [];

        while (start.isSameOrBefore(end, "day")) {
            dates.push(start.format("DD/MM/YY"));
            start.add(1, "day"); // Move to the next day
        }

        return dates;
    };

    const flatListRef = useRef<FlatList<any>>(null);

    const handleDatePress = (index: number) => {
        if (flatListRef.current) {
            flatListRef.current.scrollToIndex({ index, animated: true });
        }
    };

    const dateRange =
        plan?.startDate && plan?.endDate
            ? generateDateRange(
                  new Date(plan.startDate),
                  new Date(plan.endDate)
              )
            : [];

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ borderBottomWidth: 1, padding: 10 }}>
                <Text style={styles.header}>{plan?.name}</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate("UpdateItineraryDetails", {
                            itineraryId: itineraryId,
                        });
                    }}
                    style={{ position: "absolute", right: 10, top: 10 }}
                >
                    <Ionicons name="create" size={25} color="black" />
                </TouchableOpacity>

                <View style={styles.iconText}>
                    <Ionicons
                        name="location"
                        size={18}
                        color="black"
                        style={{ marginRight: 5 }}
                    />
                    <Text style={styles.headerData}>{plan?.destination}</Text>
                </View>

                <View style={styles.iconText}>
                    <Ionicons
                        name="calendar-outline"
                        size={18}
                        color="black"
                        style={{ marginRight: 5 }}
                    />
                    <Text style={styles.headerData}>
                        {plan?.startDate &&
                            new Date(plan.startDate).toLocaleDateString(
                                "en-GB",
                                {
                                    day: "2-digit",
                                    month: "long",
                                    year: "numeric",
                                }
                            )}
                        {" - "}
                        {plan?.endDate &&
                            new Date(plan.endDate).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                            })}{" "}
                        ({String(plan?.days)} days)
                    </Text>
                </View>

                <View style={styles.iconText}>
                    <Ionicons
                        name="car"
                        size={18}
                        color="black"
                        style={{ marginRight: 5 }}
                    />
                    <Text style={styles.headerData}>{plan?.travelModes}</Text>
                </View>

                <View style={styles.iconText}>
                    <Ionicons
                        name="heart"
                        size={18}
                        color="black"
                        style={{ marginRight: 5 }}
                    />
                    <Text style={styles.headerData}>
                        {plan?.interests
                            ?.map(
                                (interest) =>
                                    interest.charAt(0).toUpperCase() +
                                    interest.slice(1)
                            )
                            .join(", ")}
                    </Text>
                </View>
            </View>
            <View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.dateContainer}
                >
                    {plan?.startDate &&
                        plan?.endDate &&
                        generateDateRange(
                            new Date(plan.startDate),
                            new Date(plan.endDate)
                        ).map((date, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.date}
                                onPress={() => handleDatePress(index)}
                            >
                                <Text style={styles.dateText}>{date}</Text>
                            </TouchableOpacity>
                        ))}
                </ScrollView>
            </View>

            <FlatList
                ref={flatListRef}
                data={plan?.itinerary}
                keyExtractor={(item) => item.day.toString()}
                renderItem={({ item, index }) => {
                    const correspondingDate =
                        dateRange[index] || "Unknown Date";
                    return (
                        <View
                            style={{ marginHorizontal: 10, marginBottom: 30 }}
                        >
                            <Text
                                style={{
                                    fontFamily: "Itim-Regular",
                                    fontSize: 22,
                                }}
                            >
                                Day {item.day.toString()} - {correspondingDate}
                            </Text>
                            <FlatList
                                data={plan?.itinerary[index].activities}
                                keyExtractor={(activity) =>
                                    activity._id.toString()
                                }
                                renderItem={({ item }) => (
                                    <View>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Ionicons
                                                name="location"
                                                size={18}
                                                color="black"
                                            />
                                            <Text
                                                style={{
                                                    fontFamily: "Itim-Regular",
                                                    fontSize: 18,
                                                }}
                                            >
                                                {item.location}
                                            </Text>
                                        </View>
                                        <Text
                                            style={{
                                                fontFamily: "Roboto",
                                                fontSize: 15,
                                                paddingLeft: 20,
                                            }}
                                        >
                                            {item.time} : {item.activity}
                                        </Text>
                                    </View>
                                )}
                            />
                        </View>
                    );
                }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7EFE5",
    },
    header: {
        fontFamily: "Itim-Regular",
        fontSize: 25,
        alignSelf: "center",
    },
    headerData: {
        fontFamily: "Roboto",
        fontSize: 15,
        color: "#424242",
    },
    image: {
        width: 300,
        height: 200,
        borderRadius: 30,
        alignSelf: "center",
    },
    dateContainer: {
        flexDirection: "row",
        marginVertical: 10,
    },
    date: {
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 10,
        width: 90,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E2BFD9",
    },
    dateText: {
        textAlign: "center",
        fontFamily: "Itim-Regular",
        fontSize: 18,
    },
    iconText: {
        flexDirection: "row",
        alignItems: "center",
    },
});

export default ViewItinerary;
