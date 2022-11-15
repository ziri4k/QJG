import React, { Component } from 'react';
import { ImageBackground } from 'react-native';
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
 
} from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';


const OnBoardingScreen =({navigation})=> {

return (

<Onboarding

 onSkip={()=>navigation.navigate("SplashScreen")}
 onDone={()=>navigation.navigate("SplashScreen")}
  pages={[
    {
      backgroundColor: '#ffffff',
      image: <Image source={require('../assets/img/quintasGym/splash_icon.png')} />,
      title: 'Get Ahead',
      subtitle: 'Welcome to Quinta’s Jungle Gym—“The Neighborhood’s Toughest Gym.',
    },
    {
        backgroundColor: '#ffffff',
        image: <Image source={require('../assets/img/quintasGym/splash_icon.png')} />,
        title: 'QJG Videos',
        subtitle: 'Subscribe to the QJG app to have Quinta in your pocket.',
    },
    {
        backgroundColor: 'white',
        image: <Image source={require('../assets/img/quintasGym/splash_icon.png')} />,
        title: 'Get Digitalized',
        subtitle: 'Every quarter, more videos will be added to the library.  Subscribe today!',
    },

  ]}
/>

);

};

export default OnBoardingScreen;