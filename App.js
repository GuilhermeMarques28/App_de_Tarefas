import React, {useEffect, useState, useRef} from 'react';
import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import firebase from './src/firebaseConnection';
import TaskList from './src/Tasklist';
import Icon from 'react-native-vector-icons/Feather';

const App = () => {
  const [task, setTask] = useState('');
  const [newTask, setNewTask] = useState([]);
  const inputRef = useRef(null);
  const [key, setKey] = useState('');

  useEffect(() => {
    async function getTasks() {
      await firebase
        .database()
        .ref('tarefas')
        .on('value', snapshot => {
          setNewTask([]);
          snapshot.forEach(chilItem => {
            let data = {
              key: chilItem.key,
              nome: chilItem.val().nome,
            };
            setNewTask(oldArray => [...oldArray, data].reverse());
          });
        });
    }
    getTasks();
  }, []);

  async function adicionar() {
    if (task !== '') {
      if (key !== '') {
        await firebase.database().ref('tarefas').child(key).update({
          nome: task,
        });
        Keyboard.dismiss();
        setKey('');
        setTask('');
        return;
      }
    }

    if (task !== '') {
      let tarefas = await firebase.database().ref('tarefas');
      let chave = tarefas.push().key;

      tarefas.child(chave).set({
        nome: task,
      });
      Keyboard.dismiss();
      setTask('');
    } else {
      alert('Por favor escreve a tarefa');
    }
  }

  async function deleteTask(key) {
    await firebase.database().ref('tarefas').child(key).remove();
  }

  function editTask(data) {
    setTask(data.nome);
    setKey(data.key);
    inputRef.current.focus();
  }

  function cancelEdit() {
    setKey('');
    Keyboard.dismiss();
    setTask('');
  }
  return (
    <View style={styles.container}>
      {key.length > 0 && (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={cancelEdit}>
            <Icon name="x-circle" size={20} color="#FF0000" />
          </TouchableOpacity>
          <Text style={{marginLeft: 5, marginBottom: 8, color: '#FF0000'}}>
            Você está editando a sua tarefa
          </Text>
        </View>
      )}
      <View style={styles.containerTask}>
        <TextInput
          style={styles.input}
          onChangeText={texto => setTask(texto)}
          underlineColorAndroid="transparent"
          value={task}
          placeholder="O que você deseja fazer?"
          ref={inputRef}
        />
        <TouchableOpacity style={styles.button} onPress={adicionar}>
          <Text style={styles.textButton}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={newTask}
        keyExtractor={item => item.key}
        renderItem={({item}) => (
          <TaskList data={item} deleteItem={deleteTask} editItem={editTask} />
        )}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    marginLeft: 10,
    marginRight: 10,
  },
  containerTask: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderColor: '#121212',
    height: 40,
    fontSize: 17,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#121212',
    width: '10%',
    alignItems: 'center',
    height: 40,
    marginLeft: 5,
  },
  textButton: {
    color: '#fff',
    fontSize: 20,
  },
});
