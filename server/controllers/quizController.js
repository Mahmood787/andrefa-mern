import asyncHandler from "express-async-handler";
import Quiz from "../models/quizModel.js";

const createQuiz = asyncHandler(async (req, res) => {
  try {
    const data = await Quiz.create(req.body);
    res.status(200).json({ message: "Quiz created", quiz: data });
  } catch (error) {
    res.status(404).json({ message: "Something went wrong", error });
  }
});

const getQuiz = async (req, res) => {
  const userId = req.query.userId;
  try {
    const quiz = await Quiz.findOne({ userId });
    console.log(quiz, "Quiz server");
    if (quiz) {
      res.status(200).json({
        ...quiz,
      });
    }
    if (!quiz) {
      res.status(401);
    }
  } catch (error) {
    res.status(401);
    throw new Error("Quiz not found");
  }
};

const addFriendAnswer = asyncHandler(async (req, res) => {
  console.log(req.body, "REQ_addFriendAnswer");
  try {
    const result = await Quiz.updateOne(
      { quizId: req.body.quizId },
      {
        $push: {
          friendsAnswers: req.body.friendsAnswers,
        },
      }
    );
    console.log(result, "RESULT");
    res.status(200).json({ body: result });
  } catch (error) {
    console.error("Error adding friend answer:", error);
    throw error;
  }
});

export { createQuiz, getQuiz, addFriendAnswer };
