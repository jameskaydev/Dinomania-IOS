import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const Home = ({ showTheMap, showTheDirectory, showTheVideos }) => {
  return (
    <SafeAreaView style={{ position: "relative" }}>
      <ImageBackground
        source={require("./assets/dm2.png")}
        style={styles.imgBack}
        resizeMode="cover"
      >
        <View style={styles.homeContainer}>
          <Image
            source={require("./assets/logo.png")}
            style={{ width: 250, height: 50 }}
          />

          <View>
            <View style={styles.welcome}>
              <Text style={styles.dinoMsg}>Welcome to</Text>
              <Text style={styles.dinoName}>Dinomania prehistoric planet.</Text>
            </View>

            <View style={styles.description}>
              <Text style={styles.dinoMsg}>
                Use the map to look around the world and find what creatures
                lived where. You can even check out the directory to find a
                prehistoric creature of your choice and learn all about them. We
                hope you enjoy
              </Text>
              <Text style={styles.dinoName}>Dinomania prehistoric planet.</Text>
            </View>
          </View>

          <View style={styles.btnContainer}>
            <LinearGradient
              colors={["#E86F02", "#FFFE00"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.mapGr}
            >
              <TouchableOpacity style={styles.mapBtn} onPress={showTheMap}>
                <Text style={styles.mapTxt}>Go to map</Text>
              </TouchableOpacity>
            </LinearGradient>

            <TouchableOpacity style={styles.listBtn} onPress={showTheDirectory}>
              <Text style={styles.listTxt}>Go to list</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.youtubeBtn} onPress={showTheVideos}>
              <Text style={styles.youtubeTxt}>Youtube</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 100,
  },
  imgBack: {
    marginTop: 20,
  },
  welcome: {
    marginBottom: 40,
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
  },
  description: {
    textAlign: "center",
    alignItems: "center",
  },
  dinoMsg: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
  },
  dinoName: {
    width: "100%",
    color: "#F09F01",
    fontSize: 20,
    textAlign: 'center',
  },
  mapGr: {
    borderRadius: 10,
  },
  mapTxt: {
    color: "#000",
    fontSize: 18,
  },
  mapBtn: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    paddingLeft: 30,
    borderRadius: 10,
  },
  listTxt: {
    color: "#000",
    fontSize: 18,
  },
  listBtn: {
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 30,
    borderRadius: 10,
  },
  youtubeTxt: {
    color: "#fff",
    fontSize: 18,
  },
  youtubeBtn: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 30,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#fff",
  },
  btnContainer: {
    marginTop: 100,
    gap: 12,
  },
});

export default Home;
