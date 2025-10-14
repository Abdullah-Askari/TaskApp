import { Slot } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import '../global.css';
import { AuthProvider } from './Hooks/useAuth';

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }} >
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <Slot />
      </SafeAreaView>
    </AuthProvider>
  );
}
