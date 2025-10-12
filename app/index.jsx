import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
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
    <View>
      <LogIn />
    </View>
  );
}
