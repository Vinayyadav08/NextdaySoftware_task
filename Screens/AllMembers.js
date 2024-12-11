import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../Common/Baseurl";
import { FontAwesome } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AllMembers = (props) => {
  const index = props.index;
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios.get(baseUrl).then((res) => setData(res.data.data));
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    getAllFavData();
  }, [isFocused, index]);

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

  const addFav = async (item) => {
    try {
      const newList = [...favData, item];
      await AsyncStorage.setItem("favData", JSON.stringify(newList)).then(() =>
        getAllFavData()
      );
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
    <ScrollView>
      <View style={styles.outer_container}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View style={styles.textContainer}>
                <Text style={styles.name}>
                  {item.first_name} {item.last_name}
                </Text>
                <Text style={styles.email}>{item.email}</Text>
              </View>
              <TouchableOpacity>
                {favData.find((i) => i.id == item.id) ? (
                  <FontAwesome
                    onPress={() => removeFav(item.id)}
                    name="heart"
                    size={24}
                    color="red"
                  />
                ) : (
                    <FontAwesome
                    onPress={() => addFav(item)}
                    name="heart"
                    size={24}
                    color="black"
                  />
                )}
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </ScrollView>
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
export default AllMembers;

