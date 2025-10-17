import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';

const TaskCard = ({ total }) => {
  const router = useRouter();

  return (
    <View className="m-4 p-5 bg-white rounded-xl shadow-lg">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-bold text-gray-800 mb-1">Total</Text>
          <Text className="text-lg text-gray-600">{total} tasks</Text>
        </View>
        <TouchableOpacity
          className="bg-blue-500 rounded-full w-12 h-12 items-center justify-center shadow-md"
          activeOpacity={0.7}
          onPress={() => router.push('/add')}
        >
          <Ionicons name="add" size={26} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TaskCard;
