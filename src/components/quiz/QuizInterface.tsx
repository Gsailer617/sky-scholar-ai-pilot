
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const SAMPLE_QUESTIONS: QuizQuestion[] = [
  {
    id: '1',
    question: 'Which of the following is NOT one of the four forces acting on an airplane in flight?',
    options: ['Lift', 'Weight', 'Thrust', 'Drag', 'Torque'],
    correctAnswer: 4,
    explanation: 'The four forces acting on an airplane in flight are Lift, Weight, Thrust, and Drag. Torque is a rotational force but not one of the four main forces of flight.'
  },
  {
    id: '2',
    question: 'What does the acronym "ARROW" stand for regarding required aircraft documents?',
    options: [
      'Airworthiness certificate, Registration, Radio license, Operating handbook, Weight and balance data',
      'Airworthiness certificate, Registration certificate, Radio station license, Operating limitations, Weight and balance data',
      'Airworthiness directive, Registration, Radio certificate, Owner\'s manual, Weight data',
      'Aircraft logbook, Radio license, Registration, Operating handbook, Weight and balance'
    ],
    correctAnswer: 1,
    explanation: 'ARROW stands for Airworthiness certificate, Registration certificate, Radio station license (if required for the operation), Operating limitations, and Weight and balance data.'
  },
  {
    id: '3',
    question: 'What is the purpose of the magneto check during the engine runup?',
    options: [
      'To ensure the engine can run on each magneto independently',
      'To check that the alternator is functioning properly',
      'To verify the fuel mixture is correct',
      'To test if the engine produces enough power'
    ],
    correctAnswer: 0,
    explanation: 'During the magneto check in the runup procedure, the pilot verifies that each magneto is functioning properly by checking that the engine can run on each magneto independently. This ensures ignition system redundancy.'
  },
  {
    id: '4',
    question: 'What color indicates taxiways on airport markings?',
    options: ['Red', 'Blue', 'Yellow', 'Green'],
    correctAnswer: 1,
    explanation: 'On airport markings, blue lights and signage indicate taxiways, while yellow markings indicate runways.'
  },
  {
    id: '5',
    question: 'Which of these conditions is most favorable for carburetor ice formation?',
    options: [
      'Low humidity and high temperature',
      'High humidity and temperatures between 50°F and 70°F',
      'High humidity and temperatures above 100°F',
      'Low humidity and temperatures below 32°F'
    ],
    correctAnswer: 1,
    explanation: 'Carburetor ice forms most readily in conditions of high humidity and temperatures between 50°F and 70°F (10°C to 21°C). The temperature drop in the carburetor venturi can cause moisture in the air to freeze on the throttle valve and interior walls.'
  }
];

const QuizInterface = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<{ [questionId: string]: number }>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const { toast } = useToast();

  const currentQuestion = SAMPLE_QUESTIONS[currentQuestionIndex];
  
  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };
  
  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      // Save answer
      setAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: selectedOption
      }));
      
      // Move to next question or submit quiz
      if (currentQuestionIndex < SAMPLE_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
        setShowExplanation(false);
      } else {
        submitQuiz();
      }
    } else {
      toast({
        variant: "destructive",
        title: "No answer selected",
        description: "Please select an answer before proceeding.",
      });
    }
  };
  
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedOption(answers[SAMPLE_QUESTIONS[currentQuestionIndex - 1].id] ?? null);
      setShowExplanation(false);
    }
  };
  
  const submitQuiz = () => {
    setQuizSubmitted(true);
    
    // Calculate score
    const correctAnswers = SAMPLE_QUESTIONS.filter(q => 
      answers[q.id] === q.correctAnswer
    ).length;
    
    const percentage = Math.round((correctAnswers / SAMPLE_QUESTIONS.length) * 100);
    
    toast({
      title: "Quiz submitted!",
      description: `Your score: ${correctAnswers}/${SAMPLE_QUESTIONS.length} (${percentage}%)`,
    });
  };
  
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setAnswers({});
    setQuizSubmitted(false);
    setShowExplanation(false);
  };

  const calculateScore = () => {
    const correctAnswers = SAMPLE_QUESTIONS.filter(q => answers[q.id] === q.correctAnswer).length;
    return {
      correct: correctAnswers,
      total: SAMPLE_QUESTIONS.length,
      percentage: Math.round((correctAnswers / SAMPLE_QUESTIONS.length) * 100)
    };
  };
  
  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };
  
  return (
    <div className="container max-w-2xl">
      {!quizSubmitted ? (
        <Card>
          <CardHeader className="space-y-3">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg sm:text-xl">Practice Quiz: Aviation Fundamentals</CardTitle>
              <span className="text-sm font-medium">
                Question {currentQuestionIndex + 1}/{SAMPLE_QUESTIONS.length}
              </span>
            </div>
            <Progress value={(currentQuestionIndex / (SAMPLE_QUESTIONS.length - 1)) * 100} className="h-2" />
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">{currentQuestion.question}</h3>
              
              <RadioGroup value={selectedOption?.toString()} className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-2 bg-white border rounded-md p-3 hover:bg-slate-50 cursor-pointer"
                    onClick={() => handleOptionSelect(index)}
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            
            <Button onClick={handleNextQuestion}>
              {currentQuestionIndex === SAMPLE_QUESTIONS.length - 1 ? 'Submit Quiz' : 'Next Question'}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Quiz Results</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-2">{calculateScore().percentage}%</h2>
              <p className="text-muted-foreground">
                You got {calculateScore().correct} out of {calculateScore().total} questions correct.
              </p>
            </div>
            
            <div className="space-y-6">
              {SAMPLE_QUESTIONS.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-4">
                  <h3 className="font-medium mb-2">
                    <span className="mr-2">{index + 1}.</span>
                    {question.question}
                  </h3>
                  
                  <div className="ml-6 space-y-2 mt-3">
                    {question.options.map((option, optIndex) => (
                      <div 
                        key={optIndex} 
                        className={`p-2 rounded-md ${
                          answers[question.id] === optIndex && question.correctAnswer === optIndex
                            ? 'bg-green-50 border border-green-200'
                            : answers[question.id] === optIndex
                            ? 'bg-red-50 border border-red-200'
                            : question.correctAnswer === optIndex
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-white'
                        }`}
                      >
                        {option}
                        {answers[question.id] === optIndex && question.correctAnswer === optIndex && (
                          <span className="text-green-600 ml-2">✓</span>
                        )}
                        {answers[question.id] === optIndex && question.correctAnswer !== optIndex && (
                          <span className="text-red-600 ml-2">✗</span>
                        )}
                        {answers[question.id] !== optIndex && question.correctAnswer === optIndex && (
                          <span className="text-green-600 ml-2">✓</span>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-3">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setShowExplanation(prev => 
                          prev === question.id ? false : question.id
                        );
                      }}
                      className="text-sky-600 hover:text-sky-800 p-0 h-auto"
                    >
                      {showExplanation === question.id ? 'Hide Explanation' : 'Show Explanation'}
                    </Button>
                    
                    {showExplanation === question.id && (
                      <div className="mt-2 p-3 bg-muted rounded-md text-sm">
                        {question.explanation}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-center">
            <Button onClick={restartQuiz}>Restart Quiz</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default QuizInterface;
