import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../Components/Header'
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { moderateScale } from 'react-native-size-matters'
import TextInputWithTitle from '../Components/TextInputWithTitle'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomButton from '../Components/CustomButton'
import CustomImage from '../Components/CustomImage'
import { Icon } from 'native-base'
import ImagePickerModal from '../Components/ImagePickerModal'
import { Post } from '../Axios/AxiosInterceptorFunction'
import { useSelector } from 'react-redux'

const CompanyDetails = () => {
    const token = useSelector(state => state.authReducer.token);
    const [showModal, setShowModal] = useState(false)
    const [image, setImage] = useState({})
    console.log("🚀 ~ CompanyDetails ~ image:", image)
    const [company_name, setCompanyName] = useState('')
    const [bussiness_type, setBussinessType] = useState('')
    const [industry, setIndustry] = useState('')
    const [contact_number, setCoontactNumber] = useState('')
    const [email, setEmail] = useState('')
    const [website_url, setWebsiteUrl] = useState('')
    const [company_address, setCompanyAddress] = useState('')
    const [number_of_employees, setNumberOfEmployees] = useState('')
    const [tax_verification_number, setVerificationNumber] = useState('')
    const [loading, setLoading] = useState(false)
    const onPressSubmit = async () => {
        const url = 'auth/add_company'

        const body = {
            company_name: company_name,
            business_type: bussiness_type,
            industry: industry,
            company_number: contact_number,
            business_email_address: email,
            business_phone_number: contact_number,
            website_url: website_url,
            company_address: company_address,
            Company_logo: image?.uri,
            number_of_employees: number_of_employees,
            tax_identification_number: tax_verification_number,
        }
        setLoading(true)
        const response = await Post(url, body, apiHeader(token))
        setLoading(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header showBack hideUser={false} title={'Add Company Details'} />
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={styles.main_view}>
                    <TouchableOpacity onPress={() => setShowModal(true)} style={{
                        width: windowWidth * 0.6,
                        height: windowWidth * 0.3,
                        borderWidth: 1.5,
                        borderColor: Color.themeBlue
                    }}>
                        <CustomImage onPress={() => setShowModal(true)} source={require('../Assets/Images/no_image.jpg')} style={styles.image} />
                    </TouchableOpacity>
                    <TextInputWithTitle
                        title={"Enter Company Name : "}
                        iconName={'person'}
                        iconType={Ionicons}
                        color={Color.veryLightGray}
                        setText={setCompanyName}
                        value={company_name}
                        placeholder={'company Name'}
                        placeholderColor={Color.veryLightGray}
                        viewWidth={0.85}
                        viewHeight={0.060}
                        border={1}
                        borderRadius={moderateScale(10, 0.6)}
                        borderColor={Color.themeBlue}
                    />
                    <TextInputWithTitle
                        title={"Enter Bussiness Type: "}
                        // iconName={'mail'}
                        // iconType={Ionicons}
                        iconName={'work'}
                        iconType={MaterialIcons}
                        color={Color.veryLightGray}
                        setText={setBussinessType}
                        value={bussiness_type}
                        placeholder={'Email bussiness type'}
                        placeholderColor={Color.veryLightGray}
                        viewWidth={0.85}
                        viewHeight={0.060}
                        border={1}
                        borderRadius={moderateScale(10, 0.6)}
                        borderColor={Color.themeBlue}
                    />
                    <TextInputWithTitle
                        title={"Enter Industry: "}
                        iconName={'building'}
                        iconType={FontAwesome5}
                        color={Color.veryLightGray}
                        setText={setIndustry}
                        value={industry}
                        placeholder={'industry'}
                        placeholderColor={Color.veryLightGray}
                        viewWidth={0.85}

                        viewHeight={0.060}
                        border={1}
                        borderRadius={moderateScale(10, 0.6)}
                        borderColor={Color.themeBlue}
                    />
                    <TextInputWithTitle
                        title={"Enter Company contact Number : "}
                        iconName={'phone'}
                        iconType={Feather}
                        color={Color.veryLightGray}
                        setText={setCoontactNumber}
                        value={contact_number}
                        placeholder={'company contact Number'}
                        placeholderColor={Color.veryLightGray}
                        viewWidth={0.85}
                        viewHeight={0.060}
                        border={1}
                        borderRadius={moderateScale(10, 0.6)}
                        borderColor={Color.themeBlue}
                    />
                    <TextInputWithTitle
                        title={"Enter Bussiness Email Address : "}
                        iconName={'mail'}
                        iconType={Ionicons}
                        color={Color.veryLightGray}
                        setText={setEmail}
                        value={email}
                        placeholder={'email address'}
                        placeholderColor={Color.veryLightGray}
                        viewWidth={0.85}
                        viewHeight={0.060}
                        border={1}
                        borderRadius={moderateScale(10, 0.6)}
                        borderColor={Color.themeBlue}
                    />
                    <TextInputWithTitle
                        title={"enter website url"}
                        iconName={'work'}
                        iconType={MaterialIcons}
                        color={Color.veryLightGray}
                        setText={setWebsiteUrl}
                        value={website_url}
                        placeholder={'website url'}
                        placeholderColor={Color.veryLightGray}
                        viewWidth={0.85}
                        viewHeight={0.060}
                        border={1}
                        borderRadius={moderateScale(10, 0.6)}
                        borderColor={Color.themeBlue}
                    />
                    <TextInputWithTitle
                        title={"enter company Address "}
                        iconName={'work'}
                        iconType={MaterialIcons}
                        color={Color.veryLightGray}
                        setText={setCompanyAddress}
                        value={company_address}
                        placeholder={'company address'}
                        placeholderColor={Color.veryLightGray}
                        viewWidth={0.85}

                        viewHeight={0.060}
                        border={1}
                        borderRadius={moderateScale(10, 0.6)}
                        borderColor={Color.themeBlue}
                    />
                    <TextInputWithTitle
                        title={"enter Number of employees"}
                        iconName={'work'}
                        iconType={MaterialIcons}
                        color={Color.veryLightGray}
                        setText={setNumberOfEmployees}
                        value={number_of_employees}
                        placeholder={'number of employees'}
                        placeholderColor={Color.veryLightGray}
                        viewWidth={0.85}
                        viewHeight={0.060}
                        border={1}
                        borderRadius={moderateScale(10, 0.6)}
                        borderColor={Color.themeBlue}
                    />
                    <TextInputWithTitle
                        title={"Enter tax indentification number"}
                        iconName={'work'}
                        iconType={MaterialIcons}
                        color={Color.veryLightGray}
                        setText={setVerificationNumber}
                        value={tax_verification_number}
                        placeholder={'website url'}
                        placeholderColor={Color.veryLightGray}
                        viewWidth={0.85}
                        viewHeight={0.060}
                        border={1}
                        borderRadius={moderateScale(10, 0.6)}
                        borderColor={Color.themeBlue}
                    />
                    <CustomButton
                        text={'Submit'}
                        width={windowWidth * 0.85}
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
            </ScrollView>
            <ImagePickerModal
                show={showModal}
                setShow={setShowModal}
                setFileObject={setImage}
            />
        </SafeAreaView>
    )
}

export default CompanyDetails

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
    },
    image: {
        width: '100%',
        height: '100%'
    }
})