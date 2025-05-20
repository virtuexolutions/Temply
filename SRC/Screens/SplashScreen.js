import {AddIcon, View} from 'native-base';
import React from 'react';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import { ImageBackground, SafeAreaView } from 'react-native';
import Color from '../Assets/Utilities/Color';

const SplashScreen = () => {
  // const backgroundImage = require('../Assets/Images/splash.gif');
  return (
    <SafeAreaView >
     <ImageBackground imageStyle={{
      width:'100%',height:'100%'
     }} style={styles.container} source={require('../Assets/Images/bluebgc.png')}>
     <View style={styles.logoStyle}>
      <CustomText style={styles.text}>Logo</CustomText>
      <CustomText isBold style={styles.text}>Here</CustomText>
     </View>
     </ImageBackground>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
  },
  text:{
    fontSize:moderateScale(30,0.3),
    color:Color.white
  },
  logoStyle:{
    flexDirection:'row',
  }
 

});

export default SplashScreen;
