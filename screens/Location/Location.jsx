import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

import styleBase from '../../styles/base.style';
import Tabs from '../../components/Tabs/Tabs';
import ButtonLink from '../../components/ButtonLink/ButtonLink';
import styles from './location.style';
import { fetchData } from '../../helpers/fetch';

const Location = ({ navigation, route }) => {
  const { locationId } = route.params;
  // const {
  //   auth: { user },
  // } = useSelector((state) => state);
  const [initLoad, setInitLoad] = useState(true);
  const [location, setLocation] = useState({
    id: 0,
    coordinates: [],
    title: '',
    images: [],
    description: '',
    created: '',
    updated: '',
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchData({
          url: `locations/location/${locationId}`,
          method: 'get',
        });

        setLocation(res);
        setInitLoad(false);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [locationId]);

  console.log({ location, locationId });
  if (initLoad) {
    return (
      <View>
        <Text>LOADING ...</Text>
      </View>
    );
  }
  return (
    <View style={styleBase.wrapper}>
      <ScrollView contentContainerStyle={styleBase.container}>
        <View>
          <Image source={{ uri: location.images[0] }} style={styles.image} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >

            <View>
              <Text style={styles.title}>{location.title}</Text>
            </View>
            <ButtonLink
              iconName="circle-edit-outline"
              press={() =>
                navigation.navigate('LocationEdit', {
                  locationId,
                })
              }
            />
          </View>
          <View>
            <Text style={styles.subTitle}>Description:</Text>
            <Text style={styles.info}>{location.description}</Text>
          </View>
          <View>
            <Text style={styles.subTitle}>Location:</Text>
            <Text style={styles.info}>{location.coordinates.join(' ')}</Text>
          </View>
          <View>
            <Text style={styles.subTitle}>Published:</Text>
            <Text style={styles.info}>{location.created}</Text>
          </View>
        </View>
      </ScrollView>
      <Tabs navigation={navigation} route={route} />
    </View>
  );
};

export default Location;
