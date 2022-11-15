import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  ImageBackground,
  View,
  Button,
  Text

} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '@react-navigation/native';
import Strings from '../utils/Strings';




const SplashScreen = ({navigation}) => {
  const {colors} = useTheme();

  return (
    <ImageBackground
      source={require('../assets/img/quintasGym/qjgbg.jpg')}
      style={styles.container}>
      <StatusBar backgroundColor="#222831" barStyle="light-content" />
      <View style={styles.header}>
       
        
      </View>
      <Animatable.View style={[styles.footer]} animation="fadeInUpBig">
     
      <TouchableOpacity onPress={()=>navigation.navigate('SignInScreen')} style={styles.button_start}>
			<Text style={styles.buttonTextLogin}>LOG IN</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={()=>navigation.navigate('SignUpScreen')} style={styles.button_start}>
			<Text style={styles.buttonTextRegister}>SIGN UP</Text>
			</TouchableOpacity>
     
       
       
    </Animatable.View>
    </ImageBackground>
  );
};

export default SplashScreen;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000302',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLogin: {
    backgroundColor: '#ffffff',
    margin:5,
    padding: 20,
    borderRadius: 3,
    width: 150,
  },
  buttonRegister: {
    backgroundColor: '#f50057',
    margin:5,
    padding: 20,
    borderRadius: 3,
    width: 150,
  },
  buttonTextLogin: {
    color: '#000000',
    textAlign: 'center',
  },
  buttonTextRegister: {
    color: '#ffffff',
    textAlign: 'center',
  },
  footer: {
    flex: 1,

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 5,
  },
  button: {
    
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 30,
    justifyContent: 'center',
  },
  signIn: {
   
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
  button_start:{
		minWidth: 200,
		backgroundColor: 'transparent',
		borderWidth: 1,
		borderColor: 'purple',
		marginBottom: 11,
    marginLeft:45,
    width:250,
		height: 60
		},
    buttonTextLogin: {
      color: '#ffffff',
      textAlign: 'center',
      fontSize:15,
      paddingTop: 20
  
    },
    buttonTextRegister: {
      color: '#ffffff',
      textAlign: 'center',
      fontSize:15,
      paddingTop: 20
      
    },

    button_start:{
      minWidth: 250,
      backgroundColor: '#5F5AA2',
      borderWidth: 1,
      borderColor: '#5F5AA2',
      marginBottom: 11,
      marginLeft:40,
      width:200,
      height: 60,
      borderRadius: 30
      },


		logo_start:{
		width: 140,
		height: 140,
		marginTop: 15,
		marginBottom: 30},
});
