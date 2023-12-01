import { useState } from "react";
import { useNavigate } from "react-router-dom";

const GameScreen = () => {
  const navigate = useNavigate();
  const [nameError, setNameError] = useState(false);
  const [usersName, setUserName] = useState("");
  const handleChange = (e) => {
    setUserName(e.target.value && e.target.value);
    setNameError(false);
  };

  const handleClick = () => {
    navigate("/game/quiz");
  };

  return (
    <div>
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
      </div>
      <div className="text-[1.45rem] container bg-[#f6f8ff] rounded-lg p-4">
        <div className="flex items-center gap-4">
          <p className="text-center rounded-full bg-blue-500 w-9 h-9 text-white">
            1
          </p>
          <p>Create your Dare</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-center rounded-full bg-green-500 w-9 h-9 text-white">
            2
          </p>
          <p>Send it to your friends</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-center rounded-full bg-orange-500 w-9 h-9 text-white">
            3
          </p>
          <p>Check the answers</p>
        </div>
        <div className="m-auto">
          {/* <input onChange={handleChange} type="text" placeholder="Your name" className="p-2 w-full my-2 border-1 border-gray-200 text-center text-[1.2rem]" />
        {nameError && (<p className="text-red-600 text-center">Please fill in your name</p>) } */}
          <button
            onClick={handleClick}
            className="text-center rounded-full text-white bg-green-500 w-[90%] p-3 mx-[5%] my-2 items-center"
          >
            <span>Start</span> <span>👉</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default GameScreen;
