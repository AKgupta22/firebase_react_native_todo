import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { db } from "../../firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import Icon from "react-native-vector-icons/AntDesign";
import MuiIcon from "react-native-vector-icons/MaterialIcons";

const List = ({ fetchData, data, setIndex, setEditModalVisible }) => {
  useEffect(() => {
    fetchData();
  }, []);

  const deleteTodo = async (index) => {
    try {
      await deleteDoc(doc(db, "todo", index));
    } catch (e) {
      console.log(e);
    }
  };

  const editTodo = (index) => {
    setEditModalVisible(true);
    setIndex(index);
  };

  const markDone = async (index, status) => {
    try {
      const todoDocRef = doc(db, "todo", index);
      await updateDoc(todoDocRef, {
        status: status ? false : true,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainter}>
            <Text style={styles.item}>{item?.data.name}</Text>
            <Text
              style={styles.item}
              onPress={() => markDone(item.id, item.data.status)}
            >
              {item?.data.status ? (
                <MuiIcon name="done" size={18} color="#121212" />
              ) : (
                <MuiIcon name="pending-actions" size={20} color="#121212" />
              )}
            </Text>
            <TouchableOpacity
              style={styles.item}
              onPress={() => editTodo(item.id)}
            >
              <Icon name="edit" size={18} color="#121212" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => deleteTodo(item.id)}
            >
              <Icon name="delete" size={18} color="#121212" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 22,
    backgroundColor: "white",
    height: "100%",
    flex: 1,
  },
  itemContainter: {
    minHeight: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    border: "#121212",
    borderBottomWidth: 0.8,
    marginTop: 2,
  },
  item: {
    fontSize: 18,
    textAlign: "center",
    color: "black",
    width: "20%",
  },
});

export default List;
