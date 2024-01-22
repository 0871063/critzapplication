import React from 'react';
import { View, Text, Button } from 'react-native';

const LoginScreen = ({ route, navigation }) => {

  const handleNavigateHome = () => {
    // Save the score to MongoDB (implement MongoDB integration here)

    // Navigate back to the Quiz screen to start a new quiz
    navigation.navigate('Home');
  };

  return (
    <View>
      <Button title="Login" onPress={handleNavigateHome} />
    </View>
  );
};

export default LoginScreen;