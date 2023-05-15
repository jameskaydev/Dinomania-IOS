import React, { useState, useRef, useEffect } from "react";
import registerNNPushToken from "native-notify";
import { StyleSheet, SafeAreaView, View } from "react-native";
import Map from "./Map";
import Infos from "./Infos";
import Search from "./Search";
import AppIntro from "./AppIntro";
import Directory from "./Directory";
import axios from "axios";
import Videos from "./Videos";

export default function App() {
  registerNNPushToken(7827, "7qsiCHYCZo1Q0zwrDOjfAv");
  const [selectedDinosaur, setSelectedDinosaur] = useState(null);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showIntro, setShowIntro] = useState(true);
  const [showDirectory, setShowDirectory] = useState(false);
  const [showVideos, setShowVideos] = useState(false);
  const timeout = useRef(null);

  const handleIntroFinish = () => {
    setShowIntro(false);
  };

  const handleSearchText = (text) => {
    if (text) {
      setSearch(text);
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        axios
          .get(`http://89.117.36.161/api/dino?s=${search}`, {
            headers: {
              auth: "H3l5b1T5YRAD156iXNJO",
            },
          })
          .then((response) => {
            setSearchResults(response.data);
          });
      }, 1000);
    } else {
      setSearch(text);
      clearTimeout(timeout.current);
      setSearchResults([]);
    }
  };

  const handleDinosaurPress = (dinosaur) => {
    setSelectedDinosaur(dinosaur);
  };

  const handleCloseModal = () => {
    setSelectedDinosaur(null);
  };

  const cleanSearchArea = () => {
    setSearchResults([]);
    setSearch(null);
  };

  const showTheDirectory = () => {
    setShowDirectory(!showDirectory);
  };

  const showTheVideos = () => {
    setShowVideos(!showVideos);
  };

  return (
    <>
      {showIntro && <AppIntro onFinish={handleIntroFinish} />}
      {showVideos && <Videos showTheVideos={showTheVideos} />}
      {showIntro ? null : (
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            {showDirectory ? (
              <Directory
                handlePress={handleDinosaurPress}
                showTheDirectory={showTheDirectory}
              />
            ) : null}
            <Map
              onPress={handleDinosaurPress}
              showTheDirectory={showTheDirectory}
              showTheVideos={showTheVideos}
              showD={showDirectory}
              showV={showVideos}
            />
            {showIntro ? null : (
              <Search
                handleSearch={handleSearchText}
                searchResults={searchResults}
                handler={handleDinosaurPress}
                cleanSearch={cleanSearchArea}
                search={search}
                style={styles.search}
              />
            )}
            {selectedDinosaur && (
              <Infos
                visible={selectedDinosaur ? true : false}
                dinosaur={selectedDinosaur}
                onClose={handleCloseModal}
              />
            )}
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  introcontainer: {
    flex: 1,
    height: "100%",
    // width: '100%'
  },
  text: {
    marginTop: 100,
  },
});
