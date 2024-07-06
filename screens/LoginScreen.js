import React, { useState } from 'react';
import {Image, StyleSheet, Text, TextInput, View, ScrollView,TouchableOpacity,Alert } from 'react-native';
import { useAuth } from "../context/AuthContext";
import { useNavigation } from '@react-navigation/native';
import { BlurView } from "expo-blur"; 

export default function Login () {

  const navigation = useNavigation();
  const { login,loginwithGoogle } = useAuth();

  const [user, setUser] = useState({
    email:"",
    password:"",
  });

  const handleLogin = async () => {
    try {
      await login(user.email, user.password);
      navigation.navigate("HomeDrawer"); 
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };
  
  const handleGoogleSignUp = async () => {
    await loginwithGoogle();
    console.log('Registrarse con Google');
  };

  return (
    <View style={styles.container}>
      <Image source={require( "../assets/icono.jpeg")} style={[styles.image, StyleSheet.absoluteFill]} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <BlurView intensity={40}>
          <View style={styles.login}>
            <Image
              source={require( "../assets/user.png")}
              style={styles.profilePicture}
            />
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={user.email}
        onChangeText={(value) => setUser({ ...user, email: value })}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={user.password}
        onChangeText={(value) => setUser({ ...user, password: value })}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignUp}>
        <Text style={styles.googleButtonText}>Registrarse con Google</Text>
      </TouchableOpacity>
      </View>
      </BlurView>
      </ScrollView>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  login: {
    width: 350,
    height: 500,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 1,
    marginVertical: 30,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ffffff90",
    marginBottom: 20,
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderColor: "#fff",
    borderWidth: 1,
  },
  text: {
    fontSize: 17,
    fontWeight: "400",
    color: "white",
  },
  googleButton:{
    width: 250,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderColor: "#fff",
    borderWidth: 1,
  }
});