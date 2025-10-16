import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { addTask } from '../../fireStore';

const AddTask = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleAddTask = async () => {
    if (title.trim() === '') {
      Alert.alert('Error', 'Title is required');
      return;
    }

    setLoading(true);

    const result = await addTask({
      title: title.trim(),
      details: details.trim(),
    });

    setLoading(false); 

    if (result.success) {
      Alert.alert('Success', 'Task added!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } else {
      Alert.alert('Error', result.error || 'Failed to add task');
    }
  };

  return (
    <View className="flex-1 bg-white">

      <Ionicons
        name="arrow-back"
        size={24}
        color="#000"
        style={{ margin: 16 }}
        onPress={() => router.back()}
      />

      <Text className="text-lg text-center my-4 font-semibold">Add Task</Text>


      <TextInput
        placeholder="Title"
        placeholderTextColor={'#D3D3D3'}
        className="border border-gray-400 rounded-lg p-3 mx-4 mb-3"
        value={title}
        onChangeText={setTitle}
      />


      <TextInput
        placeholder="Details"
        placeholderTextColor={'#D3D3D3'}
        className="border border-gray-400 rounded-lg p-3 mx-4"
        value={details}
        onChangeText={setDetails}
        multiline
        style={{ height: 120, textAlignVertical: 'top' }}
      />


      <TouchableOpacity
        className={`rounded-lg m-4 p-3 ${
          loading ? 'bg-blue-300' : 'bg-blue-500'
        }`}
        onPress={handleAddTask}
        disabled={loading} 
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-center text-lg font-medium">
            Add Task
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AddTask;
