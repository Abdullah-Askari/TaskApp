import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Modal,
  RefreshControl,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import logo from '../../assets/images/logo.png';
import { deleteTask, getTasks, searchTasks, updateTask } from '../../fireStore';
import SignOut from '../components/SignOut';
import TaskCard from '../components/TaskCard';

const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = getTasks((newTasks) => {
      setTasks(newTasks);
    });
    return () => unsubscribe();
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() === '') return;
    const response = await searchTasks(query);
    if (response.success) setTasks(response.tasks);
  };

  const handleDelete = async (id) => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const response = await deleteTask(id);
          if (!response.success) {
            Alert.alert('Error', response.error);
          }
        },
      },
    ]);
  };

  const handleEdit = async (id, oldTitle) => {
    Alert.prompt(
      'Edit Task',
      'Enter new title for this task:',
      async (newTitle) => {
        if (!newTitle || newTitle.trim() === '') {
          Alert.alert('Error', 'Title cannot be empty.');
          return;
        }
        const response = await updateTask(id, { title: newTitle });
        if (!response.success) {
          Alert.alert('Error', response.error);
        }
      },
      'plain-text',
      oldTitle
    );
  };

  const handleRefresh =  () => {
  setRefreshing(true);

  try {
    const unsubscribe = getTasks((newTasks) => {
      setTasks(newTasks);
      setRefreshing(false);
    }); 
    setTimeout(() => unsubscribe(), 1500);
  } catch (error) {
    console.error('Error refreshing tasks:', error);
    setRefreshing(false);
  }
};


  const TaskItem = ({ item }) => (
    <View className="bg-white p-4 m-2 rounded-lg shadow flex-col">
      <Text className="text-lg font-medium text-gray-900">{item.title}</Text>
      {item.details ? (
        <Text className="text-gray-600 mt-1 flex-1">{item.details}</Text>
      ) : null}

      <View className="flex-row justify-end gap-2">
        <TouchableOpacity
          onPress={() => handleEdit(item.id, item.title)}
          className="bg-blue-100 p-2 rounded-lg"
        >
          <Ionicons name="pencil" size={20} color="blue" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
          className="bg-red-100 p-2 rounded-lg"
        >
          <Ionicons name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-100">
      <View className="bg-gray-300 w-full p-2 flex-row justify-between items-center">
        <TouchableOpacity
          onPress={() => setMenuVisible(!menuVisible)}
          className="p-2"
        >
          <Ionicons
            name='menu'
            size={30}
            color="black"
          />
        </TouchableOpacity>

        <Image source={logo} style={{ width: 40, height: 40 }} />

        <View style={{ width: 30 }} />
      </View>


      <Modal
        transparent
        visible={menuVisible}
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View className="flex-1 bg-black/30 justify-start items-start p-4">
            <View className="bg-white rounded-lg shadow-lg w-40 p-2 relative">
              <TouchableOpacity
                onPress={() => setMenuVisible(false)}
                className="absolute right-2 top-2 p-1"
              >
                <Ionicons name="close" size={18} color="#555" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setMenuVisible(false);
                  router.push('/(root)/HomeScreen');
                }}
                className="py-2 border-b border-gray-300 mt-5"
              >
                <Text className="text-gray-800 text-base">🏠 Home</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setMenuVisible(false);
                  router.push('/(root)/Profile');
                }}
                className="py-2 border-b border-gray-300"
              >
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

      <View className="bg-white p-2 m-2 border-gray-500 flex-row items-center rounded-lg">
        <Ionicons name="search" size={20} color="#000" />
        <TextInput
          placeholder="Search tasks..."
          placeholderTextColor="#000"
          className="flex-1"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <Ionicons name="close" size={20} color="#000" />
          </TouchableOpacity>
        )}
      </View>

      <Text className="text-left p-4 text-2xl font-normal text-gray-500">
        Recents
      </Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TaskItem item={item} />}
        ListEmptyComponent={
          <Text className="text-center text-gray-500 mt-10">No tasks found</Text>
        }
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={['#2196F3']}
          tintColor='#2196F3'
          />
        }
      />
    </View>
  );
};

export default HomeScreen;
