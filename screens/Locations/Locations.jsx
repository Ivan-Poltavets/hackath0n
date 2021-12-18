import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';

import styleBase from '../../styles/base.style';
import Tabs from '../../components/Tabs/Tabs';
import styles from './locations.style';
import ButtonLink from '../../components/ButtonLink/ButtonLink';
import { fetchData } from '../../helpers/fetch';

const Locations = ({ navigation, route }) => {
  const [initLoad, setInitLoad] = useState(true);
  const [locations, setLocations] = useState([]);
  // const {
  //   auth: { user },
  // } = useSelector((state) => state);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetchData({
          url: 'locations',
          method: 'get',
        });

        setLocations(res);
        setInitLoad(false);
      } catch (error) {}
    };

    getData();
  }, []);

  if (initLoad) {
    return (
      <View>
        <Text>LOADING ...</Text>
      </View>
    );
  }
  return (
    <View style={styleBase.wrapper}>
      <View style={styleBase.container}>
        <FlatList
          data={locations}
          keyExtractor={(location) => location.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={styles.wrapper}
                onPress={() =>
                  navigation.navigate('Location', {
                    locationId: item.id,
                  })
                }
              >
                <View>
                  <Image
                    source={{ uri: item.images[0] }}
                    style={styles.image}
                  />
                </View>
                <View style={styles.content}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text>{item.coordinates.join(' ')}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        <View style={styles.btnCreate}>
          <ButtonLink
            iconName="plus"
            press={() => navigation.navigate('LocationCreate')}
          />
        </View>
        {/* {user && user.role === 'admin' && (
          
        )} */}
      </View>
      <Tabs route={route} navigation={navigation} />
    </View>
  );
};

export default Locations;
