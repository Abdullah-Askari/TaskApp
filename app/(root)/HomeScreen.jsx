import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import logo from '../../assets/images/icon.png';
import { getTasks, searchTasks } from '../../fireStore';
import SignOut from '../components/SignOut';
import TaskCard from '../components/TaskCard';

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const fetchTasks = async () => {
    const response = await getTasks();
    if (response.success) setTasks(response.tasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() === '') return fetchTasks();

    const response = await searchTasks(query);
    if (response.success) setTasks(response.tasks);
  };

  return (
    <View className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-gray-300 w-full p-2 flex-row justify-between items-center">
        <Image source={logo} style={{ width: 40, height: 40 }} />
        <TouchableOpacity className="border rounded-lg bg-red-50 p-1">
          <SignOut />
        </TouchableOpacity>
      </View>

      {/* Task Summary Card */}
      <TaskCard />

      {/* Search Bar */}
      <View className="bg-white p-4 border flex-row items-center mx-4 my-2 rounded-lg">
        <Ionicons name="search" size={20} color="#000" />
        <TextInput
          placeholder="Search tasks..."
          placeholderTextColor="#000"
          className="ml-2 flex-1"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <Ionicons name="close" size={20} color="#000" />
          </TouchableOpacity>
        )}
      </View>

      {/* Recents Label */}
      <Text className="text-left p-4 text-lg font-normal text-gray-900">
        Recents
      </Text>

      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskCard task={item} />}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-10">No tasks found</Text>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

export default HomeScreen;
