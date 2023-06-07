import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
} from "react-native";

const Infos = ({ visible, dinosaur, onClose }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { width, height } = Dimensions.get("window");

  const [translateY] = useState(new Animated.Value(height));

  useEffect(() => {
    if (visible) {
      setModalVisible(visible);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: height,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setModalVisible(visible);
      });
    }
  }, [visible]);

  return (
    <Modal visible={modalVisible}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.popup,
            {
              transform: [{ translateY: translateY }],
            },
          ]}
        >
          <ScrollView>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                style={styles.logoImg}
                source={require("./assets/logo.png")}
              />
              <Image
                style={{
                  width: width * 0.6,
                  aspectRatio: 1,
                  resizeMode: "contain",
                  marginBottom: 0,
                }}
                source={{ uri: `http://89.117.36.161/${dinosaur.img}` }}
              />
              <Text style={styles.title}>{dinosaur.name}</Text>
              <Text style={styles.sectitle}>{dinosaur.secname}</Text>
              <TouchableOpacity style={styles.closeButtonContainer} onPress={onClose}>
                <Text style={styles.closeButton}>❌</Text>
              </TouchableOpacity>

              <View style={styles.infosContainer}>
                <View style={styles.infos}>
                  <Text style={styles.infosName}>
                    Meaning:
                  </Text>
                  <Text style={styles.infosValue}>{dinosaur.meaning}</Text>
                </View>
                <View style={styles.infos}>
                  <Text style={styles.infosName}>
                    Diet:
                  </Text>
                  <Text style={styles.infosValue}>{dinosaur.diet}</Text>
                </View>
                <View style={styles.infos}>
                  <Text style={styles.infosName}>
                    Length:
                  </Text>
                  <Text style={styles.infosValue}>{dinosaur.lengthh}</Text>
                </View>
                <View style={styles.infos}>
                  <Text style={styles.infosName}>
                    Height:
                  </Text>
                  <Text style={styles.infosValue}>{dinosaur.height}</Text>
                </View>
                <View style={styles.infos}>
                  <Text style={styles.infosName}>
                    Weight:
                  </Text>
                  <Text style={styles.infosValue}>{dinosaur.weight}</Text>
                </View>
                <View style={styles.infos}>
                  <Text style={styles.infosName}>
                    Era:
                  </Text>
                  <Text style={styles.infosValue}>{dinosaur.era}</Text>
                </View>

              </View>

              <View style={styles.desc}>
                <Text style={styles.description}>{dinosaur.descriptions}</Text>
              </View>

              <View>
                {dinosaur.charts.map((chart, index) => (
                  <Image
                    key={index}
                    source={{ uri: `http://89.117.36.161/${chart}` }}
                    style={{
                      width: width * 0.8,
                      height: undefined,
                      aspectRatio: 1,
                      resizeMode: "contain",
                    }}
                  />
                ))}
              </View>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  popup: {
    backgroundColor: "#181818",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    position: "relative",
    height: "95%",
    width: "100%",
  },
  logoImg: {
    width: 200,
    height: 40,
    marginTop: 60,
  },
  title: {
    color: "#fff",
    fontWeight: 700,
    fontSize: 28,
    marginBottom: 10,
    marginTop: -10,
  },
  sectitle: {
    color: "#fff",
    fontWeight: 600,
    fontSize: 18,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 30,
    right: 30,
    color: '#fff'
  },
  closeButton: {
    marginTop: 10,
    color: "#fff",
    textAlign: "center",
    fontSize: 20
  },
  dinoImg: {
    width: 400,
    height: "auto",
  },
  infosContainer: {
    width: '100%',
    marginTop: 40,
    marginBottom: 20
  },
  infos: {
    flex: 1,
    flexDirection: 'row',
  },
  infosName: {
    color: "#fff",
    fontSize: 18,
    width: '32%',
    paddingLeft: 30,
    paddingBottom: 10,
  },
  infosValue: {
    color: "#fff",
    fontSize: 18,
    fontWeight: 500,
    paddingLeft: 20,
    width: '80%',
  },
  desc: {
    backgroundColor: "#FFFB3D",
  },
  description: {
    color: "#181818",
    fontWeight: 400,
    fontSize: 18,
    lineHeight: 26,
    padding: 30,
  },
});

export default Infos;
