import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import Tab from '../Tab/Tab';
import styles from './tabs.style';

const Tabs = ({ navigation, route }) => {
  const routeName = route.name;
  const {
    auth: { token },
    user,
  } = useSelector((state) => state);

  const tabs = [
    { name: 'Home', iconName: 'home-outline' },
    { name: 'Map', iconName: 'map-outline' },
    { name: 'Locations', iconName: 'map-marker-outline' },
    { name: 'Users', iconName: 'account-group-outline' },
    { name: 'User', iconName: 'account-outline' },
  ];

  return (
    <View style={styles.wrapper}>
      {tabs.map((tab) => (
        <Tab
          key={tab.name}
          {...tab}
          isActive={routeName === tab.name}
          onPress={() =>
            tab.name === 'User'
              ? token
                ? navigation.navigate('User', { userId: user.id })
                : navigation.navigate('Auth')
              : navigation.navigate(tab.name)
          }
        />
      ))}
    </View>
  );
};

export default Tabs;
