import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './tab.style';

const Tab = ({ iconName, onPress, isActive }) => {
  return (
    <TouchableOpacity style={styles.tab} onPress={onPress}>
      <Icon
        name={iconName}
        size={30}
        color={isActive ? 'red' : 'grey'}
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};

export default Tab;
