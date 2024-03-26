import React, { useState } from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { Colors } from '../assets/Colors';
import { StackNavigationProp } from '@react-navigation/stack';
import HeaderDetails from '../components/HeaderDetails';
import AwesomeAlert from 'react-native-awesome-alerts';
import firestore from '@react-native-firebase/firestore'
import { MainStackParamsList } from '../navigation/MainStack';
import { RouteProp } from '@react-navigation/native';

interface Props {
  route: RouteProp<MainStackParamsList, "UpdateTask">
  navigation: StackNavigationProp<MainStackParamsList, "UpdateTask">
}

const UpdateTask = ({ navigation, route } : Props) => {

  const taskText = route.params.item.taskText
  const userId = route.params.user.id
  const taskId = route.params.item.id
  
  const [value, setValue] = useState(taskText)
  const [showAlert, setShowAlert] = useState(false)
  const [message, setMessage] = useState('')

  const handleUpdate = async() => {
   await firestore()
   .collection('users')
   .doc(userId)
   .collection('tasks')
   .doc(taskId)
   .update({
       taskText: value
   })
   .then(() => {
     console.log('updated')
     setMessage('Updated Successfully')
     setShowAlert(true)
   }).catch((e) => {
    setMessage('something wrong')
    setShowAlert(true)
   });
  }

  return (
    <View style={{ flex: 1 }}> 
      <HeaderDetails navigation={navigation} />
      <View style={{ paddingHorizontal: 10 }}>
        <TextInput 
          style={styles.textInput} 
          autoCapitalize='none'  
          onChangeText={(text) => setValue(text)}
          selectTextOnFocus={true}
          autoFocus={true}
          value={value}
        />

        <View style={styles.button}>
          <LinearGradient colors={['#FF8A65', '#FF5722']} style={styles.signIn}>
            <TouchableOpacity style={{  width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} onPress={() => handleUpdate()}>
              <Text style={[styles.textSign, { color: '#fff' }]}>Update</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>


        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Alert"
          message= {message}
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          // showConfirmButton={true}
          cancelText="OK"
          // confirmText="Yes"
          confirmButtonColor= {Colors.main}
          onCancelPressed={() => {
            setShowAlert(false)
          }}
          contentContainerStyle={{
            width: '70%'
          }}
          titleStyle={{
            fontSize: 30,
            fontWeight: 'bold'
          }}
          messageStyle={{
            fontSize: 20,
          }}
          confirmButtonStyle={{
            width: 60,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          cancelButtonStyle={{
            width: 60,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          confirmButtonTextStyle={{
            fontSize: 15
          }}
          cancelButtonTextStyle={{
            fontSize: 15
          }}
        />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    // flex: 1,
    // height: 50,
    // width: '100%',
    // marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
    fontSize: 17,
    // alignSelf: 'flex-end',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10
  },
  button: {
    alignItems: 'center',
    marginTop: 10
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  },
});

export default UpdateTask;