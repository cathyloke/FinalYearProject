import React, { useEffect, useState } from "react";
import {
    TouchableOpacity,
    TextInput,
    Text,
    View,
    StyleSheet,
    Alert,
    Linking,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../assets/Types";
import { ScrollView } from "react-native-gesture-handler";
import * as MailComposer from "expo-mail-composer";

type HelpCentreScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "HelpCentre"
>;

type Props = {
    navigation: HelpCentreScreenNavigationProp;
};

const HelpCentreScreen: React.FC<Props> = ({ navigation }) => {
    const [content, setContent] = useState("");
    const [isAvailable, setIsAvailable] = useState(false);

    useEffect(() => {
        async function checkAvailability() {
            const isMailAvailable = await MailComposer.isAvailableAsync();
            setIsAvailable(isMailAvailable);

            if (!isMailAvailable) {
                // console.error(
                //     "MailComposer is not available. Likely running in Expo Go on iOS."
                // );
                Alert.alert(
                    "MailComposer is not available. Likely running in Expo Go on iOS."
                );
            }
        }

        checkAvailability();
        console.log(isAvailable);
    }, []);

    const sendMail = () => {
        MailComposer.composeAsync({
            subject: "Help Centre for Ferio Holiday Planner Application",
            body: content,
            recipients: ["catloke963@gmail.com", "2103237@1utar.my"],
        });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.header}>Help Centre</Text>
                <Text style={[styles.header, { fontSize: 20 }]}>
                    What can we help you?
                </Text>
                <TextInput
                    multiline={true}
                    keyboardType="email-address"
                    placeholder="Write down your problem"
                    placeholderTextColor="grey"
                    selectionColor={"#C37BC3"}
                    style={styles.input}
                    onChangeText={setContent}
                ></TextInput>
                {isAvailable ? (
                    <View>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                sendMail();
                                navigation.navigate("Account");
                            }}
                        >
                            <Text style={styles.buttonText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={[
                                styles.header,
                                {
                                    fontSize: 20,
                                    color: "red",
                                    textAlign: "justify",
                                    marginHorizontal: 10,
                                },
                            ]}
                        >
                            You device not supported to send email. Please
                            directly click on the below button to send the
                            email.
                        </Text>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() =>
                                Linking.openURL(
                                    "mailto:catloke963@gmail.com?subject=SendMail&body=Description"
                                )
                            }
                        >
                            <Text style={styles.buttonText}>Send Email</Text>
                        </TouchableOpacity>
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
    },
    content: {
        alignItems: "center",
        justifyContent: "center",
    },
    header: {
        marginTop: 10,
        fontSize: 30,
        fontFamily: "Itim-Regular",
        color: "black",
    },
    input: {
        fontFamily: "Itim-Regular",
        fontSize: 18,
        marginTop: 10,
        padding: 10,
        borderWidth: 1.5,
        borderRadius: 8,
        width: "90%",
        height: 300,
        textAlignVertical: "top",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#C37BC3",
        width: 200,
        height: 50,
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
});

export default HelpCentreScreen;
