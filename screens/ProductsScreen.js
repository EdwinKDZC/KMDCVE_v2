import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { getProducts, addProducts, updateProducts, deleteProducts } from "../util/HttpClient";

const ProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const productsList = await getProducts();
    setProducts(productsList);
  };

  const handleAddProduct = async () => {
    const newProduct = {
      description,
      date: new Date().toISOString(),
      amount: parseFloat(amount),
    };

    const id = await addProducts(newProduct);
    setProducts([...products, { ...newProduct, id }]);
    setDescription('');
    setAmount('');
  };

  const handleUpdateProduct = async () => {
    const updatedProduct = {
      description,
      date: new Date().toISOString(),
      amount: parseFloat(amount),
    };

    await updateProducts(editingProduct.id, updatedProduct);
    setProducts(products.map(product => (product.id === editingProduct.id ? { ...updatedProduct, id: editingProduct.id } : product)));
    setDescription('');
    setAmount('');
    setEditingProduct(null);
  };

  const handleDeleteProduct = async (id) => {
    await deleteProducts(id);
    setProducts(products.filter(product => product.id !== id));
  };

  const startEditing = (product) => {
    setDescription(product.description);
    setAmount(product.amount.toString());
    setEditingProduct(product);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button
        title={editingProduct ? "Update Product" : "Add Product"}
        onPress={editingProduct ? handleUpdateProduct : handleAddProduct}
      />
      <FlatList
  data={products}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productText}>{item.description}</Text>
      <View style={styles.productDetail}>
        <Text style={styles.productAmount}>${item.amount.toFixed(2)}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => startEditing(item)} style={[styles.editButton, styles.button]}>
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteProduct(item.id)} style={[styles.deleteButton, styles.button]}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  productContainer: {
    flexDirection: 'column',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  productText: {
    fontSize: 18,
    marginBottom: 8,
  },
  productAmount: {
    fontSize: 16,
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
    fontSize: 16,
  },
  productDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductScreen;