import React, { useState } from 'react';
import { Icon } from 'native-base';
import {
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
const { height, width } = Dimensions.get('window');
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

import { useDispatch, useSelector } from 'react-redux';
import { imageUrl } from '../Config';
import { setUserLogout, setUserLogoutAuth } from '../Store/slices/auth';
import LinearGradient from 'react-native-linear-gradient';
import { setUserLogOut } from '../Store/slices/common';
import navigationService from '../navigationService';

const Header = props => {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.commonReducer.notification);
  const cartData = useSelector(state => state.commonReducer.cart);
  const navigationN = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const {
    title,
    showBack,
    backBtnStyle,
    color,
    showList,
    headerColor,
    titleColor,
    close,
    onPress,
    navigateTO,
    headerType,
    cart,
    Notify,
    hideUser,
    height,
    style,
    // fromDrawer
  } = props;

  const [searchText, setSearchText] = useState('');
  const user = useSelector(state => state.commonReducer.userData);
  const userRole = useSelector(state => state.commonReducer.selectedRole);
  const token = useSelector(state => state.authReducer.token);
  const statusArray = [
    { label: 'Change Password', value: 'ChangePassword' },
    { label: 'Terms & Conditions', value: 'TermsAndConditions' },
    { label: 'Financial Breakdown', value: 'FinancialBreakDown' },
    { label: 'Logout', value: 'Logout' },
  ];

  const Confirm = () => {
    Alert.alert('Action required', 'Login to Continue', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Login',
        onPress: () => {
          navigationService.navigate('LoginScreen');
        },
      },
    ]);
    return true;
  };

  return (
    <View
      style={[
        styles.header2,
        {
          backgroundColor: headerColor ? headerColor : 'transparent',
        }.style && style,
        height && {
          height: height,
        },
      ]}
    // start={{x: 0, y: 0}}
    // end={{x: 1, y: 1}}
    // colors={headerColor ? headerColor : Color.themeBgColor}
    >
      <View
        style={{
          height: moderateScale(20, 0.3),
          width: moderateScale(30, 0.3),
          borderRadius: moderateScale(5, 0.3),
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: showBack || showList ? 'white' : 'transparent',
        }}>
        {showBack ? (
          <Icon
            name={'arrow-back'}
            as={Ionicons}
            size={moderateScale(25, 0.3)}
            color={backBtnStyle ? backBtnStyle : Color.white}
            onPress={() => {
              navigationN.goBack();
            }}
          />
        ) : (
          // <View
          //   style={{
          //     textAlign: 'center',
          //     height: windowHeight * 0.025,
          //     width: windowHeight * 0.02,
          //     // borderRadius: (windowHeight * 0.05) / 2,
          //     // backgroundColor :Color.white,
          //     paddingTop: moderateScale(6.6),
          //     // marginTop :moderateScale
          //   }}>
          //   <CustomImage
          //     source={require('../Assets/Images/menu.png')}
          //     style={{
          //       height: '100%',
          //       width: '100%',
          //     }}
          //   />
          // </View>
          <Icon
            style={{
              textAlign: 'center',
              height: windowHeight * 0.05,
              width: windowHeight * 0.05,
              borderRadius: (windowHeight * 0.05) / 2,
              // backgroundColor :Color.white,
              paddingTop: moderateScale(6.6),
              // marginTop :moderateScale
            }}
            name={'menu'}
            as={Feather}
            size={moderateScale(25, 0.3)}
            color={Color.black}
            onPress={() => {
              // navigationN.toggleDrawer();

              // navigationN.dispatch(DrawerActions.toggleDrawer())
            }}
          />
        )}
      </View>
      {title ? (
        <CustomText
          style={{
            fontSize: moderateScale(18, 0.6),
            color: color ? Color.black : Color.white,
          }}
          isBold>
          {title}
        </CustomText>
      ) : (
        <></>
        // <CustomImage
        //   resizeMode={'contain'}
        //   style={{
        //     width: windowWidth * 0.21,
        //     // backgroundColor : 'red' ,
        //     height: windowHeight * 0.05,
        //   }}
        //   source={require('../Assets/Images/logo.png')}
        // />
      )}

      {/* <CustomText isBold style={{color : Color.white , fontSize : moderateScale(20,0.6)}} >Hola!!</CustomText> */}
      <Icon
        name={"logout"}
        as={MaterialCommunityIcons}
        size={moderateScale(24, 0.2)}
        color={Color.black}
        style={{ right: -135, top: 2 }}
        onPress={() => {
          dispatch(setUserLogoutAuth())
        }}
      />
      {/* {!hideUser && cart ? (
        <View
          style={{
            // backgroundColor: 'red',
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: moderateScale(6, 0.6),
          }}>
          {cartData?.length > 0 && (
            <View
              style={{
                width: moderateScale(17, 0.6),
                height: moderateScale(17, 0.6),
                borderRadius: moderateScale(9, 0.6),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'red',
                position: 'absolute',
                right: -4,
                zIndex: 1,
                top: 0,
              }}>
              <CustomText
                isBold
                style={{
                  fontSize: moderateScale(10, 0.2),
                  color: Color.white,
                  textAlign: 'center',
                }}>
                {cartData?.length < 10 ? cartData?.length : '9+'}
              </CustomText>
            </View>
          )}

          <Icon
            name={'shopping-cart'}
            as={Feather}
            size={moderateScale(25, 0.3)}
            color={Color.white}
            onPress={() => {
              if (token == null) {
                Confirm();
                // navigationService.navigate('LoginScreen')
              } else if (cartData?.length > 0) {
                navigationService.navigate('CheckoutScreen');
              } else {
                return Platform.OS == 'android'
                  ? ToastAndroid.show('No Item in cart', ToastAndroid.SHORT)
                  : Alert('No Item in cart');
              }
            }}
          />
        </View>
      ) : (
        <View
          style={{
            width: windowWidth * 0.1,
            height: windowWidth * 0.1,
            borderRadius: (windowWidth * 0.1) / 2,
            backgroundColor: 'red',
            overflow: 'hidden',
          }}>
          <CustomImage
            source={require('../Assets/Images/dummyman5.png')}
            style={{
              height: '100%',
              width: '100%',
            }}
          />
        </View>
       )} */}
      {!hideUser &&
        <View
          style={{
            width: windowWidth * 0.1,
            height: windowWidth * 0.1,
            borderRadius: (windowWidth * 0.1) / 2,
            backgroundColor: 'red',
            overflow: 'hidden',
          }}>
          <CustomImage
            source={require('../Assets/Images/dummyman5.png')}
            style={{
              height: '100%',
              width: '100%',
            }}
          />
        </View>
      }

    </View>
  );
};
const styles = ScaledSheet.create({
  header1: {
    width: windowWidth,
    height: windowHeight * 0.1,
    backgroundColor: Color.white,
    marginBottom: moderateScale(5, 0.3),
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  statusModal: {
    alignSelf: 'flex-end',
    paddingVertical: moderateScale(15, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),
    backgroundColor: Color.white,
    // borderRadius: moderateScale(5, 0.3),
    marginTop: moderateScale(60, 0.3),
    // borderWidth: 1,
    borderColor: Color.green,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 3,
  },
  header2: {
    width: windowWidth,
    // height: windowHeight * 0.13,
    backgroundColor: 'transparent',
    // justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(10, 0.3),
    paddingVertical: moderateScale(20, 0.3),
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  notificationCircle: {
    position: 'absolute',
    height: moderateScale(10, 0.3),
    width: moderateScale(10, 0.3),
    borderRadius: moderateScale(5, 0.3),
    backgroundColor: Color.green,
    right: moderateScale(5, 0.3),
    // marginTop : moderateScale(10,0.3)
  },
});
export default Header;
