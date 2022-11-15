import React, {useState} from "react";
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
  Alert,
  ImageBackground,
} from "react-native";
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import ImagePicker from 'react-native-image-crop-picker';
// import styled from "styled-components";
import axios from "axios";
import baseUrl from "../baseUrl";
axios.default.baseUrl = baseUrl;

import { useTheme } from "react-native-paper";
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButton from 'react-native-action-button';
import { AuthContext } from "../components/context";
import { sleep } from "../components/Sleep";
import { Loading } from "../components/Loading";
import {
  InputField,
  InputWrapper,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
} from '../styles/AddPost';



const SignUpScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    firstname:"",
    lastname:"",
    email: "",
    password: "",
    confirm_password: "",
    image: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    isConfirmedValidPassword: true,
    errorMessage: "",
  });

  const { signUp } = React.useContext(AuthContext);
  const [profilePhoto, setProfilePhoto] = useState();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const  textInputFirstNameChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        firstname: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        firstname: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const  textInputLastNameChange= (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        lastname: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        lastname: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };
  
  const textInputChange = (val) => {
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

  


  const handlePasswordChange = (val) => {
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

  const handleConfirmPasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        confirm_password: val,
        isConfirmedValidPassword: true,
      });
    } else {
      setData({
        ...data,
        confirm_password: val,
        isConfirmedValidPassword: false,
      });
    }
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  const handleValidUser = (val) => {
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

  const registerHandle = (firstname, lastname, email, password, confirm_password) => {
    if (
      data.firstname.length == 0 ||
      data.lastname.length == 0 ||
      data.email.length == 0 ||
      data.password.length == 0 ||
      data.confirm_password.length == 0
    ) {
      Alert.alert(
        "Invalid Input!",
        "Email or password field cannot be empty.",
        [{ text: "Okay" }]
      );
      return;
    }

    if (data.email !== "undefined") {
      var pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(data.email)) {
        Alert.alert("Invalid !", "Enter a valid email address.", [
          { text: "Okay" },
        ]);
        return;
      }
    }

    // if (!data.email) {
    //   Alert.alert('Invalid !', 'Enter a valid email.', [
    //     {text: 'Okay'},
    //   ])
    //   return;

    // } else if (!/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i.test(data.email)) {
    //   Alert.alert('Invalid !', 'Enter a valid email address.', [
    //     {text: 'Okay'},
    //   ])

    //   return;
    // }

    if (data.password !== data.confirm_password) {
      Alert.alert("Invalid !", "Passwords doesnot match, try again.", [
        { text: "Okay" },
      ]);

      return;
    }

    if (data.password.length < 8) {
      Alert.alert("Invalid !", "Password is less than 8 characters", [
        { text: "Okay" },
      ]);

      return;
    }

    if (signUp(firstname,lastname, email, password, confirm_password));
    {
      Alert.alert("Successful!", "You have successfully registered", [
        { text: "Okay" },
      ]);
      navigation.pop();
      return;
    }
    // signUp(email, password, confirm_password);
  };

  return (
    <ImageBackground
      source={require("../assets/img/quintasGym/onb.png")}
      style={styles.container}
    >
      <StatusBar backgroundColor="#222831" barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require("../assets/img/quintasGym/splash_icon3x.png")}
          style={styles.logo}
          resizeMode="contain"
        />
         
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
        
        <Text style={styles.text_footer}>FIRST NAME</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#84a9ac" size={20} />
            <TextInput
              placeholder="Enter Name"
              style={styles.textInput}
              placeholderTextColor="#666666"
              autoCapitalize="none"
              onChangeText={(val) => textInputFirstNameChange(val)}
             
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
         
          <Text style={styles.text_footer}>LAST NAME</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#84a9ac" size={20} />
            <TextInput
              placeholder="Enter Last Name"
              placeholderTextColor="#666666"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputLastNameChange(val)}
            
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>

          <Text style={styles.text_footer}>EMAIL</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#84a9ac" size={20} />
            <TextInput
              placeholder="Enter Email"
              style={styles.textInput}
              placeholderTextColor="#666666"
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
              onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
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
                fontSize: 13,
                marginTop: 35,
              },
            ]}
          >
            PASSWORD
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#84a9ac" size={20} />
            <TextInput
              placeholder="Enter Password"
              placeholderTextColor="#666666"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
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

          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 35,
              },
            ]}
          >
            CONFIRM PASSWORD
          </Text>
          <View style={styles.action}>
            <Feather name="lock" color="#84a9ac" size={20} />
            <TextInput
              placeholder="Re-enter Password"
              placeholderTextColor="#666666"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.secureTextEntry ? (
                <Feather name="eye-off" color="grey" size={20} />
              ) : (
                <Feather name="eye" color="grey" size={20} />
              )}
            </TouchableOpacity>
          </View>
          {data.isConfirmedValidPassword ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Confirmed password must be 8 characters long.
              </Text>
            </Animatable.View>
          )}



          <View style={styles.textPrivate}>
          
            <Text style={styles.color_textPrivate}>
              By registering you agree to our
            </Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Terms of service
            </Text>
            <Text style={styles.color_textPrivate}> and</Text>
            <Text style={[styles.color_textPrivate, { fontWeight: "bold" }]}>
              {" "}
              Privacy policy
            </Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signUp}
              onPress={() => {
                registerHandle(
                  data.firstname,
                  data.lastname,
                  data.email,
                  data.password,
                  data.confirm_password,
                  data.image
                );
              }}
            >
              <LinearGradient
                colors={['#5F5AA2', '#460491']}
                style={styles.signUp}
              >
                <Text
                  style={[
                    styles.textSign,
                    {
                      color: "#fff",
                    },
                  ]}
                >
                  Sign Up
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </ImageBackground>
  );
};

export default SignUpScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

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
  logo: {
    width: height_logo,
    height: height_logo,
  },
  footer: {
    flex: Platform.OS === "ios" ? 3 : 5,

    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
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
  button: {
    alignItems: "center",
    marginTop: 50,
  
  },
  signUp: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
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

