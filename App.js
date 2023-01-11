import { useState } from 'react';
import { StyleSheet, Text, View, Pressable, AsyncStorage } from 'react-native';
import List from './src/Component/List';
import ModalForm from './src/Component/ModalForm';
import { collection, query, onSnapshot, where } from "firebase/firestore"
import  {db} from './firebase'

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [index, setIndex] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const q = query(collection(db, 'todo'))
      onSnapshot(q, (querySnapshot) => {
        const response = (querySnapshot.docs.map(item => ({
          id: item.id,
          data: item.data()
        })))
        setData(response)
      })
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.today}>
          <Text style={styles.todayText}>Today</Text>
          <Pressable
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.plusText}>+</Text>
          </Pressable>
        </View>
        <List fetchData={fetchData} data={data} setIndex={setIndex} setEditModalVisible={setEditModalVisible} />
      </View>
      {modalVisible && <ModalForm modalVisible={modalVisible} setModalVisible={setModalVisible} fetchData={fetchData} />}
      {editModalVisible && <ModalForm modalVisible={editModalVisible} setModalVisible={setEditModalVisible} index={index} fetchData={fetchData} />}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    backgroundColor: '#0093E9',
    justifyContent: 'flex-start',
    backgroundImage: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)"
  },
  today: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10
  },
  todayText: {
    color: "white",
    fontSize: 25
  },
  plusText: {
    color: "white",
    fontSize: 32
  }
});
