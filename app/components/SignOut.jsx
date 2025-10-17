import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Alert, Text, TouchableOpacity } from 'react-native';
import { useAuth } from '../Hooks/useAuth';

const SignOut = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Sign Out", 
          style: "destructive",
          onPress: async () => {
            await logout();
            router.replace('/(Auth)/LogIn');
          }
        }
      ]
    );
  };

  return (
    <TouchableOpacity
      onPress={handleSignOut}
      activeOpacity={0.7}
      className="flex-row items-center justify-center bg-red-100 rounded-xl px-3 py-1.5 shadow-sm"
    >
      <Text className="text-red-600 font-semibold text-sm mr-2">Sign Out</Text>
      <FontAwesome name="sign-out" size={16} color="#DC2626" />
    </TouchableOpacity>
  );
};

export default SignOut;
