import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { getCategory, addCategory, updateCategory, deleteCategory } from "../util/HttpClienteCategories";

const CategoryScreen = () => {
  const [category, setCategory] = useState([]);
  const [namecategory, setNamecategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const categoriesList = await getCategory();
    setCategory(categoriesList);
  };

  const handleAddCategory = async () => {
    const newCategory = {
      namecategory,
    };

    const id = await addCategory(newCategory);
    setCategory([...category, { ...newCategory, id }]);
    setNamecategory('');
  };

  const handleUpdateCategory = async () => {
    const updatedCategory = {
      namecategory,
    };

    await updateCategory(editingCategory.id, updatedCategory);
    setCategory(category.map(cate => (cate.id === editingCategory.id ? { ...updatedCategory, id: editingCategory.id } : cate)));
    setNamecategory('');
    setEditingCategory(null);
  };

  const handleDeleteCategory = async (id) => {
    await deleteCategory(id);
    setCategory(category.filter(cat => cat.id !== id));
  };

  const startEditing = (cate) => {
    setNamecategory(cate.namecategory);
    setEditingCategory(cate);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={namecategory}
        onChangeText={setNamecategory}
        style={styles.input}
      />
      <Button
        title={editingCategory ? "Update Category" : "Add Category"}
        onPress={editingCategory ? handleUpdateCategory : handleAddCategory}
      />
      <FlatList
        data={category}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryText}>{item.namecategory}</Text>
            <TouchableOpacity onPress={() => startEditing(item)} style={styles.editButton}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDeleteCategory(item.id)} style={styles.deleteButton}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  categoryText: {
    fontSize: 18,
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
  },
});

export default CategoryScreen;
