import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Animated, Dimensions } from "react-native";

const AppIntro = ({ onFinish }) => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 1,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }).start(() => {
          onFinish();
        });
      }, 2000);
    });
  }, []);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -200],
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.logo, { transform: [{ translateY }], opacity }]}>
        <Image source={require("./assets/circle_logo.png")} style={styles.logoImage} />
      </Animated.View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#181818',
  },
  logo: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 400,
    height: 320,
  },
});

export default AppIntro;
