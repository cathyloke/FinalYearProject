import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../assets/Types";

type PrivacyAgreementScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    "PrivacyAgreement"
>;

type Props = {
    navigation: PrivacyAgreementScreenNavigationProp;
};

type privacyAgreement = {
    [section: string]: {
        text: string | string[];
    };
};

const PrivacyAgreementScreen: React.FC<Props> = () => {
    const privacyAgreement: privacyAgreement =
        require("../../assets/PrivacyAgreement.json").PrivacyNAgreement;

    const renderPolicySection = (sectionTitle: string, sectionContent: any) => {
        return (
            <View key={sectionTitle}>
                {Object.entries(sectionContent).map(([key, value]) => (
                    <View key={key} style={styles.objectContent}>
                        <Text style={styles.title}>{key}:</Text>
                        <Text style={styles.text}>
                            {typeof value === "string"
                                ? value
                                : JSON.stringify(value)}
                        </Text>
                    </View>
                ))}
            </View>
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                {Object.entries(privacyAgreement).map(([section, { text }]) => (
                    <View key={section} style={styles.section}>
                        <Text style={styles.header}>{section}</Text>
                        {Array.isArray(text) ? (
                            text.map((line, index) => (
                                <Text key={index} style={styles.text}>
                                    {line}
                                </Text>
                            ))
                        ) : (
                            <Text style={styles.text}>{text}</Text>
                        )}
                    </View>
                ))}
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
    title: {
        fontFamily: "Itim-Regular",
        fontSize: 25,
        color: "black",
    },
    text: {
        fontFamily: "Itim-Regular",
        fontSize: 15,
        color: "black",
        textAlign: "justify",
    },
    objectContent: {
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
    },
    header: {
        fontSize: 25,
        fontFamily: "Itim-Regular",
        color: "black",
    },
});

export default PrivacyAgreementScreen;
