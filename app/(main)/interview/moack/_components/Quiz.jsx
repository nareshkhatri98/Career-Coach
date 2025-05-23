"use client";

import { generateQuiz, saveQuizResult } from "@/action/interview";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useFetch from "@/hooks/use-fetch";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { toast } from "sonner";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const {
    loading: generatingQuiz,
    fun: generateQuizFn,
    data: quizData,
  } = useFetch(generateQuiz);

  const {
    loading: savingResult,
    fun: saveQuizResultFn,
    data: resultData,
    setData: setResultData,
  } = useFetch(saveQuizResult);

  useEffect(() => {
    if (quizData) {
      setAnswers(new Array(quizData.length).fill(null));
    }
  }, [quizData]);

  const handleAnswer = (selectedAnswer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowExplanation(false);
    } else {
      finishQuiz();
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer === quizData[index].correctAnswer) {
        correct++;
      }
    });
    return (correct / quizData.length) * 100;
  };

  const finishQuiz = async () => {
    const score = calculateScore();
    try {
      await saveQuizResultFn({
        question: quizData,
        answers,
        score,
      });
      toast.success("Quiz Completed!");
    } catch (error) {
      toast.error("Error saving quiz result: " + error.message);
    }
  };

  if (generatingQuiz) {
    return <BarLoader className="mt-4" width={"100%"} color="gray" />;
  }

  if (!quizData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Ready to test your knowledge?</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            This quiz contains 10 questions specific to your industry and skills.
            Take your time and choose the best answer for each question.
          </p>
        </CardContent>
        <CardFooter>
          <Button className={"w-full"} onClick={generateQuizFn}>
            Start Quiz
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const question = quizData[currentQuestion];

  return (
    <Card className={"mx-2"}>
      <CardHeader>
        <CardTitle>
          Question {currentQuestion + 1} of {quizData.length}
        </CardTitle>
      </CardHeader>
      <CardContent className={"space-y-4"}>
        <p>{question.question}</p>
        <RadioGroup
          className={"space-y-2"}
          onValueChange={handleAnswer}
          value={answers[currentQuestion]}
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={`option-${index}`} />
              <Label htmlFor={`option-${index}`}>{option}</Label>
            </div>
          ))}
        </RadioGroup>

        {showExplanation && (
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="font-medium">Explanation:</p>
            <p className="text-muted-foreground">{question.explanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => setShowExplanation(true)}
          variant={"outline"}
          disabled={!answers[currentQuestion]}
        >
          Show Explanation
        </Button>
        <Button
          onClick={handleNext}
          disabled={!answers[currentQuestion] || savingResult}
          className={"ml-auto"}
        >
          {savingResult ? (
            <BarLoader className="mr-2" width={"100%"} color="gray" />
          ) : currentQuestion < quizData.length - 1 ? (
            "Next Question"
          ) : (
            "Finish Quiz"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Quiz;
