import React, { useState } from "react";
import { Dimensions, TouchableOpacity, TextInput, Text, View, Image, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import UpperTab from "../../components/UpperTab";

type AboutScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AboutUs'>;

type Props = {
    navigation: AboutScreenNavigationProp;
};

const AboutScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ScrollView >
                <View style={styles.content}>
                    <Image
                        style={styles.image}
                        source={require('../../assets/images/Ferio.png')}
                    />
                    <Text style={styles.info}>
                        Ferio is a holiday planner app that revolutionizes travel planning by leveraging artificial intelligence to
                        provide itineraries, accommodation recommendations, activity suggestions and budget management features.
                    </Text>

                    <Text style={{ marginTop: 40, marginBottom: 20, marginHorizontal: 10, fontSize: 12, textAlign: 'center' }}>
                        Created by Loke Weng Yan, a Final Year Project Software Engineering student at University Tunku Abdul Rahman Sungai Long campus.
                    </Text>
                    <Text style={{ fontSize: 12, textAlign: 'center' }}>
                        Version 1.0
                    </Text>
                    <Text style={{ fontSize: 12, textAlign: 'center' }}>
                        © 2024, LOKE WENG YAN. All right reserved.
                    </Text>
                </View>

            </ScrollView>
        </View>
    );
}

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7EFE5',
    },
    upperTab: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#E2BFD9',
        height: 85,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    info: {
        fontSize: 18,
        fontFamily: 'Itim-Regular',
        color: 'black',
        textAlign: 'justify',
        margin: 20,
    },
    image: {
        width: '50%',
        height: screenHeight * 0.25,
        borderRadius: 60,
        marginTop: 20,
    }

});

export default AboutScreen;