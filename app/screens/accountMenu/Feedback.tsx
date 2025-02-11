import React from "react";
import { TouchableOpacity, TextInput, Text, View, Image, StyleSheet, TouchableNativeFeedback } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';
import { ScrollView } from "react-native-gesture-handler";

type FeedbackScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Feedback'>;

type Props = {
    navigation: FeedbackScreenNavigationProp;
};

const FeedbackScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.feedbackHeader}>What's your Feedback?</Text>
                <Text style={[styles.feedbackHeader, { fontSize: 20 }]}>Write it down!</Text>
                <TextInput
                    multiline={true}
                    keyboardType='email-address'
                    placeholder='Write your comment'
                    placeholderTextColor="grey"
                    selectionColor={'#C37BC3'}
                    style={styles.feedbackInput}
                ></TextInput>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Account')}
                >
                    <Text style={styles.buttonText}>Submit Feedback</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

    );
}

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
    greetingText: {
        fontSize: 48,
        color: 'black',
        fontFamily: 'Itim-Regular',
    },

    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    feedbackHeader: {
        marginTop: 10,
        fontSize: 30,
        fontFamily: 'Itim-Regular',
        color: 'black',
    },
    feedbackInput: {
        fontFamily: 'Itim-Regular',
        fontSize: 18,
        marginTop: 10,
        padding: 10,
        borderWidth: 1.5,
        borderRadius: 8,
        width: '90%',
        height: 300,
        textAlignVertical: 'top',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#C37BC3',
        width: 200,
        height: 50,
        marginTop: 20,
        borderRadius: 10,
        borderWidth: 1.5,
    },
    buttonText: {
        fontFamily: 'Itim-Regular',
        justifyContent: 'center',
        color: 'white',
        alignSelf: 'center',
        fontSize: 20,
    },

});

export default FeedbackScreen;