import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../utils/firebaseConfig';
import MapView, { Marker, Polyline } from 'react-native-maps';

export default function Page1({ navigation }) {
    const [data, setData] = useState([]);
    const [markerPosition, setMarkerPosition] = useState(null);
    const [questionLocation, setQuestionLocation] = useState(null);
    const [currentTitle, setCurrentTitle] = useState('');
    const [showAnswer, setShowAnswer] = useState(false);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [distance, setDistance] = useState(null); // Estat per a la distància

    // Funció per calcular la distància entre dues coordenades (Haversine)
    const calculateDistance = (coord1, coord2) => {
        const R = 6371; // Radi de la Terra en km
        const dLat = ((coord2.latitude - coord1.latitude) * Math.PI) / 180;
        const dLon = ((coord2.longitude - coord1.longitude) * Math.PI) / 180;

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((coord1.latitude * Math.PI) / 180) *
                Math.cos((coord2.latitude * Math.PI) / 180) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c; // Distància en km
    };

    const handleMapPress = (event) => {
        if (!showAnswer) {
            const { latitude, longitude } = event.nativeEvent.coordinate;
            setMarkerPosition({ latitude, longitude });
        }
    };

    const mapStyle = [
        {
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
        },
    ];

    const fetchData = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'Preguntes'));
            const dataFromFirestore = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setData(dataFromFirestore);

            if (dataFromFirestore.length > 0) {
                setCurrentTitle(dataFromFirestore[0].Title);
                setQuestionLocation({
                    latitude: dataFromFirestore[0].GeoLocation.latitude,
                    longitude: dataFromFirestore[0].GeoLocation.longitude,
                });
            }
        } catch (error) {
            console.error("Error al obtenir les dades: ", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleButtonPress = () => {
        if (showAnswer) {
            const nextIndex = questionIndex + 1;

            if (nextIndex >= data.length) {
                navigation.navigate('Page2');
            } else {
                const nextQuestion = data[nextIndex];
                setCurrentTitle(nextQuestion?.Title || '');
                setQuestionLocation({
                    latitude: nextQuestion.GeoLocation.latitude,
                    longitude: nextQuestion.GeoLocation.longitude,
                });
                setQuestionIndex(nextIndex);
                setMarkerPosition(null);
                setDistance(null); // Reinicia la distància per a la nova pregunta
            }
        } else {
            setCurrentTitle('Resposta');
            if (markerPosition && questionLocation) {
                const dist = calculateDistance(markerPosition, questionLocation);
                setDistance(dist.toFixed(2)); // Guarda la distància amb 2 decimals
            }
        }
        setShowAnswer(!showAnswer);
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{currentTitle}</Text>
            </View>

            <MapView
                style={styles.map}
                customMapStyle={mapStyle}
                initialRegion={{
                    latitude: 41.3851,
                    longitude: 2.1734,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={handleMapPress}
            >
                {markerPosition && (
                    <Marker
                        coordinate={markerPosition}
                        title="Ubicació seleccionada"
                        description={`Latitud: ${markerPosition.latitude}, Longitud: ${markerPosition.longitude}`}
                    />
                )}

                {showAnswer && questionLocation && (
                    <Marker
                        coordinate={{
                            latitude: questionLocation.latitude,
                            longitude: questionLocation.longitude,
                        }}
                        title="Ubicació de la pregunta"
                        description={`Latitud: ${questionLocation.latitude}, Longitud: ${questionLocation.longitude}`}
                        pinColor="blue"
                    />
                )}

                {showAnswer && markerPosition && questionLocation && (
                    <Polyline
                        coordinates={[
                            { latitude: markerPosition.latitude, longitude: markerPosition.longitude },
                            { latitude: questionLocation.latitude, longitude: questionLocation.longitude },
                        ]}
                        strokeColor="#FF0000"
                        strokeWidth={3}
                    />
                )}
            </MapView>

            {showAnswer && distance && (
                <View style={styles.distanceContainer}>
                    <Text style={styles.distanceText}>
                        Distància: {distance} km
                    </Text>
                </View>
            )}

            <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
                <Text style={styles.buttonText}>{showAnswer ? 'Next' : 'Check'}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#44495E',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        backgroundColor: '#242442',
        padding: 20,
        borderRadius: 30,
        marginBottom: 30,
    },
    titleText: {
        color: '#FFFFFF',
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#D9D9D9',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 30,
        width: '60%',
    },
    buttonText: {
        color: '#242442',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    map: {
        width: '80%',
        height: '50%',
        marginBottom: 20,
    },
    distanceContainer: {
        backgroundColor: '#D9D9D9',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
    },
    distanceText: {
        color: '#242442',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
