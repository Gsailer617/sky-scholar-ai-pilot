
import React from 'react';
import QuizInterface from '@/components/quiz/QuizInterface';

const Quiz = () => {
  return (
    <div className="container py-6 px-4">
      <h1 className="text-2xl font-bold mb-6 text-foreground">Practice Quiz</h1>
      <div className="glass-card rounded-lg shadow-card overflow-hidden">
        <QuizInterface />
      </div>
    </div>
  );
};

export default Quiz;
