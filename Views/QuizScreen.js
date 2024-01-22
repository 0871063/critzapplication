// screens/QuizScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, Button, RadioGroup, RadioButton } from 'react-native';
import axios from 'axios';

const QuizScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        'https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple'
      );
      setQuestions(response.data.results);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleNextQuestion = () => {
    // Check if the selected answer is correct
    if (selectedAnswer === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }

    // Move to the next question or finish the quiz
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      // Navigate to the Result screen
      navigation.navigate('Result', { score });
    }
  };

  return (
    <View>
      <Text>Question {currentQuestionIndex + 1}</Text>
      <Text>{questions[currentQuestionIndex]?.question}</Text>

      <RadioGroup
        style={{ flexDirection: 'column' }}
        selectedIndex={selectedAnswer}
        onValueChange={(value) => setSelectedAnswer(value)}
      >
        {questions[currentQuestionIndex]?.incorrect_answers.map((answer, index) => (
          <RadioButton key={index} value={answer}>
            <Text>{answer}</Text>
          </RadioButton>
        ))}
      </RadioGroup>

      <Button title="Next Question" onPress={handleNextQuestion} />
    </View>
  );
};

export default QuizScreen;
