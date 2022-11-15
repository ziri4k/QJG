import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  Dimensions,
  ImageBackground,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import baseUrl from "../baseUrl";
axios.default.baseUrl = baseUrl;

import {useTheme} from 'react-native-paper';


import {AuthContext} from '../components/context';
import Users from '../model/users';




const SignInScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    errorMessage: ""
  });

  const {colors} = useTheme();

  const {signIn} = React.useContext(AuthContext);
  

  const textInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const handleValidUser = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  

  const loginHandle = (email, password) => {
   

    if (data.email.length == 0 || data.password.length == 0) {
      Alert.alert(
        'Wrong Input!',
        'Email or Password field cannot be empty.',
        [{text: 'Okay'}],
      );
      return;
    }
    if (email, password.length == 0) {
      Alert.alert('Invalid User!', 'Email or Password is incorrect.', [
        {text: 'Okay'},
      ]);
      return;
    }
  
    if (data.email !== "undefined") {
              
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(data.email)) {
        Alert.alert('Invalid !', 'Enter a valid email address.', [
          {text: 'Okay'},
        ])
        return;
      }
    }

    if (data.password.length < 8) {
      Alert.alert('Invalid !', 'Password is less than 8 characters', [
        {text: 'Okay'},
      ])
      
      return;
    }
   
    signIn(email, password);
  };

  return (
    <ImageBackground
      source={require('../assets/img/quintasGym/onb.png')}
      style={styles.container}>
      <StatusBar backgroundColor="#222831" barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require('../assets/img/quintasGym/splash_icon3x.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={[
          styles.footer,
         
        ]}>
        <Text
          style={[
            styles.text_footer,
            {
              color:"#a862f9",
              fontSize:13
            },
          ]}>
          EMAIL
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text}  size={20} />
          <TextInput
            placeholder="Enter Email"
            placeholderTextColor="#666666"
            style={[
              styles.textInput,
              {
                color: "white",
              },
            ]}
            autoCapitalize="none"
            onChangeText={val => textInputChange(val)}
            onEndEditing={e => handleValidUser(e.nativeEvent.text)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        {data.isValidUser ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Email must be 4 characters long.
            </Text>
          </Animatable.View>
        )}

        <Text
          style={[
            styles.text_footer,
            {
              color: "#a862f9",
              fontSize:13,
              marginTop: 35,
            },
          ]}>
          PASSWORD
        </Text>
        <View style={styles.action}>
          <Feather name="lock" color={colors.text} size={20} />
          <TextInput
            placeholder="Enter Password"
            placeholderTextColor="#666666"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={[
              styles.textInput,
              {
                color: 'white',
              },
            ]}
            autoCapitalize="none"
            onChangeText={val => handlePasswordChange(val)}
          />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
        {data.isValidPassword ? null : (
          <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>
              Password must be 8 characters long.
            </Text>
          </Animatable.View>
        )}

       
        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            onPress={() => {
              loginHandle(data.email, data.password);
            }}>
            <LinearGradient
              colors={['#5F5AA2', '#460491']}
              style={styles.signIn}>
              <Text
                style={[
                  styles.textSign,
                  {
                    color: '#fff',
                  },
                ]}>
                Sign In
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>navigation.navigate('ForgotPasswordScreen')}>
          <Text style={{color: '#fff', marginTop: 15}}>
            Forgot password?
          </Text>
        </TouchableOpacity>
        </View>
      </Animatable.View>
    </ImageBackground>
  );
};

export default SignInScreen;
const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  footer: {
    flex: 4,
 
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#a862f9',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
