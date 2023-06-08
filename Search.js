import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import SearchBar from './SearchBar';

const Search = ({ handleSearch, searchResults, handler, cleanSearch, search }) => {
  const handlePress = dinosaur => {
    handler(dinosaur)
  }

  const clean = () => {
    cleanSearch();
  }

  return (
    <View style={styles.searchContainer}>
      <SearchBar handleSearch={handleSearch} cleanSearch={clean} search={search} />
      <View style={styles.searchResults}>
        {searchResults && searchResults.map((result) => (
        <TouchableOpacity key={result._id} onPress={() => handlePress(result)} style={styles.resContainer}>
          <Image style={{width: 40, height: 40}} source={{ uri: `http://89.117.36.161/${result.img}`}} />
          <Text style={styles.res}>{result.name}</Text>
        </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  searchContainer: {
    paddingTop: 50,
    backgroundColor: '#181818',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  resContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(24,24,24,0.1)'
  },
  res: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 6
  },
  searchResults: {
    paddingLeft: 10
  },
});


export default Search;