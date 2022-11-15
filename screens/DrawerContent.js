import React, { useState, useEffect} from 'react';
import {View, StyleSheet, Image, ImageBackground} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthContext} from '../components/context';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TabActions } from '@react-navigation/native';
import axios from 'axios';

export function DrawerContent(props) {
  const paperTheme = useTheme();
 

  const {signOut, toggleTheme} = React.useContext(AuthContext);
  const {authContext, loginState} = React.useContext(AuthContext);

  const {user, setUser} = useState({});
  const [data,setData] = useState();
   

// console.log("the loginState is going to be ", loginState);



  // const [data, setData] = ([
  //   {id:1, name: "dio", email: "a@abc.com", avatar:"https://images.app.goo.gl/tSWm3p8kswjgAntz5"},
  //   {id:2, name: "carter", email: "b@abc.com", avatar:"avartarimage2"},
  //   {id:3, name: "damien", email: "c@abc.com", avatar:"avartarimage3"}
  // ])


// useEffect(() => {
//   setTimeout(async() => {
//     // setIsLoading(false);
//     let userToken;
//     userToken = null;
//     try {
//       userToken = await AsyncStorage.getItem('userToken');
//     } catch(e) {
//       console.log(e);
//     }
   
//   }, 1000);
// }, []);
// const token = await AsyncStorage .getItem("userToken")
// axios
// .get('http://localhost:1337/users/me', {
// headers: {
// Authorization: `Bearer ${token}`,
// },
// })
// .then(response => {
// // Handle success.
// console.log('Data: ', response.data);
// })
// .catch(error => {
// // Handle error.
// console.log('An error occurred:', error.response);
// });

// const url= "https://jsonplaceholder.typicode.com/posts";

// const Boiler = async()=>{
//  const token = await AsyncStorage.getItem("token")

//  fetch('https://quintasjunglegym.herokuapp.com/users/me',{
//  headers:new Headers({
//  Authorization:"Bearer "+token
//  })
//  }).then(res=>res.json())
 
//  .then(data=>{
//    console.log("the data is ",data)
//   //  setEmail(data.email)
//  }
 
//  )
// }
// useEffect(()=>{
// Boiler()
// },[])

// const userRes =  axios({
//   method: 'GET',
//   url: 'https://quintasjunglegym.herokuapp.com/users/me'
// })
// console.log("userRes",userRes)
// if(userRes.data){
//   setUser({user: {user: userRes.data}})
// }


 
  return (
    <ImageBackground
      style={{flex: 1}}
      source={require('../assets/img/quintasGym/bgdraw.png')}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <ImageBackground
            style={styles.userInfoSection}
            source={require('../assets/img/quintasGym/quintajunglebgg.jpg')}>
            <View style={{flexDirection: 'row', marginTop: 70}}>
              <Avatar.Image
              source={require('../assets/images.png')}
               
                size={70}
              />
             
            </View>

            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                Dav
                </Paragraph>
                <Caption style={styles.caption}> Shawn</Caption>
              </View>
              
            </View>
          </ImageBackground>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => {
                props.navigation.navigate('Profile');
              }}
            
            />
             <DrawerItem
              icon={({color, size}) => (
                <Icon name="account-check-outline" color={color} size={size} />
              )}
              label="Edit Profile"
              onPress={() => {
                props.navigation.navigate('SupportScreen');
              }}
            />
           
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="bookmark-outline" color={color} size={size} />
              )}
              label="Add Payment"
              onPress={() => {
                props.navigation.navigate('BookmarkScreen');
              }}
            />
           
           
             <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
          </Drawer.Section>
          
         
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
       
        <Image
           
            source={require('../assets/img/quintasGym/splash_icon3x.png')} style={{height:100, width: 150, marginLeft:55}}/>
      </Drawer.Section>
    </ImageBackground>
  );

  
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    marginTop: -50,
    height:180
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
    color:'#fff'
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color:'#fff'
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
    color:'#fff'
  },
  drawerSection: {
    marginTop: 15,
    
    
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },

});
