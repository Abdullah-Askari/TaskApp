import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { updateProfile } from 'firebase/auth';
import { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../Hooks/useAuth';

const SignUp = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signup } = useAuth();

  const handleSubmit = async () => {
    try {
      setError('');
      setLoading(true);
      const userCredential = await signup(email, password, displayName);
      await updateProfile(userCredential.user, { displayName });
      router.push('/(root)/HomeScreen');
    } catch (err) {
      setError(`Failed to create account: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={80}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 24,
        }}
      >

        <View className="flex-row items-center w-full mb-6">
          <TouchableOpacity
            onPress={() => router.back()}
            className="p-2 rounded-full bg-gray-200"
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-800 ml-4">Sign Up</Text>
        </View>


        <View className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm">
          <Text className="text-2xl font-bold mb-6 text-gray-800 text-center">
            Create Account
          </Text>

          <TextInput
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Enter display name..."
            placeholderTextColor="#A3A3A3"
            className="border w-full p-3 rounded-md mb-4 text-base text-gray-900"
            autoCapitalize="words"
            autoFocus
          />


          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email..."
            placeholderTextColor="#A3A3A3"
            className="border w-full p-3 rounded-md mb-4 text-base text-gray-900"
            autoCapitalize="none"
            keyboardType="email-address"
          />


          <View className="relative mb-4">
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter password..."
              placeholderTextColor="#707070"
              className="border w-full p-3 rounded-md text-base pr-12 text-gray-900"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <Icon
                name={showPassword ? 'eye-off' : 'eye'}
                size={18}
                color="#6b7280"
              />
            </TouchableOpacity>
          </View>


          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            className={`w-full p-3 rounded-lg ${
              loading ? 'bg-blue-400' : 'bg-blue-600'
            }`}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white text-center font-medium text-base">
                Sign Up
              </Text>
            )}
          </TouchableOpacity>


          {error && (
            <View className="mt-4 p-3 bg-red-100 border border-red-300 rounded-md">
              <Text className="text-red-700 text-sm">{error}</Text>
            </View>
          )}

          <View className="mt-6 flex-row justify-center">
            <Text className="text-gray-600 text-sm">
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => router.push('/(Auth)/LogIn')}>
              <Text className="text-blue-600 font-medium text-sm ml-1 underline">
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
