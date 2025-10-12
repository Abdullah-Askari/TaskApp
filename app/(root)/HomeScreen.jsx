import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, FlatList, Text, View } from 'react-native';
import {
  getTasks
} from '../../fireStore';
import TaskCard from '../components/TaskCard';
const HomeScreen = () => {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  const fetchTasks = async () => {
    const result = await getTasks();
    if (result.success) {
      setTasks(result.tasks);
    } else {
      Alert.alert('Error fetching tasks:', result.error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );
  return (
    <View>
      <TaskCard/>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => (
          <View className='m-4 p-4 border rounded-lg shadow-lg bg-white'>
            <Text className='text-2xl font-semibold'>{item.title}</Text>
          </View>
        )}
      />
    </View>
  )
}

export default HomeScreen