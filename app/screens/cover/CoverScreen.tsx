import React from "react";
import { TouchableOpacity, Text, View, Image, StyleSheet, Dimensions } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';

type CoverScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Cover'>;

type Props = {
    navigation: CoverScreenNavigationProp;
};

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const CoverScreen: React.FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require('../../assets/images/Ferio.png')}
            />

            <View style={styles.buttonContainer}>
                <View style={styles.subtitle}>
                    <Text style={styles.subtitleText}>Get Started With</Text>
                </View>
                {/* <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Cover2')}
                >
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Register')}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableOpacity>

            </View>
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
    buttonContainer: {
        alignSelf: 'center',
        marginTop: 100,
        color: '#F7EFE5',
    },
    subtitle: {
        alignItems: 'center',
        justifyContent: 'center',
        // borderWidth: 2,
        marginBottom: 20,
    },
    subtitleText: {
        fontFamily: 'Itim-Regular',
        fontSize: 30
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F7EFE5',
        width: screenWidth * 0.7,
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        elevation: 15,                          //android
        shadowColor: '#000',                    //ios
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3.84,
        marginBottom: 20,
    },
    buttonText: {
        fontFamily: 'Roboto',
        fontWeight: '600',
        justifyContent: 'center',
        color: 'black',
        alignSelf: 'center',
        fontSize: 20,
    },
    image: {
        width: '50%',
        height: screenHeight * 0.25,
        borderRadius: 60,
    }
});

export default CoverScreen;