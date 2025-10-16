import { Ionicons } from '@expo/vector-icons';
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
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      router.replace('/(root)/HomeScreen');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        enableOnAndroid
        extraScrollHeight={80}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 24,
        }}
      >

        <View className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm">
          <Text className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Welcome Back!
          </Text>


          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email..."
            placeholderTextColor="#A3A3A3"
            keyboardType="email-address"
            autoCapitalize="none"
            className="border border-gray-300 w-full p-3 rounded-lg mb-4 text-gray-900"
          />


          <View className="relative mb-4">
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password..."
              placeholderTextColor="#A3A3A3"
              secureTextEntry={!showPassword}
              className="border border-gray-300 w-full p-3 pr-10 rounded-lg text-gray-900"
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={22}
                color="#555"
              />
            </TouchableOpacity>
          </View>


          <TouchableOpacity
            onPress={() => router.push('/(Auth)/ForgetPassword')}
            className="mb-4 self-end"
          >
            <Text className="text-blue-600 text-sm">Forgot password?</Text>
          </TouchableOpacity>


          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            className={`w-full p-3 rounded-lg ${
              loading ? 'bg-blue-300' : 'bg-blue-600'
            }`}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-center font-semibold text-base">
                Log In
              </Text>
            )}
          </TouchableOpacity>

          {error && (
            <View className="mt-4 p-3 bg-red-100 border border-red-300 rounded-md">
              <Text className="text-red-700 text-sm">{error}</Text>
            </View>
          )}

          <View className="mt-6 items-center">
            <Text className="text-gray-600 text-sm">
              Don’t have an account?{' '}
              <Text
                className="text-blue-600 font-medium underline"
                onPress={() => router.push('/(Auth)/SignUp')}
              >
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
