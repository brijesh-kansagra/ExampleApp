import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, Easing } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs, CardStyleInterpolators } from '@react-navigation/stack';

import Bluetooth_connect_Screen from '../Screens/Bluetooth_connect/Bluetooth_connect_Screen';
import Select_Fountain_Screen from '../Screens/Select_Fountain/Select_Fountain_Screen';
import Score_Screen from '../Screens/Score_Share/Score_Screen';
import Start_Record_Screen from '../Screens/Start_Record/Start_Record_Screen';
import Animation_Screen from '../Screens/Animation_Screen';
import SplashScreen from '../Screens/Splash';


const Stack = createStackNavigator();


function Navigation_Stack() {
    return (
        <NavigationContainer>
         <Stack.Navigator
           headerMode="none"
            initialRouteName="Splash"
            screenOptions={{
                 headerShown:true,
                gestureEnabled: true,
                cardOverlayEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                // transitionSpec: {
                //     open: Config,
                //     close: CloseConfig
                // }
            }}
        >
            <Stack.Screen name="Splash" component={SplashScreen}/>
            <Stack.Screen name="Bluetooth_connect_Screen" component={Bluetooth_connect_Screen} />
            {/* <Stack.Screen name="Bluetooth_connect_Screen" component={Bluetooth_connect_Screen} options={{ animationEnabled: false }} /> */}
            <Stack.Screen name="Select_Fountain_Screen" component={Select_Fountain_Screen} />
            <Stack.Screen name="Score_Screen" component={Score_Screen} />
            <Stack.Screen name="Start_Record_Screen" component={Start_Record_Screen} />
            <Stack.Screen name="Animation_Screen" component={Animation_Screen} />

        </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation_Stack;
