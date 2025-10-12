import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { addTask } from '../../fireStore'


const AddTask = () => {
    const router = useRouter()
    const [title,setTitle] = useState('')
    const [details,setDetails] = useState('')

    const handleAddTask = async () => {
        try {
            if (title.trim() === '') {
                Alert.alert('Error', 'Title is required');
                return;
            }

            const taskData = {
                title: title.trim(),
                details: details.trim() || null,
                createdAt: new Date().toISOString()
            };

            const result = await addTask(taskData);
            
            if (result.success) {
                Alert.alert(
                    'Success',
                    'Task created successfully!',
                    [
                        {
                            text: 'OK',
                            onPress: () => {
                                setTitle('');
                                setDetails('');
                                router.back();
                            }
                        }
                    ]
                );
            } else {
                Alert.alert('Error', result.error || 'Failed to add task');
            }
        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again.');
            console.error('Add task error:', error);
        }
    }
  return (
  <>
  <Ionicons
  name='arrow-back'
    size={20}
    className='m-4'
    onPress={()=>router.back()}
    color={"#000"}
    />
    <View
    className='flex items-center justify-center'>
        <Text
        className='text-lg'>
            Add Task
        </Text>
    </View> 
    <View>
        <TextInput
        placeholder='Enter Task Title'
        className='border rounded-lg p-2 m-4'
        value={title}
        onChangeText={setTitle}
        />
        <TextInput
        placeholder='Enter Task Details'
        className='border rounded-lg p-2 m-4'
        value={details}
        onChangeText={setDetails}
        multiline
        textAlignVertical="top"
        style={{ height: 120, textAlignVertical: 'top' }}
        />
        <TouchableOpacity 
        onPress={handleAddTask}
        activeOpacity={0.7}
        className='bg-blue-500 p-3 rounded-lg mx-4 mb-4'
        >
            <Text className='text-white text-center text-lg font-medium'>
                Add Task
            </Text>
        </TouchableOpacity>
    </View>
  </>
  )
}

export default AddTask