import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

//Create session data
export const saveSession = async (userId: string) => {
    try {
        await AsyncStorage.setItem("@user_id", userId);
    } catch (error: any) {
        Alert.alert(`Failed to save user: ${error}`);
    }
};

//Retrieve session data
export const getSession = async () => {
    try {
        const userId = await AsyncStorage.getItem("@user_id");
        return { userId };
    } catch (error: any) {
        Alert.alert(`Failed to retrieve user: ${error}`);
    }
};

//Clear session data
export const clearSession = async () => {
    try {
        await AsyncStorage.removeItem("@user_id");
    } catch (error: any) {
        Alert.alert(`Failed to clear user: ${error}`);
    }
};
