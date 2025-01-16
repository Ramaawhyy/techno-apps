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
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.push('/')}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Image source={require('../../assets/images/BackProf.jpg')} style={styles.headerImage}/>
      </View>

      
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>Technoinfo</Text>

        
        <Text style={styles.sectionTitle}>About App</Text>
        <Text style={styles.synopsisText}>
        TechnoInfo is an online news application focusing on the world of technology.
        It is designed to provide quick and easy access to the latest articles on various tech topics, including AI, gaming, smartphones, software, and programming. 
        With a clean and user-friendly interface, TechnoInfo allows users to browse news by category, search for specific articles, and stay updated with the latest tech trends. 
        The app also features a slider for top news and a dropdown menu for quick navigation to user profiles and other features.
        </Text>

        
        <Text style={styles.sectionTitle}>Group Members</Text>
        <View style={styles.commentContainer}>
          <Image
            source={require('../../assets/images/Rama.png')}
            style={styles.commentImage}
          />
          <View>
            <Text style={styles.commentName}>Rama Wahyu Hermawan</Text>
            <Text style={styles.commentText}>16223013</Text>
          </View>
        </View>
        <View style={styles.commentContainer}>
          <Image
            source={require('../../assets/images/Thariq.jpeg')} 
            style={styles.commentImage}
          />
          <View>
            <Text style={styles.commentName}>Richard Thariq Hussain</Text>
            <Text style={styles.commentText}>16223005</Text>
          </View>
        </View>
        <View style={styles.commentContainer}>
          <Image
            source={require('../../assets/images/Sophia.jpeg')} 
            style={styles.commentImage}
          />
          <View>
            <Text style={styles.commentName}>Sophia Nur Rohmah</Text>
            <Text style={styles.commentText}>16223006</Text>
          </View>
        </View>
        <View style={styles.commentContainer}>
          <Image
            source={require('../../assets/images/Tirto.jpeg')} 
            style={styles.commentImage}
          />
          <View>
            <Text style={styles.commentName}>Tirto Rizaldy</Text>
            <Text style={styles.commentText}>16221001</Text>
          </View>
        </View>
        <View style={styles.commentContainer}>
          <Image
            source={require('../../assets/images/Dede.png')} 
            style={styles.commentImage}
          />
          <View>
            <Text style={styles.commentName}>Dede Misbah</Text>
            <Text style={styles.commentText}>16223009</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  backText: {
    fontSize: 16,
    color: '#fff',
  },
  headerImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  synopsisText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  commentImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  commentDate: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 5,
  },
  commentText: {
    fontSize: 14,
    color: '#555',
  },
});
