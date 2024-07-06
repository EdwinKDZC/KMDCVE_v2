import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/LoginScreen';
import Home from './screens/HomeScreen';
import Products from './screens/ProductsScreen';
import Register from './screens/RegisterScreen';
import Categories from './screens/CategoryScreen';
import Detail from './screens/DetailScreen'; 
import { AuthProvider } from './context/AuthContext';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();

const AuthTabs = () => (
  <Tab.Navigator initialRouteName="Login">
    <Tab.Screen name="Login" component={Login} />
    <Tab.Screen name="Register" component={Register} />
  </Tab.Navigator>
);

const HomeDrawer = () => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen name="Home" component={Home} />
    <Drawer.Screen name="Products" component={Products} />
    <Drawer.Screen name="Categories" component={Categories} />

  </Drawer.Navigator>
);

const App = () => (
  <AuthProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Auth">
        <Stack.Screen
          name="Auth"
          component={AuthTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HomeDrawer"
          component={HomeDrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
         name='Show' 
         component={Detail} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  </AuthProvider>
);

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
