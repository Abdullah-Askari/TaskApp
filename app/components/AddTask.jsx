import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { addTask } from '../../fireStore';

const AddTask = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  const handleAddTask = async () => {
    if (title.trim() === '') {
      Alert.alert('Error', 'Title is required');
      return;
    }

    const result = await addTask({ title: title.trim(), details: details.trim() });
    if (result.success) {
      Alert.alert('Success', 'Task added!', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } else {
      Alert.alert('Error', result.error || 'Failed to add task');
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Ionicons
        name="arrow-back"
        size={20}
        className="m-4"
        color="#000"
        onPress={() => router.back()}
      />
      <Text className="text-lg text-center my-4">Add Task</Text>

      <TextInput
        placeholder="Title"
        className="border rounded-lg p-2 m-4"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Details"
        className="border rounded-lg p-2 m-4"
        value={details}
        onChangeText={setDetails}
        multiline
        style={{ height: 120, textAlignVertical: 'top' }}
      />

      <TouchableOpacity
        className="bg-blue-500 p-3 rounded-lg m-4"
        onPress={handleAddTask}
      >
        <Text className="text-white text-center text-lg">Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddTask;
