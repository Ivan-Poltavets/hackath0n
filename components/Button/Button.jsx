import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './button.style';

const Button = ({ iconName, title, press, primary, simple }) => {
  return (
    <TouchableOpacity
      style={[
        styles.wrapper,
        primary && styles.wrapperPrimary,
        simple && styles.wrapperSimple,
      ]}
      onPress={press}
    >
      {iconName && (
        <Icon style={styles.icon} name={iconName} size={25} color="grey" />
      )}
      {title && (
        <Text style={[styles.text, primary && styles.textPrimary]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
