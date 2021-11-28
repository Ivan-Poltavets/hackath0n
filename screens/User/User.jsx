import React from 'react';
import { View, Text, Image } from 'react-native';
import styleBase from '../../styles/base.style';
import styles from './user.style';
import Tabs from '../../components/Tabs/Tabs';

const User = ({ route, navigation }) => {
  return (
    <View style={[styleBase.wrapper]}>
      <View style={[styleBase.container, styles.container]}>User Details</View>
      {/* <Tabs route={route} navigation={navigation} /> */}
    </View>
  );
};

export default User;
