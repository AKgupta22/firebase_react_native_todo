import {
  View,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  AsyncStorage,
} from "react-native";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const Form = ({ setModalVisible }) => {
  const [todo, setTodo] = useState({
    name: "",
    status: false,
  });

  const postTodo = async () => {
    if (todo.name.length > 0) {
      try {
        await addDoc(collection(db, "todo"), {
          name: todo.name,
          status: todo.status,
        });
        setModalVisible(false)
      } catch (e) {
        alert(e);
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
          value={todo}
          placeholder="Enter your todo"
        />
        <TouchableOpacity
          style={[styles.button, styles.buttonAdd]}
          onPress={() => postTodo()}
        >
          <Text style={styles.textStyle}>Add Todo</Text>
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
export default Form;
