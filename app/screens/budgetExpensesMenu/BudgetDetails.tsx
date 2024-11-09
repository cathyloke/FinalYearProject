import React from "react";
import { Alert, Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';
import { ScrollView } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu'

import UpperTab from "../../components/UpperTab";
import { SafeAreaView } from "react-native-safe-area-context";

type BudgetDetailsNavigationProp = StackNavigationProp<RootStackParamList, 'BudgetDetails'>;

type Props = {
  navigation: BudgetDetailsNavigationProp;
};

const BudgetDetails: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
        <View style={styles.headerBar}>
            <Text style={styles.headerInfo}>Budget: RM50.00</Text>
            <Text style={styles.headerInfo}>Expenses: RM40.00</Text>
        </View>

        <View style={styles.subHeaderBar}>
          <Text style={styles.subHeader}>Your Expenses</Text>
          <TouchableOpacity style={{alignSelf: 'center'}} onPress={() => {navigation.navigate('AddExpenses')}}>
            <Entypo name="plus" size={35} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.infoBar}>
          
          <TouchableOpacity style={styles.infoCategory} onPress={() => {navigation.navigate('CategoryDetails')}}>
              <Text style={styles.info}>Flights</Text>
              <View style={{alignSelf: 'center'}}>
                  <Text style={styles.info}>Rm10.00</Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoCategory} onPress={() => {navigation.navigate('CategoryDetails')}}>
              <Text style={styles.info}>Accommodation</Text>
              <View style={{alignSelf: 'center'}}>
                  <Text style={styles.info}>Rm10.00</Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoCategory} onPress={() => {navigation.navigate('CategoryDetails')}}>
              <Text style={styles.info}>Entrance Fees</Text>
              <View style={{alignSelf: 'center'}}>
                  <Text style={styles.info}>Rm10.00</Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoCategory} onPress={() => {navigation.navigate('CategoryDetails')}}>
              <Text style={styles.info}>Souvenir</Text>
              <View style={{alignSelf: 'center'}}>
                  <Text style={styles.info}>Rm10.00</Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoCategory} onPress={() => {navigation.navigate('CategoryDetails')}}>
              <Text style={styles.info}>Flights</Text>
              <View style={{alignSelf: 'center'}}>
                  <Text style={styles.info}>Rm10.00</Text>
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoCategory} onPress={() => {navigation.navigate('CategoryDetails')}}>
              <Text style={styles.info}>Flights</Text>
              <View style={{alignSelf: 'center'}}>
                  <Text style={styles.info}>Rm10.00</Text>
              </View>
          </TouchableOpacity>

        </View>
       
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#C37BC3', 
  },
  headerBar: {
    backgroundColor: '#F7EFE5',
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
    height: 80,
    borderRadius: 30,
    justifyContent: 'center',
    marginTop: 20,
  },
  headerInfo: {
    fontFamily: 'Itim-Regular',
    fontSize: 25
  },
  subHeaderBar: {
    backgroundColor: '#F7EFE5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomWidth: 1,
    borderColor: 'grey',
    marginTop: 20,
    height: 60,
    alignItems: 'center'
  },
  subHeader:{
    fontFamily: 'Itim-Regular',
    fontSize: 25
  },
  infoBar:{
    backgroundColor: '#F7EFE5',
    justifyContent: 'space-between',
  },
  infoCategory:{
    borderColor: 'grey',
    borderBottomWidth: 1,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info:{
    fontFamily: 'Itim-Regular',
    fontSize: 22,
    padding:20
  }
  

});

export default BudgetDetails;