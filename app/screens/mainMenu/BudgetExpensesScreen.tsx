import React, {useState} from "react";
import { Alert, TouchableOpacity, TextInput, Text, View, Image, StyleSheet, Modal } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import UpperTab from "../../components/UpperTab";
import { SafeAreaView } from "react-native-safe-area-context";
// import { Entypo } from "@expo/vector-icons";
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu'

type BudgetExpensesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BudgetExpenses'>;

type Props = {
  navigation: BudgetExpensesScreenNavigationProp;
};

const BudgetExpensesScreen: React.FC<Props> = ({ navigation }) => {

  const handleDeleteBudget = () => {
    Alert.alert(
      'Are you sure to delete this budget?', 
      'You will not be able to recover the budget once it is deleted.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Action'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => console.log('Delete Budget'), // Replace with your delete logic
        },
      ]
    );
  };

  const handleUpdateBudget = () => {
    navigation.navigate('UpdateBudget')
  };

  return (
    <SafeAreaView style={styles.container}>
      <UpperTab navigation={navigation}></UpperTab>
      <View style={styles.headerBar}>
        <Text style={styles.header}>Your Budget</Text>
        <TouchableOpacity style={{alignSelf: 'center'}} onPress={() => {navigation.navigate('CreateBudget')}}>
          {/* <Entypo name="plus" size={35} color="black" /> */}
        </TouchableOpacity>
        
      </View>

      <ScrollView >  
  
        {/* Flatlist */}
        <View style={styles.itineraryContainer}>
          
          <TouchableOpacity style={styles.infoContainer} onPress={() => {navigation.navigate('BudgetDetails')}}>
            <View >
              <Text style={styles.info}>Trip 1</Text>
              <Text style={styles.info}>Budget: RM50.00</Text>
              <Text style={styles.info}>Expenses: RM40.00</Text>
            </View>
            <View>
              <Menu>
                <MenuTrigger>
                  {/* <Entypo name="dots-three-horizontal" size={24} color="white" /> */}
                </MenuTrigger>
                <MenuOptions customStyles={optionsStyle}>
                  {/* change to function */}
                  <MenuOption onSelect={handleUpdateBudget} text="Edit Budget" /> 
                  <MenuOption onSelect={handleDeleteBudget} text="Delete Budget" /> 
                </MenuOptions>
              </Menu>
            </View> 
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoContainer} onPress={() => {navigation.navigate('BudgetDetails')}}>
            <View >
              <Text style={styles.info}>Trip 2</Text>
              <Text style={styles.info}>Budget: RM50.00</Text>
              <Text style={styles.info}>Expenses: RM40.00</Text>
            </View>
            <View>
              <Menu>
                <MenuTrigger>
                  {/* <Entypo name="dots-three-horizontal" size={24} color="white" /> */}
                </MenuTrigger>
                <MenuOptions customStyles={optionsStyle}>
                  {/* change to function */}
                  <MenuOption onSelect={handleUpdateBudget} text="Edit Budget" /> 
                  <MenuOption onSelect={handleDeleteBudget} text="Delete Budget" /> 
                </MenuOptions>
              </Menu>
            </View> 
          </TouchableOpacity>

          <TouchableOpacity style={styles.infoContainer} onPress={() => {navigation.navigate('BudgetDetails')}}>
            <View >
              <Text style={styles.info}>Trip 3</Text>
              <Text style={styles.info}>Budget: RM50.00</Text>
              <Text style={styles.info}>Expenses: RM40.00</Text>
            </View>
            <View>
              <Menu>
                <MenuTrigger>
                  {/* <Entypo name="dots-three-horizontal" size={24} color="white" /> */}
                </MenuTrigger>
                <MenuOptions customStyles={optionsStyle}>
                  {/* change to function */}
                  <MenuOption onSelect={handleUpdateBudget} text="Edit Budget" /> 
                  <MenuOption onSelect={handleDeleteBudget} text="Delete Budget" /> 
                </MenuOptions>
              </Menu>
            </View> 
          </TouchableOpacity>

        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const optionsStyle = {
  optionsContainer: {
    backgroundColor: '#f2f2f2',
    padding: 5,
    borderRadius: 15,
  },
  optionWrapper: {
    padding: 10,
  },
  optionText: {
    color: 'black',
    fontFamily: 'Itim-Regular',
    fontSize: 18,
  },

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
  content:{     
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-between'
  },
  headerBar: {
    flexDirection: 'row',
    borderBottomWidth:1,
    borderBottomColor: 'grey',
    marginHorizontal:20,
    justifyContent: 'space-between',
  },
  header:{
    fontSize: 25,
    padding:5,
    margin: 10,
    fontFamily: 'Itim-Regular',
    color: 'black',     
  },
  itineraryContainer:{
    marginTop:10,
  },
  infoContainer: {
    justifyContent: 'space-between',
    padding: 10,
    borderWidth:1,
    backgroundColor: '#C37BC3', 
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    height: 100,
    flexDirection: 'row',
    
  },
  info: {
    fontFamily: 'Itim-Regular',
    color: 'white',
    fontSize: 20,
    paddingHorizontal: 10
  },


});

export default BudgetExpensesScreen;