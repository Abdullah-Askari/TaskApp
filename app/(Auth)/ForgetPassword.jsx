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

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    try {
      setError('');
      setSuccessMessage('');
      setLoading(true);
      await resetPassword(email);
      setSuccessMessage('Password reset email sent! Check your inbox.');
    } catch (err) {
      let message = 'Failed to send reset email. Please try again.';
      if (err.code === 'auth/user-not-found') message = 'No account found with this email address.';
      else if (err.code === 'auth/invalid-email') message = 'Please enter a valid email address.';
      else if (err.code === 'auth/too-many-requests') message = 'Too many attempts. Please try again later.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#F3F4F6' }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        extraScrollHeight={80}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 }}
      >
        <View className="flex-row items-center w-full mb-6">
          <TouchableOpacity onPress={() => router.back()} className="p-2 rounded-full bg-gray-100 shadow-sm">
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold text-gray-800 ml-4">Forgot Password</Text>
        </View>

        <View className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm">
          <Text className="text-2xl font-bold mb-4 text-gray-800 text-center">Reset Password</Text>
          <Text className="text-gray-600 mb-6 text-sm text-center">
            Enter your email address and we'll send you a link to reset your password.
          </Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email address..."
            placeholderTextColor="#A3A3A3"
            keyboardType="email-address"
            autoCapitalize="none"
            className="border w-full p-3 rounded-xl mb-4 text-gray-900"
          />

          <TouchableOpacity onPress={handleSubmit} disabled={loading} className={`w-full p-4 rounded-xl ${loading ? 'bg-blue-400' : 'bg-blue-600'} shadow-md`}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white text-center font-medium text-base">Send Reset Email</Text>}
          </TouchableOpacity>

          {successMessage && (
            <View className="mt-4 p-3 bg-green-100 border border-green-300 rounded-xl">
              <Text className="text-green-700 text-sm text-center">{successMessage}</Text>
            </View>
          )}

          {error && (
            <View className="mt-4 p-3 bg-red-100 border border-red-300 rounded-xl">
              <Text className="text-red-700 text-sm text-center">{error}</Text>
              {error.includes('No account found') && (
                <TouchableOpacity onPress={() => router.push('/(Auth)/SignUp')} className="mt-2">
                  <Text className="text-blue-600 underline text-sm text-center">👉 Create a new account here</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
