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
  return (
    <>
    <div className="text-center"> ✨ Friends Challenge 2023 ✨</div>
      <div className="flex flex-col items-center justify-center my-4">
        <img
          src="https://vivatok.com/de23/images/friends23_herob.png"
          className=" img-fluid"
          alt="Responsive image"
        />
        <div className="m-2 font-bold text-[2rem]">
          ✨ Friends Challenge 2023 ✨
        </div>
        <div className="">Find out how much your friends know about you</div>
      <Hero/>
      </div></>
      
  );
};
export default HomeScreen;
