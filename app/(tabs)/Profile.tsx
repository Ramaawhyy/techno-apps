import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

export default function Profile() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header with Overlay */}
      <View style={styles.header}>
        <Image source={require('../../assets/images/BackProf.jpg')} style={styles.headerImage} />
        <View style={styles.overlay} />
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.push('/')}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fleura</Text>
      </View>

      {/* Detail Container */}
      <View style={styles.content}>
        {/* About Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>About Fleura</Text>
          <Text style={styles.description}>
            Fleura is a lifestyle and inspiration app that brings the latest trends in fashion, beauty, 
            wellness, and travel. It provides curated articles, tips, and recommendations to enhance 
            your daily life. Whether you’re looking for style guides, wellness advice, or travel 
            inspirations, Fleura has it all in one place.
          </Text>
        </View>

        {/* Features Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Features</Text>
          <View style={styles.featureContainer}>
            {['Fashion', 'Beauty', 'Lifestyle', 'Travel', 'Food', 'Health', 'Wellness'].map((feature, index) => (
              <Text key={index} style={styles.featureText}>• {feature}</Text>
            ))}
          </View>
        </View>

        {/* Developer Section */}
        <View style={[styles.card, styles.centerCard]}>
          <Text style={styles.sectionTitle}>Name</Text>
          <Image source={require('../../assets/images/Dede.png')} style={styles.memberImage} />
          <Text style={styles.memberName}>Nisrina Ayundha Irwansyah</Text>
          <Text style={styles.memberId}>16223001</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe4e9',
  },
  header: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 280,
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 182, 193, 0.5)', // Overlay pink pastel
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  headerTitle: {
    position: 'absolute',
    bottom: 30,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: 'rgba(255, 105, 180, 0.6)',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 8,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#fff0f5',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#c71585',
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    color: '#d87093',
    lineHeight: 22,
  },
  featureContainer: {
    flexWrap: 'wrap',
  },
  featureText: {
    fontSize: 15,
    color: '#ff69b4',
    fontWeight: 'bold',
    marginVertical: 3,
  },
  centerCard: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginVertical: 10,
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#c71585',
  },
  memberId: {
    fontSize: 16,
    color: '#d87093',
  },
});
