import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import Icon from 'react-native-vector-icons/Ionicons';

export default function DetailScreen() {
  const { title, image, author, content, url } = useLocalSearchParams();
  const router = useRouter();

  const openArticleInBrowser = async () => {
    if (url) {
      await WebBrowser.openBrowserAsync(url);
    } else {
      alert("No URL available for this article.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Image */}
      <View style={styles.imageContainer}>
        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Image
          source={{ uri: image || 'https://via.placeholder.com/400' }}
          style={styles.image}
        />
      </View>

      {/* Article Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>By {author || 'Unknown Author'}</Text>
        <View style={styles.divider}></View>
        <Text style={styles.content}>{content || 'No content available.'}</Text>

        {/* Button to Open Full Article */}
        <TouchableOpacity style={styles.button} onPress={openArticleInBrowser}>
          <Text style={styles.buttonText}>Read Full Article</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F5', // Light pink background
  },
  imageContainer: {
    width: '100%',
    height: 270,
    backgroundColor: '#f8d7da', // Soft pink
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 15,
    zIndex: 10,
    backgroundColor: 'rgba(255, 105, 180, 0.7)', // Soft pink
    borderRadius: 50,
    padding: 8,
  },
  contentContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginTop: -40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#C71585', // Deep pink
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'serif',
  },
  author: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#B56576', // Warm pink
    textAlign: 'center',
    marginBottom: 15,
  },
  divider: {
    height: 2,
    backgroundColor: '#FFC0CB', // Soft pink
    marginVertical: 15,
    borderRadius: 5,
  },
  content: {
    fontSize: 16,
    lineHeight: 26,
    color: '#6A0572', // Purple-pink tone
    textAlign: 'justify',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF69B4', // Hot pink
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#FF1493',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});
