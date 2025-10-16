import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Modal,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import logo from '../../assets/images/logo.png';
import { getTasks, searchTasks } from '../../fireStore';
import SignOut from '../components/SignOut';
import TaskCard from '../components/TaskCard';

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = getTasks((newTasks) => {
      setTasks(newTasks);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    const unsubscribe = getTasks((newTasks) => {
      setTasks(newTasks);
      setRefreshing(false);
    });
    setTimeout(() => unsubscribe(), 1500);
  };

  const TaskItem = ({ item }) => (
    <View className="bg-white p-4 m-2 rounded-xl shadow-md">
      <Text className="text-lg font-medium text-gray-800">{item.title}</Text>
      {item.details && <Text className="text-gray-500 mt-1">{item.details}</Text>}

      <View className="flex-row justify-end mt-2 space-x-2">
        <TouchableOpacity onPress={() => handleEdit(item.id, item.title)} className="bg-blue-100 p-2 rounded-lg">
          <Ionicons name="pencil" size={20} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} className="bg-red-100 p-2 rounded-lg">
          <Ionicons name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100">
      <View className="bg-white w-full p-4 flex-row justify-between items-center shadow-md">
        <TouchableOpacity onPress={() => setMenuVisible(!menuVisible)} className="p-2">
          <Ionicons name="menu" size={28} color="black" />
        </TouchableOpacity>
        <Image source={logo} style={{ width: 40, height: 40, borderRadius: 8 }} />
        <View style={{ width: 28 }} />
      </View>

      <Modal transparent visible={menuVisible} animationType="fade" onRequestClose={() => setMenuVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View className="flex-1 bg-black/30 justify-start p-4">
            <View className="bg-white rounded-xl shadow-lg w-44 p-3 relative">
              <TouchableOpacity onPress={() => setMenuVisible(false)} className="absolute right-3 top-3 p-1">
                <Ionicons name="close" size={20} color="#555" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setMenuVisible(false); router.push('/(root)/HomeScreen'); }} className="py-2 border-b border-gray-200 mt-5">
                <Text className="text-gray-800 text-base">🏠 Home</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setMenuVisible(false); router.push('/(root)/Profile'); }} className="py-2 border-b border-gray-200">
                <Text className="text-gray-800 text-base">👤 Profile</Text>
              </TouchableOpacity>
              <View className="pt-2">
                <TouchableOpacity className="bg-red-100 p-2 rounded-lg">
                  <SignOut />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <TaskCard total={tasks.length} />

      <View className="flex-row items-center bg-white border border-gray-300 rounded-full px-4 py-2 mx-4 my-2 shadow-sm">
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          placeholder="Search tasks..."
          placeholderTextColor="#A3A3A3"
          className="flex-1 ml-3 text-base p-0"
          value={searchQuery}
          onChangeText={async (text) => {
            setSearchQuery(text);
            if (text.trim() === '') return;
            const response = await searchTasks(text);
            if (response.success) setTasks(response.tasks);
          }}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close" size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>

      <Text className="text-left px-4 py-2 text-2xl font-semibold text-gray-600">Recents</Text>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#2196F3" />
          <Text className="mt-2 text-gray-500">Loading tasks...</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TaskItem item={item} />}
          ListEmptyComponent={<Text className="text-center text-gray-400 mt-10">No tasks found</Text>}
          contentContainerStyle={{ paddingBottom: 100 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} colors={['#2196F3']} tintColor="#2196F3" />
          }
        />
      )}
    </View>
  );
};

export default HomeScreen;
