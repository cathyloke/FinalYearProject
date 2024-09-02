import React, {useState} from "react";
import { TouchableOpacity, TextInput, Text, View, Image, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import UpperTab from "../../components/UpperTab";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";

type CategoryDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CategoryDetails'>;

type Props = {
  navigation: CategoryDetailsScreenNavigationProp;
};

const CategoryDetails: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>        
        <View style={styles.content}>
            <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                <Text style={styles.info}>Air Asia</Text>
                <Text style={styles.info}>RM10.00</Text>
            </View>
            <View>
                <Text style={styles.info}>Pay by: Cathy</Text>
                <Text style={styles.info}>Date Created: 16 August 2024</Text>
            </View>
        </View>
        <View style={styles.content}>
            <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                <Text style={styles.info}>Air Asia</Text>
                <Text style={styles.info}>RM10.00</Text>
            </View>
            <View>
                <Text style={styles.info}>Pay by: Cathy</Text>
                <Text style={styles.info}>Date Created: 16 August 2024</Text>
            </View>
        </View>
        <View style={styles.content}>
            <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                <Text style={styles.info}>Air Asia</Text>
                <Text style={styles.info}>RM10.00</Text>
            </View>
            <View>
                <Text style={styles.info}>Pay by: Cathy</Text>
                <Text style={styles.info}>Date Created: 16 August 2024</Text>
            </View>
        </View>
        <View style={styles.content}>
            <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                <Text style={styles.info}>Air Asia</Text>
                <Text style={styles.info}>RM10.00</Text>
            </View>
            <View>
                <Text style={styles.info}>Pay by: Cathy</Text>
                <Text style={styles.info}>Date Created: 16 August 2024</Text>
            </View>
        </View>
        <View style={styles.content}>
            <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                <Text style={styles.info}>Air Asia</Text>
                <Text style={styles.info}>RM10.00</Text>
            </View>
            <View>
                <Text style={styles.info}>Pay by: Cathy</Text>
                <Text style={styles.info}>Date Created: 16 August 2024</Text>
            </View>
        </View>
        <View style={styles.content}>
            <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                <Text style={styles.info}>Air Asia</Text>
                <Text style={styles.info}>RM10.00</Text>
            </View>
            <View>
                <Text style={styles.info}>Pay by: Cathy</Text>
                <Text style={styles.info}>Date Created: 16 August 2024</Text>
            </View>
        </View>
    </ScrollView>
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
    borderBottomColor: 'grey',
    borderBottomWidth:1,
    height: 100,
    justifyContent: 'space-between'
  },
  info:{
    fontFamily: 'Itim-Regular',
    fontSize: 20
  }
  


});

export default CategoryDetails;