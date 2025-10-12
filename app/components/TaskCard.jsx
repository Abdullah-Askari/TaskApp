import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const TaskCard = () => {
    const [card, setCard] = useState([]);
    const router = useRouter();
  return (
    <View
    className='m-4 p-4 border rounded-lg shadow-lg bg-white'>
    <View className='flex-row items-center justify-between'>
        <View className='space-y-2'>
            <Text className='text-2xl font-semibold'>Total:</Text>
            <Text className='text-lg'>{card.length}</Text>
        </View>
                <TouchableOpacity
            className='bg-blue-500 rounded-full w-12 h-12 items-center justify-center'
            activeOpacity={0.7}
            onPress={() => router.push('/add')}
        >
            <Ionicons
                name='add'
                size={30}
                color="white"
            />
        </TouchableOpacity>
    </View>
    </View>
  )
}

export default TaskCard