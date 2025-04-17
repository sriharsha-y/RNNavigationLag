/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const RootStack = createStackNavigator();
const PreLoginStack = createStackNavigator();
const PostLoginStack = createStackNavigator();
const BottomTabsNav = createBottomTabNavigator();
const HomeTopTabs = createMaterialTopTabNavigator();

function DetailsScreen1(): React.JSX.Element {
  const navigator = useNavigation();
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Details Screen 1</Text>
        <TouchableHighlight
          onPress={() => navigator.navigate('DetailsScreen2')}>
          <Text>Go to Details Screen 2</Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}

function DetailsScreen2(): React.JSX.Element {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Details Screen 2</Text>
    </View>
  );
}

function MyTab1(): React.JSX.Element {
  const navigator = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>My Tab 1</Text>
      <TouchableHighlight onPress={() => navigator.navigate('DetailsScreen1')}>
        <Text>Go to Details Screen 1</Text>
      </TouchableHighlight>
    </View>
  );
}

function MyTab2(): React.JSX.Element {
  const navigator = useNavigation();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>My Tab 2</Text>
      <TouchableHighlight onPress={() => navigator.navigate('DetailsScreen2')}>
        <Text>Go to Details Screen 2</Text>
      </TouchableHighlight>
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
  return (
    <BottomTabsNav.Navigator>
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
      <PostLoginStack.Screen name="DetailsScreen1" component={DetailsScreen1} />
      <PostLoginStack.Screen name="DetailsScreen2" component={DetailsScreen2} />
    </PostLoginStack.Navigator>
  );
}

function PreLogin(): React.JSX.Element {
  return (
    <PreLoginStack.Navigator>
      <PreLoginStack.Screen name="home" component={Home} />
    </PreLoginStack.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName="postlogin"
        screenOptions={{headerShown: false, animation: 'none'}}>
        <RootStack.Screen name="prelogin" component={PreLogin} />
        <RootStack.Screen name="postlogin" component={PostLogin} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
