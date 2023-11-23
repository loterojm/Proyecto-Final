import React, { useState, useEffect, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import * as placesDB from "../../constants/db/placesDataBase";

const LocationForm = ({ closeModal }) => {
  const [location, setLocation] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [address, setAddress] = useState(null);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleLocationChange = async (text) => {
    setLocation(text);
    try {
      const result = await Location.geocodeAsync(text);
      if (result.length > 0) {
        const { latitude, longitude } = result[0];
        setSearchedLocation({ latitude, longitude });
        setAddress(result[0].formattedAddress);
      } else {
        setSearchedLocation(null);
        setAddress(null);
      }
    } catch (error) {
      console.log("Error al obtener la ubicación:", error);
      setSearchedLocation(null);
      setAddress(null);
    }
  };

  const handleSubmit = () => {
    // Handle submit logic if needed
  };

  const getCurrentLocation = async () => {
    // Get current location logic
  };

  const mapViewRef = useRef(null);

  const handleMapReady = () => {
    // Handle map ready logic
  };

  const handleSavePlace = () => {
    if (location && searchedLocation && address) {
      placesDB
        .insertPlace('My Place', '', address, searchedLocation)
        .then(() => {
          const savedLocation = location || 'Unknown Location';
          const message = `Place saved successfully! Location: ${savedLocation}`;
          Alert.alert('Success', message);
        })
        .catch((error) => {
          console.log('Error saving place', error);
          Alert.alert('Error', 'Failed to save place.');
        });
    } else {
      Alert.alert('Error', 'Please enter a valid location and address.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecciona la ubicación de envío:</Text>
      <TextInput
        style={styles.input}
        onChangeText={handleLocationChange}
        value={location}
        placeholder="Ingresa la ubicación"
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
      <MapView
        style={styles.map}
        initialRegion={currentLocation}
        onMapReady={handleMapReady}
        ref={mapViewRef}
      >
        {searchedLocation && <Marker coordinate={searchedLocation} />}
      </MapView>
      <TouchableOpacity style={styles.button} onPress={handleSavePlace}>
        <Text style={styles.buttonText}>Guardar lugar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
        <Text style={styles.closeButtonText}>Cerrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  map: {
    width: "100%",
    height: 200,
    marginBottom: 10,
  },
  closeButton: {
    backgroundColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LocationForm;
