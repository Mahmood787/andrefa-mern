import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateQuizMutation, useGetQuizQuery } from "../slices/quizApiSlice";
import SelectionAudio from "../assets/sounds/selection.mp3";
import FullPageLoader from "../components/FullPageLoader";
const QuizCreationScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data, error, isLoading, isFetching } = useGetQuizQuery(userInfo._id);

  const [createQuiz, { isCreateLoading }] = useCreateQuizMutation();
  const [choiceIndex, setChoiceIndex] =useState(null)
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();


   
  const palyAudioSelection = () => {
    new Audio(SelectionAudio).play();
  };
  const handleAnswer = async (questionId, answer, index) => {
    
 
    palyAudioSelection()
    if (step <= 8 ) {
      setChoiceIndex(index)
    setFormData((prev) => {
      return [...prev, { questionId: questionId, answer: answer }];
    });
      setTimeout(() => {
      setStep((prev) => prev + 1);
      setChoiceIndex(null)
    }, 500);
    } else {
      try {
        setChoiceIndex(index)
    setFormData((prev) => {
      return [...prev, { questionId: questionId, answer: answer }];
    });
       const res = await createQuiz({
        userId: userInfo._id,
        usersName: "test",
        quizId: userInfo._id,
        myAnswers: [...formData, { questionId: questionId, answer: answer }],
       })
       
      //  axios
      //     .post("http://localhost:4000/api/quiz", {
      //       userId: userInfo._id,
      //       usersName: "test",
      //       quizId: userInfo._id,
      //       myAnswers: [...formData, { questionId: questionId, answer: answer }],
      //     })
          
          navigate("/game/quiz/share/"+res.data.quiz.quizId);
      } catch (error) {
        console.log(error, "Quiz not created");
      }
    }
  };

   // if quiz already exist ---> taken to share quiz screen

 useEffect(() => {
  if (data) {
    navigate("/game/quiz/share/"+data._doc.quizId);
  }
 },[data])

  return (
    <div className="mt-10">
      <div className="flex justify-between">
        {initQuestions.map((d, i) => (
          <div
            key={i}
            className={`${
              (i <= step) ? "bg-green-500" : "bg-gray-500"
            } text-[1.1rem] text-center rounded-full w-7 h-7 text-white`}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <div className="text-center my-10">
        <h3 className="my-4">{initQuestions[step].question}</h3>
        <button className="rounded-full px-10 py-1 text-[1rem] bg-gray-200">
          Skip question
        </button>
      </div>
      <div className="flex flex-wrap justify-start gap-4">
        {initQuestions[step].data.map((d, i) => (
          <div
            key={i}
            onClick={() => handleAnswer(initQuestions[step].questionId, d.name, i)}
            className={`rounded-lg p-4 text-center shadow-lg ${choiceIndex === i ? "bg-green-400":"bg-white"} min-w-[300px]`}
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
const initQuestions = [
  {
    questionId: 101,
    question: "How do you like to indulge?",
    data: [
      {
        name: "Snacks",
        icon: "🍫",
      },
      {
        name: "Drinking alcohol",
        icon: "🍻",
      },
      {
        name: "Shopping",
        icon: "🛍",
      },
      {
        name: "Relaxing in a spa",
        icon: "🧖",
      },
      {
        name: "Video games",
        icon: "🎮",
      },
      {
        name: "Taking a nap",
        icon: "💤",
      },
    ],
  },
  {
    questionId: 102,
    question:
      "If you could live in any time period, which one would you choose?",
    data: [
      {
        name: "Ancient Greece",
        icon: "🇬🇷",
      },
      {
        name: "Drinking alcohol",
        icon: "🍻",
      },
      {
        name: "Shopping",
        icon: "🛍",
      },
      {
        name: "Relaxing in a spa",
        icon: "🧖",
      },
      {
        name: "Video games",
        icon: "🎮",
      },
      {
        name: "Taking a nap",
        icon: "💤",
      },
    ],
  },
  {
    questionId: 103,
    question: "How do you like to indulge?",
    data: [
      {
        name: "Snacks",
        icon: "🍫",
      },
      {
        name: "Drinking alcohol",
        icon: "🍻",
      },
      {
        name: "Shopping",
        icon: "🛍",
      },
      {
        name: "Relaxing in a spa",
        icon: "🧖",
      },
      {
        name: "Video games",
        icon: "🎮",
      },
      {
        name: "Taking a nap",
        icon: "💤",
      },
    ],
  },
  {
    questionId: 104,
    question: "How do you like to indulge?",
    data: [
      {
        name: "Snacks",
        icon: "🍫",
      },
      {
        name: "Drinking alcohol",
        icon: "🍻",
      },
      {
        name: "Shopping",
        icon: "🛍",
      },
      {
        name: "Relaxing in a spa",
        icon: "🧖",
      },
      {
        name: "Video games",
        icon: "🎮",
      },
      {
        name: "Taking a nap",
        icon: "💤",
      },
    ],
  },
  {
    questionId: 105,
    question: "How do you like to indulge?",
    data: [
      {
        name: "Snacks",
        icon: "🍫",
      },
      {
        name: "Drinking alcohol",
        icon: "🍻",
      },
      {
        name: "Shopping",
        icon: "🛍",
      },
      {
        name: "Relaxing in a spa",
        icon: "🧖",
      },
      {
        name: "Video games",
        icon: "🎮",
      },
      {
        name: "Taking a nap",
        icon: "💤",
      },
    ],
  },
  {
    questionId: 106,
    question: "How do you like to indulge?",
    data: [
      {
        name: "Snacks",
        icon: "🍫",
      },
      {
        name: "Drinking alcohol",
        icon: "🍻",
      },
      {
        name: "Shopping",
        icon: "🛍",
      },
      {
        name: "Relaxing in a spa",
        icon: "🧖",
      },
      {
        name: "Video games",
        icon: "🎮",
      },
      {
        name: "Taking a nap",
        icon: "💤",
      },
    ],
  },
  {
    questionId: 107,
    question: "How do you like to indulge?",
    data: [
      {
        name: "Snacks",
        icon: "🍫",
      },
      {
        name: "Drinking alcohol",
        icon: "🍻",
      },
      {
        name: "Shopping",
        icon: "🛍",
      },
      {
        name: "Relaxing in a spa",
        icon: "🧖",
      },
      {
        name: "Video games",
        icon: "🎮",
      },
      {
        name: "Taking a nap",
        icon: "💤",
      },
    ],
  },
  {
    questionId: 108,
    question: "How do you like to indulge?",
    data: [
      {
        name: "Snacks",
        icon: "🍫",
      },
      {
        name: "Drinking alcohol",
        icon: "🍻",
      },
      {
        name: "Shopping",
        icon: "🛍",
      },
      {
        name: "Relaxing in a spa",
        icon: "🧖",
      },
      {
        name: "Video games",
        icon: "🎮",
      },
      {
        name: "Taking a nap",
        icon: "💤",
      },
    ],
  },
  {
    questionId: 109,
    question: "How do you like to indulge?",
    data: [
      {
        name: "Snacks",
        icon: "🍫",
      },
      {
        name: "Drinking alcohol",
        icon: "🍻",
      },
      {
        name: "Shopping",
        icon: "🛍",
      },
      {
        name: "Relaxing in a spa",
        icon: "🧖",
      },
      {
        name: "Video games",
        icon: "🎮",
      },
      {
        name: "Taking a nap",
        icon: "💤",
      },
    ],
  },
  {
    questionId: 110,
    question: "last question?",
    data: [
      {
        name: "Snacks",
        icon: "🍫",
      },
      {
        name: "Drinking alcohol",
        icon: "🍻",
      },
      {
        name: "Shopping",
        icon: "🛍",
      },
      {
        name: "Relaxing in a spa",
        icon: "🧖",
      },
      {
        name: "Video games",
        icon: "🎮",
      },
      {
        name: "Taking a nap",
        icon: "💤",
      },
    ],
  },
];
