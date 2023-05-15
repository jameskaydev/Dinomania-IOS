import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, Image, ScrollView, Platform } from 'react-native';
// // import Svg, { Image as SvgImage, Circle } from 'react-native-svg';
// import SvgUri from 'react-native-svg-uri';
import axios from 'axios';


const Map = ({ onPress }) => {
  const [dinosaurs, setDinosaurs] = useState([]);
  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    axios.get('http://89.117.36.161/api/dinos', {
      headers: {
        auth: 'H3l5b1T5YRAD156iXNJO'
      }
    })
      .then(response => {
        setDinosaurs(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleDinosaurPress = (dinosaur) => {
    onPress(dinosaur);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      >
        <Image source={require('./assets/dark_map.png')} style={styles.imgMap} />
          {dinosaurs.map(dinosaur => (
            <Text
              key={dinosaur._id}
              onPress={() => handleDinosaurPress(dinosaur)}
              style={{
                color: 'red',
                position: 'absolute',
                left: width * (dinosaur.locationx / 100),
                top: height * (dinosaur.locationy / 100)
              }}
            >{dinosaur.locationx}</Text>
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // position: 'absolute',
    // top: 100
  },
  imgMap: {}
});

export default Map;
