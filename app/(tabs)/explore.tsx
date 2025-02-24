import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

const ExploreScreen = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  const apiKey = 'c70808c9ec174ae6bde285ecc6b9c4ce';
  const router = useRouter();

  useEffect(() => {
    fetchNews();
  }, []);

  useEffect(() => {
    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredArticles(filtered);
  }, [searchQuery, articles]);

  const fetchNews = async () => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?language=en&pageSize=40&apiKey=${apiKey}`
      );
      setArticles(response.data.articles);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        router.push({
          pathname: '/[detail]',
          params: {
            title: item.title,
            image: item.urlToImage,
            author: item.author,
            content: item.content,
            url: item.url,
          },
        })
      }
    >
      {item.urlToImage ? <Image source={{ uri: item.urlToImage }} style={styles.image} /> : null}
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#ff80ab" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.stickyHeader}>
        <View style={styles.header}>
          <Image source={require('../../assets/images/technoinfo.png')} style={styles.logo} />
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari berita..."
          placeholderTextColor="#ff80ab"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      
      <FlatList
        data={filteredArticles}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 20, paddingTop: 180 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe4ec',
  },
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: '#ffccd5',
    elevation: 5,
    shadowColor: '#ff80ab',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#ffe4ec',
  },
  logo: {
    width: 200,
    height: 50,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ff80ab',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 10,
    marginHorizontal: 10,
    backgroundColor: '#fff',
    color: '#ff4081',
  },
  card: {
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#ff80ab',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#ff4081',
  },
  description: {
    fontSize: 14,
    color: '#ff80ab',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExploreScreen;
