import React, { useState, useEffect, Fragment } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Circle, Svg, SvgUri } from "react-native-svg";
import { ReactNativeZoomableView } from "@openspacelabs/react-native-zoomable-view";
import axios from "axios";

const Map = ({ onPress, showMap, showTheMap }) => {
  const [dinosaurs, setDinosaurs] = useState([]);
  const { width, height } = Dimensions.get("window");
  const [imageWidth, setImageWidth] = useState(null);
  const [imageHeight, setImageHeight] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [dot, setDot] = useState(1);

  useEffect(() => {
    const image = require("./assets/dark_map.png");
    const { width, height } = Image.resolveAssetSource(image);
    setImageWidth(width);
    setImageHeight(height);
  }, []);

  useEffect(() => {
    axios
      .get("http://89.117.36.161/api/dinos", {
        headers: {
          auth: "H3l5b1T5YRAD156iXNJO",
        },
      })
      .then((response) => {
        setDinosaurs(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleDinosaurPress = (dinosaur) => {
    onPress(dinosaur);
  };

  return (
    <View
      style={{
        height: showMap ? "100%" : 0,
        backgroundColor: "#181818",
        paddingTop: 40,
      }}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: "flex-end",
          position: "absolute",
          zIndex: 999999,
          right: 20,
          top: 100,
        }}
        onPress={showTheMap}
      >
        <Image source={require("./assets/back30.png")} />
      </TouchableOpacity>

      <ScrollView horizontal={true} style={{ height: height }}>
        <ReactNativeZoomableView
          maxZoom={6}
          minZoom={1}
          zoomStep={0.5}
          initialZoom={1.5}
          contentHeight={height}
          contentWidth={width * 4}
          onZoomAfter={(event, gestureState, zoomableViewEventObject) => {
            setZoomLevel(zoomableViewEventObject.zoomLevel);
            zoomableViewEventObject.zoomLevel > 1.8 ? setDot(0.5) : null;
            zoomableViewEventObject.zoomLevel <= 1.8 ? setDot(1) : null;
          }}
        >
          <SvgUri
            width={width * 4}
            height={height}
            uri="http://89.117.36.161/dark_map1.svg"
            style={{
              marginTop: 50
            }}
          />
          {dinosaurs.map((dinosaur) => (
            <View
              key={dinosaur._id}
              style={{
                position: "absolute",
                left: width * 4 * (dinosaur.locationx / 100) - 8,
                top: height * (dinosaur.locationy / 100),
              }}
            >
              <Text style={styles.tooltip}>
                {zoomLevel > 1.8 ? dinosaur.name : null}
              </Text>
              <Svg
                width="30"
                height="30"
                onPress={() => handleDinosaurPress(dinosaur)}
              >
                <Circle cx="10" cy="10" r={6 * dot} fill="white" />
                <Circle cx="10" cy="10" r={4 * dot} fill="yellow" />
                <Circle cx="10" cy="10" r={2 * dot} fill="orange" />
              </Svg>
            </View>
          ))}
        </ReactNativeZoomableView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bookicon: {
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 50,
  },
  tooltip: {
    color: "#fff",
    fontSize: 4,
    marginBottom: -10,
  },
});

export default Map;
