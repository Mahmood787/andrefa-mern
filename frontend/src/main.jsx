import React from 'react';
import "./index.css"
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store';
import { Provider } from 'react-redux';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import GameScreen from './screens/GameScreen.jsx';
import QuizCreationScreen from './screens/QuizCreationScreen.jsx';
import ShareScreen from './screens/ShareScreen.jsx';
import CreatorAnsScreen from './screens/CreatorAnsScreen.jsx';
import FriendsAnsScreen from './screens/FriendsAnsScreen.jsx';
import CreatorsResultBoard from './screens/CreatorsResultBoard.jsx';
import Contact from './screens/Contact.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/game/quiz' element={<QuizCreationScreen />} />
      <Route path='/quiz/:quizId' element={<FriendsAnsScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/game/quiz/myAnswers/:quizId/:friendsId' element={<CreatorAnsScreen />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/game' element={<GameScreen />} />
        <Route path='/game/creator/resultbord' element={<CreatorsResultBoard />} />
        <Route path='/game/quiz/share/:quizId' element={<ShareScreen />} />
 
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
