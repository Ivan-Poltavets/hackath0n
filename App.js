import MapView, {Marker, Geojson} from 'react-native-maps';
import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, Dimensions } from 'react-native';
import coordinates from './search';
import Search from './search';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';



const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const geodata = require('./assets/bicycles_geojson_2021-11-12.json');
// const mapgeo = require('./assets/map.json');
// const map_lines = require('./assets/map_lines.json');




  function App() {
  return (
    <View style={styles.container}>
    <MapView style={styles.map}>
    </MapView>
    <View style={styles.searchBar}>
      <Search></Search>
    </View>
    <View style={styles.popup}>
        <Button title="___" onPress={onShowPopup}></Button>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  container:{
    flex:1,
  },
  popup:{
    flex:1,
    justifyContent:'flex-end',
  },
});

export default App;