import { Slot } from "expo-router";
import SafeScreen from "../app/components/SafeScreen";
import { AuthProvider } from "../app/Hooks/useAuth";
import "../global.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeScreen>
        <Slot />
      </SafeScreen>
    </AuthProvider>
  )
}
