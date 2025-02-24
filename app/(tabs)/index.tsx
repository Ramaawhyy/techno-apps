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
} from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [articles, setArticles] = useState([]);
  const [sliderArticles, setSliderArticles] = useState([]);
  const [categories] = useState(['All', 'Fashion', 'Beauty', 'Lifestyle', 'Travel', 'Food', 'Health', 'Wellness']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMenuVisible, setMenuVisible] = useState(false);

  const flatListRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    fetchNews();
  }, [selectedCategory]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % sliderArticles.length;
        flatListRef.current?.scrollToOffset({ offset: width * nextIndex, animated: true });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [sliderArticles.length]);

  const fetchNews = async () => {
    try {
      const query = selectedCategory === 'All' ? 'fashion+OR+beauty+OR+lifestyle+OR+travel+OR+food+OR+health+OR+wellness' : selectedCategory.toLowerCase();

      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&language=en&pageSize=40&apiKey=c70808c9ec174ae6bde285ecc6b9c4ce`
      );

      let filteredArticles = response.data.articles.filter(
        (article) =>
          article.title &&
          article.description &&
          article.urlToImage &&
          article.urlToImage !== 'https://via.placeholder.com/100'
      );

      setSliderArticles(filteredArticles.slice(0, 3)); // Slider menampilkan 3 berita pertama
      setArticles(filteredArticles.slice(3, 8)); // Daftar berita setelah slider
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/images/technoinfo.png')} style={styles.logo} />
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => setMenuVisible(!isMenuVisible)}>
            <Icon name="menu-outline" size={25} color="#ff4081" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Dropdown Menu */}
      {isMenuVisible && (
        <View style={styles.dropdownMenu}>
          <TouchableOpacity
            style={styles.dropdownItem}
            onPress={() => {
              router.push('/Profile');
              setMenuVisible(false);
            }}>
            <Text style={styles.dropdownText}>Profile</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.container}>
        <Text style={styles.welcomeText}>✨ Selamat Datang di Aplikasi ✨</Text>

        {/* Slider */}
        <FlatList
          ref={flatListRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={sliderArticles}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <TouchableOpacity
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
              <Image source={{ uri: item.urlToImage }} style={styles.sliderImage} />
              <View style={styles.overlay}>
                <Text style={styles.sliderText}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />

        {/* Kategori */}
        <Text style={styles.categoryHeader}>🌸 Kategori 🌸</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedCategory(item)}
              style={[styles.categoryButton, selectedCategory === item && styles.categoryButtonActive]}>
              <Text style={[styles.categoryText, selectedCategory === item && styles.categoryTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />

        {/* Daftar Berita */}
        <FlatList
          data={articles}
          keyExtractor={(item) => item.title}
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
              <Image source={{ uri: item.urlToImage }} style={styles.newsImage} />
              <View style={styles.newsContent}>
                <Text style={styles.newsTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffe4ec' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 10, backgroundColor: '#ffccd5' },
  logo: { width: 200, height: 50 },
  iconContainer: { flexDirection: 'row', alignItems: 'center' },
  categoryButton: { paddingVertical: 8, paddingHorizontal: 20, borderRadius: 25, backgroundColor: '#ffb3c1', marginHorizontal: 5 },
  categoryButtonActive: { backgroundColor: '#ff4081' },
  categoryText: {
    fontSize: 18, // LEBIH BESAR
    fontWeight: 'bold', // AGAR LEBIH JELAS
    color: '#ff4081',
},
  categoryTextActive: { color: '#fff' },
  newsCard: { margin: 10, backgroundColor: '#fff', borderRadius: 15, elevation: 5, shadowColor: '#ff80ab', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.2, shadowRadius: 10 },
  newsImage: { width: '100%', height: 200 },
  newsContent: { padding: 10 },
  newsTitle: { fontSize: 16, fontWeight: 'bold', color: '#ff4081' },
  welcomeText: { fontSize: 24, fontWeight: 'bold', color: '#ff4081', textAlign: 'center', marginVertical: 20 },
  sliderImage: { width: width, height: 200, borderRadius: 15, marginRight: 10 },
  overlay: { position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent: 'center', alignItems: 'center', borderRadius: 15 },
  sliderText: { fontSize: 18, fontWeight: 'bold', color: '#fff', textAlign: 'center', paddingHorizontal: 10 },
});

