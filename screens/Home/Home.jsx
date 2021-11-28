import React from 'react';
import { View, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

import Button from '../../components/Button/Button';
import ButtonLink from '../../components/ButtonLink/ButtonLink';
import Tabs from '../../components/Tabs/Tabs';

import imgMain from '../../images/undraw_scooter_aia8.png';
import imgLogo from '../../images/logo.png';

import styles from './home.style';
import styleBase from '../../styles/base.style';

const Home = ({ route, navigation }) => {
  const {
    auth: { token },
    user,
  } = useSelector((state) => state);

  const getToProfile = () => {
    if (token) {
      navigation.navigate('User', {
        userId: user.id,
      });
    } else {
      navigation.navigate('Auth');
    }
  };

  return (
    <View style={styleBase.wrapper}>
      <View style={[styleBase.container]}>
        <View style={styles.content}>
          <View style={styles.logotype}>
            <Icon name="map-check" size={40} color="lightgrey" />
            <Text style={styles.logoText}>
              In-
              <Text style={styles.logoTextAccent}>Lviv</Text>
            </Text>
            <ButtonLink
              iconName="information-outline"
              press={() => navigation.navigate('About')}
            />
          </View>
          <Image
            source={imgMain}
            style={[
              styles.image,
              // {
              //   height: 250,
              //   width: 250,
              //   borderRadius: 250 / 2,
              // },
            ]}
          />
        </View>
        <View style={styleBase.btns}>
          <Button
            primary
            iconName={token ? 'account-circle-outline' : 'login-variant'}
            title={token ? 'MY PROFILE' : 'SIGN IN'}
            press={getToProfile}
          />
          <Button
            simple
            iconName="map-marker-outline"
            title="LVIV PLACES"
            press={() => navigation.navigate('Places')}
          />
        </View>
      </View>
      <Tabs navigation={navigation} route={route} />
    </View>
  );
};

export default Home;
