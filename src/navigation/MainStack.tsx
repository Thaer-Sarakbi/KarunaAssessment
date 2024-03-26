import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import MainScreen from "../screens/MainScreen"
import UpdateTask from "../screens/UpdateTask"
import BottomNavigator from "./BottomNavigator"
import ProfileScreen from "../screens/ProfileScreen"
import { Task, User } from "../types/types"

const Stack = createStackNavigator<MainStackParamsList>()

export type MainStackParamsList = {
  BottomNavigator: undefined,
  Main: undefined,
  Profile: undefined,
  ForgotPassword: undefined,
  UpdateTask: {
    item: Task,
    user: User
  }
}

const MainStack = () => {
    return(
      <Stack.Navigator>
          <Stack.Screen
            name="BottomNavigator"
            component={BottomNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UpdateTask"
            component={UpdateTask}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
      </Stack.Navigator>
    )
  }
  
  export default MainStack