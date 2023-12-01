import { useSelector } from 'react-redux';
import Hero from '../components/Hero';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const HomeScreen = () => {
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo, "user info")
  useEffect(() => {
    if (userInfo) {
      navigate('/game');
    }
  }, [navigate, userInfo]);
  return <Hero />;
};
export default HomeScreen;
