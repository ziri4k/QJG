import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import OnBoardingScreen from './OnBoardingScreen';
const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator initialRouteName="OnBoardingScreen ">
        <RootStack.Screen name="OnBoardingScreen " component={OnBoardingScreen } options={{ title: 'Home', headerShown: false}}/>
        <RootStack.Screen name="SplashScreen" component={SplashScreen} options={{ title: 'Home', headerShown: false}}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen} options={{
          title: 'SIGN IN',
          headerStyle: {
            backgroundColor: '#000000',
            borderBottomColor:'#000000'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            
          },
        }}/>
         <RootStack.Screen name="SignUpScreen" component={SignUpScreen} options={{
          title: 'REGISTER',
          headerStyle: {
            backgroundColor: '#000000',
            borderBottomColor:'#000000'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            
          },
          }}/>
        <RootStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{
          title: 'FORGOT PASSWORD',
          headerStyle: {
            backgroundColor: '#000000',
            borderBottomColor:'#000000'
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            
          },
          }}/>
    </RootStack.Navigator>
);

export default RootStackScreen;