import { FontAwesome } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../Hooks/useAuth'

const SignOut = () => {
    const router = useRouter()
    const { logout } = useAuth()

    const handleSignOut = () => {
      Alert.alert(
        "Sign Out",
        "Are you sure you want to sign out?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Sign Out",
            onPress: async () => {
               await logout()
              router.replace('/(Auth)/LogIn')
            },
            style: "destructive"
          }
        ]
      )
    }

    return (
      <View>
        <TouchableOpacity
          onPress={handleSignOut}
          className="flex-row items-center justify-end p-4 space-x-2">
          <Text className="text-red-500 font-medium">Sign Out  </Text>
          <FontAwesome name="sign-out" size={10} color="#EF4444" />
        </TouchableOpacity>
      </View>
    )
}

export default SignOut