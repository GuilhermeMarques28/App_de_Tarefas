import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import firebase from './firebaseConnection';

const App = () => {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');

  async function cadastrar() {
    if ((nome !== '') & (idade !== '')) {
      let usuarios = await firebase.database().ref('usuarios');
      let key = usuarios.push().key;

      usuarios.child(key).set({nome: nome, idade: idade});

      setNome('');
      setIdade('');
    } else {
      alert('Por favor, escreva os dados');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Nome</Text>
      <TextInput
        style={styles.input}
        value={nome}
        underlineColorAndroid="transparent"
        onChangeText={texto => setNome(texto)}
      />
      <Text style={styles.texto}>Idade</Text>
      <TextInput
        style={styles.input}
        value={idade}
        underlineColorAndroid="transparent"
        onChangeText={texto => setIdade(texto)}
        keyboardType="numeric"
      />
      <Button title="Cadastrar" onPress={cadastrar} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
  },

  input: {
    width: '100%',
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#121212',
    fontSize: 19,
    marginBottom: 10,
  },
  texto: {
    fontSize: 25,
    color: '#121212',
  },
});
