import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateQuizMutation, useGetQuizQuery } from "../slices/quizApiSlice";
import SelectionAudio from "../assets/sounds/selection.mp3";
import FullPageLoader from "../components/FullPageLoader";
import { initQuestions } from "../utils/utils";
const QuizCreationScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data, error, isLoading, isFetching } = useGetQuizQuery(userInfo._id);

  const [createQuiz, { isCreateLoading }] = useCreateQuizMutation();
  const [choiceIndex, setChoiceIndex] = useState(null);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState([]);
  const [tenQuestions, setTenQuestions] = useState(initQuestions.slice(0, 10));

  const navigate = useNavigate();

  const palyAudioSelection = () => {
    new Audio(SelectionAudio).play();
  };
  const handleAnswer = async (questionId, answer, index) => {
    palyAudioSelection();
    if (step <= 8) {
      setChoiceIndex(index);
      setFormData((prev) => {
        return [...prev, { questionId: questionId, answer: answer }];
      });
      setTimeout(() => {
        setStep((prev) => prev + 1);
        setChoiceIndex(null);
      }, 500);
    } else {
      try {
        setChoiceIndex(index);
        setFormData((prev) => {
          return [...prev, { questionId: questionId, answer: answer }];
        });
        const res = await createQuiz({
          userId: userInfo._id,
          usersName: "test",
          quizId: userInfo._id,
          myAnswers: [...formData, { questionId: questionId, answer: answer }],
        });

        navigate("/game/quiz/share/" + res.data.quiz.quizId);
      } catch (error) {
        console.log(error, "Quiz not created");
      }
    }
  };
  const [totalSkiped, setTotalSkipped] = useState(1);
  const handleSkip = () => {
    if (totalSkiped == 5) {
      setTotalSkipped(1);
    }
    // Update the state using setTenQuestions
    setTenQuestions((prevQuestions) => {
      // Make a copy of the previous state
      const newQuestions = [...prevQuestions];

      // Update the question at the current step
      newQuestions[step] = initQuestions[newQuestions.length - 1 + totalSkiped];

      // Log the updated questions

      // Return the updated state
      return newQuestions;
    });
    // Update the total skipped questions
    setTotalSkipped((prevTotalSkipped) => prevTotalSkipped + 1);
  };
  // if quiz already exist ---> taken to share quiz screen
  useEffect(() => {
    if (data) {
      navigate("/game/quiz/share/" + data._doc.quizId);
    }
  }, [data]);

  console.log(step, "STEP")
  return (
    <div className="mt-10">
      <div className="flex justify-between">
        {tenQuestions.map((d, i) => (
          <div
            key={i}
            className={`${
              i <= step ? "bg-green-500" : "bg-gray-500"
            } text-[1.1rem] text-center rounded-full w-7 h-7 text-white`}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <div className="text-center my-10">
        <h3 className="my-4">{tenQuestions[step] && tenQuestions[step].question}</h3>
        <button
          onClick={handleSkip}
          className="rounded-full px-10 py-1 text-[1rem] bg-gray-200"
        >
          Skip question
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {tenQuestions[step] && tenQuestions[step].data.map((d, i) => (
          <div
            key={i}
            onClick={() => {
              step <10 ?  handleAnswer(tenQuestions[step].questionId, d.name, i) : null
            }
             
            }
            className={`rounded-lg p-4 text-center shadow-lg ${
              choiceIndex === i ? "bg-green-400" : "bg-white"
            } min-w-[300px]`}
          >
            <div className="text-[3rem]">{d.icon}</div>
            <div>{d.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizCreationScreen;
