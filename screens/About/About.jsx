import React from 'react';
import { View, Text } from 'react-native';

import Tabs from '../../components/Tabs/Tabs';
import styleBase from '../../styles/base.style';
import styles from './about.style';

const About = ({ navigation, route }) => {
  const developers = [
    'Vladyslav Lohynskyi',
    'Oleh Yavoriv',
    'Roman Fedyniak',
    'Ivan Poltavets',
    'Vasyl Hai',
  ];

  return (
    <View style={styleBase.wrapper}>
      <View style={styleBase.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Beep</Text>
          <Text style={styles.titleTranslated}>city-app</Text>
        </View>
        <View style={styles.descriptionWrapper}>
          <Text style={styles.titleDescription}>Description: </Text>
          <Text style={styles.description}>
            Mobile application for easy use of electric scooters in Lviv. The
            application will allow you to find the desired route, location of
            parking, repair and rental of scooters. Interact with maps, explore
            the fascinating places of Lviv about their feature and history.
          </Text>
        </View>
        <View style={styles.labelWrapper}>
          <View>
            <Text style={styles.titleLabel}>Developed by:</Text>
          </View>
          <View style={styles.label}>
            {developers.map((name) => (
              <Text key={name} style={styles.labelTitle}>
                {name},{' '}
              </Text>
            ))}
          </View>
        </View>
      </View>
      <Tabs navigation={navigation} route={route} />
    </View>
  );
};

export default About;
