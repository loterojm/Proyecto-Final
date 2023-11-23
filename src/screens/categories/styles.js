import { StyleSheet, StatusBar } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
  },
  title: {
    fontSize: 20,
    fontFamily: "Inter-Bold",
  }, imagen:{
    flex:1, justifyContent:"center",alignContent:"center",
      width: 100,
      height: 100,
    
  }, containerImagen:{
    flex:1, justifyContent:"center",alignContent:"center", alignItems:"center",
  }
});
