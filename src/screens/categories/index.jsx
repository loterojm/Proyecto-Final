import React from "react";
import { FlatList, SafeAreaView, Image, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { styles } from "./styles";
import CategoryItem from "../../components/category-item";
import { selectCategory } from "../../store/actions";
import { COLORS } from "../../constants";


const Categories = ({ navigation }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.data);

  const onSelected = (item) => {
    dispatch(selectCategory(item.id));
    navigation.navigate("Products", {
      name: item.name,
      color: COLORS.primary,
    });
  };

  const renderItem = ({ item }) => <CategoryItem item={item} onSelected={onSelected} />;

  const keyExtractor = (item) => item.id.toString();
  return (
    <SafeAreaView style={styles.container}>
    
 <View style={styles.containerImagen}>
 <Image
  source={require('../../../assets/icon.png')}
  style={styles.imagen}
  resizeMode="center"
/>

 </View>

      <FlatList data={categories} renderItem={renderItem} keyExtractor={keyExtractor} />
    </SafeAreaView>
  );
};

export default Categories;
