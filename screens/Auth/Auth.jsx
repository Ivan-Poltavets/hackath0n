import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import FieldInput from '../../components/FieldInput/FieldInput';
import Button from '../../components/Button/Button';
import styleBase from '../../styles/base.style';
import { fetchAuth } from '../../redux/auth/auth.action';
import { clearErrorAuth, resetErrorsAuth } from '../../redux/auth/auth.action';
import Tabs from '../../components/Tabs/Tabs';

const Auth = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const {
    auth: { token, loading, errors },
  } = useSelector((state) => state);
  const [form, setForm] = useState([
    {
      param: 'firstname',
      value: '',
      msg: '',
      title: 'First Name',
      hidden: true,
    },
    { param: 'lastname', value: '', msg: '', title: 'Last Name', hidden: true },
    {
      param: 'email',
      value: 'hai.vasyl20@gmail.com',
      msg: '',
      title: 'Email',
    },
    { param: 'password', value: 'vasyl.hai', msg: '', title: 'Password' },
  ]);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    if (!loading && !token?.length && errors.length) {
      setForm((prevForm) =>
        prevForm.map((field) => {
          let fieldMsg = field.msg;
          errors.forEach((err) => {
            if (err.param === field.param) {
              fieldMsg = err.message;
            }
          });
          return { ...field, msg: fieldMsg };
        }),
      );
    } else if (!errors?.length && !loading && token?.length) {
      navigation.navigate('Home');
    }
  }, [errors, loading, token]);

  const handleChangeField = (value, param) => {
    setForm((prevForm) =>
      prevForm.map((field) => {
        if (field.param === param) {
          return { ...field, value, msg: '' };
        }
        return field;
      }),
    );
    dispatch(clearErrorAuth(param));
  };

  const handleSubmitForm = () => {
    const [firstname, lastname, email, password] = form;
    const loginParams = { email: email.value, password: password.value };
    const registerParams = {
      firstname: firstname.value,
      lastname: lastname.value,
      ...loginParams,
    };
    dispatch(fetchAuth(isLogin, isLogin ? loginParams : registerParams));
  };

  const handleFlipForm = () => {
    setForm((prevForm) =>
      prevForm.map((item) => {
        const field = { ...item, msg: '' };
        if (item.param === 'firstname' || item.param === 'lastname') {
          return { ...field, hidden: !item.hidden };
        }
        return field;
      }),
    );
    setIsLogin((prev) => !prev);
    dispatch(resetErrorsAuth());
  };

  return (
    <ScrollView contentContainerStyle={styleBase.wrapper}>
      <View style={[styleBase.container]}>
        <View style={styleBase.title}>
          <Icon
            name={isLogin ? 'login-variant' : 'checkbox-marked-circle-outline'}
            size={40}
            color="lightgrey"
          />
          <Text style={styleBase.titleText}>
            {isLogin ? 'LOGIN' : 'REGISTER'}
          </Text>
        </View>
        <View>
          {form.map((field) => (
            <FieldInput
              exStyle={field.hidden ? { display: 'none' } : {}}
              key={field.param}
              change={(value) => handleChangeField(value, field.param)}
              {...field}
            />
          ))}
        </View>
        <View style={[styleBase.btns, { marginTop: 20 }]}>
          <Button
            primary
            iconName={
              isLogin ? 'login-variant' : 'checkbox-marked-circle-outline'
            }
            title={isLogin ? 'SIGN IN' : 'SIGN UP'}
            press={handleSubmitForm}
          />
          <Button
            simple
            iconName={
              isLogin ? 'checkbox-marked-circle-outline' : 'login-variant'
            }
            title={isLogin ? 'SIGN UP' : 'SIGN IN'}
            press={handleFlipForm}
          />
        </View>
      </View>
      <Tabs navigation={navigation} route={route} />
    </ScrollView>
  );
};

export default Auth;
