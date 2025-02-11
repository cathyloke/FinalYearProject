// import React from "react";
// import { TouchableOpacity, Text, View, Image, StyleSheet, Dimensions } from "react-native";
// import { StackNavigationProp } from "@react-navigation/stack";
// import { RootStackParamList } from '../../assets/Types';

// type CoverScreen2NavigationProp = StackNavigationProp<RootStackParamList, 'Cover2'>;

// type Props = {
//   navigation: CoverScreen2NavigationProp;
// };

// const screenHeight = Dimensions.get('window').height;

// const CoverScreen2: React.FC<Props> = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <Image
//         style={styles.image}
//         source={require('../../assets/images/Ferio.png')}
//       />
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//             style={styles.button}
//             onPress={() => navigation.navigate('Login')}
//         >
//             <Text style={styles.buttonText}>Log in</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//             style={styles.button}
//             onPress={() => navigation.navigate('Register')}
//         >
//             <Text style={styles.buttonText}>Register</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }


// const styles = StyleSheet.create({
//     container:{
//         flex: 1,
//         backgroundColor: '#C8A1E0',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     buttonContainer:{
//         alignSelf: 'center', 
//         marginTop: 140,
//         color: '#F7EFE5',
//     },
//     button:{
//         alignItems: 'center', 
//         justifyContent: 'center',
//         backgroundColor: '#F7EFE5',
//         width: 270, 
//         height: 65,
//         marginTop: 40,
//         borderRadius: 10,
//         borderWidth: 2,    
//         elevation: 15,                          //android
//         shadowColor: '#000',                    //ios
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.8,
//         shadowRadius: 3.84,
//     },
//     buttonText:{
//         fontFamily: 'Itim-Regular',
//         justifyContent: 'center',
//         color: 'black',
//         alignSelf: 'center',
//         fontSize: 30,
//     },
//     image:{
//         width: '50%',
//         height: screenHeight * 0.25,
//         borderRadius: 60,
//     }
    
// });

// export default CoverScreen2;
