import dayjs from 'dayjs';
import { Icon } from 'native-base';
import React, { useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import { windowHeight, windowWidth } from '../Utillity/utils';

const HomeScreen = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const fromSignup = route?.params?.fromSignup;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('HomeScreen')
    console.log("🚀 ~ HomeScreen ~ status:", status)
    const userData = useSelector(state => state.commonReducer.userData);
    console.log("🚀 ~ HomeScreen ~ userData:", userData)
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [tab, setTab] = useState('my');

    const documents = [
        {
            id: '1',
            title: 'Welcome Aboard!',
            date: '2025-05-26',
            status: 'new',
            assignedTo: 'me',
        },
        {
            id: '2',
            title: 'Monthly Survey',
            date: '2025-05-25',
            status: 'seen',
            assignedTo: 'me',
        },
        {
            id: '3',
            title: 'Compliance Training',
            date: '2025-04-15',
            status: 'new',
            assignedTo: 'everyone',
        },
    ];
    const today = dayjs();
    console.log("🚀 ~ HomeScreen ~ today:", today)
    const daysInMonth = [];

    for (let i = 0; i < today.date(); i++) {
        daysInMonth.push(today.subtract(i, 'day'));
    }

    const filteredDocs = documents.filter(doc =>
        dayjs(doc.date).isSame(selectedDate, 'day') &&
        (tab === 'all' || doc.assignedTo === 'me')
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header_view}>
                <Header isShadow={false} hideUser={false} showBack={false} headerColor={Color.themeBlue} />
                <View style={styles.heading_sub_view}>
                    <CustomText style={styles.welcomeText}>{`Hello ${userData?.detail?.full_name}`}</CustomText>
                    <CustomText style={styles.heading}>{userData?.detail?.designation}</CustomText>
                    <View style={[styles.row_view, {
                        justifyContent: 'space-between',
                        alignItems: 'flex-start'
                    }]}>
                        <View style={styles.row_view}>
                            <CustomText style={styles.subtextStyle}>
                                {selectedDate.format('MMMM')}
                            </CustomText>
                            <Icon name='down'
                                as={AntDesign}
                                size={moderateScale(18, 0.3)}
                                color={Color.white}
                                style={{
                                    marginLeft: moderateScale(4, 0.6)
                                }}
                            />
                        </View>
                        <View style={styles.calender_view}>
                            <CustomText isBold style={styles.date}>{selectedDate.format('DD')}</CustomText>
                            <CustomText style={styles.month}>{selectedDate.format('MMMM')}</CustomText>
                        </View>
                    </View>
                    <ScrollView style={{
                        marginTop: moderateScale(20, 0.6),
                        width: windowWidth * 0.96
                    }} horizontal showsHorizontalScrollIndicator={false}>
                        {daysInMonth.map((date, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[styles.calender_view, {
                                    marginTop: moderateScale(20, 0.6),
                                    marginRight: 8,
                                    alignItems: 'center',
                                    backgroundColor: date.isSame(selectedDate, 'day') ? '#097f9f' : '#c0effc',
                                }]}
                                onPress={() => setSelectedDate(date)}
                            >
                                <CustomText isBold style={{ color: date.isSame(selectedDate, 'day') ? 'white' : 'black' }}>
                                    {date.format('DD')}
                                </CustomText>
                                <CustomText style={{ fontSize: 10, color: date.isSame(selectedDate, 'day') ? 'white' : 'black' }}>{date.format('ddd')}</CustomText>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.main_view}>
                    <View style={[styles.row_view, {
                        justifyContent: 'space-between',
                        marginTop: moderateScale(15, 0.6)
                    }]}>
                        <TouchableOpacity onPress={() => setTab('all')} style={[styles.btn_view, {
                            borderBottomWidth: 2,
                            borderBottomColor: tab === 'all' ? Color.themeBlue : Color.white
                        }]}>
                            <CustomText isBold={tab === 'all' ? true : false} style={{
                                fontSize: moderateScale(15, 0.6)
                            }}>All Documents</CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setTab('my')} style={[styles.btn_view, {
                            borderBottomWidth: 2,
                            borderBottomColor: tab === 'my' ? Color.themeBlue : Color.white
                        }]}>
                            <CustomText isBold={tab === 'my' ? true : false} style={{
                                fontSize: moderateScale(15, 0.6)
                            }}>My Documents</CustomText>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={filteredDocs}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View
                                style={{
                                    backgroundColor: 'white',
                                    padding: 16,
                                    marginVertical: 8,
                                    borderRadius: 12,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    shadowColor: '#000',
                                    shadowOpacity: 0.1,
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowRadius: 4,
                                    elevation: 2,
                                    marginTop: moderateScale(15, 0.6)
                                }}
                            >
                                <View>
                                    <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.title}</Text>
                                    <Text style={{ color: '#718096', fontSize: 12 }}>
                                        {dayjs(item.date).format('DD MMM YYYY')}
                                    </Text>
                                </View>
                                {item.status === 'new' && (
                                    <View
                                        style={{
                                            backgroundColor: '#38A169',
                                            paddingVertical: 4,
                                            paddingHorizontal: 8,
                                            borderRadius: 10,
                                        }}
                                    >
                                        <Text style={{ color: 'white', fontSize: 10 }}>NEW</Text>
                                    </View>
                                )}
                            </View>
                        )}
                    />
                </View>
            </View>

        </SafeAreaView>
    );
};

export default HomeScreen;

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
    heading_sub_view: {
        paddingHorizontal: moderateScale(15, 0.6),
    },
    welcomeText: {
        fontSize: moderateScale(35, 0.3),
        color: Color.white,
    },
    subtextStyle: {
        fontSize: moderateScale(16, 0.3),
        color: Color.white,
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
        width: windowWidth * 0.45,
        height: windowWidth * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row_view: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    heading: {
        fontSize: moderateScale(18, 0.6),
        color: Color.grey,
        top: -15
    },
    text: {
        fontSize: moderateScale(15, 0.6),
        color: Color.white
    },
    header_view: {
        width: windowWidth,
        height: windowHeight * 0.35,
        backgroundColor: Color.themeBlue,
    },
    calender_view: {
        width: moderateScale(45, 0.6),
        height: moderateScale(45, 0.6),
        backgroundColor: Color.white,
        borderRadius: moderateScale(5, 0.6),
        alignItems: "center",
        justifyContent: 'center',
    },
    date: {
        fontSize: moderateScale(17, 0.6),
        color: Color.themeBlue
    },
    month: {
        fontSize: moderateScale(11, 0.6),
        color: Color.veryLightGray
    }
});
