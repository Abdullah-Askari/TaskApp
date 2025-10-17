import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../Hooks/useAuth';

const LogIn = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      router.replace('/(root)/HomeScreen');
    } catch (err) {
      let message = 'Failed to login. Please try again.';
      if (err.code === 'auth/user-not-found') message = 'No account found with this email.';
      else if (err.code === 'auth/invalid-email') message = 'The email address is not valid.';
      else if (err.code === 'auth/wrong-password') message = 'Incorrect password. Please try again.';
      else if (err.code === 'auth/network-request-failed') message = 'Network error. Check your internet connection.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#F3F4F6' }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        extraScrollHeight={80}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 }}
      >
        <View className="bg-white p-8 rounded-3xl shadow-lg w-full max-w-sm">
          <Text className="text-3xl font-bold mb-6 text-gray-800 text-center">Welcome Back!</Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email..."
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
            className="border  w-full p-4 rounded-xl mb-4 text-gray-900 focus:border-blue-500"
          />

          <View className="relative mb-4">
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password..."
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
              className="border w-full p-4 pr-12 rounded-xl text-gray-900 focus:border-blue-500"
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="absolute right-4 top-4">
              <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => router.push('/(Auth)/ForgetPassword')} className="mb-6 self-end">
            <Text className="text-blue-600 text-sm font-medium">Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            className={`w-full p-4 rounded-xl ${loading ? 'bg-blue-300' : 'bg-blue-600'} shadow-md`}
          >
            {loading ? <ActivityIndicator color="white" /> : <Text className="text-white text-center font-semibold text-lg">Log In</Text>}
          </TouchableOpacity>

          {error && (
            <View className="mt-4 p-3 bg-red-100 border border-red-300 rounded-xl">
              <Text className="text-red-700 text-sm text-center">{error}</Text>
            </View>
          )}

          <View className="mt-6 items-center">
            <Text className="text-gray-600 text-sm">
              Don’t have an account?{' '}
              <Text className="text-blue-600 font-medium underline" onPress={() => router.push('/(Auth)/SignUp')}>
                Sign Up
              </Text>
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};

export default LogIn;
