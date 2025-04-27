
import React from 'react';
import QuizInterface from '@/components/quiz/QuizInterface';

const Quiz = () => {
  return (
    <div className="container py-6 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Practice Quiz</h1>
      <QuizInterface />
    </div>
  );
};

export default Quiz;
