import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import logo from '../../assets/images/icon.png';

const Profile = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-100">
      <View className="flex-row items-center p-4 bg-white shadow-md">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold text-gray-800 ml-4">Profile</Text>
      </View>

      <View className="flex-1 justify-start items-center mt-8">
        <Image
          source={logo}
          className="w-24 h-24 rounded-full mb-6"
        />

        {user ? (
          <View className="bg-white w-4/5 p-6 rounded-xl shadow-md">
            <Text className="text-gray-700 text-base mb-3">
              <Text className="font-semibold">Name: </Text>
              {user.displayName || 'Not set'}
            </Text>

            <Text className="text-gray-700 text-base">
              <Text className="font-semibold">Email: </Text>
              {user.email}
            </Text>
          </View>
        ) : (
          <Text className="text-gray-500 mt-4 text-base">No user logged in.</Text>
        )}
      </View>
    </View>
  );
};

export default Profile;
