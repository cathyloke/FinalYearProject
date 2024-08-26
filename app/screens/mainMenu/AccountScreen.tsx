import React, {useState} from "react";
import { TouchableOpacity, TextInput, Text, View, Image, StyleSheet, Dimensions } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import UpperTab from "../../components/UpperTab";
import CustomButton from "../../components/CustomButton";
import DrawerNavigator from "../../navigations/StackNavigator";

type AccountScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Account'>;

type Props = {
  navigation: AccountScreenNavigationProp;
};

const screenHeight = Dimensions.get('window').height;

const AccountScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState("Cathy");
  const [email, setEmail] = useState("cathy@gmail.com");
  const [gender, setGender] = useState("Female");


  return (
    <View style={styles.container}>
      <UpperTab navigation={navigation}></UpperTab>
      
      <ScrollView >  
        <View style={styles.infoContent}>
          <Image style={styles.image} source={require("../../assets/images/ProfilePic.png")} />
          <View style={styles.info}>
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>Name</Text>
              <TextInput style={styles.infoLabel} editable={false}>{name}</TextInput>
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>Gender</Text>
              <TextInput style={styles.infoLabel} editable={false}>{gender}</TextInput>
            </View>
            <View style={styles.infoText}>
              <Text style={styles.infoLabel}>Email</Text>
              <TextInput style={styles.infoLabel} editable={false}>{email}</TextInput>
            </View>
          </View>
        </View>

        <Text style = {styles.header}>About Ferio</Text>
        <View style={styles.options}>
          <CustomButton 
            title= {'About Us'}
            onPress={() => {
              navigation.navigate('AboutUs')
            }}  
          >
          </CustomButton> 
          <CustomButton 
            title= {'Privacy Agreement'}
            onPress={() => {
              navigation.navigate('PrivacyAgreement')
            }}  
          >
          </CustomButton>
          <CustomButton 
            title= {'User Agreement'}
            onPress={() => {
              navigation.navigate('UserAgreement')
            }}  
          >
          </CustomButton>
          <CustomButton 
            title= {'Help Centre'}
            onPress={() => {
              navigation.navigate('HelpCentre')
            }}  
          >
          </CustomButton>
          <CustomButton 
            title= {'Feedback'}
            onPress={() => {
              navigation.navigate('Feedback')
            }}  
          >
          </CustomButton>


        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#F7EFE5',
    },
    upperTab:{
      flexDirection: 'row',
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: 15, 
      backgroundColor: '#E2BFD9',
      height: 85,
    },
    greetingText:{
      fontSize: 48,
      color: 'black', 
      fontFamily: 'Itim-Regular',
    },
    infoContent:{
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 15,
    },
    header:{
        fontSize: 25,
        fontFamily: 'Itim-Regular',
        color: 'black',
        paddingLeft: 15,
    },
    image:{
      width: 120,
      height: 120,
      borderColor:'black',
      borderWidth: 1,
      borderRadius: 60,
      marginTop: 30,
    },
    info:{
      marginTop:20,
      borderWidth:2, 
      width: '90%', 
      borderRadius: 20,
      marginBottom:10
    },
    infoLabel:{
      padding: 20,
      fontFamily: 'Itim-Regular',
      color: 'black',
      fontSize: 20,
    },
    infoText:{
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    options:{
      marginBottom: 20,
    }

});

export default AccountScreen;
