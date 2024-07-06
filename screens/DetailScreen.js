import React, { useEffect, useState } from 'react'
import {View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert} from 'react-native'

import {collection, addDoc, getDocs, doc, deleteDoc, getDoc, setDoct} from 'firebase/firestore'

export default function Detail(props) {

  const [product, setProduct] = useState({})

  const getOneProduct = async(id)=>{
    try{
      const docRef = doc(db, 'productos', id)
      const docSnap = await getDoc(docRef)
      setProduct(docSnap.data())
    }
    catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    getOneProduct(props.route.params.productoId)
  },[])

  const deleteProduct = async(id)=>{ 
    await deleteDoc(doc(db,'productos', id))
    Alert.alert('exito', 'producto eliminado con exito')
    props.navigation.navigate('List')
  }


  return (
    <View>
      <Text style={styles.titulo} >Detalle del producto</Text>
      
        <Text style={styles.sub}>Nombre: {product.nombre}</Text>
        <Text style={styles.sub}>Color: {product.color}</Text>
        <Text style={styles.sub}>Precio: {product.stock}</Text>
      
      <TouchableOpacity style={styles.BotonLista} onPress={()=>deleteProduct(props.route.params.productoId)}>
         <Text style={styles.TextoNombre}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  titulo:{
    textAlign:'center',
    marginTop:10,
    marginBottom:10,
    fontSize:20
  },
  sub:{
    fontSize:16
  },
  
  TextoNombre:{
    fontSize:16,
    textAlign:'center',
    color:'white',
    
  },
  BotonLista:{
    backgroundColor:'red',
    borderBottomWidth:1,
    borderBottomColor:'#cccccc',
    marginBottom:3,
    padding:5,
    marginTop:5
  }
})