import { useRouter } from 'expo-router'
import { replace } from 'expo-router/build/global-state/routing'
import { useState } from 'react'
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../Hooks/useAuth'

const LogIn = () => {
    const { login } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async () => {
        setLoading(true)
        setError(null)
        try {
            await login(email, password)
            router,replace('/(root)/HomeScreen')
        } catch (error) {
     switch (error.code) {
            case 'auth/user-not-found':
                Alert.alert('No account found with this email. Please sign up first.')
                break
            case 'auth/wrong-password':
                Alert.alert('Incorrect password. Please try again.')
                break
            case 'auth/invalid-email':
                Alert.alert('The email address is Invalid Please check and try again.')
                break
            case 'auth/invalid-credential':
              Alert.alert('The provided credential is malformed or has expired. Please try again.')
                break
            case 'auth/user-disabled':
            Alert.alert('This user account has been disabled. Please contact support for assistance.')
                break
            case 'auth/too-many-requests':
                Alert.alert('Too many unsuccessful login attempts. Please try again later or reset your password.')
                break
            default:
                Alert.alert(`Failed to log in: ${error.message}`)
        }
    }
    finally {
        setLoading(false)
    }
    }
  return (
    <View
    className='flex items-center justify-center'>
      <Text
      className='text-lg'>
        Welcome Back!
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
        <TextInput
            placeholder=" Password"
            value={password}
            className='border rounded-lg p-2 '
            onChangeText={setPassword}
            secureTextEntry
        />
        {error && (
            <Text
            className='bg-red-200'>{error}</Text>
        )}
        <TouchableOpacity 
        onPress={() => router.push('ForgetPassword')}
        activeOpacity={0.7}
        className='mt-4'
        >
        <Text className='text-blue-500 text-right p-2'>
            Forget Password?
        </Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={handleLogin}
        disabled={loading}
        activeOpacity={0.7}
        className='bg-blue-500 p-2 rounded-lg mt-4'
        >
        <Text className='text-white text-center'>
            {loading ? 'Logging in...' : 'Log In'}
        </Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress={() => router.push('SignUp')}
        activeOpacity={0.7}
        className='mt-4'
        >
        <Text className='text-blue-500 text-center p-2'>
            Don't have an account? Sign Up
        </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LogIn