import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateQuizMutation } from "../slices/quizApiSlice";
import WrongAudio from "../assets/sounds/wronganswer.mp3";
import Medal1 from "../assets/medalha11.png";
import Medal2 from "../assets/medalha22.png";
import Medal3 from "../assets/medalha33.png";
import RightAudio from "../assets/sounds/correctanswer.mp3";
import { v4 as uuid } from "uuid";
import FullPageLoader from "../components/FullPageLoader";
import { initQuestions } from "../utils/utils";
import useGetQuiz from "./hooks/quiz";
import { capitalize } from "lodash";
import { Image, Table } from "react-bootstrap";
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
  const [btnDisabled, setBtnDisabled] = useState(false);

  const { quizId } = useParams();
  const { data, loading, error, refetch } = useGetQuiz(
    import.meta.env.VITE_BACKEND_URL + "/api/quiz/",
    { userId: quizId }
  );

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
    if (btnDisabled) {
      return;
    }
    setBtnDisabled(true);

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
        const res =
          step < 10 &&
          (await updateQuiz({
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
          }));
        // const res = await axios.post(
        //   "http://localhost:4000/api/quiz/addFriendAnswer",

        // );
        res.data && navigate(`/game/quiz/myAnswers/${quizId}/${friendsId}`);
      } catch (error) {}
    }
    setTimeout(() => {
      setBtnDisabled(false);
    }, 1000);
  };

  if (loading || isUpdating) {
    return <FullPageLoader />;
  }
  if (pageState === "get_name") {
    return (
      <>
        <div className="m-auto text-center">
          <h2 className="my-4 font-bold">
            ✨ Friends Challenge 2023 ✨ of{" "}
            <span className="font-semibold capitalize text-blue-900">
              {data._doc.usersName}
            </span>
          </h2>
          <p>Can you guess the answers?</p>
          <div className="flex items-center gap-4">
            <p className="text-center rounded-full bg-blue-500 w-9 h-9 text-white">
              1
            </p>
            <p>Write your name</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-center rounded-full bg-green-500 w-9 h-9 text-white">
              2
            </p>
            <p>
              Answer questions about{" "}
              <span className="font-semibold capitalize text-blue-900">
                {data._doc.usersName}
              </span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-center rounded-full bg-orange-500 w-9 h-9 text-white">
              3
            </p>
            <p>Check your Score at the Friend wall!</p>
          </div>
          <input
            onChange={handleChange}
            type="text"
            required
            placeholder="Your name"
            className="p-2 w-full my-2 border-1 border-gray-200 text-center text-[1.2rem]"
          />
          {nameError && (
            <p className="text-red-600 text-center">Please fill in your name</p>
          )}
          <button
            onClick={() => {
              if (!friendName) {
                setNameError(true);
                return;
              }
              setPageState("form_started");
            }}
            className="text-center rounded-full text-white bg-green-500 w-[90%] p-3 mx-[5%] my-2 items-center"
          >
            <span>Start</span> <span>👉</span>
          </button>
        </div>
        <div className="text-center my-8">
          <h3 className="font-semibold my-4">
            🏆 Friendboard of Daniela{" "}
            <span className="font-semibold capitalize text-blue-900">
              {data._doc.usersName}
            </span>
          </h3>
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {data._doc &&
                  data._doc.friendsAnswers
                    .sort(
                      (a, b) =>
                        b.friendAnswers.filter((f) => f.correctAns == true)
                          .length -
                        a.friendAnswers.filter((f) => f.correctAns == true)
                          .length
                    )
                    .map((d, i) => (
                      <tr key={i}>
                        {i === 0 && (
                          <td className="flex justify-center">
                            {" "}
                            <Image src={Medal1} alt="medal" />
                          </td>
                        )}
                        {i === 1 && (
                          <td className="flex justify-center">
                            {" "}
                            <Image src={Medal2} alt="medal" />
                          </td>
                        )}
                        {i === 2 && (
                          <td className="flex justify-center">
                            {" "}
                            <Image src={Medal3} alt="medal" />
                          </td>
                        )}
                        {i>2 && (<td></td>)}
                        <td className="capitalize">{d.friendName}</td>
                        <td>
                          {
                            d.friendAnswers.filter((f) => f.correctAns == true)
                              .length
                          }
                        </td>
                      </tr>
                    ))}
              </tbody>
            </Table>
            {data._doc.friendsAnswers.length < 1 && <p>No answer yet.</p>}
            <h5 className="mt-8 font-semibold">How does it work?
</h5>
<p>Try to guess your friend's answer and check your rankings</p>
          </div>
        </div>
      </>
    );
  }
  if (loading) {
    return <h2>Loading..</h2>;
  }
  if (error) {
    navigate("/");
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
        <h3 className="my-4">
          {newQuestionData[step] &&
            newQuestionData[step].question
              .replace(" you ", ` ${capitalize(data._doc.usersName)} `)
              .replace(" your ", " his ")}
        </h3>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {newQuestionData[step] &&
          newQuestionData[step].data.map((d, i) => {
            return (
              <button
                key={i}
                disabled={btnDisabled}
                onClick={(event) => {
                  event.currentTarget.disabled = true;
                  step < 10
                    ? handleAnswer(newQuestionData[step].questionId, d.name, i)
                    : null;
                  event.currentTarget.disabled = false;
                }}
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
