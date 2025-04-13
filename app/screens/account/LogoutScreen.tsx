import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View, Image, StyleSheet, Dimensions } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';
import { clearSession } from "../../assets/asyncStorageData";


type LogoutScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Logout'>;

type Props = {
    navigation: LogoutScreenNavigationProp;
};

const screenHeight = Dimensions.get('window').height;

const LogoutScreen: React.FC<Props> = ({ navigation }) => {
    const [seconds, setSeconds] = useState(3);

    useEffect(() => {
        const interval = setInterval(() => {
            setSeconds(seconds => seconds - 1);
        }, 1000);

        // Clear the interval when the component unmounts or when the timer ends
        if (seconds === 0) {
            clearInterval(interval);
            clearSession()
            navigation.navigate('Cover');
        }

        return () => clearInterval(interval);
    }, [seconds]);

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../../assets/images/Ferio.png')}
            />
            <Text style={styles.timer}>Redirecting in {seconds}s</Text>
            <Text style={styles.logoutMessage}>You had successfully log out</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C8A1E0',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '50%',
        height: screenHeight * 0.25,
        borderRadius: 60,
    },
    logoutMessage: {
        textAlign: 'center',
        marginTop: 60,
        fontSize: 30,
        color: 'black',
        width: '70%',
        fontFamily: 'Itim-Regular',
    },
    timer: {
        marginTop: 40,
        fontSize: 20,
        color: 'black',
        fontFamily: 'Itim-Regular',
    },

});

export default LogoutScreen;