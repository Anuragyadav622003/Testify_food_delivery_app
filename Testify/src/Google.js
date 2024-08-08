import * as Google from 'expo-auth-session/providers/google';
import { AuthSession } from 'expo-auth-session';

// OAuth configuration for Google Sign-In
const config = {
  clientId: '211425825953-0vrbctb88705vodft0upvk6eodt4s8h7.apps.googleusercontent.com',
  redirectUri: 'https://auth.expo.io/@anuragyada/expo_ap',
};

// Function to handle Google Sign-In
const handleSignIn = async () => {
  try {
    const { type, params } = await AuthSession.startAsync({
      authUrl: `${config.authUrl}?client_id=${config.clientId}&redirect_uri=${encodeURIComponent(config.redirectUri)}&response_type=code&scope=openid%20profile%20email`,
    });

    if (type === 'success') {
      // Handle successful authentication
      console.log('Authentication successful:', params);
    } else if (type === 'error') {
      // Handle errors
      console.error('Authentication error:', params.error_message || 'Unknown error');
    }
  } catch (error) {
    console.error('Authentication error:', error.message);
  }
};
