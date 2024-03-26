import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import MainScreen from '../screens/MainScreen';

const Tab = createBottomTabNavigator<BottomNavigatorParamsList>();

export type BottomNavigatorParamsList = {
  Main: undefined,
  Profile: undefined
}

const BottomNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Main" 
        options={{ 
            headerShown: false, 
            tabBarLabelStyle: { display: 'none'},
            tabBarIcon: ({ focused }) => (
               <Icon name="home-outline" size={30} color={focused ? "#4F8EF7" : "#919191"} />
            )
        }} 
        component={MainScreen} 
      />
      <Tab.Screen 
        name="Profile" 
        options={{ 
            headerShown: false, 
            tabBarLabelStyle: { display: 'none'},
            tabBarIcon: ({ focused, color, size }) => (
               <Icon name="person-outline" size={30} color={focused ? "#4F8EF7" : "#919191"} />
            )
        }}
        component={ProfileScreen} 
      />
    </Tab.Navigator>
  );
}

export default BottomNavigator