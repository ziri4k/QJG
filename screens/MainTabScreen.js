import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';
import HomeScreenPro from './HomeScreenPro';
import HomeScreenCheck from './HomeScreenCheck';
import ExerciseDetailsScreen from './ExerciseDetailsScreen';
import VideoPlayerScreen from './VideoPlayerScreen';
import ExerciseDetailsScreenPro from './ExerciseDetailsScreenPro';
import VideoPlayerScreenPro from './VideoPlayerScreenPro';
import PurchaseScreen from './PurchaseScreen';
import Index from './PaywallScreen';
import PaywallScreen from './PaywallScreen';
import SettingsScreen from './SettingsScreen';
 


const HomeStack = createStackNavigator();
const HomeProStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const Stack= createStackNavigator();
const PurchaseStack = createStackNavigator();


const Tab = createMaterialBottomTabNavigator();
// const Tab = createMaterialTopTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#5F5AA2"
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#000000',
          tabBarIcon: ({ focused, color, size}) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      
     
     
      {/* <Tab.Screen
        name="Purchase"
        component={PurchaseStackScreen}
        options={{
          tabBarLabel: 'Pro',
          tabBarColor: '#000000',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      /> */}
      
      {/* <Tab.Screen
        name="Notifications"
        component={DetailsStackScreen}
        options={{
          tabBarLabel: 'Updates',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'User',
          tabBarColor: '#000000',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-aperture" color={color} size={26} />
          ),
        }}
      /> */}

      <Tab.Screen
        name="Pro"
        component={SettingsStackScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-cog" color={color} size={26} />
          ),
        }}
      />
  


    </Tab.Navigator>
);



const HomeStackScreen = ({navigation}) => (
<HomeStack.Navigator initialRouteName={'HomeScreenCheck'} screenOptions={{
        // headerStyle: {
        // backgroundColor: '#000000',
        // },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold'
        }
    }}>
        <HomeStack.Screen name="Home" component={HomeScreenCheck} options={{
        title:'QJG',
        // headerLeft: () => (
        //     <Icon.Button name="ios-menu" size={30} backgroundColor="#000000" onPress={() => navigation.openDrawer()}></Icon.Button>
        // )
        }} />
          <HomeStack.Screen
        name="PaywallScreen"
        component={PaywallScreen}
        options={{
          title:'Paywall',
          // headerLeft: () => (
          //     <Icon.Button name="ios-menu" size={30} backgroundColor="#000000" onPress={() => navigation.openDrawer()}></Icon.Button>
          // )
          }}
          />
            <HomeStack.Screen
          name="ExerciseDetailsScreen"
          component={ExerciseDetailsScreen}
          options={{
            title:'Exercise List',
            // headerLeft: () => (
            //     <Icon.Button name="ios-menu" size={30} backgroundColor="#000000" onPress={() => navigation.openDrawer()}></Icon.Button>
            // )
            }}
            />

        <HomeStack.Screen
        name="VideoPlayerScreen"
        component={VideoPlayerScreen}
        options={{
          title:'Video Player',
          // headerLeft: () => (
          //     <Icon.Button name="ios-menu" size={30} backgroundColor="#000000" onPress={() => navigation.openDrawer()}></Icon.Button>
          // )
          }}
          />
        <HomeStack.Screen name="HomeScreenPro" component={HomeScreenPro} options={{
        title:'QJG Premium',
        // headerLeft: () => (
        //     <Icon.Button name="ios-menu" size={30} backgroundColor="#000000" onPress={() => navigation.openDrawer()}></Icon.Button>
        // )
        }} 
        />

        <HomeStack.Screen
          name="ExerciseDetailsScreenPro"
          component={ExerciseDetailsScreenPro}
          options={{
            title:'Exercise Pro List',
            // headerLeft: () => (
            //     <Icon.Button name="ios-menu" size={30} backgroundColor="#000000" onPress={() => navigation.openDrawer()}></Icon.Button>
            // )
            }}
            />
  
          <HomeStack.Screen
          name="VideoPlayerScreenPro"
          component={VideoPlayerScreenPro}
          options={{
            title:'Video Player',
            // headerLeft: () => (
            //     <Icon.Button name="ios-menu" size={30} backgroundColor="#000000" onPress={() => navigation.openDrawer()}></Icon.Button>
            // )
            }}
            />

  </HomeStack.Navigator>
);

// const DetailsStackScreen = ({navigation}) => (
// <DetailsStack.Navigator screenOptions={{
//         headerStyle: {
//         backgroundColor: '#1f65ff',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//         fontWeight: 'bold' 
//         }
//     }}>
//         <DetailsStack.Screen name="DetailsScreen" component={DetailsScreen} options={{
//         title:'Details',
//         headerLeft: () => (
//             <Icon.Button name="ios-menu" size={25} backgroundColor="#1f65ff" onPress={() => navigation.openDrawer()}></Icon.Button>
//         )
//         }} />
//           <DetailsStack.Screen
//         name="VideoPlayerScreen"
//         component={VideoPlayerScreen}
//       />
// </DetailsStack.Navigator>

// );

// const ProfileStackScreen = ({navigation}) => (
//   <ProfileStack.Navigator screenOptions={{
//         headerStyle: {
//           backgroundColor: '#000000',
//           borderColor:'#000000',
//           },
//           headerTintColor: '#fff',
//           headerTitleStyle: {
//           fontWeight: 'bold'
//           }
//           }}>
//           <ProfileStack.Screen name="ProfileScreen" component={ProfileScreen} options={{
//           title:'Edit Profile',
//           headerLeft: () => (
//             <Icon.Button name="ios-menu" size={30} backgroundColor="#000000" onPress={() => navigation.openDrawer()}></Icon.Button>
//         )
//         }} />
//   </ProfileStack.Navigator>

  
  
// );


const SettingsStackScreen= ({navigation}) => (
  <HomeProStack.Navigator initialRouteName={'HomeScreenCheck'} screenOptions={{
          headerStyle: {
          backgroundColor: '#000000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
          fontWeight: 'bold'
          }
      }}>
         <HomeProStack.Screen name="Settings" component={SettingsScreen} options={{
          title:'Settings',
          // headerLeft: () => (
          //     <Icon.Button name="ios-menu" size={30} backgroundColor="#000000" onPress={() => navigation.openDrawer()}></Icon.Button>
          // )
          }} />

          {/* <HomeProStack.Screen name="Pro Videos" component={HomeScreenPro} options={{
          title:'QJG',
          headerLeft: () => (
              <Icon.Button name="ios-menu" size={30} backgroundColor="#000000" onPress={() => navigation.openDrawer()}></Icon.Button>
          )
          }} /> */}
         
  </HomeProStack.Navigator>
  );

  // const PurchaseStackScreen = ({navigation}) => (
  //   <PurchaseStack.Navigator screenOptions={{
  //         headerStyle: {
  //           backgroundColor: '#000000',
  //           borderColor:'#000000',
  //           },
  //           headerTintColor: '#fff',
  //           headerTitleStyle: {
  //           fontWeight: 'bold'
  //           }
  //           }}>
  //           <PurchaseStack.Screen name="PurchaseScreen" component={PurchaseScreen} options={{
  //           title:'PurchaseScreen',
  //           headerLeft: () => (
  //             <Icon.Button name="ios-menu" size={30} backgroundColor="#000000" onPress={() => navigation.openDrawer()}></Icon.Button>
  //         )
  //         }} />
  //   </PurchaseStack.Navigator>
  
    
    
  // );

export default MainTabScreen;