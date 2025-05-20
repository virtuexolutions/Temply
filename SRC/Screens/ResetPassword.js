import React, {useState} from 'react';
import {
  Image,
  Dimensions,
  ImageBackground,
  Platform,
  ToastAndroid,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomText from '../Components/CustomText';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from '../Components/CustomButton';

import {Icon} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {Formik} from 'formik';
import {forgotpassword} from '../Constant/schema';

const ResetPassword = props => {
  const dispatch = useDispatch();
  const {user_type} = useSelector(state => state.authReducer);
  const email = props?.route?.params?.email;
  console.log('🚀 ~ ResetPassword ~ email===================:', email);

  const navigationN = useNavigation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const resetPassword = async () => {
    const url = 'password/reset';
    const data = {
      email: email,
      password: password,
      confirm_password: confirmPassword,
    };
    setIsLoading(true);
    const response = await Post(url, data, apiHeader());
    setIsLoading(false);
    if (response != undefined) {
      console.log('response data =>', response?.data);
      Platform.OS == 'android'
        ? ToastAndroid.show(`Password Reset SuccessFully`, ToastAndroid.SHORT)
        : alert(`Password Reset SuccessFully`);
      navigationN.navigate('LoginScreen');
    }
  };

  return (
    <>
      <CustomStatusBar
        backgroundColor={Color.white}
        barStyle={'dark-content'}
      />
      <View style={styles.main_container}>
        <TouchableOpacity activeOpacity={0.8} style={styles.back}>
          <Icon
            name={'arrowleft'}
            as={AntDesign}
            size={moderateScale(22, 0.3)}
            color={Color.darkBlue}
            onPress={() => {
              navigationN.goBack();
            }}
          />
        </TouchableOpacity>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <CustomText isBold style={styles.txt2}>
            Forget Password
          </CustomText>
          <CustomText style={styles.txt3}>
            Forgot your password ? don't worry, jsut take a simple step and
            create your new password!
          </CustomText>

             
          <View style={styles.text_input}>
          <TextInputWithTitle
      iconSize={moderateScale(20,0.3)}
        iconName={'key'}
        iconType={Ionicons}
        color={Color.blue}
        secureText={true}
        setText={setPassword}
        value={password}
        placeholder={'Password'}
        placeholderColor={Color.grey}
        viewWidth={0.7}
        borderBottomWidth={2}
        borderColor={Color.blue}
        marginTop={moderateScale(30, 0.3)}
      />
                 
                 <TextInputWithTitle
      iconSize={moderateScale(20,0.3)}
        iconName={'key'}
        iconType={Ionicons}
        color={Color.blue}
        secureText={true}
        setText={setConfirmPassword}
        value={confirmPassword}
        placeholder={'Confirm New Password'}
        placeholderColor={Color.grey}
        viewWidth={0.7}
        borderBottomWidth={2}
        borderColor={Color.blue}
        marginTop={moderateScale(30, 0.3)}
      />
                 
                  <CustomButton
                    text={
                      isLoading ? (
                        <ActivityIndicator size={'small'} color={Color.white} />
                      ) : (
                        'Reset'
                      )
                    }
                    textColor={Color.white}
                    width={windowWidth * 0.65}
                    height={windowHeight * 0.065}
                    marginTop={moderateScale(20, 0.3)}
                    onPress={resetPassword}
                    borderRadius={30}
                    bgColor={
                      Color.darkBlue
                    }
                  />
                </View>
     
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

const styles = ScaledSheet.create({
  main_container: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor:Color.white,
  },
  txt2: {
    color: Color.black,
    fontSize: moderateScale(24, 0.6),
  },
  txt3: {
    color: Color.black,
    fontSize: moderateScale(11, 0.6),
    textAlign: 'center',
    width: '80%',
    marginVertical: moderateScale(10, 0.3),
    lineHeight: moderateScale(17, 0.3),
  },
  back: {
    position: 'absolute',
    top: moderateScale(20, 0.3),
    left: moderateScale(20, 0.3),
    height: moderateScale(30, 0.3),
    width: moderateScale(30, 0.3),
    borderRadius: moderateScale(5, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: Color.themeBlack,
    zIndex: 1,
  },
  text_input: {
    alignItems: 'center',
    borderWidth: 0.45,
    width: windowWidth * 0.9,
    borderColor: Color.lightGrey,
    elevation:3,
    paddingVertical: moderateScale(10, 0.6),
    // height: windowHeight * 0.36,
    shadowRadius: 25,
    shadowColor: "grey",
    shadowOpacity:0.6,
    shadowOffset:{width:0, height:1},
    borderRadius: 25,
    paddingTop: windowHeight * 0.03,
    paddingHorizontal: moderateScale(30, 0.6),
  },
  container: {
    paddingBottom: moderateScale(20, 0.3),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: windowHeight,
  },
  schemaText: {
    fontSize: moderateScale(10, 0.6),
    color: Color.red,
    alignSelf: 'flex-start',
  },
});

export default ResetPassword;
