import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons, Foundation,AntDesign } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './Screens/LoginScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Notifications from 'expo-notifications';
import { NetworkProvider } from './store/NetworkContext';
import HomeScreen from './Screens/HomeScreen';
import ManageTasks from './Screens/ManageTasks';
import Notification from './Screens/Notification';
import { init, dropTable } from './store/database';
import { TaskProvider } from './store/Context';
import Settings from './Screens/Settings';
import About from './Screens/About';
import Profile from './component/Profile';
import TaskForm from './component/TaskForm';
import QRCode from './Screens/QRCode';

const Stack=createStackNavigator();
const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

const App = () => {

  useEffect(() => {
  (async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      await Notifications.requestPermissionsAsync();
    }
  })();
}, []);


  useEffect(() => {
    const setupDatabase = async () => {
      try {
         //await dropTable();
        await init();
      } catch (error) {
        console.error('Error initializing database:', error);
      }
    };

    setupDatabase();
  }, []);


  const BottomTabs = () => (
    <BottomTab.Navigator
                    screenOptions={{
                    headerStyle:{backgroundColor:"#CCD5AE"},
                    tabBarStyle:{backgroundColor:'#FFA62F',fontSize:35},
                    }}
    >
        <BottomTab.Screen
              name="Home "
              component={HomeScreen}
              options={{
              tabBarIcon: () => (
                <Ionicons name="home" size={35} color="#FF204E" />
              ),
              }}
        />
        <BottomTab.Screen
                name="ManageTasks"
                component={ManageTasks}
                options={{
                  tabBarIcon: () => <Foundation name="clipboard-notes" size={40} color="#FF204E" />,
                }}
        />
        <BottomTab.Screen
                name="TaskForm"
                component={TaskForm}
                options={{
                  tabBarIcon: () => <AntDesign name="form" size={40} color="#FF204E" />,
                }}
        />
       <BottomTab.Screen
                 name="QRcode"
                 component={QRCode}
                 options={{
                 tabBarIcon: () => (
                     <Ionicons name="qr-code-outline" size={35} color="#FF204E" />
                 ),
                 }}
        />   
    </BottomTab.Navigator>
  );

  const DrawerNav=()=>(
    <Drawer.Navigator
            screenOptions={{
              drawerStyle: { backgroundColor: '#6C946F' },
              drawerActiveTintColor: '#FFBF00',
              drawerInactiveTintColor: '#2A629A',
              drawerLabelStyle: {
                fontSize: 20,
                fontWeight: 'bold',
              },
            }}
          >
             <Drawer.Screen
              name="User Login"
              component={LoginScreen}
              options={{
                drawerActiveBackgroundColor: 'blue',
                drawerActiveTintColor: '#FFBF00',
                drawerIcon: () => <Foundation name="clipboard-notes" size={40} color="#FF204E" />,
              }}
            />
              {/* <Drawer.Screen
              name="Home "
              component={HomeScreen}
              options={{
              tabBarIcon: () => (
                <Ionicons name="home" size={35} color="#FF204E" />
              ),
              }}
        /> */}
            <Drawer.Screen
              name="TaskForm"
              component={TaskForm}
              options={{
                drawerActiveBackgroundColor: 'blue',
                drawerActiveTintColor: '#FFBF00',
                drawerIcon: () => <AntDesign name="form" size={40} color="#FF204E" />,
              }}
            /> 
           < Drawer.Screen
              name="ManageTasks"
              component={ManageTasks}
              options={{
                drawerActiveBackgroundColor: 'blue',
                drawerActiveTintColor: '#FFBF00',
                drawerIcon: () => <Foundation name="clipboard-notes" size={40} color="#FF204E" />,
              }}
            />
            <Drawer.Screen
              name="Notification"
              component={Notification}
              options={{
                drawerActiveBackgroundColor: 'blue',
                drawerActiveTintColor: '#FFBF00',
                drawerIcon: () => <Ionicons name="notifications" size={40} color="#FF204E" />,
              }}
            />
            <Drawer.Screen
              name="Settings"
              component={Settings}
              options={{
                drawerActiveBackgroundColor: 'blue',
                drawerActiveTintColor: '#FFBF00',
                drawerIcon: () => <Ionicons name="settings" size={40} color="#FF204E" />,
              }}
            />
            <Drawer.Screen
              name="About"
              component={About}
              options={{
                drawerActiveBackgroundColor: 'blue',
                drawerActiveTintColor: '#FFBF00',
                drawerIcon: () => <MaterialCommunityIcons name="information" size={40} color="#FF204E" />,
              }}
            />
          </Drawer.Navigator>
  );

  return (
    <NetworkProvider>
      <TaskProvider>
        <NavigationContainer>
          <Stack.Navigator>
          <Stack.Screen
                 name="Task"
                 component={DrawerNav}
            />
          <Stack.Screen
                 name="Welcome"
                 component={BottomTabs}  
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TaskProvider>
    </NetworkProvider>
  );
};

export default App;
