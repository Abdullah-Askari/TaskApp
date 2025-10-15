import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getAuth } from 'firebase/auth';
import { Image, Text, View } from 'react-native';
import logo from '../../assets/images/icon.png';
const Profile = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const router = useRouter();

  return (
    <>
     <Ionicons
        name="arrow-back"
        size={24}
        color="#000"
        style={{ margin: 16 }}
        onPress={() => router.back()}
      />
    <View className="flex-1 bg-gray-100 justify-center items-center">
      <Image source={logo} style={{ width: 90, height: 90, marginBottom: 20 }} />

      <Text className="text-3xl font-semibold text-gray-800 mb-4">Profile</Text>

      {user ? (
        <View className="bg-white w-4/5 p-4 rounded-xl shadow">
          <Text className="text-gray-700 text-base mb-2">
            <Text className="font-semibold">Name: </Text>
            {user.displayName || 'Not set'}
          </Text>

          <Text className="text-gray-700 text-base">
            <Text className="font-semibold">Email: </Text>
            {user.email}
          </Text>
        </View>
      ) : (
        <Text className="text-gray-500 mt-4">No user logged in.</Text>
      )}
    </View>
    </>
  );
};

export default Profile;
