import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { enableScreens } from 'react-native-screens';
import { moderateScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import Drawer from './Drawer/Drawer';
import navigationService from './navigationService';
import ChangePassword from './Screens/ChangePassword';
import EditBlogPost from './Screens/EditBlogPost';
import EditCoverLetter from './Screens/EditCoverLetter';
import EditResume from './Screens/EditResume';
import FinalBlogPost from './Screens/FinalBlogPost';
import FinalCoverLetter from './Screens/FinalCoverLetter';
import FinalEmail from './Screens/FinalEmail';
import Home from './Screens/Home';
import LoginScreen from './Screens/LoginScreen';
import ResetPassword from './Screens/ResetPassword';
import ResumeFinalScreen from './Screens/ResumeFinalScreen';
import ResumeScreen from './Screens/ResumeScreen';
import SignupScreen from './Screens/SignupScreen';
import SplashScreen from './Screens/SplashScreen';
import VerifyEmail from './Screens/VerifyEmail';
import VerifyNumber from './Screens/VerifyNumber';
import WalkThroughScreen from './Screens/WalkthroughScreen';
import OnboardingScreen from './Screens/OnboardingScreen';
import EditSurveyForm from './Screens/EditSurveyForm';
import EmailTamplate2 from './Screens/EmailTamplate2';
import CustomerSurveyForm from './Screens/CustomerSurveyForm';
import FeedBackForm from './Screens/FeedBackForm';
import ProgressFeedback from './Screens/ProgressFeedback';
import ChecklistScreen from './Screens/ChecklistScreen';
import ChecklistForm from './Screens/ChecklistForm';
import SurvaryForm from './Screens/SurvaryForm';
import EditEmailTamplate2 from './Screens/EditEmailTamplate2';
import SavedTemplates from './Screens/SavedTemplates';
import StartScreen from './Screens/StartScreen';
import Dashboard from './Screens/Dashboard';
import AddEmployees from './Screens/AddEmployees';
import Department from './Screens/Department';
import AddEmployeeDetails from './Screens/AddEmployeeDetails';
import CompanyDetails from './Screens/CompanyDetails';
import AddDepartment from './Screens/AddDepartment';
import HomeScreen from './Screens/HomeScreen';
import Tamplates from './Screens/Tamplates';
// import SurvaryForm from './Screens/SurvaryForm';
// import EditSurveyForm from './Screens/EditSurveyForm';

enableScreens();
const AppNavigator = () => {
  const token = useSelector(state => state.authReducer.token);
  const walkThrough = useSelector(state => state.authReducer.userWalkThrough);
  const user_type = useSelector(state => state.authReducer.role)
  const RootNav = createNativeStackNavigator();
  const RootNavLogged = createNativeStackNavigator();

  const AppNavigatorContainer = () => {
    const firstScreen =
      walkThrough == false
        ? 'WalkthroughScreen'
        : token == null
          ? 'StartScreen'
          : 'MyDrawer'

    return (
      <NavigationContainer ref={navigationService.navigationRef}>
        <RootNav.Navigator
          initialRouteName={firstScreen}
          // initialRouteName={'CompanyDetails'}
          screenOptions={{ headerShown: false }}>
          <RootNav.Screen name="MyDrawer" component={MyDrawer} />
          <RootNav.Screen
            name="WalkthroughScreen"
            component={WalkThroughScreen}
          />
          <RootNav.Screen name="SplashScreen" component={SplashScreen} />
          <RootNav.Screen name="StartScreen" component={StartScreen} />
          <RootNav.Screen name="SavedTemplates" component={SavedTemplates} />
          <RootNav.Screen name="Dashboard" component={Dashboard} />
          <RootNav.Screen name="SignupScreen" component={SignupScreen} />
          <RootNav.Screen name="LoginScreen" component={LoginScreen} />
          <RootNav.Screen name="Home" component={Home} />
          <RootNav.Screen name="VerifyEmail" component={VerifyEmail} />
          <RootNav.Screen name="FinalBlogPost" component={FinalBlogPost} />
          <RootNav.Screen name="ChecklistForm" component={ChecklistForm} />
          <RootNav.Screen name="SurvaryForm" component={SurvaryForm} />
          <RootNav.Screen
            name="OnboardingScreen"
            component={OnboardingScreen}
          />
          <RootNav.Screen name="EditEmailTamplate2" component={EditEmailTamplate2} />

          <RootNav.Screen name="EditBlogPost" component={EditBlogPost} />
          <RootNav.Screen name="FinalEmail" component={FinalEmail} />
          <RootNav.Screen name="ResetPassword" component={ResetPassword} />
          <RootNav.Screen name="ChangePassword" component={ChangePassword} />
          <RootNav.Screen name="VerifyNumber" component={VerifyNumber} />
          <RootNav.Screen name="ResumeScreen" component={ResumeScreen} />
          <RootNav.Screen name="EditResume" component={EditResume} />
          <RootNav.Screen name="EditCoverLetter" component={EditCoverLetter} />
          {/* <RootNav.Screen name="SurvaryForm" component={SurvaryForm} /> */}
          <RootNav.Screen name="EditSurveyForm" component={EditSurveyForm} />
          <RootNav.Screen name="EmailTamplate2" component={EmailTamplate2} />
          <RootNav.Screen name="AddEmployees" component={AddEmployees} />
          <RootNav.Screen name="Department" component={Department} />
          <RootNav.Screen name="CompanyDetails" component={CompanyDetails} />
          <RootNav.Screen name="AddEmployeeDetails" component={AddEmployeeDetails} />
          <RootNav.Screen
            name="CustomerSurveyForm"
            component={CustomerSurveyForm}
          />
          <RootNav.Screen name="FeedBackForm" component={FeedBackForm} />
          <RootNav.Screen
            name="ProgressFeedback"
            component={ProgressFeedback}
          />
          <RootNav.Screen name="ChecklistScreen" component={ChecklistScreen} />
          <RootNav.Screen name="AddDepartment" component={AddDepartment} />

          <RootNav.Screen
            name="FinalCoverLetter"
            component={FinalCoverLetter}
          />

          <RootNav.Screen
            name="ResumeFinalScreen"
            component={ResumeFinalScreen}
          />
        </RootNav.Navigator>
      </NavigationContainer>
    );
  };

  return <AppNavigatorContainer />;
};

export const MyDrawer = () => {
  const DrawerNavigation = createDrawerNavigator();
  const firstScreen = 'HomeScreen';
  const user_type = useSelector(state => state.authReducer.role)
  console.log("🚀 ~ MyDrawer ~ user_type:", user_type)
  return (
    <DrawerNavigation.Navigator
      drawerContent={props => <Drawer {...props} />}
      initialRouteName={user_type === 'Company' ? 'Dashboard' : 'HomeScreen'}
      // initialRouteName='Tamplates'
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: '70%',
        },
      }}>
      <DrawerNavigation.Screen name="Dashboard" component={Dashboard} />
      <DrawerNavigation.Screen name="HomeScreen" component={HomeScreen} />
      <DrawerNavigation.Screen name="Tamplates" component={Tamplates} />
    </DrawerNavigation.Navigator>
  );
};

export default AppNavigator;
