import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Asegúrate de haber instalado react-native-vector-icons

const QuestionCell = ({ imageUrl, title, rate, dist, loc, fav, onPress }) => {
  
  // Si no hay imageUrl, usar imagen por defecto
  const imageSource = imageUrl
    ? { uri: imageUrl }
    : require('../assets/images/defaultImage.jpeg'); // Ruta a tu imagen por defecto

  return (
    <View style={styles.container}>
      {/* Imagen en el 30% de la celda */}
      <Image source={imageSource} style={styles.image} />
      
      {/* Contenedor de icones para el título y detalls */} 
      <View style={styles.IconContainer}>
       <Icon name="chevron-forward" size={24} color="#dad7cd" />
       <Icon style={styles.icons} name="location" size={24} color="#3a5a40" />
       <Icon name="car" size={24} color="#3a5a40" />
      </View>
      {/* Contenedor de texto para el título y detalls */}      
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtext}>{loc}"holaquetal"</Text>
        <Text style={styles.subtext}>{dist}"esticaqui"</Text>
      </View>

      {/* Contenedor de icones para el favorits i ratSing */} 
      <View style={styles.SmallContainer}>
       <Icon name="bookmark" size={24} color="#dad7cd" />
       <Icon name="location" size={24} color="#dad7cd" />
       <Text style={styles.subtext}>{rate}3</Text>
      </View>

       {/* Contenedor de icones para el favorits i rating */} 
       <View style={styles.IconContainer}>
       <Icon name="bookmark" size={24} color="#3a5a40" />
       <Icon name="location" size={24} color="#dad7cd" />
       <Icon style={styles.icons} name="star" size={24} color="#ffee00" />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#dad7cd', // Fondo pastel
    borderBottomWidth: 1,
    borderColor: '#333',
    borderRadius: 20, // Bordes redondeados
    marginVertical: 5, // Margen para que no esté pegado a otras celdas
    elevation: 7, // Sombra en Android
    shadowColor: '#183820', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  image: {
    width: '30%',
    height: 100,
    marginRight: 10,
    borderRadius: 15,
  },
  textContainer: {
    flex: 16,
    justifyContent: 'center',
  },
  IconContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  SmallContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3a5a40', // Texto en blanco
    marginBottom: 6, // Espacio entre el título y las coordenadas
  },
  subtext: {
    fontSize: 14,
    color: '#3a5a40', // Coordenadas en gris claro
    marginBottom: 3,
  },
  icons: {
    marginBottom: 5,
  },
  button: {
    width: '5%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuestionCell;
