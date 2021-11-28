import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styleBase from '../../styles/base.style';
import Tabs from '../../components/Tabs/Tabs';
import FieldInput from '../../components/FieldInput/FieldInput';
import Button from '../../components/Button/Button';
import styles from './location-create.style';
import { fetchData } from '../../helpers/fetch';

const LocationCreate = ({ route, navigation }) => {
  const {
    auth: { token },
  } = useSelector((state) => state);
  const [form, setForm] = useState([
    { param: 'title', title: 'Title', msg: '', value: '' },
    { param: 'description', title: 'Description', msg: '', value: '' },
    { param: 'coordinates', title: 'Coordinates', msg: '', value: '' },
    { param: 'images', title: 'Images', msg: '', value: '' },
  ]);

  const handleSubmitForm = async () => {
    try {
      const [title, description, coordinates, images] = form;
      console.log({ title, description, coordinates, images });
      // const res = await fetchData({
      //   method: 'post',
      //   url: 'locations/create',
      //   data:,
      //   token
      // }
      // );

      // navigation.navigate('Place', {
      //   placeId: res.data._id,
      // });
    } catch (error) {
      // const errors = error.response.data.errors;
      // setForm((prevForm) =>
      //   prevForm.map((field) => {
      //     let fieldMsg = field.msg;
      //     errors.forEach((err) => {
      //       if (field.param === err.param) {
      //         fieldMsg = err.msg;
      //       }
      //     });
      //     return { ...field, msg: fieldMsg };
      //   }),
      // );
    }
  };

  const handleChangeField = (value, param) => {
    setForm((prevForm) =>
      prevForm.map((field) => {
        if (field.param === param) {
          return { ...field, value, msg: '' };
        }
        return field;
      }),
    );
  };

  return (
    <View style={styleBase.wrapper}>
      <View style={styleBase.container}>
        <View style={styleBase.title}>
          <Icon name="map-plus" size={40} color="lightgrey" />
          <Text style={styleBase.titleText}>CREATE LOCATION</Text>
        </View>
        <View style={styles.fields}>
          <ScrollView>
            {form.map((field) => (
              <FieldInput
                key={field.param}
                {...field}
                change={(value) => handleChangeField(value, field.param)}
              />
            ))}
          </ScrollView>
        </View>
        <View style={[styleBase.btns, styles.btns]}>
          <Button
            primary
            iconName="plus"
            title="CREATE"
            press={handleSubmitForm}
          />
          <Button
            simple
            iconName="close"
            title="CANCEL"
            press={() => navigation.navigate('Locations')}
          />
        </View>
      </View>
      <Tabs route={route} navigation={navigation} />
    </View>
  );
};

export default LocationCreate;
