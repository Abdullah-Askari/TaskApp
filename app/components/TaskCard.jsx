import { useState } from 'react';
import { Text, View } from 'react-native';

const TaskCard = () => {
    const [card, setCard] = useState([]);
  return (
    <View
    className='m-4 p-4 border rounded-lg shadow-lg bg-white'>
    <View
    className='w-4/5 space-y-2'>
    <Text
    className='text-2xl font-semibold'>Total:</Text>
    <Text
    className='text-lg'>{card.length}</Text>
    </View>
    </View>
  )
}

export default TaskCard