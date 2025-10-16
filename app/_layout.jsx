import { Slot } from "expo-router";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import '../global.css';
import { AuthProvider } from './Hooks/useAuth';

export default function RootLayout() {
  return (
  <AuthProvider>
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <StatusBar barStyle='dark-content' backgroundColor='#f5f5f5' />
      <View style={{flex:1,paddingHorizontal:16}}>
        <Slot />
      </View>
    </SafeAreaView>
  </AuthProvider>
  );
}
