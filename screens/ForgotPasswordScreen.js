import React from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar,
  ImageBackground,
  Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import {AuthContext} from '../components/context';


const ForgotPasswordScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    email: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    errorMessage: ""
  });

  const {forgotPassword} = React.useContext(AuthContext);

  const textForgotInputChange = val => {
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };

  const forgotHandle = (email) => {
    if (data.email !== "undefined") {
              
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!pattern.test(data.email)) {
        Alert.alert('Invalid !', 'Enter a valid email address.', [
          {text: 'Okay'},
        ])
        return;
      }
    }
    if(forgotPassword(email));
    {
      Alert.alert('Password Reset', 'Successfully sent to your email address', [
        {text: 'Okay'},
      ])
      navigation.pop();
      return;
    }
  };


  return (
    <ImageBackground
      source={require('../assets/img//quintasGym/onb2.jpg')}
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
      <Text style={styles.textFont}>
          No need to worry, Just enter yor email below and we will send you the
          password reset instructions
        </Text>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>RESET PASSWORD</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#84a9ac" size={20} />
            <TextInput
              placeholder="Enter Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={val => textForgotInputChange(val)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn}  
            onPress={() => {
              forgotHandle(data.email);
            }}>
              <LinearGradient
                colors={['#a862f9', '#460491']}
                style={styles.signIn}>
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: '#fff',
                    },
                  ]}>
                  RESET PASSWORD
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </ImageBackground>
  );
};

export default ForgotPasswordScreen;

const {height} = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,

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
    fontSize: 13,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#ffffff',
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
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
  textFont: {
    fontSize:20,
    fontFamily:"AvenirNext-Bold",
    fontStyle:"italic",
    color: "grey",

    margin:13
  }
});

