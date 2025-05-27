import { DrawerActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import ScreenBoiler from '../Components/ScreenBoiler';
import { windowHeight, windowWidth } from '../Utillity/utils';
import navigationService from '../navigationService';
import { useDispatch, useSelector } from 'react-redux';
import { setUserLogOut } from '../Store/slices/common';
import { setUserLogoutAuth, SetUserRole } from '../Store/slices/auth';
import { setUserToken } from '../Store/slices/auth';
// import ReferFriendModal from '../Screens/ReferFriendScreen'
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import Foundation from 'react-native-vector-icons/Foundation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Icon } from 'native-base';

const Drawer = React.memo(() => {
  const dispatch = useDispatch();
  const { user_type } = useSelector(state => state.authReducer);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const userData = useSelector(state => state.commonReducer.userData);

  const navigation = useNavigation();
  const adminData = [
    {
      id: 1,
      name: 'Dashboard',
      onPress: () => {
        navigation.navigate('HomeScreen');
      },
      iconName: 'table-cells-large',
      iconType: FontAwesome6
    },
    {
      id: 2,
      name: 'Company Details',
      onPress: () => {
        // setIsModalVisible(true);
        navigation.navigate('CompanyDetails');
      },
      iconName: 'building',
      iconType: FontAwesome6
    },
    {
      id: 2,
      name: 'Tamplates',
      onPress: () => {
        // setIsModalVisible(true);
        navigation.navigate('CompanyDetails');
      },
      iconName: 'filetext1',
      iconType: AntDesign
    },
    {
      id: 3,
      name: 'Department',
      onPress: () => {
        navigation.navigate('MyJourneys');
      },
      iconName: 'graph-horizontal',
      iconType: Foundation
    },
    {
      id: 4,
      name: 'Categories',
      onPress: () => {
        navigation.navigate('History');
      },
      iconName: 'folder',
      iconType: Foundation
    },
    {
      id: 4,
      name: 'Document',
      onPress: () => {
        navigation.navigate('AddYourCar');
      },
      iconName: 'document',
      iconType: Ionicons
    },
  ];

  return (
    <ScreenBoiler
      statusBarBackgroundColor={Color.themeBlue}
      statusBarContentStyle={'dark-content'}>
      <View style={styles.Profile}>
        <View style={{
          width: windowWidth * 0.3,
          height: windowWidth * 0.3,
          backgroundColor: 'red',
          borderRadius: windowWidth,
          marginTop: moderateScale(16, 0.6)
        }}>
          <CustomImage source={require('../Assets/Images/dummyman5.png')} style={styles.image} />
        </View>
        <CustomText style={styles.heading_text}>{userData?.name}</CustomText>
        <CustomText style={styles.heading_text}>{userData?.email}</CustomText>
      </View>

      <View
        style={{
          height: '60%',
          marginTop: moderateScale(30, 0.6)
        }}>
        {adminData.map((item, index) => (
          <>
            <TouchableOpacity
              key={item.id}
              onPress={item.onPress}
              style={{
                width: windowWidth * 0.7,
                borderColor: Color.black,
                margin: moderateScale(16, 0.3),
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}>
              <Icon name={item?.iconName} as={item?.iconType} size={moderateScale(20, 0.6)} color={Color.themeBlue} />
              <CustomText
                style={{
                  fontSize: moderateScale(14, 0.6),
                  color: Color.grey,
                  marginLeft: moderateScale(10, 0.6)
                }}>
                {item.name}
              </CustomText>
            </TouchableOpacity>
          </>
        ))}
      </View>
      <TouchableOpacity
        onPress={() => dispatch(setUserLogoutAuth())
        }
        style={{
          width: windowWidth * 0.7,
          borderColor: Color.black,
          margin: moderateScale(16, 0.3),
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <Icon name={"logout"}
          as={MaterialCommunityIcons}
          size={moderateScale(20, 0.6)}
          color={Color.themeBlue}
        />
        <CustomText
          style={{
            fontSize: moderateScale(14, 0.6),
            color: Color.grey,
            marginLeft: moderateScale(10, 0.6)
          }}>
          {'Logout'}
        </CustomText>
      </TouchableOpacity>
    </ScreenBoiler>
  );
});

export default Drawer;

const styles = StyleSheet.create({
  Profile: {
    width: '100%',
    height: windowWidth * 0.6,
    // borderRadius: (windowWidth * 0.2) / 1,
    backgroundColor: Color.themeBlue,
    justifyContent: 'center',
    alignItems: 'center', paddingHorizontal: moderateScale(10, 0.6)
  },
  menu_text: {
    color: Color.darkGray,
  },
  profile_view: {
    paddingHorizontal: moderateScale(20, 0.6),
    height: '20%',
    paddingVertical: moderateScale(20, 0.6),
  },
  image_view: {
    width: moderateScale(60, 0.6),
    height: moderateScale(60, 0.6),
    borderRadius: windowHeight,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: windowHeight,
  },
  heading_text: {
    fontSize: moderateScale(12, 0.6),
    // textTransform: 'uppercase',
    color: Color.white
  },
  text: {
    fontSize: moderateScale(11, 0.6),
  },
  end_view: {
    height: '20%',
    width: '100%',
    paddingHorizontal: moderateScale(20, 0.6),
  },
});
