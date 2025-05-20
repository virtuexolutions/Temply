import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../Components/Header'
import { windowHeight, windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { moderateScale } from 'react-native-size-matters'
import TextInputWithTitle from '../Components/TextInputWithTitle'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import CustomButton from '../Components/CustomButton'
import CardComponent from '../Components/CardComponent'

const AddEmployeeDetails = () => {


    return (
        <SafeAreaView style={styles.container}>
            <Header showBack hideUser={false} title={'Add Employee'} />
            <View style={styles.main_view}>
                <TextInputWithTitle
                    title={"Enter Employee's Full Name : "}
                    iconName={'person'}
                    iconType={Ionicons}
                    color={Color.veryLightGray}
                    // setText={setEmail}
                    // value={email}
                    placeholder={'Full Name'}
                    placeholderColor={Color.veryLightGray}
                    viewWidth={0.9}
                    viewHeight={0.060}
                    border={1}
                    borderRadius={moderateScale(10, 0.6)}
                    borderColor={Color.themeBlue}
                />
                <TextInputWithTitle
                    title={"Enter Employee's Email Address : "}
                    iconName={'mail'}
                    iconType={Ionicons}
                    color={Color.veryLightGray}
                    // setText={setEmail}
                    // value={email}
                    placeholder={'Email Adress'}
                    placeholderColor={Color.veryLightGray}
                    viewWidth={0.9}
                    viewHeight={0.060}
                    border={1}
                    borderRadius={moderateScale(10, 0.6)}
                    borderColor={Color.themeBlue}
                />
                <TextInputWithTitle
                    title={"Enter Employee's Phone Number : "}
                    iconName={'phone'}
                    iconType={Feather}
                    color={Color.veryLightGray}
                    // setText={setEmail}
                    // value={email}
                    placeholder={'Phone Number'}
                    placeholderColor={Color.veryLightGray}
                    viewWidth={0.9}
                    viewHeight={0.060}
                    border={1}
                    borderRadius={moderateScale(10, 0.6)}
                    borderColor={Color.themeBlue}
                />
                <TextInputWithTitle
                    title={"Enter Employee's Phone Number : "}
                    iconName={'phone'}
                    iconType={Feather}
                    color={Color.veryLightGray}
                    // setText={setEmail}
                    // value={email}
                    placeholder={'Phone Number'}
                    placeholderColor={Color.veryLightGray}
                    viewWidth={0.9}
                    viewHeight={0.060}
                    border={1}
                    borderRadius={moderateScale(10, 0.6)}
                    borderColor={Color.themeBlue}
                />
                <TextInputWithTitle
                    title={"Enter Employee's Id : "}
                    iconName={'person'}
                    iconType={Ionicons}
                    color={Color.veryLightGray}
                    // setText={setEmail}
                    // value={email}
                    placeholder={'Employee id'}
                    placeholderColor={Color.veryLightGray}
                    viewWidth={0.9}
                    viewHeight={0.060}
                    border={1}
                    borderRadius={moderateScale(10, 0.6)}
                    borderColor={Color.themeBlue}
                />
                <TextInputWithTitle
                    title={"Enter Department Name : "}
                    iconName={'building'}
                    iconType={FontAwesome5}
                    color={Color.veryLightGray}
                    // setText={setEmail}
                    // value={email}
                    placeholder={'Department Name'}
                    placeholderColor={Color.veryLightGray}
                    viewWidth={0.9}
                    viewHeight={0.060}
                    border={1}
                    borderRadius={moderateScale(10, 0.6)}
                    borderColor={Color.themeBlue}
                />
                <TextInputWithTitle
                    title={"Enter Designation Name : "}
                    iconName={'work'}
                    iconType={MaterialIcons}
                    color={Color.veryLightGray}
                    // setText={setEmail}
                    // value={email}
                    placeholder={'Designation Name'}
                    placeholderColor={Color.veryLightGray}
                    viewWidth={0.9}
                    viewHeight={0.060}
                    border={1}
                    borderRadius={moderateScale(10, 0.6)}
                    borderColor={Color.themeBlue}
                />
                <CustomButton
                    text={'Submit'}
                    width={windowWidth * 0.9}
                    height={windowHeight * 0.055}
                    borderRadius={moderateScale(10, 0.3)}
                    textColor={Color.white}
                    bgColor={Color.themeBlue}
                    marginTop={moderateScale(40, 0.6)}
                    onPress={() => {
                        // Login()
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default AddEmployeeDetails

const styles = StyleSheet.create({
    container: {
        width: windowWidth,
        height: windowHeight,
        backgroundColor: '#F9F9F9',
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
    search_bar_view: {
        width: windowWidth * 0.94,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginTop: moderateScale(10, 0.6)
    }
})