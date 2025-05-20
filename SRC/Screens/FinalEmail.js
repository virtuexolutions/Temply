import {
  ActivityIndicator,
  FlatList,
  I18nManager,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import Header from '../Components/Header';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import { moderateScale } from 'react-native-size-matters';
import { Icon } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { useSelector } from 'react-redux';

const FinalEmail = props => {
  const data = props?.route?.params?.data;
  const fromHome = props?.route?.params?.fromHome;
  console.log("🚀 ~ data:", data)
  const token = useSelector(state => state.authReducer.token);
  const [loading, setLoading] = useState(false)

  const saveEmailData = async () => {
    const url = 'auth/mail'
    setLoading(true)
    const response = await Post(url, data, apiHeader(token))
    console.log("🚀 ~ saveEmailData ~ response:", response?.data)
    setLoading(false)
    if (response?.data != undefined) {
      setLoading(false)
      navigationService.navigate('Home')
    }
  }
  return (
    <ImageBackground
      style={styles.bg_container}
      source={require('../Assets/Images/bg.png')}>
      <Header title={'Edit cover letter'} hideUser={true} showBack={true} />
      <View style={styles.main_view}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.letter_bg}>
            <View style={styles.titlecontainer}>
              {/* <CustomText style={styles.title}>pamela miller</CustomText> */}
              <CustomText isBold style={styles.title2}>
                {data?.subject}
              </CustomText>
            </View>

            <CustomText
              style={[
                styles.per_text,
                {
                  paddingVertical: moderateScale(10, 0.6),
                  // backgroundColor :'red'
                },
              ]}>
              {`  Dear ${data?.managerName}`}
            </CustomText>

            <CustomText style={styles.per_text}>{data?.details.replace(/\. /g, ".\n\n")}</CustomText>
            <View
              style={[
                styles.per_data,
                {
                  paddingVertical: moderateScale(10, 0.6),
                },
              ]}>
              <CustomText
                style={[
                  styles.per_text,
                  {
                    paddingTop: moderateScale(10, 0.6),
                  },
                ]}>
                kind regard ,
              </CustomText>
              <CustomText
                style={[
                  styles.per_text,
                  {
                    paddingTop: moderateScale(20, 0.6),
                  },
                ]}>
                {data?.name}
              </CustomText>
              <CustomText style={styles.per_text}>{data?.phone}</CustomText>
            </View>
          </View>

          <CustomButton
            text={
              loading ?
                <ActivityIndicator
                  size="small"
                  style={styles.indicatorStyle
                  }
                  color={Color.darkBlue}
                /> : fromHome ? 'Go Back' : 'Save'}
            textColor={Color.darkBlue}
            onPress={() => {
              fromHome ? navigationService.navigate('Home') :
                saveEmailData()
            }}
            width={windowWidth * 0.8}
            height={windowHeight * 0.06}
            borderRadius={moderateScale(20, 0.3)}
            bgColor={Color.white}
            marginTop={moderateScale(20, 0.6)}
          />
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

export default FinalEmail;

const styles = StyleSheet.create({
  bg_container: {
    width: windowWidth,
    alignItems: 'center',
    height: windowHeight,
    justifyContent: 'center',
  },
  main_view: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.9,
    paddingVertical: moderateScale(15, 0.6),
    alignItems: 'center',
  },
  letter_bg: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.6,
    paddingHorizontal: moderateScale(20, 0.6),
    backgroundColor: Color.white,
    marginVertical: moderateScale(30, 0.6),
  },
  indicatorStyle: {
    paddingRight: 5,
    paddingLeft: I18nManager.isRTL ? 5 : 0,
  },
  titlecontainer: {
    alignItems: 'center',
    paddingVertical: moderateScale(15, 0.6),
  },
  title: {
    fontSize: moderateScale(16, 0.6),
    textTransform: 'uppercase',
    width: '100%',
    textAlign: 'center',
    letterSpacing: 3,
  },
  title2: {
    fontSize: moderateScale(12, 0.6),
    textTransform: 'capitalize',
    width: '100%',
    textAlign: 'center',
    // color: Color.darkGray,
    // paddingVertical: moderateScale(30, 0.6),
    paddingTop: moderateScale(30, 0.6),
  },
  per_data: {
    alignItems: 'flex-start',
    // backgroundColor :'red'
  },

  per_text: {
    textTransform: 'capitalize',
    fontSize: moderateScale(11, 0.6),
    // color: Color.darkGray,
  },
});
