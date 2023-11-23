import React, { useEffect, useState } from "react";
import { View, Text, Image, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { styles } from "./styles";
import { COLORS } from "../../constants";
import { addToCart } from "../../store/actions";
const obtenerCotizacionDolarBlue = async () => {
  const response = await fetch('https://www.infodolar.com/api/tasa.aspx?codiso=USD');
  const data = await response.json();
  return data.blue.venta; // Retorna el precio de venta del dólar blue
};

const Product = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.selected);
  const [cotizacionDolarBlue, setCotizacionDolarBlue] = useState(0);

  useEffect(() => {
    const obtenerCotizacion = async () => {
      const response = await fetch('https://api.bluelytics.com.ar/v2/latest');
      const data = await response.json();
      setCotizacionDolarBlue(data.blue.value_sell);
    };
  
    obtenerCotizacion();
  }, []);
  const onAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <View style={styles.container}>
      <Image resizeMode="contain" source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.nombre}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>Precio: ${product.price *cotizacionDolarBlue} USD</Text>
      <Text style={styles.weight}>Stock: {product.stock}</Text>
      <Button title="Añadir al Carrito" onPress={onAddToCart} color={COLORS.text} />
    </View>
  );
};

export default Product;
