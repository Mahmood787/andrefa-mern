import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateQuizMutation } from "../slices/quizApiSlice";
import WrongAudio from "../assets/sounds/wronganswer.mp3";
import RightAudio from "../assets/sounds/correctanswer.mp3";
import { v4 as uuid } from "uuid";
import FullPageLoader from "../components/FullPageLoader";
import { initQuestions } from "../utils/utils";
import useGetQuiz from "./hooks/quiz";
const FriendsAnsScreen = React.memo(() => {
  const [updateQuiz, { isUpdating }] = useUpdateQuizMutation();
  const navigate = useNavigate();
  const unique_id = uuid();
  const friendsId = unique_id.slice(0, 8);
  const [step, setStep] = useState(0);
  const [nameError, setNameError] = useState(false);
  const [friendName, setFriendName] = useState("");
  const [formData, setFormData] = useState([]);
  const [correctChoice, setCorrectChoice] = useState(null);
  const [wrongChoiceIndex, setWrongChoiceIndex] = useState(null);
  const [pageState, setPageState] = useState("get_name");
  const [btnDisabled, setBtnDisabled] = useState(false)
console.log(btnDisabled, "btn disabled")
  const { quizId } = useParams();
  const { data, loading, error, refetch } = useGetQuiz(import.meta.env.VITE_BACKEND_URL+"/api/quiz/",{userId:quizId});

  const palyAudioWrong = () => {
    new Audio(WrongAudio).play();
  };
  const palyAudioRight = () => {
    new Audio(RightAudio).play();
  };
  // Answers question Ids
  const questionIds =
    data && data._doc.myAnswers.map((item) => item.questionId);

  // data based on my answers question ids
  const newQuestionData =
    data &&
    initQuestions.filter((item) =>
      questionIds.includes(String(item.questionId))
    );

  const handleChange = (e) => {
    setFriendName(e.target.value && e.target.value);
    setNameError(false);
  };

  const handleAnswer = async (questionId, answer, index) => {
    if(btnDisabled){
      return
    }
    setBtnDisabled(true)
  
    const correctAns =
      data &&
      data._doc.myAnswers.some((myAnswer) => {
        if (myAnswer.questionId == questionId) {
          setCorrectChoice(myAnswer.answer);
        }
        if (myAnswer.answer !== answer) {
          setWrongChoiceIndex(index);
        }
        return myAnswer.questionId == questionId && myAnswer.answer == answer;
      });

    if (!correctAns) {
      palyAudioWrong();
    } else {
      palyAudioRight();
    }

    if (step <= 8) {
      setFormData((prev) => {
        return [
          ...prev,
          { questionId: questionId, answer: answer, correctAns },
        ];
      });
      setTimeout(() => {
        setStep((prev) => prev + 1);
        setCorrectChoice();
        setWrongChoiceIndex(null);
      }, 1000);
    } else {
      try {
      
        const res =  step <10 && await updateQuiz({
          userId: quizId,
          quizId: quizId,
          friendsAnswers: {
            friendAnswers: [
              ...formData,
              { questionId: questionId, answer: answer, correctAns },
            ],
            friendName,
            friendsId,
          },
        });
        // const res = await axios.post(
        //   "http://localhost:4000/api/quiz/addFriendAnswer",

        // );
        res.data && navigate(`/game/quiz/myAnswers/${quizId}/${friendsId}`);
      } catch (error) {
      }
    }
    setTimeout(() => {
      setBtnDisabled(false);
    }, 1000);
  };

  if (loading) {
    return <FullPageLoader />;
  }
  if (pageState === "get_name") {
    return (
      <>
        <div className="m-auto">
          <input
            onChange={handleChange}
            type="text"
            placeholder="Your name"
            className="p-2 w-full my-2 border-1 border-gray-200 text-center text-[1.2rem]"
          />
          {nameError && (
            <p className="text-red-600 text-center">Please fill in your name</p>
          )}
          <button
            onClick={() => setPageState("form_started")}
            className="text-center rounded-full text-white bg-green-500 w-[90%] p-3 mx-[5%] my-2 items-center"
          >
            <span>Start</span> <span>👉</span>
          </button>
        </div>
      </>
    );
  }
  if (loading) {
    return <h2>Loading..</h2>;
  }
  if(error){
    navigate('/')
  }
  return (
    <div className="mt-10">
      <div className="flex justify-between">
        {newQuestionData.length > 1 &&
          newQuestionData.map((d, i) => (
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
        <h3 className="my-4">{newQuestionData[step] && newQuestionData[step].question}</h3>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {newQuestionData[step] && newQuestionData[step].data.map((d, i) => {
      
          return (
            <button
              key={i}
              disabled={btnDisabled}
              onClick={(event) =>{
                event.currentTarget.disabled = true;
                step <10 ?  handleAnswer(newQuestionData[step].questionId, d.name, i) : null
              event.currentTarget.disabled = false;

              }
              }
              className={`rounded-lg p-4 text-center shadow-lg ${
                correctChoice == d.name
                  ? "bg-green-500 "
                  : wrongChoiceIndex === i
                  ? "bg-red-500"
                  : "bg-white"
              } min-w-[300px]`}
            >
              <div className="text-[3rem]">{d.icon}</div>
              <div>{d.name}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
});

export default FriendsAnsScreen;

