import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  AsyncStorage,
} from "react-native";
import { db } from "../../firebase";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const TodoEditForm = ({ setModalVisible, index }) => {
  const [todo, setTodo] = useState({
    name: "",
    status: "",
  });

  const fetchTodo = async () => {
    try {
      const response = await getDoc(doc(db, "todo", index));
      setTodo(response.data());
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTodo();
  }, []);

  const editTodo = async () => {
    if (todo.name.length > 0) {
      try {
        const ref = doc(db, "todo", index);
        await updateDoc(ref, todo);
        setModalVisible(false);
      } catch (e) {
        console.log(e);
      }
    } else alert("Enter todo");
  };
  return (
    <View>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={(text) =>
            setTodo((prev) => {
              return {
                ...prev,
                ["name"]: text,
              };
            })
          }
          value={todo.name}
        />
        <TouchableOpacity
          style={[styles.button, styles.buttonAdd]}
          onPress={() => editTodo()}
        >
          <Text style={styles.textStyle}>Edit Todo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonClose]}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.textStyle}>Cancel</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 45,
    width: 170,
    margin: 12,
    padding: 10,
    backgroundColor: "white",
    textAlign: "center",
    border: "black",
    borderWidth: 1,
    borderRadius: 8,
  },
  button: {
    borderRadius: 16,
    padding: 8,
    elevation: 2,
    marginBottom: 5,
  },
  buttonAdd: {
    backgroundColor: "#2196F3",
  },
  buttonClose: {
    backgroundColor: "#ef3f49",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default TodoEditForm;
