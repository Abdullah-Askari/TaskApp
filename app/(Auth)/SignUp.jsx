import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../Hooks/useAuth'

const SignUp = () => {
    const { signup } = useAuth()
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSignUp = async () => {
        setLoading(true)
        setError(null)
        try {
            await signup(email, password, displayName)
            router.push('/')
        } catch (err) {
            setError(err.message)
            setLoading(false)
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
            Create Account
        </Text>
        <View
        className='w-4/5 space-y-4'>
            <TextInput
            placeholder=" Name"
            value={displayName}
            onChangeText={setDisplayName}
            className='border rounded-lg p-2 mb-2 mt-2'
            />
            <TextInput
            placeholder=" Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            className='border rounded-lg p-2 mb-2 '
            />
            <TextInput
            placeholder=" Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className='border rounded-lg p-2 '
            />
            {error && (
                <Text
                className='bg-red-200'>{error}</Text>
            )}
        <TouchableOpacity 
        onPress={handleSignUp}
        activeOpacity={0.7}
        className='mt-4 bg-blue-500 rounded-lg p-2'
        >
        <Text className='text-white text-center'>
            {loading ? 'Signing up...' : 'Sign Up'}
        </Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => router.push('LogIn')}
        activeOpacity={0.7}
        className='mt-4'
        >
        <Text className='text-blue-500 text-center p-2'>
            Already have an account? Log In
        </Text>
        </TouchableOpacity>
      </View>
    </View>
    </>
  )
}

export default SignUp