import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";

import { styles } from "./styles";
const obtenerCotizacionDolarBlue = async () => {
  const response = await fetch('https://www.infodolar.com/api/tasa.aspx?codiso=USD');
  const data = await response.json();
  return data.blue.venta; // Retorna el precio de venta del dólar blue
};
const ProductItem = ({ item, onSelected, color }) => {
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
<TouchableOpacity
style={{ ...styles.containerTouchable, backgroundColor: color }}
onPress={() => onSelected(item)}>
<View>
<Text style={styles.name}>{item.nombre}</Text>
</View>
<View>
<Text style={styles.price}>${item.price} (USD) ≈ ARS {item.price * cotizacionDolarBlue}$</Text>
<Text style={styles.weight}>Stock: {item.stock}</Text>
</View>
</TouchableOpacity>
</View>
);
};



export default ProductItem;
