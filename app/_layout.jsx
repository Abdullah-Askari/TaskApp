import { Slot } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import '../global.css';
import { AuthProvider } from './Hooks/useAuth';

export default function RootLayout() {
  return (
  <AuthProvider>
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <Slot />
    </SafeAreaView>
  </AuthProvider>
  );
}
