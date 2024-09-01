import React, {useState} from "react";
import { TouchableOpacity, TextInput, Text, View, Image, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native-gesture-handler";
import UpperTab from "../../components/UpperTab";

type UserAgreementScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UserAgreement'>;

type Props = {
  navigation: UserAgreementScreenNavigationProp;
};

const UserAgreementScreen: React.FC<Props> = ({ navigation }) => {
  const userAgreement = require('../../assets/UserAgreement.json');

  const renderPolicySection = (sectionTitle: string, sectionContent: any) => {
    return (      
      <View key={sectionTitle} >
        {Object.entries(sectionContent).map(([key, value]) => (
          <View key={key} style={styles.objectContent}>
            <Text style={styles.title}>{key}:</Text>
            <Text style={styles.text}>
              {typeof value === 'string' ? value : JSON.stringify(value)}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {Object.entries(userAgreement).map(([key, value]) => {
            return renderPolicySection(key, value);
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7EFE5',
    padding: 20,
  },
  content: {
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Itim-Regular',
    fontSize: 25,
    color: 'black'

  },
  text: {
    fontFamily: 'Itim-Regular',
    fontSize: 15,
    color: 'black',
    textAlign: 'justify',
  },
  objectContent: {
    marginBottom: 20, 
  },
});

export default UserAgreementScreen;