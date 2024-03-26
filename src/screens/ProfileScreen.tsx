import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import auth from '@react-native-firebase/auth';

const ProfileScreen = () => {

  const onSignOut = async() => {
    await auth().signOut().then(function() {
        console.log('Signed Out');
    }, function(error) {
        console.error('Sign Out Error', error);
    });
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => onSignOut()} style={{ backgroundColor: 'blue', width: '30%', height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
          <Text style={{ color: 'white', fontSize: 17 }}>Log Out</Text>
        </TouchableOpacity>
    </View>
  );
}

export default ProfileScreen;