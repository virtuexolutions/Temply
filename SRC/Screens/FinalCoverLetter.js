import {
  FlatList,
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

const FinalCoverLetter = props => {
  const data = props?.route?.params?.data;
  const token = useSelector(state => state.authReducer.token);

  const onPressSave = async () => {
    const url = 'auth/cover-letter'
    const response = await Post(url, data, apiHeader(token))
    console.log("🚀 ~ onPressSave ~ response:", response?.data)
  }

  return (
    <ImageBackground
      style={styles.bg_container}
      source={require('../Assets/Images/bg.png')}>
      <Header title={' cover letter'} hideUser={true} showBack={true} />
      <View style={styles.main_view}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ImageBackground
            style={styles.letter_bg}
            source={require('../Assets/Images/coverletterbg.png')}>
            <View style={styles.titlecontainer}>
              <CustomText style={styles.title}>pamela miller</CustomText>
              <CustomText isBold style={styles.title2}>
                your professional title
              </CustomText>
            </View>
            <View style={styles.per_data}>
              <CustomText style={styles.per_text}>your address</CustomText>
              <CustomText style={styles.per_text}>
                your city ,state ,zip code
              </CustomText>
              <CustomText style={styles.per_text}>your phone number</CustomText>
              <CustomText style={styles.per_text}>
                your email address
              </CustomText>
            </View>

            <CustomText
              style={[
                styles.per_text,
                {
                  paddingVertical: moderateScale(4, 0.6),
                  // backgroundColor :'red'
                },
              ]}>
              {data?.date}
            </CustomText>
            <View style={styles.per_data}>
              <CustomText style={styles.per_text}>
                {data?.managerName}
              </CustomText>
              <CustomText style={styles.per_text}>
                {data?.companyName}
              </CustomText>
              <CustomText style={styles.per_text}>
                {data?.degreeYear}
              </CustomText>
              <CustomText style={styles.per_text}>
                company city, state, zip code
              </CustomText>
            </View>
            <CustomText
              style={[
                styles.per_text,
                {
                  paddingVertical: moderateScale(7, 0.6),
                  //   marginHorizontal : moderateScale(10,.6),
                },
              ]}>
              subject :{' '}
              <CustomText
                style={[
                  styles.per_text,
                  {
                    paddingVertical: moderateScale(10, 0.6),
                    marginLeft: moderateScale(5, 0.6),
                  },
                ]}>
                {data?.subject}
              </CustomText>
            </CustomText>
            <CustomText
              style={[
                styles.per_text,
                {
                  paddingVertical: moderateScale(5, 0.6),
                },
              ]}>
              Drear Mr./Ms. {''}
              <CustomText style={styles.per_text}>
                {data?.managerName}
              </CustomText>
            </CustomText>

            <CustomText style={styles.per_text}>
              {data?.details.replace(/\. /g, '.\n\n')}
            </CustomText>
            <View
              style={[
                styles.per_data,
                {
                  paddingVertical: moderateScale(10, 0.6),
                },
              ]}>
              <CustomText style={styles.per_text}>regard ,</CustomText>
              <CustomText style={styles.per_text}>{data?.name}</CustomText>
              <CustomText style={styles.per_text}>{data?.phone}</CustomText>
              <CustomText style={styles.per_text}>{data?.email}</CustomText>
              <CustomText style={styles.per_text}>
                Linkdin.com/username
              </CustomText>
            </View>
          </ImageBackground>
          <CustomButton
            text={'confirm'}
            textColor={Color.darkBlue}
            onPress={() => {
              // navigationService.navigate('Home');
              onPressSave();
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

export default FinalCoverLetter;

const styles = StyleSheet.create({
  bg_container: {
    width: windowWidth,
    alignItems: 'center',
    height: windowHeight,
    justifyContent: 'center',
    // alignItems: 'left',
    // paddingHorizontal: moderateScale(10, 0.6),
  },
  main_view: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.9,
    paddingVertical: moderateScale(15, 0.6),
  },
  letter_bg: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.77,
    paddingHorizontal: moderateScale(20, 0.6),
    // paddingVertical: moderateScale(15, 0.6),
    // backgroundColor: 'red',
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
    fontSize: moderateScale(10, 0.6),
    textTransform: 'uppercase',
    width: '100%',
    textAlign: 'center',
  },
  per_data: {
    alignItems: 'flex-start',
    // backgroundColor :'red'
  },

  per_text: {
    textTransform: 'capitalize',
    fontSize: moderateScale(11, 0.6),
  },
});
