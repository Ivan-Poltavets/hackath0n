import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './button-link.style';

const ButtonLink = ({ iconName, press, exStyle }) => {
  return (
    <TouchableOpacity style={[styles.wrapper, exStyle]} onPress={press}>
      <Icon style={styles.icon} name={iconName} size={20} />
    </TouchableOpacity>
  );
};

export default ButtonLink;
