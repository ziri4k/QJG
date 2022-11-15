import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  FlatList,
  Alert,
  TouchableOpacity,
  ScrollView,
  Button
} from 'react-native';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import {COLORS, SIZES} from '../constants';


const ExerciseDetailsScreenPro = ({navigation,route}) => {
  const [exercise, setExercise] = useState(route.params.exercise);
  const data = exercise.posts
  
  const SessionItem = ({session, index}) => {
    return (
      
      <View
        style={{
          backgroundColor: COLORS.white,
          // width: 0.5 * SIZES.width - 40,
          borderRadius: 10,
          marginBottom: 10,
          marginHorizontal: 5,
          height: 70,
          padding: 15,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          shadowColor: '#9e9898',
          elevation: 5,
        }}>
          <TouchableOpacity onPress={()=>navigation.navigate('VideoPlayerScreenPro', session)}>
          <View
            style={{
            width: 40,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 2,
            borderColor: COLORS.purple,
            backgroundColor: index == 0 ? COLORS.purple : COLORS.white,
            marginRight: 15,
            borderRadius: 20,
          }}>
          <FontAwesome5Icons
            name="play"
            style={{color: index == 0 ? COLORS.white : COLORS.purple}}
          />
        </View>
          </TouchableOpacity>
        
        <Text>{session.name}</Text>

      </View>
    );
  };

  return (
   
    <SafeAreaView style={{flex: 1, position: 'relative'}}>
      <StatusBar
        backgroundColor={'#C7B8F5'}
        barStyle={'dark-content'}
        animated={true}
      />
     
      <View
        style={{
          width: '100%',
          height: 0.4 * SIZES.height,
          padding: 30,
          backgroundColor: 'black',
          position: 'relative',
        }}>
        {/* <Image
          source={require('../assets/images/BgPurple.png')}
          style={{
            position: 'absolute',
            top: 60,
            left: -50,
          }}
        /> */}
          <Image
            source={exercise.thumbnail}
            style={{width: 400, height: 300, position: 'absolute'}}
          />
        <Text style={{fontSize: 30, lineHeight: 45}}>{exercise.title}</Text>
        <Text style={{fontSize: 30}}>{exercise.description}</Text>
        {/* <Text style={{fontSize: 16, opacity: 0.6, marginVertical: 10}}>
          10-20mins
        </Text> */}
        
        {/* <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: COLORS.white,
            width: '60%',
            height: 50,
            borderRadius: 25,
            marginVertical: 30,
          }}>
          <FontAwesome5Icons
            name="search"
            size={22}
            style={{
              marginHorizontal: 20,
            }}
          />
          <TextInput placeholder="Search" style={{flex: 1}} />
        </View> */}

        {/* <Image
          source={{uri:exercise.videoUrl}}
          style={{
            position: 'absolute',
            bottom: 40,
            right: -130,
            width: 350,
            height: 350,
            resizeMode: 'contain',
          }}
        /> */}
      </View>

      <View style={{marginTop: -30, marginHorizontal: 30}}>
      <Text style={{marginVertical: 15, fontSize: 30,marginTop:60,marginLeft:110,}}>Videos</Text> 
        
        <FlatList
          data={data}
          contentContainerStyle={{
            alignItems: 'flex-start',
          }}
          showsVerticalScrollIndicator={false}
          // numColumns={2}
          keyExtractor={item => item}
          renderItem={({item, index}) => (
            <SessionItem session={item} index={index} />
          )}
        />
        
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: COLORS.black,
            borderRadius: 15,
            padding: 15,
            shadowColor: '#9e9898',
            elevation: 5,
          }}>
          <Image
            source={exercise.thumbnail}
            style={{width: 80, height: 60, resizeMode: 'center'}}
          />
          <View>
            <Text></Text>
            <Text style={{color:'#ffffff', paddingLeft:20}}>Start your practice</Text>
            <Text style={{fontSize: 30, lineHeight: 45, color:'#ffffff', paddingLeft:20}}>{exercise.title}</Text>
            <Button
            title="Go back"
            onPress={() => navigation.goBack()}
        />
            
          </View>
        </View>
        
      </View>
   
    </SafeAreaView>
  
  );
};

export default ExerciseDetailsScreenPro;