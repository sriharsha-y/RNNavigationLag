/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  CommonActions,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {createContext, ReactNode, useContext, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import HeavyRenderingComponent from './HeavyRenderingComponent';
const RootStack = createStackNavigator();
const PreLoginStack = createStackNavigator();
const PostLoginStack = createStackNavigator();
const OtherStack = createStackNavigator();
const BottomTabsNav = createBottomTabNavigator();
const HomeTopTabs = createMaterialTopTabNavigator();

function PreloginDashboard(): React.JSX.Element {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Prelogin Dashboard</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [
                {
                  name: 'Postlogin',
                },
              ],
            }),
          )
        }>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

function DetailsScreen1(): React.JSX.Element {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Details Screen 1</Text>
        <TouchableOpacity onPress={() => navigation.navigate('DetailsScreen2')}>
          <Text>Go to Details Screen 2</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function DetailsScreen2(): React.JSX.Element {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <HeavyRenderingComponent />
    </View>
  );
}

function MyTab1(): React.JSX.Element {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>My Tab 1</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Others', {screen: 'DetailsScreen1'})
        }>
        <Text>Go to Details Screen 1</Text>
      </TouchableOpacity>
    </View>
  );
}

function MyTab2(): React.JSX.Element {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>My Tab 2</Text>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Others', {screen: 'DetailsScreen2'})
        }>
        <Text>Go to Details Screen 2</Text>
      </TouchableOpacity>
    </View>
  );
}

function Profile(): React.JSX.Element {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Profile</Text>
    </View>
  );
}

function HomeTabs(): React.JSX.Element {
  return (
    <HomeTopTabs.Navigator>
      <HomeTopTabs.Screen name="MyTab1" component={MyTab1} />
      <HomeTopTabs.Screen name="MyTab2" component={MyTab2} />
    </HomeTopTabs.Navigator>
  );
}

function BottomTabs(): React.JSX.Element {
  const navigation = useNavigation();
  return (
    <BottomTabsNav.Navigator
      screenOptions={{
        headerRight: () => (
          <TouchableOpacity
            style={{paddingRight: 10}}
            onPress={() =>
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'Prelogin',
                    },
                  ],
                }),
              )
            }>
            <Text>Logout</Text>
          </TouchableOpacity>
        ),
      }}>
      <BottomTabsNav.Screen name="Home" component={HomeTabs} />
      <BottomTabsNav.Screen name="Profile" component={Profile} />
    </BottomTabsNav.Navigator>
  );
}

function PostLogin(): React.JSX.Element {
  return (
    <PostLoginStack.Navigator initialRouteName="BottomTabs">
      <PostLoginStack.Screen
        name="BottomTabs"
        component={BottomTabs}
        options={{headerShown: false}}
      />
      <PostLoginStack.Screen
        name="Others"
        component={otherScreens}
        options={{headerShown: false}}
      />
    </PostLoginStack.Navigator>
  );
}

function otherScreens(): React.JSX.Element {
  return (
    <OtherStack.Navigator initialRouteName="DetailsScreen1">
      <OtherStack.Screen name="DetailsScreen1" component={DetailsScreen1} />
      <OtherStack.Screen name="DetailsScreen2" component={DetailsScreen2} />
    </OtherStack.Navigator>
  );
}

function PreLogin(): React.JSX.Element {
  return (
    <PreLoginStack.Navigator>
      <PreLoginStack.Screen
        name="PreloginDashboard"
        component={PreloginDashboard}
      />
    </PreLoginStack.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="Prelogin"
        screenOptions={{headerShown: false, animation: 'none'}}>
        <RootStack.Screen name="Prelogin" component={PreLogin} />
        <RootStack.Screen name="Postlogin" component={PostLogin} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
