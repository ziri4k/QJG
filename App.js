/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

 import React, { useEffect } from "react";
 import { View, ActivityIndicator, Alert } from "react-native";
 import {
   NavigationContainer,
   DefaultTheme as NavigationDefaultTheme,
   DarkTheme
 } from "@react-navigation/native";
 import SplashScreen from "react-native-splash-screen";
 import { createDrawerNavigator } from "@react-navigation/drawer";
 
 import {
   Provider as PaperProvider,
   DefaultTheme as PaperDefaultTheme,
   DarkTheme as PaperDarkTheme,
 } from "react-native-paper";
 
 import { DrawerContent } from "./screens/DrawerContent";
 // import Navigator from "./screens/video/navigator";
 import MainTabScreen from "./screens/MainTabScreen";
 import SupportScreen from "./screens/SupportScreen";
 import SettingsScreen from "./screens/SettingsScreen";
 import BookmarkScreen from "./screens/BookmarkScreen";
 
 // import { AuthService } from "./screens/video/services";
 
 // import AuthScreen from './screens/video/components/AuthScreen'
 // import VideoScreen from './screens/video/components/VideoScreen'
 
 import { AuthContext } from "./components/context";
 
 import RootStackScreen from "./screens/RootStackScreen";
 import axios from "axios";
 import baseUrl from "./baseUrl";
 axios.default.baseUrl = baseUrl;
 
 // import AsyncStorage from "@react-native-community/async-storage";
 import AsyncStorage from "@react-native-async-storage/async-storage";
 import Purchases from 'react-native-purchases';
 import { API_KEY } from './screens/constants';
 
 SplashScreen.hide();
 
 const Drawer = createDrawerNavigator();
 
 const App = () => {
   // const [isLoading, setIsLoading] = React.useState(true);
   // const [userToken, setUserToken] = React.useState(null);
   useEffect(() => {
    /* Enable debug logs before calling `setup`. */
    Purchases.setDebugLogsEnabled(true);

    /*
      Initialize the RevenueCat Purchases SDK.

      - appUserID is nil, so an anonymous ID will be generated automatically by the Purchases SDK. Read more about Identifying Users here: https://docs.revenuecat.com/docs/user-ids

      - observerMode is false, so Purchases will automatically handle finishing transactions. Read more about Observer Mode here: https://docs.revenuecat.com/docs/observer-mode
      */
    Purchases.setup(API_KEY, null, false);
  }, []);
 
   const [isDarkTheme, setIsDarkTheme] = React.useState(false);

 
   const initialLoginState = {
     isLoading: true,
     userName: null,
     firstname: null,
     lastname: null,
     userToken: null,
     email: null
   };
 
  
 
   const loginReducer = (prevState, action) => {
     
     switch (action.type) {
       case "RETRIEVE_TOKEN":
         return {
           ...prevState,
           userToken: action.token,
           isLoading: false,
         };
       case "LOGIN":
         return {
           ...prevState,
           userName: action.id,
           userToken: action.token,
           isLoading: false,
         };
       case "LOGOUT":
         return {
           ...prevState,
           userName: null,
           userToken: null,
           isLoading: false,
         };
       case "REGISTER":
         return {
           ...prevState,
           userName: action.id,
           userToken: action.token,
           isLoading: false,
         };
     }
   };
 
   const [loginState, dispatch] = React.useReducer(
     loginReducer,
     initialLoginState
   );
   // console.log("this is the loginState", loginState);
 
   
 
 
 const authContext = React.useMemo(() => ({
  
  signIn: async (email, password) => {
     // setUserToken('fgkj');
  // setIsLoading(false);
  const {data} = await axios.post(`${baseUrl}/auth/local`, {
    identifier: email,
    password,
    
  });
  
  // const userToken = data.jwt;
  // const userName = data.email;
  const userToken = {
    email: data.user.email,
    token: data.jwt, 
  };
  console.log("This is the userToken", userToken);
  try {
    await AsyncStorage.setItem('userToken', JSON.stringify(userToken));
  } catch(e) {
    console.log(e);
  }
 //console.log('user token: ', userToken);
  dispatch({ type: 'LOGIN', token: userToken });
 },
  signOut: async () => {
    // setUserToken(null);
    // setIsLoading(false);
    try {
      await AsyncStorage.removeItem("userToken");
    } catch (e) {
      console.log(e);
    }
    dispatch({ type: "LOGOUT" });
  },
 
  signUp: async (firstname, lastname, email, password) => {
    // setUserToken('fgkj');
    // setIsLoading(false);
 
    await axios.post(`${baseUrl}/auth/local/register`, {
      username: email,
      email,
      password,
      firstname,
      lastname,
    });
 
    try {
      await AsyncStorage.setItem("userToken", JSON.stringify(userToken));
    } catch (e) {
      console.log(e);
    }
 
    dispatch({ type: "REGISTER", id:userName, token: userToken });
  },
 
  forgotPassword: async (email) => {
    // setUserToken('fgkj');
    // setIsLoading(false);
    
   
    await axios.post(`${baseUrl}/auth/forgot-password`, {
      email,
   })
   .then(response => {
    // Handle success.
    
    console.log('Your user received an email', response);
  })
  .catch(error => {
    // Handle error.
    console.log('An error occurred:', error.response);
  });
  },
 
  uploadAvatar : async (imageToUpload, callback = (e,r) => {}) => {
   try {        
     const url = `${cloudinaryUrl}${cloudName}/image/upload?upload_preset=${uploadPreset}`;
     RNFetchBlob.fetch('POST', url, {
       'Content-Type' : 'multipart/form-data',
     }, [
       {
         name : 'file',
         filename : String(imageToUpload?.name).split('.')[0],
         data: RNFetchBlob.wrap(imageToUpload?.uri)
       },
     ])
     .then(res => res.json())
     .then(response => {
       callback(false, response);
     })
     .catch((err) => {
       callback(true, null);
     });
   } catch(e) {
     Alert.alert(
       'Something went wrong!',
       'Either Network issues or Something really broke',
       [{text: 'Okay'}],
     );
     callback(true, null)
   }
 
 },
 // Request API.
 
 editDrawer: async (firstname, lastname, email) => {
   // setUserToken('fgkj');
   // setIsLoading(false);
   const token = await AsyncStorage.getItem("userToken")
   axios
     .get('https://quintasjunglegym.herokuapp.com/users/me', {
     headers: {
     Authorization: `Bearer ${token}`,
   },
   })
   .then(response => {
     // Handle success.
    console.log('Data: ', response.data);
   })
   .catch(error => {
   // Handle error.
   console.log('An error occurred:', error.response);
   });
   
 
   try {
     await AsyncStorage.getItem("userToken", JSON.stringify(userToken));
   } catch (e) {
     console.log(e);
   }
 
   dispatch({ type: "LOGIN", id:userName, token: userToken });
 },
 
 
 editProfile: async (data) => {
   try {
     let userToken = await AsyncStorage.getItem('userToken');
     let { token } = JSON.parse(userToken);
 
     const response = await axios.put(`${baseUrl}/users/${id}`, {...data}, {
       headers: {
         Authorization: `Bearer ${token}`
       }
     });
     
 
     const result = response.data.data.token;
     const newUserToken = {
 
       email: result.email,
       token: result.token
     };
 
     await AsyncStorage.setItem('userToken', JSON.stringify(newUserToken));
     userToken = await AsyncStorage.getItem('userToken');
     dispatch({ type: 'LOGIN', token: newUserToken });
 
     const decode = JSON.parse(userToken);
     token = decode.token;
 
     const {avatar, exp, email, firstName, lastName, userType, createdOn, active, phoneNumber} = jwt_decode(token);
     const adjustAvatar = String(avatar).toLowerCase().includes('http') ? avatar : `https:${avatar}`;
     dispatch({ type: 'SET_USER', user: {
       avatar: adjustAvatar, exp, email, firstName: capitalize(firstName), lastName: capitalize(lastName), userType, createdOn, active, phoneNumber
     }});
 
     //Connectycube update User
     await AuthService.upadteUser({
       avatar,
       name: `${firstName} ${lastName}`
     })
     
     return true;
   } catch(e) {
     console.log(e);
     return false;
   }
 },
 
 getUserDetails: async () => {
   let userToken;
   userToken = null;
   try {
       userToken = await AsyncStorage.getItem('userToken');
       const { token } = JSON.parse(userToken);
       const {avatar, exp, email, firstName, lastName, userType, createdOn, active, phoneNumber} = jwt_decode(token);
       const adjustAvatar = String(avatar).toLowerCase().includes('http') ? avatar : `https:${avatar}`;
 
       //Login Connectycube
       
 
       dispatch({ type: 'SET_USER', user: {
         avatar: adjustAvatar, exp, email, firstName: capitalize(firstName), lastName: capitalize(lastName), userType, createdOn, active, phoneNumber, 
       }});
 
   } catch(e) {
       console.log(e);
   }
 },
 
 getUserCheck: async () => {
   let userToken;
   userToken = null;
   try {
       userToken = await AsyncStorage.getItem('userToken');
       const { token } = JSON.parse(userToken);
      
       const {avatar, exp, email, firstName, lastName, userType, createdOn, active, phoneNumber} = jwt_decode(token);
       const adjustAvatar = String(avatar).toLowerCase().includes('http') ? avatar : `https:${avatar}`;
 
       //Login Connectycube
 
       console.log(`${email} ${phoneNumber}`);
 
       const connectycube = await AuthService.login({
         login: email,
         password: `${email}${phoneNumber}`
       });
 
       console.log(connectycube, "login details from connectycube");
       dispatch({ type: 'SET_USER', user: {
         avatar: adjustAvatar, exp, email, firstName: capitalize(firstName), lastName: capitalize(lastName), userType, createdOn, active, phoneNumber, connectycube
       }});
 
   } catch(e) {
       console.log(e);
   }
 },
   
   
 }), [loginState]);
 
  
 useEffect(() => {
   setTimeout(async () => {
     // setIsLoading(false);
     let userToken;
     userToken = null;
     try {
       userToken = await AsyncStorage.getItem("userToken");
       // console.log(userToken);
     } catch (e) {
       console.log(e);
     }
     // console.log('user token: ', userToken);
 
     dispatch({ type: "RETRIEVE_TOKEN", token: userToken });
   }, 1000);
 }, [loginState]);
 
 
 useEffect(() => {
   if (loginState.userToken !== null) {
     (async () => {
       await getUserDetails();
     
     })();
   }
 }, [loginState.userToken]);
 
   
 if (loginState.isLoading) {
     return (
       <View
         style={{
           flex: 1,
           justifyContent: "center",
           alignItems: "center",
           backgroundColor: "#000000",
         }}
       >
         <ActivityIndicator size="large" />
       </View>
     );
   }
   return (
  
       <AuthContext.Provider value={loginState,authContext}>
         <NavigationContainer theme={DarkTheme}>
           {loginState.userToken !== null ? (
             <Drawer.Navigator
               drawerContent={(props) => <DrawerContent {...props} />}
             >
               <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
               <Drawer.Screen name="SupportScreen" component={SupportScreen} />
               <Drawer.Screen name="SettingsScreen" component={SettingsScreen} />
               <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
             </Drawer.Navigator>
             
         
           ) : (
             <RootStackScreen />
           )}
         </NavigationContainer>
       </AuthContext.Provider>
     
   );
 };
 
 export default App;
 