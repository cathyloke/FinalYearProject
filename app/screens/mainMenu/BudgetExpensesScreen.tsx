import React, {useState} from "react";
import { TouchableOpacity, TextInput, Text, View, Image, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import UpperTab from "../../components/UpperTab";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";

type BudgetExpensesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BudgetExpenses'>;

type Props = {
  navigation: BudgetExpensesScreenNavigationProp;
};

const BudgetExpensesScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <UpperTab navigation={navigation}></UpperTab>
      <View style={styles.headerBar}>
        <Text style={styles.header}>Your Budget</Text>
        <TouchableOpacity style={{alignSelf: 'center'}} onPress={() => {navigation.navigate('CreateBudget')}}>
          <Entypo name="plus" size={35} color="black" />
        </TouchableOpacity>
        
      </View>

      <ScrollView >  
  
        {/* Flatlist */}
        <View style={styles.itineraryContainer}>
          <TouchableOpacity style={styles.infoContainer} onPress={() => {navigation.navigate('BudgetDetails')}}>
              <Text style={styles.info}>Trip 1</Text>
              <Text style={styles.info}>Budget: RM50.00</Text>
              <Text style={styles.info}>Expenses: RM40.00</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoContainer} onPress={() => {navigation.navigate('BudgetDetails')}}>
              <Text style={styles.info}>Trip 2</Text>
              <Text style={styles.info}>Budget: RM50.00</Text>
              <Text style={styles.info}>Expenses: RM40.00</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoContainer} onPress={() => {navigation.navigate('BudgetDetails')}}>
              <Text style={styles.info}>Trip 3</Text>
              <Text style={styles.info}>Budget: RM50.00</Text>
              <Text style={styles.info}>Expenses: RM40.00</Text>
          </TouchableOpacity>
         
        </View>
 
      </ScrollView>
    </SafeAreaView>
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
    justifyContent: 'center',
    borderWidth:1,
    backgroundColor: '#C37BC3', 
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 10,
    height: 100
  },
  info: {
    fontFamily: 'Itim-Regular',
    color: 'white',
    fontSize: 20,
    paddingHorizontal: 10
  },


});

export default BudgetExpensesScreen;