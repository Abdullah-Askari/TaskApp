import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../Hooks/useAuth'


const ForgetPassword = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [error, setError] = useState(null)
   const { resetPassword } = useAuth()

   const handleResetPassword = async () => {
        setError(null)
        try {
            await resetPassword(email)
            router.push('LogIn')
        } catch (err) {
            setError(err.message)
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
        Reset Password!
      </Text>
      <View
      className='w-4/5 space-y-4'>
        <TextInput
            placeholder=" Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            className='border rounded-lg p-2 mb-2 mt-2'
        />
        {error && (
            <Text
            className='bg-red-200'>{error}</Text>
        )}
        <TouchableOpacity 
        onPress={handleResetPassword}
        activeOpacity={0.7}
        className='mt-4 bg-blue-500 rounded-lg p-2'
        >
        <Text className='text-white text-center'>
            Reset Link
        </Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => router.push('LogIn')}
        activeOpacity={0.7}
        className='mt-4'
        >
        <Text className='text-blue-500 text-right p-2'>
            Already have an account? Log In
        </Text>
        </TouchableOpacity>
      </View>
    </View>
    </>
  )
}

export default ForgetPassword