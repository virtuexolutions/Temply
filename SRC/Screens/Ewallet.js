import { useNavigation } from '@react-navigation/native';
import { Icon } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { AppState, FlatList, Platform, ToastAndroid, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import SignatureScreen from 'react-native-signature-canvas';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Color from '../Assets/Utilities/Color';
import AddImagesContainer from '../Components/AddImagesContainer';
import CustomButton from '../Components/CustomButton';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';
import Header from '../Components/Header';
import ImagePickerModal from '../Components/ImagePickerModal';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
// import DocumentPicker from 'react-native-document-picker';
import moment from 'moment/moment';
import { BackHandler } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { Get, Post } from '../Axios/AxiosInterceptorFunction';
import AddSignatureContainer from '../Components/AddSignatureContainer';
import NullDataComponent from '../Components/NullDataComponent';
import PdfContainer from '../Components/PdfContainer';
import PDFView from '../Components/PDFView';
import LoggedInScreen from './LoggedInScreen';

const Ewallet = () => {
    const appState = useRef(AppState.currentState);
    const enabler = useSelector(state => state?.commonReducer?.fingerPrintEnabled)

    const dispatch = useDispatch();
    // const appState = useSelector(state => state.socketReducer.appstate)
    const userData = useSelector(state => state.commonReducer.userData);
    const token = useSelector(state => state.authReducer.token);
    const navigation = useNavigation();
    const ref = useRef();
    const [selectedIndex, setSelectedItem] = useState('photo');
    const [showMultiImageModal, setShowMultiImageModal] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState('');
    // console.log("🚀 ~ file: Ewallet.js:42 ~ Ewallet ~ selectedPdf:", selectedPdf)
    const [show, setShow] = useState(false);
    const [multiImages, setMultiImages] = useState([]);
    const [image, setImage] = useState({});
    const [signature, setSignature] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [signModalVisible, setSignModalVisible] = useState(false);
    const [fileResponse, setFileResponse] = useState([]);
    // console.log("🚀 ~ file: Ewallet.js:51 ~ Ewallet ~ fileResponse:", fileResponse.flat())
    const [signatureImage, setSignatureImage] = useState('');
    const [name, setName] = useState('');
    const [selectedPDFIndex, setSelectedPDFIndex] = useState(0);
    // const [thumbnail , setThumbNail] = useState(null)
    // console.log("🚀 ~ file: Ewallet.js:59 ~ Ewallet ~ thumbnail:", thumbnail)
    const [fingerPrintModal, setFingerPrintModal] = useState(true)




    const _handleAppStateChange = (nextAppState) => {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === "active"
        ) {
            setFingerPrintModal(true)
            // dispatch(setAppState(true))
            console.log('App has come to the foreground!');

        } else {
            console.log('App has come to the background!');
            // dispatch(setAppState(false))
            setFingerPrintModal(false)
        }

        appState.current = nextAppState;
        // setAppStateVisible(appState.current);
        console.log("AppState", appState.current);
    };


    const sendImage = async () => {
        const formData = new FormData();
        const url = 'image';
        const body = {
            user_id: userData?.id,
            image: image,
        };
        for (let key in body) {
            formData.append(key, body[key]);
        }

        // console.log( 'image ==============>', formData)

        setIsLoading(true);
        const resposne = await Post(url, formData, apiHeader(token));
        setIsLoading(false);
        if (resposne != undefined) {
            console.log(resposne?.data);
            Platform.OS == 'android' ? ToastAndroid.show('Image Added', ToastAndroid.SHORT) : alert('Image Added')
        }
    };
    const sendDocument = async response => {

        const formData = new FormData();

        const url = 'document';
        const body = {
            user_id: userData?.id,
            document: {
                name: response.flat()[0].name,
                type: response.flat()[0].type,
                uri: response.flat()[0].uri,
                //thumbnail : {type : `image/${thumbnailType}` , uri : thumbnail , name :thumbnailName}  
            },
            name: response[0].name,
        };
        for (let key in body) {
            formData.append(key, body[key]);
        }

        console.log('sending document ==============>', body);

        setIsLoading(true);
        const resposne = await Post(url, formData, apiHeader(token));
        setIsLoading(false);
        if (resposne != undefined) {
            console.log('sending document', resposne?.data);
            Platform.OS == 'android' ? ToastAndroid.show('Document Added', ToastAndroid.SHORT) : alert('PDF Added')
            setFileResponse(prev => [
                ...prev,
                {
                    name: response.flat()[0].name,
                    type: response.flat()[0].type,
                    uri: response.flat()[0].uri,
                },
            ]);
        }

    };

    const sendSignature = async imagePath => {
        const formData = new FormData();
        const url = 'signature';
        const body = {
            user_id: userData?.id,
            uri: imagePath,
            name: name,
            date: moment().format('ll'),
        };
        for (let key in body) {
            formData.append(key, body[key]);
        }


        setIsLoading(true);
        const response = await Post(url, formData, apiHeader(token));
        setIsLoading(false);
        if (response != undefined) {

            Platform.OS == 'android' ? ToastAndroid.show('Signature Added', ToastAndroid.SHORT) :
                alert('Signature Added');

            setSignatureImage(prev => [
                ...prev,
                {
                    id: Math.random(),
                    uri: signature,
                    name: name,
                    date: moment().format('ll'),
                },
            ]);
        }
    };

    // const handleDocumentSelection = useCallback(async () => {
    //     // dispatch(setInTheApp(true))
    //     try {
    //         const response = await DocumentPicker.pick({
    //             presentationStyle: 'fullScreen',
    //             type: [DocumentPicker.types.pdf, DocumentPicker.types.docx],
    //         });
    //         // console.log('This is document Response==========================>>>>>>>>',response)
    //         sendDocument(response);
    //     } catch (err) {
    //         console.warn(err);
    //     }
    // }, []);

    const handleOK = signature => {
        // console.log(
        //   '🚀 ~ file: Ewallet.js:46 ~ handleOK ~ signature:',
        //   signature,
        // );
        setSignature(signature); // Callback from Component props
    };

    // Called after ref.current.readSignature() reads an empty string
    const handleEmpty = () => {
        Platform.OS == 'android'
            ? ToastAndroid.show('No sign implemented', ToastAndroid.SHORT)
            : alert('no sign implenmeted');
    };

    // Called after ref.current.clearSignature()
    const handleClear = () => {
        setSignature(null);
    };

    const handleSave = async () => {
        // console.log('signature,name=====>>>>',signature,name)

        setName('');
        sendSignature(signature);
        setSignature(null);
        setSignModalVisible(false);

    };
    const getPhotos = async () => {
        const url = 'image/index';
        const response = await Get(url, token);
        if (response != undefined) {
            //  return console.log( 'images data ====================>',response?.data)
            setMultiImages(response?.data?.image);
        }
    };
    const getDocs = async () => {
        const url = 'document/index';
        const response = await Get(url, token);
        if (response != undefined) {
            // console.log( 'images data ====================>',response)
            // console.log('document Response Data Got=======>>>>>>>',response?.data);
            //  console.log('document Response Got=======>>>>>>>',response?.data);
            setFileResponse(response?.data?.Document);
        }
    };

    const getSignature = async () => {
        const url = 'signature/index';
        const response = await Get(url, token);
        if (response != undefined) {
            //return console.log( 'images data ====================>',response?.data)
            //setMultiImages(response?.data?.sign)
            // console.log('signaturen name======>>>>> ', response?.data?.Signature);
            setSignatureImage(response?.data?.Signature);
        }
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            BackHandler.exitApp();
            return true;
        });
    }, []);

    useEffect(() => {
        if (Object.keys(image).length > 0) {
            setMultiImages(prev => [...prev, image]);
            sendImage();
        }
    }, [image]);

    useEffect(() => {
        if (selectedIndex == 'photo') {
            getPhotos();
        } else if (selectedIndex == 'file-signature') {
            getSignature();
        } else {
            getDocs();
        }
    }, [selectedIndex]);

    useEffect(() => {
        AppState.addEventListener("change", _handleAppStateChange);

        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
        };
    }, []);

    return (
        <>
            <CustomStatusBar
                backgroundColor={Color.themeColorLight}
                barStyle={'light-content'}
            />
            <Header
                leftIcon={'bars'}
                leftType={FontAwesome}
                leftPress={() => {
                    navigation.toggleDrawer();
                }}
                headerColor={Color.white}
            />
            <View style={styles.upperContainer}>
                <CustomText
                    isBold
                    style={{
                        fontSize: moderateScale(20, 0.3),
                        color: Color.black,
                        width: windowWidth * 0.92,
                    }}>
                    Categories
                </CustomText>
                <View style={styles.squareContainer}>
                    {['photo', 'file-text', 'file-signature'].map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={0.7}
                                style={[
                                    styles.square,
                                    {
                                        backgroundColor:
                                            item == selectedIndex
                                                ? Color.themeColor
                                                : Color.themeColorLight,
                                    },
                                ]}
                                onPress={() => {
                                    setSelectedItem(item);
                                }}>
                                <Icon
                                    name={item}
                                    as={item == 'file-signature' ? FontAwesome5 : FontAwesome}
                                    color={Color.white}
                                    size={moderateScale(35, 0.3)}
                                    style={{
                                        width: windowWidth * 0.24,
                                        textAlign: 'center',
                                    }}
                                />
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        width: windowWidth * 0.92,
                        justifyContent: 'space-between',
                        marginTop: moderateScale(30, 0.3),
                    }}>
                    <CustomText
                        style={{
                            width: windowWidth * 0.6,
                            color: Color.black,
                            fontSize: moderateScale(15, 0.3),
                            // backgroundColor : 'red'
                        }}>
                        Recent added Files
                    </CustomText>
                    <CustomButton
                        text={'Add'}
                        textColor={Color.white}
                        width={windowWidth * 0.2}
                        height={windowHeight * 0.035}
                        // marginTop={moderateScale(10, 0.3)}
                        onPress={() => {
                            selectedIndex == 'photo'
                                ? setShowMultiImageModal(true)
                                : selectedIndex == 'file-signature'
                                    ? setSignModalVisible(true)
                                    : handleDocumentSelection();
                        }}
                        bgColor={Color.themeColorLight}
                        borderWidth={0}
                        borderRadius={moderateScale(30, 0.3)}
                        fontSize={moderateScale(12, 0.3)}
                    />
                </View>
            </View>
            {selectedIndex == 'photo' ? (
                <AddImagesContainer
                    multiImages={multiImages}
                    setMultiImages={setMultiImages}
                    numberOfRows={3}
                />
            ) : selectedIndex == 'file-signature' ? (
                <AddSignatureContainer
                    signatureImages={signatureImage}
                    setSignatureImages={setSignatureImage}
                    numberOfRows={3}
                />
            ) : (
                //   <FlatList
                //   numColumns={3}
                //   nestedScrollEnabled={true}
                //   data={signatureImage}
                //   showsVerticalScrollIndicator={false}
                //   contentContainerStyle={{
                //     paddingBottom : moderateScale(20,0.6)
                //   }}
                //   // keyExtractor={}
                //   renderItem={({item, index}) => {
                //     return (
                //   <View style={[styles.addImageContainer]} key={index} >

                //   <CustomImage
                //    source={{uri  : item?.uri}}
                //    // source={require('../Assets/Images/bedge1.png')}
                //     style={{
                //       width: '100%',
                //       height: '100%',
                //     }}
                //     // onPress={() => {
                //     //   setIndex(index);
                //     //   setIsVisible(true);
                //     // }}
                //     key={index}
                //   />
                //   <Text style={{color:'black',backgroundColor:'orange', fontSize:20}}>This is the name of image</Text>
                // </View>

                //     );
                //   }}
                //   ListEmptyComponent={()=>{
                //     return(
                //       <NullDataComponent title={'No Signature Uploaded Yet'} />
                //     )
                //   }}
                // />

                <>
                    <FlatList
                        numColumns={3}
                        nestedScrollEnabled={true}
                        data={fileResponse.flat()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: moderateScale(20, 0.6),
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <PdfContainer
                                    key={index}
                                    item={item}
                                    setSelectedPdf={setSelectedPdf}
                                    setShow={setShow}
                                    show={show}
                                    index={index}
                                    setSelectedPDFIndex={setSelectedPDFIndex}


                                />
                            );
                        }}
                        ListEmptyComponent={() => {
                            return <NullDataComponent title={'No PDF Uploaded Yet'} />;
                        }}
                    />
                </>
            )}
            <ImagePickerModal
                show={showMultiImageModal}
                setShow={setShowMultiImageModal}
                // setMultiImages={setMultiImages}
                setFileObject={setImage}
            />
            <PDFView
                setIsVisible={setShow}
                visible={show}
                uri={selectedPdf?.uri}
                index={selectedPDFIndex}
                id={selectedPdf?.id}
                fileResponse={fileResponse}
                setFileResponse={setFileResponse}
            />

            <Modal
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                isVisible={signModalVisible}
                hasBackDrop={true}>
                <View
                    style={{
                        width: windowWidth * 0.95,
                        height: windowHeight * 0.85,
                        borderRadius: moderateScale(20, 0.3),
                        backgroundColor: Color.white,
                        overflow: 'hidden',
                    }}>
                    <SignatureScreen
                        // style={{
                        //   height : windowHeight * 0.5,
                        //   backgroundColor : 'red'
                        // }}
                        ref={ref}
                        // onEnd={handleEnd}
                        style={{
                            buttonStyle: {
                                backgroundColor: 'orange',
                            },
                            confirmButtonStyle: {
                                backgroundColor: 'orange',
                            },
                        }}
                        onOK={handleOK}
                        onEmpty={handleEmpty}
                        onClear={handleClear}
                        autoClear={true}
                        descriptionText={'Draw Signature'}
                        penColor={Color.themePink}
                        onClearButtonColor={'orange'}
                    />
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: Color.themeColor,
                            borderRadius: 5,
                            padding: 10,
                            marginBottom: moderateScale(110, 0.3),
                            marginHorizontal: 5,
                            color: 'black',

                        }}
                        placeholder="Enter signature name"
                        placeholderTextColor="gray"
                        value={name}
                        onChangeText={setName}
                    />
                    {signature ? (
                        <CustomButton
                            text={'Save Signature'}
                            textColor={Color.white}
                            width={windowWidth * 0.4}
                            height={windowHeight * 0.06}
                            marginBottom={moderateScale(20, 0.3)}
                            onPress={handleSave}
                            bgColor={Color.themeColor}
                            borderRadius={moderateScale(10, 0.3)}
                        />
                    ) : (
                        <CustomButton
                            text={'Close'}
                            textColor={Color.white}
                            width={windowWidth * 0.4}
                            height={windowHeight * 0.06}
                            marginBottom={moderateScale(20, 0.3)}
                            onPress={() => {
                                setSignModalVisible(false);
                            }}
                            bgColor={Color.themeColor}
                            borderRadius={moderateScale(10, 0.3)}
                        />
                    )}
                </View>
            </Modal>

            <Modal
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',

                    margin: 0,
                }}

                isVisible={enabler && fingerPrintModal}
                hasBackDrop={true}>
                <LoggedInScreen setFingerPrintModal={setFingerPrintModal} />
            </Modal>



        </>

    );
};

export default Ewallet;

const styles = ScaledSheet.create({
    upperContainer: {
        backgroundColor: Color.white,
        paddingVertical: moderateScale(20, 0.6),
        width: windowWidth,
        alignItems: 'center',
    },
    squareContainer: {
        backgroundColor: Color.white,
        width: windowWidth * 0.92,
        paddingVertical: moderateScale(10, 0.3),
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,

        elevation: 8,
        marginTop: moderateScale(10, 0.3),
        borderRadius: moderateScale(10, 0.3),
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(10, 0.3),
    },
    square: {
        width: windowWidth * 0.24,
        height: windowHeight * 0.12,
        borderRadius: moderateScale(10, 0.3),
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        height: windowHeight * 0.4,
        width: windowWidth,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
        backgroundColor: 'red',
    },
    pdf: {
        flex: 1,
        width: '100%',
        backgroundColor: 'red',
    },
    addImageContainer: {
        width: windowWidth * 0.33,
        backgroundColor: Color.white,
        height: windowHeight * 0.15,
        marginRight: moderateScale(2, 0.3),
        marginTop: moderateScale(2, 0.3),
        shadowColor: Color.themeColor,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        overflow: 'hidden',
    },
});
