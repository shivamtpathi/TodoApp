import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { post_item, fetch_item, delete_item } from '../redux/ApiOperation';
import RenderItem from '../component/RenderItem';

const Create = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const dispatch = useDispatch();
  const product = useSelector((state) => state.newData.items);

  const handleInputChange = (field, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const CreateData = async () => {
    if (!formData.name || !formData.description) {
      Alert.alert('Please fill in both title and description fields.');
      return;
    }
    post_item(formData, setFormData, setLoading, getData);
  };

  const getData = () => {
    fetch_item()().then((res) => {
      dispatch(res);
    });
  };

  const handleDelete = (itemId) => {
    delete_item(itemId)()
      .then(() => {
        const updatedProduct = product.filter((item) => item.id !== itemId);
        dispatch({ type: 'SET_PRODUCT', payload: updatedProduct });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderContentList = ({ item }) => {
    return (
      <RenderItem
        item={item}
        refresh={getData}
        selectedId={selectedId}
        setId={setSelectedId}
        onDelete={() => handleDelete(item.id)}
      />
    );
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>TO-DO</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter title"
          value={formData.name}
          onChangeText={(value) => handleInputChange('name', value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter description"
          value={formData.description}
          onChangeText={(value) => handleInputChange('description', value)}
        />
      </View>
      <TouchableOpacity
        onPress={CreateData}
        style={styles.addButton}
        disabled={loading}
      >
        <Text style={styles.addButtonText}>
          {loading ? 'Adding...' : 'Add'}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={product}
        renderItem={renderContentList}
        keyExtractor={(item) => item.id.toString()}
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Create;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 30,
    color: 'green',
    marginBottom: 20,
  },
  inputContainer: {
    borderWidth: 1,
    marginVertical: 10,
    width: '80%',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: 'green',
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addButtonText: {
    fontSize: 20,
    color: 'white',
  },
  listContainer: {
    width: '100%',
    marginTop: 20,
    flex: 1,
  },
});
