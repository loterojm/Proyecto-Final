import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

import { styles } from "./styles";
import { COLORS } from "../../constants";

const CategoryItem = ({ item, onSelected }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ ...styles.containerTouchable, backgroundColor: COLORS.primary }}
        onPress={() => onSelected(item)}>
        <View>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryItem;
