import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";

const SavedMembers = (props) => {
    const index=props.index
  const isFocused = useIsFocused();
  useEffect(() => {
    getAllFavData();
  }, [isFocused,index]);

  const [favData, setFavData] = useState([]);
  const getAllFavData = async () => {
    try {
      const localData = await AsyncStorage.getItem("favData");
      if (localData) {
        const parseData = JSON.parse(localData);
        setFavData(parseData);
      }
    } catch (e) {
      console.error("Error loading data:", e);
    }
  };

  const removeFav = async (id) => {
    try {
      const newList = favData.filter((i) => i.id != id);
      await AsyncStorage.setItem("favData", JSON.stringify(newList)).then(() =>
        getAllFavData()
      );
    } catch (e) {
      console.error("Error loading data:", e);
    }
  };
  return (
    <View style={styles.outer_container}>
      <FlatList
        data={favData}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>
                {item.first_name} {item.last_name}
              </Text>
              <Text style={styles.email}>{item.email}</Text>
            </View>
            <TouchableOpacity onPress={() => removeFav(item.id)}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  outer_container: {
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#d4af37",
  },
  email: {
    fontSize: 14,
    color: "#555",
  },
});

export default SavedMembers;
