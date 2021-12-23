import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/Feather';

const Tasklist = ({data, deleteItem, editItem}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => deleteItem(data.key)}>
        <Icon name="trash" color="#fff" size={20} />
      </TouchableOpacity>
      <View>
        <TouchableWithoutFeedback onPress={() => editItem(data)}>
          <Text style={styles.text}>{data.nome}</Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

export default Tasklist;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
    marginBottom: 10,
    marginTop: 5,
    padding: 10,
    borderRadius: 10,
    flexDirection: 'row',
  },
  text: {
    fontSize: 17,
    color: '#fff',
    paddingLeft: 9,
  },
});
