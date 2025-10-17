import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getAuth, signOut } from 'firebase/auth';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import logo from '../../assets/images/icon.png';

const Profile = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/(Auth)/LogIn');
    } catch (err) {
      Alert.alert('Logout Error', err.message);
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <View className="flex-row items-center p-4 bg-white shadow-md rounded-2xl">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-gray-800 ml-4 flex-1 text-center">
          Profile
        </Text>
      </View>

      <View className="flex-1 justify-start items-center mt-8">
        <Image
          source={logo}
          className="w-28 h-28 rounded-full mb-6 border-2 border-blue-500 shadow-md"
        />

        {user ? (
          <View className="bg-white w-4/5 p-6 rounded-3xl shadow-lg">
            <Text className="text-gray-700 text-base mb-4">
              <Text className="font-semibold">Name: </Text>
              {user.displayName || 'Not set'}
            </Text>

            <Text className="text-gray-700 text-base mb-4">
              <Text className="font-semibold">Email: </Text>
              {user.email}
            </Text>

            <TouchableOpacity
              onPress={handleLogout}
              className="mt-4 bg-red-500 p-3 rounded-xl"
            >
              <Text className="text-white text-center font-semibold">
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text className="text-gray-400 mt-4 text-base text-center">
            No user logged in.
          </Text>
        )}
      </View>
    </View>
  );
};

export default Profile;
