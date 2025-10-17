import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { addTask } from '../../fireStore';

const AddTask = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddTask = async () => {
    if (title.trim() === '') return;
    setLoading(true);
    const result = await addTask({ title: title.trim(), details: details.trim() });
    setLoading(false);
    if (result.success) router.back();
  };

  return (
    <View className="flex-1 bg-gray-50">
      <Ionicons
        name="arrow-back"
        size={28}
        color="#000"
        style={{ margin: 16 }}
        onPress={() => router.back()}
      />

      <Text className="text-2xl text-center my-4 font-bold text-gray-800">Add Task</Text>

      <TextInput
        placeholder="Title"
        placeholderTextColor="#A3A3A3"
        className="bg-white border border-gray-300 rounded-xl p-4 mx-4 mb-4 shadow-sm text-gray-900"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Details"
        placeholderTextColor="#A3A3A3"
        className="bg-white border border-gray-300 rounded-xl p-4 mx-4 mb-6 shadow-sm text-gray-900"
        value={details}
        onChangeText={setDetails}
        multiline
        style={{ height: 140, textAlignVertical: 'top' }}
      />

      <TouchableOpacity
        className={`mx-4 rounded-xl p-4 ${loading ? 'bg-blue-300' : 'bg-blue-600'}`}
        onPress={handleAddTask}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-center text-lg font-semibold">Add Task</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default AddTask;
