/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, View } from 'react-native';
import MainScreen from './src/screens/MainScreen';

function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <MainScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
