// In App.js in a new project

import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Notification from './src/Screen/Notification';
import Profile from './src/Screen/Profile';
import Octicons from 'react-native-vector-icons/Octicons';
import {Colors} from './src/Theme/Color';
import SplashScreen from 'react-native-splash-screen';
import NovaLocationScreen from './src/Screen/NovaLocationScreen';
import NovaBookingDetailsPreviewScreen2 from './src/Screen/NovaBookingDetailsPreviewScreen2';
import NovaBookingDetailsPreviewScreen1 from './src/Screen/NovaBookingDetailsPreviewScreen1';
import NovaEmployeeEditScreen from './src/Screen/NovaEmployeeEditScreen';
import NovaAddEmployeeScreen from './src/Screen/NovaAddEmployeeScreen';
import NovaSearchPatholab from './src/Screen/NovaSearchPatholab';
import OrderList from './src/Screen/OrderList';
import Profile_Edit from './src/Screen/Profile_edit';
import Login from './src/Screen/Login';
import Otpverification from './src/Screen/Otp';
import PatholabDetails from './src/Screen/PatholabDetails';
import PrivacyPolicy from './src/Screen/PrivacyPolicy';
import TermsAndCondition from './src/Screen/TermsAndConditions';
import EmployeeDetails from './src/Screen/EmployeeDetails';
import Signup from './src/Screen/Signup';
import Faqs from './src/Screen/Faqs';
import SlotScreen from './src/Screen/Slot';
import Home from './src/Screen/Home';
import Cart from './src/Screen/Cart';
import {Provider} from 'react-redux';
import Store from './src/Redux/store';
import {useSelector} from 'react-redux';
import {getUser_type} from './src/Redux/slices/userSlice';
import LocationSearch from './src/Screen/Search';
import NovaEditEmployeeScreen from './src/Screen/NovaEditEmployeeScreen';
const Stack = createNativeStackNavigator();
import {StripeProvider} from '@stripe/stripe-react-native';
import Pdftest from './src/Screen/Pdf';

function App() {
  SplashScreen.hide();

  return (
    <Provider store={Store}>
      <StripeProvider
        publishableKey="pk_test_51LlDR1GcdtsDFr6SqfHouiMEF2MPPANnEJyddoEfmI2skjsBfqIk08sgH6yFsXkspp0WLpuTvrPOtJ40iRUtIvbC00OAO8uUbu"
        // //  urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        // merchantIdentifier="merchant.com.Nova" // required for Apple Pay
      >
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Tab">
            <Stack.Screen
              name="LocationSearch"
              component={LocationSearch}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Pdf"
              component={Pdftest}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Slot"
              component={SlotScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Cart"
              component={Cart}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="Tab"
              component={MyTabs}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="OrderList"
              component={OrderList}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="NovaLocationScreen"
              component={NovaLocationScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="NovaBookingDetailsPreviewScreen2"
              component={NovaBookingDetailsPreviewScreen2}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="NovaBookingDetailsPreviewScreen1"
              component={NovaBookingDetailsPreviewScreen1}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="NovaEmployeeEditScreen"
              component={NovaEmployeeEditScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="NovaAddEmployeeScreen"
              component={NovaAddEmployeeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="NovaEditEmployeeScreen"
              component={NovaEditEmployeeScreen}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="NovaSearchPatholab"
              component={NovaSearchPatholab}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Profile_Edit"
              component={Profile_Edit}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Otp"
              component={Otpverification}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Signup"
              component={Signup}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Faqs"
              component={Faqs}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="PatholabDetails"
              component={PatholabDetails}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="PrivacyPolicy"
              component={PrivacyPolicy}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="TermsAndCondition"
              component={TermsAndCondition}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="EmployeeDetails"
              component={EmployeeDetails}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </StripeProvider>
    </Provider>
  );
}
const Tab = createBottomTabNavigator();

function MyTabs() {
  console.log('Tabsnkjd');
  const usertypes = useSelector(getUser_type);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: Colors.GREEN,
        tabBarStyle: {height: 60},
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({color, size}) => (
            <Octicons name="home" color={color} size={22} />
          ),
        }}
      />
      {usertypes && (
        <Tab.Screen
          name="Notifications"
          component={Notification}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({color, size}) => (
              <Octicons name="bell" color={color} size={22} />
            ),
          }}
        />
      )}
      {usertypes == 'organization' && (
        <Tab.Screen
          name="NovaEmployeeEditScreen"
          component={NovaEmployeeEditScreen}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({color, size}) => (
              <Octicons name="people" color={color} size={26} />
            ),
          }}
        />
      )}
      {usertypes == 'organization' ? (
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({color, size}) => (
              <Octicons name="organization" color={color} size={22} />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({color, size}) => (
              <Octicons name="person" color={color} size={22} />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
}

export default App;
