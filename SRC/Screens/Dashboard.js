import {
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useState } from 'react';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import { Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { moderateScale } from 'react-native-size-matters';
import navigationService from '../navigationService';
import CustomText from '../Components/CustomText';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import Entypo from 'react-native-vector-icons/Entypo';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import CustomButton from '../Components/CustomButton';
import { SetUserRole, setUserToken } from '../Store/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData, setUserType } from '../Store/slices/common';
import { Post } from '../Axios/AxiosInterceptorFunction';
import Header from '../Components/Header';
import { mode } from 'native-base/lib/typescript/theme/tools';

const Dashboard = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const fromSignup = route?.params?.fromSignup;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('Dashboard')
    console.log("🚀 ~ Dashboard ~ status:", status)
    const userData = useSelector(state => state.commonReducer.userData);
    console.log("🚀 ~ Dashboard ~ userData:", userData)


    return (
        <SafeAreaView style={styles.container}>
            <Header title={'Dashboard'} hideUser={false} showBack={false} />
            <View style={styles.main_view}>
                <View style={styles.tab_view}>
                    <TouchableOpacity onPress={() => setStatus('Dashboard')} style={[styles.tab_sub_view, {
                        borderBottomWidth: 2,
                        borderBottomColor: status === 'Dashboard' ? Color.themeBlue : Color.veryLightGray,
                    }]}>
                        <Icon name='document-text' as={Ionicons} size={moderateScale(40, 0.6)} color={Color.themeBlue} />
                        <CustomText style={styles.subtextStyle}>Dashboard</CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setStatus('Status')} style={[styles.tab_sub_view, {
                        borderBottomWidth: 2,
                        borderBottomColor: status === 'Status' ? Color.themeBlue : Color.veryLightGray
                    }]}>
                        <Icon name='circular-graph' as={Entypo} size={moderateScale(40, 0.6)} color={Color.themeBlue} />
                        <CustomText style={styles.subtextStyle}>Status</CustomText>
                    </TouchableOpacity>
                </View>
                <View style={{
                    width: windowWidth,
                    height: 2,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.23,
                    shadowRadius: 2.62,
                    elevation: 4,
                    marginTop: moderateScale(10, 0.6)
                }} />
                <View style={styles.sub_view}>
                    <TouchableOpacity onPress={() => navigationService.navigate('AddEmployees')} style={styles.btn_view}>
                        <CustomText isBold style={styles.heading}>100</CustomText>
                        <CustomText style={styles.text}>Employees</CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigationService.navigate('Department')} style={[styles.btn_view, {
                        backgroundColor: '#31C3BB'
                    }]}>
                        <CustomText isBold style={styles.heading}>100</CustomText>
                        <CustomText style={styles.text}>Department</CustomText>
                    </TouchableOpacity>
                </View>
                <View style={[styles.sub_view, {
                    marginTop: moderateScale(15, 0.6)
                }]}>
                    <TouchableOpacity style={[styles.btn_view, {
                        backgroundColor: '#557AFF'
                    }]}>
                        <CustomText isBold style={styles.heading}>30</CustomText>
                        <CustomText style={styles.text}>categories</CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btn_view, {
                        backgroundColor: '#C131C3'
                    }]}>
                        <CustomText isBold style={styles.heading}>107</CustomText>
                        <CustomText style={styles.text}>document</CustomText>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: Color.white,
        paddingHorizontal: moderateScale(15, 0.3),
        // paddingVertical: moderateScale(20, 0.6),
        alignItems: 'center',
        paddingTop: moderateScale(10, 0.6),
        // justifyContent : 'center'
    },
    main_view: {
        paddingVertical: moderateScale(10, 0.6),
        paddingHorizontal: moderateScale(15, 0.6)
    },
    welcomeText: {
        fontSize: moderateScale(40, 0.3),
        color: Color.darkbrown,
    },
    subtextStyle: {
        fontSize: moderateScale(16, 0.3),
        color: Color.themeBlue,
    },
    tab_view: {
        width: windowWidth * 0.95,
        height: windowWidth * 0.2,
        // backgroundColor: "red",
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 4,
        // },
        // shadowOpacity: 0.30,
        // shadowRadius: 4.65,
        // elevation: 8,
        // borderBottomColor: Color.ver,
        // borderBottomWidth: 1
    },
    tab_sub_view: {
        width: '55%',
        height: '100%',
        // backgroundColor: 'blue',
        alignItems: "center",
        justifyContent: "center",
        marginTop: moderateScale(20, 0.6)
    },
    sub_view: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: moderateScale(40, 0.6),
        paddingHorizontal: moderateScale(15, 0.6)
    },
    btn_view: {
        width: windowWidth * 0.42,
        height: windowWidth * 0.36,
        backgroundColor: "#C4C4C4",
        borderRadius: moderateScale(15, 0.6),
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    heading: {
        fontSize: moderateScale(20, 0.6),
        color: Color.white
    },
    text: {
        fontSize: moderateScale(15, 0.6),
        color: Color.white
    }
});
