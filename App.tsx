import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/navigations/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';

export default function App() {

  const [fontsLoaded] = useFonts({
    'Itim-Regular': require('./app/assets/fonts/Itim-Regular.ttf'),
  });

  if(!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <NavigationContainer>
        <AppNavigator></AppNavigator>
      </NavigationContainer>

    </SafeAreaView>
  );
}
