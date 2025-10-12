import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { TouchableOpacity, View } from "react-native";
import LogIn from "./(Auth)/LogIn";
import { useAuth } from "./Hooks/useAuth";


export default function Index() {
  const router = useRouter();
  const { currentUser , loading} = useAuth();

  useEffect(()=>{
    if(loading) return;
    if(currentUser){
      router.replace('/HomeScreen')
    }else{
      router.replace('/(Auth)/LogIn')
    }
  },[ currentUser,loading])

  if(loading) return null;
  if (currentUser) return null;

  return (
    <>
    <View>
      <TouchableOpacity>
        <Ionicons
        name='add'
        size={20}
        className='m-4'
        onPress={()=>router.push('/(root)/AddTask')}
        color="blue"
        />
        <Text>Add</Text>
      </TouchableOpacity>
      <LogIn />
    </View>
    </>
  );
}
