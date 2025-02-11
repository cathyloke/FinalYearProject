import AsyncStorage from '@react-native-async-storage/async-storage';

//Create session data
export const saveSession = async (userId: string) => {
    try {
        await AsyncStorage.setItem('@user_id', userId);
    } catch (error) {
        console.error('Failed to save user:', error);
    }
};

//Retrieve session data
export const getSession = async () => {
    try {
        const userId = await AsyncStorage.getItem('@user_id');
        return { userId };
    } catch (error) {
        console.error('Failed to retrieve user:', error);
        return null;
    }
};

//Clear session data
export const clearSession = async () => {
    try {
        await AsyncStorage.removeItem('@user_id');
    } catch (error) {
        console.error('Failed to clear user:', error);
    }
};