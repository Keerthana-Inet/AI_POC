/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { PaperProvider, Provider } from 'react-native-paper';
import { Provider as ReduxProvider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './android/app/src/types/types';
import { store } from './android/app/src/redux/ProgressStore';
import {
  SafeAreaView,
  StyleSheet,
  
} from 'react-native';
import WelcomePage1 from './android/app/src/screens/dashboard/WelcomePage1';
import WelcomePage2 from './android/app/src/screens/dashboard/WelcomePage2';
import WelcomePage3 from './android/app/src/screens/dashboard/WelcomePage3';
import WelcomePage4 from './android/app/src/screens/dashboard/WelcomePage4';
import LoginScreen from './android/app/src/screens/login/LoginScreen';

const stack=createNativeStackNavigator<RootStackParamList>();
const App = () => {
  return (
    <ReduxProvider store={store}>
    <PaperProvider>
    <SafeAreaView style={styles.sectionContainer}>
      <NavigationContainer>
        <stack.Navigator>
          <stack.Screen name = 'LoginScreen' component={LoginScreen} options={{headerShown:false}}></stack.Screen>
          <stack.Screen name = 'WelcomePage1' component={WelcomePage1} options={{headerShown:false}}></stack.Screen>
          <stack.Screen name = 'WelcomePage2' component={WelcomePage2} options={{headerShown:false}}></stack.Screen>
          <stack.Screen name = 'WelcomePage3' component={WelcomePage3} options={{headerShown:false}}></stack.Screen>
          <stack.Screen name = 'WelcomePage4' component={WelcomePage4} options={{headerShown:false}}></stack.Screen>
        </stack.Navigator>
      </NavigationContainer>
    
    </SafeAreaView>
  </PaperProvider>
  </ReduxProvider>
  );
  

}

const styles = StyleSheet.create({
  sectionContainer: {
    flex:1,
   
    
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
