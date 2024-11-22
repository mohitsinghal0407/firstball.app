import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Login from './Screens/Login';
import Register from './Screens/Register';
import StartScreen from './Screens/StartScreen';
import Products from './Screens/Products';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import Loader from './Components/Loader';
import ScreenOne from './Screens/ScreenOne';
import ScreenTwo from './Screens/ScreenTwo';
import ScreenThree from './Screens/ScreenThree';
import FIcons from 'react-native-vector-icons/Foundation'
import IIcons from 'react-native-vector-icons/Ionicons'
import FA6cons from 'react-native-vector-icons/FontAwesome6'
import OctiIcons from 'react-native-vector-icons/Octicons'
import EntypoIcons from 'react-native-vector-icons/Entypo'
import { Provider } from 'react-redux';
import store from './src/store';
import Navigation from './src/routes/navigation';


// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

export default function App() {

  // const [isFirst, setIsFirst] = useState(null)

  // const getData = async () => {
  //   const data = await AsyncStorage.getItem('isPressed');
  //   const parsedData = JSON.parse(data);
  //   // console.log(typeof (parsedData) + ' ' + parsedData);
  //   setIsFirst(Boolean(parsedData))
  // }

  // useEffect(() => {
  //   getData()
  // }, [])

  // if (isFirst === null) {
  //   return <Loader />;
  // }

  return (
    <Provider store={store}>
      <Navigation />
      {/* <NavigationContainer>
        <Stack.Navigator>
        {
          isFirst ? (<>
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="Homescreen" component={TabNavigator} options={{ headerShown: false }} />
          </>) : (
            <>
              <Stack.Screen name="StartScreen" component={StartScreen} options={{ headerShown: false }} />
              <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
              <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
              <Stack.Screen name="Homescreen" component={TabNavigator} options={{ headerShown: false }} />
            </>
          )
        }

      </Stack.Navigator>
    </NavigationContainer> */}
    </Provider>
  );
}

// export function TabNavigator() {

//   return (
//     <Tab.Navigator screenOptions={{
//       headerShown: false,
//       tabBarStyle: { borderTopRightRadius: 20, borderTopLeftRadius: 20, height: 70 },
//     }}>
//       <Tab.Screen name="Products" component={Products} options={{
//         tabBarIcon: ({ focused }) => (<FIcons name='home' color={focused ? '#c58b4e' : 'grey'} size={30} />),
//         tabBarLabel: ({ focused }) => (focused ? <EntypoIcons name='minus' color={focused ? '#c58b4e' : 'grey'} size={20} style={{ marginTop: -20 }} /> : null)
//       }} />
//       <Tab.Screen name="ScreenOne" component={ScreenOne} options={{
//         tabBarIcon: ({ focused }) => <IIcons name='heart-half' color={focused ? '#c58b4e' : 'grey'} size={30} />,
//         tabBarLabel: ({ focused }) => (focused ? <EntypoIcons name='minus' color={focused ? '#c58b4e' : 'grey'} size={20} style={{ marginTop: -20 }} /> : null)
//       }} />
//       <Tab.Screen name="ScreenTwo" component={ScreenTwo} options={{
//         tabBarIcon: ({ focused }) => <FA6cons name='bag-shopping' color={focused ? '#c58b4e' : 'grey'} size={25} />,
//         tabBarLabel: ({ focused }) => (focused ? <EntypoIcons name='minus' color={focused ? '#c58b4e' : 'grey'} size={20} style={{ marginTop: -20 }} /> : null)
//       }} />
//       <Tab.Screen name="ScreenThree" component={ScreenThree} options={{
//         tabBarIcon: ({ focused }) => <OctiIcons name='bell-fill' color={focused ? '#c58b4e' : 'grey'} size={25} />,
//         tabBarLabel: ({ focused }) => (focused ? <EntypoIcons name='minus' color={focused ? '#c58b4e' : 'grey'} size={20} style={{ marginTop: -20 }} /> : null)
//       }} />
//     </Tab.Navigator>
//   )
// }

