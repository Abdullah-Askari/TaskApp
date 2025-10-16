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
  View
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
      setSuccessMessage(
        'Password reset email sent! Check your inbox and follow the instructions to reset your password.'
      );
    } catch (error) {
      switch (error.code) {
        case 'auth/user-not-found':
          setError('No account found with this email address.');
          break;
        case 'auth/invalid-email':
          setError('Please enter a valid email address.');
          break;
        case 'auth/too-many-requests':
          setError('Too many password reset attempts. Please try again later.');
          break;
        default:
          setError(`Failed to send reset email: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <View className="m-4">
    <TouchableOpacity className="flex-row items-center space-x-2"
    onPress={()=>router.push('/(Auth)/LogIn')}>
    <Ionicons name="arrow-back" color="#000" size={24} />
    <Text className="text-black text-base">Back to login</Text>
    </TouchableOpacity>
    </View>
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
          paddingHorizontal: 24
        }}
      >
        <View className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm">
          <Text className="text-2xl font-bold mb-4 text-gray-800 text-center">
            Reset Password
          </Text>

          <Text className="text-gray-600 mb-6 text-sm text-center">
            Enter your email address and we'll send you a link to reset your password.
          </Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email address..."
            placeholderTextColor={"#D3D3D3"}
            keyboardType="email-address"
            autoCapitalize="none"
            className="border border-gray-900 w-full p-3 rounded-lg mb-4"
          />

          <TouchableOpacity
            onPress={handleSubmit}
            disabled={loading}
            className={`w-full p-3 rounded-lg ${
              loading ? 'bg-blue-300' : 'bg-blue-500'
            }`}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-center font-semibold text-base">
                Send Reset Email
              </Text>
            )}
          </TouchableOpacity>

          {successMessage ? (
            <View className="mt-4 p-3 bg-green-100 border border-green-300 rounded-md">
              <Text className="text-green-700 text-sm">{successMessage}</Text>
            </View>
          ) : null}

          {error ? (
            <View className="mt-4 p-3 bg-red-100 border border-red-300 rounded-md">
              <Text className="text-red-700 text-sm">{error}</Text>
              {error.includes('No account found') && (
                <TouchableOpacity
                  onPress={() => router.push('/signUp')}
                  className="mt-2"
                >
                  <Text className="text-blue-600 underline text-sm">
                    👉 Create a new account here
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : null}
        </View>
      </KeyboardAwareScrollView>
    </KeyboardAvoidingView>
    </>
  );
};

export default ForgotPassword;
