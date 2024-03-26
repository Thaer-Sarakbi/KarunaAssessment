import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
import { Task, User } from '../types/types';
import firestore from '@react-native-firebase/firestore'

interface Props {
  navigation: { navigate: (screen: string) => void }
  user: User,
  item: Task
}

const Cards = ({ item, user, navigation } : Props) => {
  const [checked, setChecked] = useState<boolean>(item.checked)

  const onCheckedChanged = async(checked: boolean) => {
    setChecked(checked)
    await firestore()
    .collection('users')
    .doc(user.id)
    .collection('tasks')
    .doc(item.id)
    .update({
      checked
    }).then(() => {
      console.log('updated check')
    }).catch((e) => {
      console.log(e)
    })
  }

  const onDeleteTask = (id: string) => {
    firestore()
    .collection('users')
    .doc(user.id)
    .collection('tasks')
    .doc(id)
    .delete()
    .then(() => {
      console.log('Task deleted!');
    }).catch((error) => {
      console.log(error)
    });
  }

  return (
    <View style={styles.container}>
    <View style={{ flex: 1, justifyContent: 'flex-start', flexDirection: 'row' }}>
      <CheckBox
        value={checked}
        onValueChange={(newValue) => onCheckedChanged(newValue)}
      />
      <Text style={{ color: 'black', fontSize: 20 }}>{item.taskText}</Text>
    </View>
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
      <TouchableOpacity style={{ marginRight: 10}} onPress={() => navigation.navigate('UpdateTask', {user, item})}>
        <Icon name="create-outline" size={30} color={'black'}  />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onDeleteTask(item.id)} style={{ }}>
        <Icon name="close-circle-outline" size={30} color={'red'}  />
      </TouchableOpacity>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  container:{ 
    width: '100%', 
    height: 60, 
    backgroundColor: 'white', 
    marginVertical: 5, 
    borderRadius: 10, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-around', 
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  }
});

export default Cards;