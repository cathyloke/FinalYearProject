import React, { useRef, useState, useEffect } from "react";
import { Text, View, Image, StyleSheet, Dimensions, TouchableNativeFeedback } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from '../../assets/Types';
import { FlatList, ScrollView } from "react-native-gesture-handler";
import UpperTab from "../../components/UpperTab";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { SafeAreaView } from "react-native-safe-area-context";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const flatlistRef = useRef<FlatList<any>>(null);
	const screenWidth = Dimensions.get("window").width;
	const [activeIndex, setActiveIndex] = useState(0);

	// Auto Scroll

	useEffect(() => {
		let interval = setInterval(() => {
			if 
      (activeIndex === carouselData.length - 1) {
				flatlistRef.current.scrollToIndex({
					index: 0,
					animated: true,
				});
			} else {
				flatlistRef.current.scrollToIndex({
					index: activeIndex + 1,
					animated: true,
				});
			}
		}, 3000);
		return () => clearInterval(interval);
	});

	const getItemLayout = (data, index) => ({
		length: screenWidth,
		offset: screenWidth * index,
		index: index,
	});

  //replace image later from api/database
	const carouselData = [
		{
			id: "01",
			image: require("../../assets/images/HomeImage/Trip1.jpg"),
		},
		{
			id: "02",
			image: require("../../assets/images/HomeImage/Trip2.jpg"),
		},
		{
			id: "03",
			image: require("../../assets/images/HomeImage/Trip3.jpg"),
		},
	];

	const renderItem = ({ item, index }) => {
		return (
			<View>
				<Image
					source={item.image}
					style={{ height: 250, width: screenWidth}}
				/>
			</View>
		);
	};

	const handleScroll = (event) => {
		const scrollPosition = event.nativeEvent.contentOffset.x;
		const index = Math.round(scrollPosition / screenWidth);
		setActiveIndex(index);
	};

  return (
    <SafeAreaView style={styles.container}>
        <UpperTab navigation={navigation} />
        <ScrollView>
          <View style={styles.content}>
          <FlatList
            data={carouselData}
            ref={flatlistRef}
            getItemLayout={getItemLayout}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal={true}
            pagingEnabled={true}
            onScroll={handleScroll}
          />

          {/* Booking service */}
          <Text style= {styles.sectionHeader} >Booking</Text>
          <View style={styles.OptionContainer}>
            <TouchableNativeFeedback>
              <View style={styles.bookingOptionWrapper}>
                <MaterialCommunityIcons name='airplane' size={50} color='black'/>
                <Text style={styles.bookingOption}>Flight</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <View style={styles.bookingOptionWrapper}>
                <MaterialCommunityIcons name='bed-queen' size={50} color='black'/>
                <Text style={styles.bookingOption}>Stay</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <View style={styles.bookingOptionWrapper}>
                <MaterialCommunityIcons name='ticket' size={50} color='black'/>
                <Text style={styles.bookingOption}>Ticket</Text>
              </View>
            </TouchableNativeFeedback>
          </View>

          {/* Recommended activities */}
          <Text style= {styles.sectionHeader} >Recommended</Text>
          <View style={styles.imageContainer}>
            <TouchableNativeFeedback>
              <View style={styles.activitiesOptionWrapper}>
                <Image
                  source={require('../../assets/images/HomeImage/Trip2.jpg')}
                  style={styles.backgroundImage}
                />
                <Text style={styles.activitiesOption}>Malaysia</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <View style={styles.activitiesOptionWrapper}>
                <Image
                  source={require('../../assets/images/HomeImage/Trip3.jpg')}
                  style={styles.backgroundImage}
                />
                <Text style={styles.activitiesOption}>Thailand</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
          <View style={styles.imageContainer}>
            <TouchableNativeFeedback>
              <View style={styles.activitiesOptionWrapper}>
                <Image
                  source={require('../../assets/images/HomeImage/Trip2.jpg')}
                  style={styles.backgroundImage}
                />
                <Text style={styles.activitiesOption}>Malaysia</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableNativeFeedback>
              <View style={styles.activitiesOptionWrapper}>
                <Image
                  source={require('../../assets/images/HomeImage/Trip3.jpg')}
                  style={styles.backgroundImage}
                />
                <Text style={styles.activitiesOption}>Thailand</Text>
              </View>
            </TouchableNativeFeedback>
          </View>

      
          </View>
        </ScrollView>
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7EFE5',
  },
  upperTab: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#E2BFD9',
    height: 85,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeader: {
    fontSize: 30,
    fontFamily: 'Itim-Regular',
    color: 'black',
    alignSelf: 'flex-start',
    paddingLeft: 15,
    paddingTop: 15
  },
  OptionContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  bookingOptionWrapper: {
    flex: 1,
    margin: 15,
    height: 120,
    alignItems: "center",
    justifyContent: 'center',
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 30,
    backgroundColor: '#E2BFD9',
    elevation: 15,                          //android
    shadowColor: '#000',                    //ios
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 3.84,
  },
  bookingOption: {
    fontSize: 20,
    fontFamily: 'Itim-Regular',
    paddingVertical: 10,
    color: 'black',
  },
  imageContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  activitiesOptionWrapper: {
    width: 180,
    height: 150, 
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    overflow: 'hidden', 
    marginHorizontal: 10,
    borderRadius: 20,
  },
  activitiesOption: {
    fontSize: 20,
    fontFamily: 'Itim-Regular',
    paddingVertical: 5,
    paddingLeft: 15,
    color: 'white',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',  
  },
});

export default HomeScreen;
