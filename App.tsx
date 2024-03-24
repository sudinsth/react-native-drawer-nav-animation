import {GestureHandlerRootView} from 'react-native-gesture-handler';

import * as React from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import {
  DrawerActions,
  NavigationContainer,
  createNavigationContainerRef,
  useNavigation,
} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  useDrawerProgress,
} from '@react-navigation/drawer';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';

function DrawerSceneWrapper({children}: any) {
  const drawerProgress = useDrawerProgress();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {scale: interpolate(drawerProgress.value, [0, 1], [1, 0.8], 'clamp')},
    ],
    overflow: 'hidden',
    borderRadius: interpolate(drawerProgress.value, [0, 1], [0, 10], 'clamp'),
  }));
  return (
    <Animated.View
      style={[animatedStyle, {flex: 1, backgroundColor: 'crimson'}]}>
      {children}
    </Animated.View>
  );
}

function Feed() {
  const navigation = useNavigation();

  return (
    <DrawerSceneWrapper>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Text>Feed Screen</Text>
        </TouchableOpacity>
      </View>
    </DrawerSceneWrapper>
  );
}

function Article() {
  const navigation = useNavigation();

  return (
    <DrawerSceneWrapper>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          <Text>Article Screen</Text>
        </TouchableOpacity>
      </View>
    </DrawerSceneWrapper>
  );
}

function CustomDrawerContent(props: any) {
  const progress = useDrawerProgress();

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          progress.value,
          [0, 1],
          [-100, 0],
          'clamp', // Use extrapolate property instead of passing 'clamp' as a separate argument
        ),
      },
    ],
  }));

  return (
    <DrawerContentScrollView {...props}>
      <Animated.View style={animatedStyle}>
        <DrawerItemList {...props} />
        <DrawerItem label="Help" onPress={() => Alert.alert('Link to help')} />
      </Animated.View>
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: 'slide',
        overlayColor: 'transparent',
        drawerInactiveTintColor: 'white',
        drawerActiveTintColor: 'green',
        drawerStyle: {
          backgroundColor: 'crimson',
          width: '50%',
        },
        sceneContainerStyle: {
          backgroundColor: 'crimson',
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Feed" component={Feed} />
      <Drawer.Screen name="Article" component={Article} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
