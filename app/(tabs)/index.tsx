import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [articles, setArticles] = useState([]);
  const [categories] = useState(['New', 'Technology', 'AI', 'Game', 'Smartphone', 'Programming', 'Software']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMenuVisible, setMenuVisible] = useState(false);

  const flatListRef = useRef(null);

  const sliderImages = [
    require('../../assets/images/Group 45.png'),
    require('../../assets/images/Group 47.png'),
    require('../../assets/images/Group 48.png'),
  ];

  const router = useRouter();

  // Fetch news articles
  useEffect(() => {
    fetchNews();
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % sliderImages.length;
        flatListRef.current?.scrollToOffset({ offset: width * nextIndex, animated: true });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [sliderImages.length]);

  const fetchNews = async () => {
    try {
      const query =
        selectedCategory === 'All'
          ? 'technology+OR+game+OR+AI+OR+smartphone+OR+programming+OR+software+OR+developer'
          : selectedCategory.toLowerCase();

      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&language=en&pageSize=40&apiKey=c70808c9ec174ae6bde285ecc6b9c4ce`
      );

      let filteredArticles = response.data.articles;

      // Filter articles based on search query
      if (searchQuery) {
        filteredArticles = filteredArticles.filter((article) =>
          article.title?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Filter out articles with missing or invalid data
      filteredArticles = filteredArticles.filter(
        (article) =>
          article.title &&
          article.description &&
          article.urlToImage &&
          article.urlToImage !== 'https://via.placeholder.com/100'
      );

      // Limit to 5 articles
      setArticles(filteredArticles.slice(0, 5));
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const renderCategory = () => (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          onPress={() => setSelectedCategory(category)}
          style={[
            styles.categoryButton,
            selectedCategory === category && styles.categoryButtonActive,
          ]}>
          <Text
            style={[
              styles.categoryText,
              selectedCategory === category && styles.categoryTextActive,
            ]}>
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderSlider = () => (
    <>
      <FlatList
        ref={flatListRef}
        data={sliderImages}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        renderItem={({ item }) => (
          <View style={styles.sliderCard}>
            <Image source={item} style={styles.sliderImage} />
          </View>
        )}
      />
      <View style={styles.dotContainer}>
        {sliderImages.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, { backgroundColor: index === currentIndex ? '#007bff' : '#e0e0e0' }]}
          />
        ))}
      </View>
    </>
  );

  const renderNewsList = () => (
    <FlatList
      data={articles}
      keyExtractor={(item) => item.title || Math.random().toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.newsCard}
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
          }>
          <Image
            source={{ uri: item.urlToImage || 'https://via.placeholder.com/100' }}
            style={styles.newsImage}
            resizeMode="cover"
          />
          <View style={styles.newsContent}>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.newsDescription}>{item.description}</Text>
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );

  const renderSearchBar = () => (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search for news..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        onSubmitEditing={fetchNews}
      />
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {/* Sticky Header */}
      <View style={styles.stickyHeader}>
        <View style={styles.header}>
          <Image source={require('../../assets/images/technoinfo.png')} style={styles.logo} />
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => setMenuVisible(!isMenuVisible)}>
              <Icon name="menu-outline" size={25} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
        {renderSearchBar()}
      </View>

      {isMenuVisible && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity
  style={styles.dropdownItem}
  onPress={() => {
    router.push('/Profile');
    setMenuVisible(false); 
  }}
>
  <Text style={styles.dropdownText}>Profile</Text>
</TouchableOpacity>
        </View>
      )}

      {/* Main Content */}
      <ScrollView style={styles.container} contentContainerStyle={{ paddingTop: 120 }}>
        {renderSlider()}
        {renderCategory()}
        <Text style={styles.sectionTitle}>
          {selectedCategory === 'All' ? 'Latest News' : selectedCategory} Articles
        </Text>
        {renderNewsList()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#fff',
    elevation: 5, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#F2F2F2',
  },
  logo: {
    width: 200,
    height: 50,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderCard: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 25,
  },
  sliderImage: {
    width: '90%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 15,
  },
  categoryContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
  },
  categoryButton: {
    marginRight: 10,
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  categoryButtonActive: {
    backgroundColor: '#007bff',
  },
  categoryText: {
    fontSize: 14,
    color: '#333',
  },
  categoryTextActive: {
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  newsCard: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  newsImage: {
    width: 100,
    height: 100,
  },
  newsContent: {
    flex: 1,
    padding: 10,
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  newsDescription: {
    fontSize: 12,
    color: '#555',
  },
  searchContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f9f9f9',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    marginRight: 5,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    zIndex: 1000,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
});
