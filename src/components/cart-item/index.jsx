import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, TouchableOpacity } from "react-native";

import { styles } from "./styles";
import { COLORS } from "../../constants";
import { useEffect, useState } from "react";

const CartItem = ({ item, onRemove }) => {
  const [cotizacionDolarBlue, setCotizacionDolarBlue] = useState(0);
  useEffect(() => {
    const obtenerCotizacion = async () => {
      const response = await fetch('https://api.bluelytics.com.ar/v2/latest');
      const data = await response.json();
      setCotizacionDolarBlue(data.blue.value_sell);
    };
  
    obtenerCotizacion();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{item.name}</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.content}>
        <Text style={styles.name}> {item.nombre}</Text>
          <Text style={styles.quantity}>Cantidad: {item.quantity}</Text>
          <Text style={styles.price}>${item.price *cotizacionDolarBlue}</Text>
        </View>
        <TouchableOpacity onPress={() => onRemove(item.id)}>
          <Ionicons name="trash" size={22} color={COLORS.brightRed} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;
