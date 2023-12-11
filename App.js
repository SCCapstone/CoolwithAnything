import { StyleSheet } from 'react-native';
import MainNavigator from './navigators/MainNavigator';

export default function App() {
  return (
      <MainNavigator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
