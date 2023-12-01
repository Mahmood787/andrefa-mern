import mongoose from 'mongoose';

const friendAnswerSchema = new mongoose.Schema({
  questionId: { type: String },
  answer: { type: String },
  correctAns:{type: Boolean}
});

const friendsAnswersSchema = new mongoose.Schema({
  friendsId: { type: String  },
  friendName: { type: String, required: true },
  friendAnswers: [friendAnswerSchema],
});

const quizSchema =  mongoose.Schema({
  userId: { type: String, required: true },
  usersName: { type: String,  },
  quizId: { type: String, required: true, unique: true, },
  myAnswers: [
    {
      questionId: { type: String, required: true },
      answer: { type: String, required: true },
    },
  ],
  friendsAnswers: [friendsAnswersSchema],
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;
// const quiz = {
//   userId:"1",
//   quizId:"22",
//   friendsId:"54",
//   answers:[
//     {
//       questionId:"3",
//       answer:"2"
//     },
//     {
//       questionId:"4",
//       answer:"2"
//     }
//   ]
// }

// const quizCreation = {
//   userId:"1",
//   usersName:"test",
//   quizId:"22",
//   myansers:[
//     {
//       questionId:"3",
//       answer:"2"
//     },
//     {
//       questionId:"4",
//       answer:"2"
//     }
//   ],
//   friendsAnswers:[
//     {
//       friendsId:"44",
//       friendsName:"ali",
//       friendAnswers:[
//         {
//           questionId:"32",
//           answer:"testwe"
//         },
//         {
//           questionId:"32",
//           answer:"testwe"
//         }
//       ]
//     }
//   ]
// }