import React from 'react';
import { View, Image, Text } from 'react-native';

import Button from '../../components/Button/Button';
import ButtonLink from '../../components/ButtonLink/ButtonLink';
import Tabs from '../../components/Tabs/Tabs';
import imgMain from '../../images/bg_main.png';
import imgLogo from '../../images/logo.png';
import styles from './home.style';
import styleBase from '../../styles/base.style';

const Home = ({ route, navigation }) => {
  return (
    <View style={styleBase.wrapper}>
      <View style={[styleBase.container]}>
        <View style={styles.content}>
          <View style={styles.logotype}>
            <Text style={styles.logoText}>
              <Text style={styles.logoTextAccent}>Bee</Text>p
            </Text>
            <ButtonLink
              iconName="information-outline"
              press={() => navigation.navigate('About')}
            />
          </View>
          <Image source={imgMain} style={styles.image} />
        </View>
        <View style={styleBase.btns}>
          <Button
            primary
            iconName="google-earth"
            title="EXPLORE"
            press={() => navigation.navigate('Map')}
          />
          <Button
            simple
            iconName="map-marker-outline"
            title="LVIV PLACES"
            press={() => navigation.navigate('Locations')}
          />
        </View>
      </View>
      <Tabs navigation={navigation} route={route} />
    </View>
  );
};

export default Home;
