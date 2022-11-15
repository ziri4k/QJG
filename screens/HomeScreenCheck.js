import React ,{useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  Button,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Pressable,
Alert, 

  
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import {COLORS, SIZES} from '../constants';
import LinearGradient from "react-native-linear-gradient";
import Ionicons from 'react-native-vector-icons/Ionicons';

import { testCold, generateSampleData, Environment } from './helpers/SampleData';
import Purchases from 'react-native-purchases';
import { ENTITLEMENT_ID } from './constants';

import axios from 'axios'


    

const HomeScreen = ({navigation}) => {

  const [videos, setVideos] = useState([]);// Initial empty array of videos
  const [loading , setLoading] = useState(false)

  
 
  

  const performMagic = async () => {
    /*
     We should check if we can magically change the weather (subscription active) and if not, display the paywall.
     */

    try {
      // access latest purchaserInfo
      const purchaserInfo = await Purchases.getPurchaserInfo();

      if (typeof purchaserInfo.entitlements.active[ENTITLEMENT_ID] !== 'undefined') {
        // setWeatherData(generateSampleData(Environment.EARTH));
        navigation.navigate('HomeScreenPro')
      } else {
        navigation.navigate('PaywallScreen');
      }
    } catch (e) {
      Alert.alert('Error fetching purchaser info', e.message);
    }
  };
  
  const getPosts =()=>{
    axios.get('https://quintasjunglegym.herokuapp.com/cats').then(response => {
      console.log(response)
      //const posts=[]
      //const data = response.json()
    //posts.push(response)
    setVideos(response.data) 
    setLoading(false)
       }).catch(e=>{
         console.log(e)
       });
  }
  /*useEffect(() => {
    const subscriber = firestore()
      .collection('Videos')
      .onSnapshot(querySnapshot => {
        const lists = [];
  
        querySnapshot.forEach(documentSnapshot => {
          lists.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
  
        setVideos(lists);
        setLoading(false);
      });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);*/

  useEffect(() => {
     getPosts()

    // Unsubscribe from events when no longer in use
    
  }, []);

  if (loading) {
    return (
    <View  style={{margin:170}}>
       <Text> <ActivityIndicator size="large" color="lightpurple"/></Text>
    </View>
    )
}


 
  const ExerciseItem = ({exercise}) => {
    const url = `https://res.cloudinary.com/quintas-jungle-gym/image/fetch/${exercise.thumbnail[0].url}`
    return (
      
      <TouchableOpacity
       
        onPress={() =>
          navigation.navigate('ExerciseDetailsScreen', {exercise: exercise})
        }
        activeOpacity={0.8}
        style={{
          backgroundColor: COLORS.black,
          width: 0.5 * SIZES.width - 35,
          margin: 10,
          height: 160,
          borderRadius: 10,
          padding: 15,
          shadowColor: '#9e9898',
          elevation: 5,
          
          
        }}>
          
        
        <Image
          source={{uri : url }}
          style={{
            width: '100%',
            resizeMode: 'cover',
            flex: 1,
          }}
        />
        
        <Text style={{marginTop: 20, textAlign: 'center', fontSize: 16, color:'grey'}}>
          {exercise.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, position: 'relative'}}>
       
      <StatusBar
        backgroundColor="#5F5AA2"
        barStyle="dark-content"
        animated={true}
      />
      
      <View
        style={{
          width: '100%',
          height: 0.45 * SIZES.height,
          padding: 30,
          
          position: 'relative',
        }}>
        <Image
          source={require('../assets/images/qjgbg.jpg')}
          style={{
            position: 'absolute',
            
            left: -50,
          }}
        />
        

        {/* <Text style={{fontSize: 30, lineHeight: 45}}>
          Hello Mayor
        </Text> */}
        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: 50,
            borderRadius: 25,
            backgroundColor: COLORS.white,
            marginVertical: 40,
          }}>
          <FontAwesome
            name="search"
            size={22}
            style={{marginHorizontal: 20}}
          />
          <TextInput placeholder="Search" style={{flex: 1}} />
        </View> */}
        
      </View>
     
      <FlatList
     
        nestedScrollEnabled
        data={videos}
        style={{
          paddingHorizontal: 20,
          marginTop: -200,
        }}
        contentContainerStyle={{
          flex: 1,
          alignItems: 'center',
        }}
        
        showsVerticalScrollIndicator={false}
        numColumns={2}
        keyExtractor={item => item.title}
        
        renderItem={({item}) => <ExerciseItem exercise={item} />}
      />
     
 
        <View style={styles.buttonpurchase}>
        {/* <Pressable onPress={performMagic} style={styles.changeeatherButton}>
         <Text style={styles.changeWeatherTitle}>✨ Change the Weather</Text>
       </Pressable> */}
       
            <TouchableOpacity
              style={styles.purchasepro}
              onPress={performMagic}
            >
              <LinearGradient
                colors={['#5F5AA2', '#460491']}
                style={styles.purchasepro}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: "#fff",
                    },
                  ]}
                >
                  View Premium Videos
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
      
    </SafeAreaView>
  );
};



export default HomeScreen;




const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: "#000000",
  },
  header: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  

  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#a862f9",
    fontSize: 13,
    marginTop:15
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#ffffff",
    
  },
  buttonpurchase: {
    alignItems: "center",
    marginTop: 50,
  
  },
  purchasepro: {
    marginTop:-30,
    width: "90%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderColor:"grey",
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textPrivate: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
  },
  color_textPrivate: {
    color: "grey",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  containerr: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },

});