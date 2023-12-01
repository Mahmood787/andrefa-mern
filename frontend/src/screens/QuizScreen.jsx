import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetQuizQuery } from "../slices/quizApiSlice";

const QuizScreen = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  const { data, error, isLoading } = useGetQuizQuery(userInfo._id);

   

  const handleAnswer = async (questionId, answer) => {
    setFormData((prev) => {
      return [...prev, { questionId: questionId, answer: answer }];
    });
 
    if (step <= 8 ) {
      setStep((prev) => prev + 1);
    } else {
      try {
       const res = await axios
          .post("http://localhost:4000/api/quiz", {
            userId: userInfo._id,
            usersName: "test",
            quizId: userInfo._id,
            myAnswers: [...formData, { questionId: questionId, answer: answer }],
          })
          
          navigate("/game/quiz/share/"+res.data.quiz.quizId);
      } catch (error) {
        console.log(error, "Quiz not created");
      }
    }
  };

   // if quiz already exist ---> taken to share quiz screen
   console.log(data, "DATA_")
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
            onClick={() => handleAnswer(initQuestions[step].questionId, d.name)}
            className="rounded-lg p-4 text-center shadow-lg bg-white min-w-[300px]"
          >
            <div className="text-[3rem]">{d.icon}</div>
            <div>{d.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizScreen;
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
