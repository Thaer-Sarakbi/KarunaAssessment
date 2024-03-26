import React, { useEffect, useState } from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Keyboard, FlatList, ActivityIndicator} from 'react-native';
import { Colors } from '../assets/Colors';
import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import firestore from '@react-native-firebase/firestore'
import LottieView from 'lottie-react-native';
import Cards from '../components/Cards'; 
import { User } from '../types/types';
import { MainStackParamsList } from '../navigation/MainStack';

const MainScreen = ({ navigation } : StackScreenProps<MainStackParamsList, 'Main'>) => {
  const [taskText, setTaskText] = useState('')
  const [tasks, setTasks] = useState<any>()
  const [refreshed, setRefreshed] = useState(false)
  const [limit, setLimit] = useState(15)
  const [footerLoading, setFooterLoading] = useState(true)
 
  const user = useSelector((state: {auth: {user: User}}) => state.auth.user)

  const onSubmitText = async() => {
    await firestore().collection('users').doc(user.id).collection('tasks').add({
        taskText,
        checked: false,
        creationDate: new Date()
      }).then((res) => { 
        console.log(res)
      }).catch((err)=> {
        console.log(err)
      })
      setTaskText('')
      Keyboard.dismiss()
  }

  const getTasks = () => {
    const unsubscribe =  firestore()
    .collection('users')
    .doc(user?.id)
    .collection('tasks')
    .orderBy('creationDate', "desc")
    .limit(limit)
    .onSnapshot(snapshot => {
        const newData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        if(newData.length === tasks?.length){
          setFooterLoading(false)
        }
        setTasks(newData);
        setLimit(limit + 10)
    })

    setRefreshed(false)
    return () => unsubscribe();
  }

  const onRefresh = () => {
    setRefreshed(true)
  }

  const handleLoadMore = () => {
    getTasks()
  }

  const footer = () => {
    return(
      footerLoading ? 
        <View style={styles.loader}>
          <ActivityIndicator size='large' />
        </View> : null
    )
}

  useEffect(() => {
    getTasks()
  },[user, refreshed])

  if(!tasks){
    return (
        <>
          <LottieView source={require("../assets/loading.json")} style={{flex: 1}} autoPlay loop />
        </>
      );
  } else {
    return (
      <>
        <View style={{ flex: 1, paddingHorizontal: 10, paddingBottom: 60 }}>
            <FlatList
              keyExtractor={(item) => item?.id.toString()}
              data={tasks}
              renderItem={({ item }) => {
                return(
                  <Cards navigation={navigation} item={item} user={user}/> 
                )
              }}
              onRefresh= {() => onRefresh()}
              refreshing={refreshed}
              onEndReached={handleLoadMore}
              ListFooterComponent={footer}
            />
         </View>
         <View style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: Colors.texts, flexDirection: 'row', alignItems: 'center', paddingLeft: 10 }}>
           <TextInput
             value={taskText}
             onChangeText={(text) => setTaskText(text)}
             onSubmitEditing={Keyboard.dismiss}
             style={{ flex: 1, backgroundColor: 'white', borderRadius: 10, marginVertical: 5, marginRight: 5, fontSize: 15 }}
           />
           <TouchableOpacity 
             onPress={() => {taskText !== '' ? onSubmitText() : null}}
             style={{ backgroundColor: Colors.main, borderRadius: 50, width: 50, height: 50, justifyContent: 'center', alignItems: 'center' }}
           >
             <Icon name="send-outline" size={25} color={'white'}  />
           </TouchableOpacity>
         </View>
        
      </>
      )
  }}

const styles = StyleSheet.create({
  loader:{
    marginTop: 10,
    alignItems: 'center'
  }
});

export default MainScreen