import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
  BackHandler,
} from "react-native";
import WebView from "react-native-webview";
import axios from "axios";

const Videos = ({ showTheVideos }) => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleVideos);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleVideos);
    };
  }, []);

  const handleVideos = () => {
    showTheVideos();
    return true;
  };

  useEffect(() => {
    const fetchContent = async () => {
      const data = await fetchChannelContent();
      setVideos(data);
    };
    fetchContent();
  }, []);

  const handleVideoPress = (video) => {
    setSelectedVideo(video);
    setModalVisible(true);
  };

  const fetchChannelContent = async () => {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          key: "AIzaSyAshhnFWItx6mFlK3ut17h6Sr9h-I60u_Y",
          channelId: "UCke5I8zQqBID3oDce08u4UQ",
          part: "snippet",
          maxResults: 50,
          order: "date",
          type: "video",
          videoDuration: "long",
        },
      }
    );
    return response.data.items;
  };

  return (
    <>
      <TouchableOpacity
        style={{
          flex: 1,
          alignItems: "flex-end",
          position: "absolute",
          zIndex: 999999,
          right: 20,
          top: 40,
        }}
        onPress={showTheVideos}
      >
        <Image source={require("./assets/back30.png")} />
      </TouchableOpacity>
      <ScrollView style={styles.videosContainer}>
        {videos.map((video, index) => (
          <TouchableOpacity
            key={video.id.videoId}
            onPress={() => handleVideoPress(video)}
            style={styles.singleVideoContainer}
          >
            <Image
              source={{ uri: video.snippet.thumbnails.medium.url }}
              width={video.snippet.thumbnails.medium.width}
              height={video.snippet.thumbnails.medium.height}
            />
            <View
              style={styles.playIconContainer}
              height={video.snippet.thumbnails.medium.height}
            >
              <Image
                source={require("./assets/play-icon.png")}
                style={styles.playIcon}
              />
            </View>
            <Text style={styles.videoTitle}>{video.snippet.title}</Text>
          </TouchableOpacity>
        ))}
        <Modal
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <WebView
            source={{
              uri: selectedVideo
                ? `https://www.youtube.com/embed/${selectedVideo.id.videoId}`
                : null,
            }}
          />
        </Modal>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  videosContainer: {
    backgroundColor: "#181818",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    paddingTop: 40,
  },
  singleVideoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(211,211,211, 0.2)",
    marginRight: 10,
    marginLeft: 10,
    paddingBottom: 20,
    marginBottom: 20,
  },
  playIconContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  playIcon: {
    width: 50,
    height: 50,
  },
  videoTitle: {
    color: "#fff",
    fontSize: 16,
    marginTop: 4,
  },
});

export default Videos;
