import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../assets/Colors';

interface Props {
  navigation: { goBack: () => void }
}

const HeaderDetails = ({ navigation } : Props) => {

  return (
    <View style={{ backgroundColor: Colors.main, width: '100%', height: 50, justifyContent: 'space-between', paddingLeft: 10, flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity  onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-outline" size={35} color={'white'} />
      </TouchableOpacity>
    </View>
  );
}

export default HeaderDetails;