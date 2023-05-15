import { TextInput, TouchableOpacity, Text, View } from 'react-native';

const SearchBar = ({ handleSearch, cleanSearch, search }) => {
  return (
    <View>
    <TextInput
      placeholder="Search"
      onChangeText={handleSearch}
      placeholderTextColor='#fff'
      value={search}
      style={{
        color: '#fff',
        backgroundColor: '#181818',
        borderWidth: 1,
        borderColor: '#ffffff20',
        borderRadius: 10,
        paddingLeft: 10,
        marginBottom: 10, 
        marginLeft: 10,
        marginRight: 10
      }}
    />
    {search ? (
      <TouchableOpacity onPress={cleanSearch}>
        <Text style={{ color: '#fff',fontSize: 12, position: 'absolute', right: 20, top: -33 }}>❌</Text>
      </TouchableOpacity>
    ) : null}
    </View>
  );
};

export default SearchBar;