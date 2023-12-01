import express from 'express';

import { addFriendAnswer, createQuiz, getQuiz } from '../controllers/quizController.js';

const router = express.Router();


router.get("/",getQuiz)
router.post('/', createQuiz)
router.post('/addFriendAnswer',addFriendAnswer)
export default router;