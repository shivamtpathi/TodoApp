import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { deleteItem, updateItem } from '../redux/ApiOperation';

const RenderItem = ({ item, refresh, setId, selectedId }) => {
  const [data1, setData1] = useState(item.name);
  const [data2, setData2] = useState(item.description);
  const dispatch = useDispatch();

 
  const update = () => {
    updateItem(data1, data2, item.id)()
      .then((action) => {
        dispatch(action);
        refresh();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteProduct = () => {
    deleteItem(item.id)()
      .then((action) => {
        dispatch(action);
        refresh();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      {selectedId === item.id ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            value={data1}
            onChangeText={(e) => setData1(e)}
          />
          <TextInput
            style={styles.input}
            value={data2}
            onChangeText={(e) => setData2(e)}
          />
        </View>
      ) : (
        <View style={styles.viewContainer}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={deleteProduct}
          style={styles.deleteButton}>
          <Text style={styles.buttonText}>DELETE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (selectedId === item.id) {
              update();
              setId('');
            } else {
              setId(item.id);
            }
          }}
          style={styles.editButton}>
          <Text style={styles.buttonText}>
            {selectedId === item.id ? 'SAVE' : 'EDIT'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  viewContainer: {
    backgroundColor: '#F5F5F5', // Light gray background

    padding: 10,
  },
  editContainer: {
    backgroundColor: 'white',
    padding: 10,
  },
  input: {
    fontSize: 20,
    backgroundColor: 'white',
    marginVertical: 5,
    width: '100%',
    borderWidth: 1,
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333', // Dark text color
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666', // Gray text color
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  editButton: {
    backgroundColor: 'green',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 5,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default RenderItem;
