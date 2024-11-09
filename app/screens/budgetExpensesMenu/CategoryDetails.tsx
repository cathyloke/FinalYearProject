import React, {useState} from "react";
import { Button, Modal, TouchableOpacity, TextInput, Text, View, Image, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import UpperTab from "../../components/UpperTab";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { MenuProvider, Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu'

type CategoryDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CategoryDetails'>;

type Props = {
  navigation: CategoryDetailsScreenNavigationProp;
};

const CategoryDetails: React.FC<Props> = ({ navigation }) => {

    const [modalVisible, setModalVisible] = useState(false);

    const handleUpdateExpenses = () => {
        setModalVisible(false);
        navigation.navigate('UpdateExpenses')
    }

    const handleDeleteExpenses = () => {
        setModalVisible(false); 
        alert('Expenses Deleted');
        navigation.navigate('CategoryDetails')
    }

    return (
        <ScrollView style={styles.container}>
          <TouchableOpacity
            onPress={() => setModalVisible(true)} 
            style={styles.content}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.info}>Air Asia</Text>
              <Text style={styles.info}>RM10.00</Text>
            </View>
            <View>
              <Text style={styles.info}>Pay by: Cathy</Text>
              <Text style={styles.info}>Date Created: 16 August 2024</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalVisible(true)} 
            style={styles.content}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.info}>Air Asia</Text>
              <Text style={styles.info}>RM10.00</Text>
            </View>
            <View>
              <Text style={styles.info}>Pay by: Cathy</Text>
              <Text style={styles.info}>Date Created: 16 August 2024</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalVisible(true)} 
            style={styles.content}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.info}>Air Asia</Text>
              <Text style={styles.info}>RM10.00</Text>
            </View>
            <View>
              <Text style={styles.info}>Pay by: Cathy</Text>
              <Text style={styles.info}>Date Created: 16 August 2024</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalVisible(true)} 
            style={styles.content}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.info}>Air Asia</Text>
              <Text style={styles.info}>RM10.00</Text>
            </View>
            <View>
              <Text style={styles.info}>Pay by: Cathy</Text>
              <Text style={styles.info}>Date Created: 16 August 2024</Text>
            </View>
          </TouchableOpacity>
    
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalBox}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>What do you want to do?</Text>
                <Button
                  title="Update Expenses"
                  onPress={handleUpdateExpenses} // Hide modal on button press
                />
                <Button
                  title="Delete Expenses"
                  onPress={handleDeleteExpenses} 
                />
                <Button
                  title="Cancel"
                  onPress={() => {setModalVisible(false)}} 
                />
              </View>
            </View>
          </Modal>
        </ScrollView>
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
    borderBottomColor: 'grey',
    borderBottomWidth:1,
    height: 100,
    justifyContent: 'space-between',
    padding: 10,
  },
  info:{
    fontFamily: 'Itim-Regular',
    fontSize: 20
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  }
});

export default CategoryDetails;