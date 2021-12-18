import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { userRoles } from '../configs/user-roles.config';

import Auth from '../screens/Auth/Auth';
import About from '../screens/About/About';
import Home from '../screens/Home/Home';
import MapScreen from '../screens/Map/Map';
import Locations from '../screens/Locations/Locations';
import LocationCreate from '../screens/LocationCreate/LocationCreate';
import Location from '../screens/Location/Location';
// import User from '../screens/User/User';
// import InformationCreate from '../screens/InformationCreate';
// import LocationEdit from '../screens/LocationEdit';
// import InformationEdit from '../screens/InformationEdit';
// import UserEdit from '../screens/UserEdit';
// import Users from '../screens/Users';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const {
    auth: { token },
    user,
  } = useSelector((state) => state);

  const reduceMapRoutes = (routes) => {
    return Object.keys(routes).reduce(
      (accumulator, key) => {
        accumulator[key] = routes[key].map((route) => (
          <Stack.Screen
            key={route.name}
            name={route.name}
            component={route.component}
            options={{
              title: route.title,
              headerStyle: {
                backgroundColor: '#fcce47',
              },
            }}
          />
        ));

        return accumulator;
      },
      { adminRoutes: {}, userRoutes: {}, unregisteredRouter: {} },
    );
  };

  const mainRoutes = [
    { name: 'Home', component: Home, title: 'Home' },
    { name: 'About', component: About, title: 'About' },
    { name: 'Map', component: MapScreen, title: 'Map' },
    { name: 'Location', component: Location, title: 'Location' },
    { name: 'Locations', component: Locations, title: 'All Locations' },
    // { name: 'User', component: User, title: 'Profile' },
    // { name: 'Users', component: Users, title: 'All Users' },
  ];

  const routes = {
    adminRoutes: [
      ...mainRoutes,
      {
        name: 'LocationCreate',
        component: LocationCreate,
        title: 'Create Location',
      },
      // {
      //   name: 'InformationCreate',
      //   component: InformationCreate,
      //   title: 'Create Information',
      // },
      // { name: 'LocationEdit', component: LocationEdit, title: 'Edit Location' },
      // {
      //   name: 'InformationEdit',
      //   component: InformationEdit,
      //   title: 'Edit Information',
      // },
      // { name: 'UserEdit', component: UserEdit, title: 'Edit User' },
    ],
    userRoutes: [
      ...mainRoutes,
      {
        name: 'LocationCreate',
        component: LocationCreate,
        title: 'Create Location',
      },
      // { name: 'UserEdit', component: UserEdit, title: 'Edit User' },
    ],
    unregisteredRouter: [
      ...mainRoutes,
      { name: 'Auth', component: Auth, title: 'Authorization' },
    ],
  };

  const mappedRoutes = reduceMapRoutes(routes);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {token ? (
          user.role === userRoles.admin ? (
            <>{mappedRoutes.adminRoutes}</>
          ) : (
            <>{mappedRoutes.userRoutes}</>
          )
        ) : (
          <>{mappedRoutes.unregisteredRouter}</>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
