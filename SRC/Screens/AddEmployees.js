import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../Components/Header'
import { windowHeight, windowWidth } from '../Utillity/utils'
import Color from '../Assets/Utilities/Color'
import { moderateScale } from 'react-native-size-matters'
import TextInputWithTitle from '../Components/TextInputWithTitle'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomButton from '../Components/CustomButton'
import CardComponent from '../Components/CardComponent'
const AddEmployees = () => {


  const employee_list = [
    {
      id: 1,
      name: 'Adrian',
      designation: "supervisor",
    },
    {
      id: 2,
      name: 'Adrian',
      designation: "supervisor",
    }, {
      id: 3,
      name: 'Adrian',
      designation: "supervisor",
    }, {
      id: 4,
      name: 'Adrian',
      designation: "supervisor",
    }, {
      id: 5,
      name: 'Adrian',
      designation: "supervisor",
    }, {
      id: 6,
      name: 'Adrian',
      designation: "supervisor",
    }, {
      id: 7,
      name: 'Adrian',
      designation: "supervisor",
    }, {
      id: 8,
      name: 'Adrian',
      designation: "supervisor",
    }, {
      id: 9,
      name: 'Adrian',
      designation: "supervisor",
    }, {
      id: 10,
      name: 'Adrian',
      designation: "supervisor",
    },
  ]

  return (
    <SafeAreaView style={styles.container}>
      <Header hideUser={false} showBack />
      <View style={styles.main_view}>
        <View style={styles.search_bar_view}>
          <TextInputWithTitle
            iconName={'search1'}
            iconType={AntDesign}
            color={Color.veryLightGray}
            // setText={setEmail}
            // value={email}
            placeholder={'Search Employees'}
            placeholderColor={Color.veryLightGray}
            viewWidth={0.7}
            viewHeight={0.055}
            border={1}
            borderRadius={moderateScale(10, 0.6)}
            borderColor={Color.veryLightGray}
          />
          <CustomButton
            text={'Search'}
            width={windowWidth * 0.22}
            height={windowHeight * 0.055}
            borderRadius={moderateScale(10, 0.3)}
            textColor={Color.white}
            bgColor={Color.themeBlue}
            onPress={() => {
              Login()
            }}
          />
        </View>
        <FlatList
          data={employee_list}
          keyExtractor={(item) => item?.id}
          renderItem={(({ item }) => {
            const nameInitial = (item?.name || ' ')[0]?.toUpperCase() || '?';
            return (
              <CardComponent data={item}
                image={nameInitial}
              />
            )
          })}
        />
      </View>
    </SafeAreaView>
  )
}

export default AddEmployees

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