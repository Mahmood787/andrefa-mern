import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useSelector } from "react-redux";
import ShareLink from "../components/ShareLInk";
import { WhatsappIcon, WhatsappShareButton } from "react-share";
import { useNavigate, useParams } from 'react-router-dom';
const ShareScreen = () => {
  const navigate = useNavigate()
  const { quizId } = useParams();
  const [copied, setCoppied] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
 
  return (
    <div className="text-center">
      <div className="text-center mt-10">
        <h1 className="text-purple-800">Congrats, {userInfo.name}! 🤩</h1>
        <h3>Your Dare is ready</h3>
      </div>
      <div className="bg-yellow-100 text-center p-4">
        <h5 className="">Now share your dare with your friends:</h5>
        <h3 className="">👇 👇 👇 👇</h3>
        <WhatsappShareButton
          url={window.location.origin+"/game/quiz/friends/"+quizId}
          className="text-white  rounded-md w-full flex justify-center items-center gap-4"
          style={{ background: "#1cb06d", fontSize: "1.8rem" }}
        >
          <WhatsappIcon className="w-[27px]" />
          Share now
        </WhatsappShareButton>
        <h5 className="mt-4">Other social media:</h5>

        <input
          className="w-full text-center p-2 rounded-full border-1 border-gray-300"
          onChange={() =>null}
          type="text"
          value={window.location.origin+"/game/quiz/friends/"+quizId}
        />
        <CopyToClipboard
          text={window.location.origin+"/game/quiz/friends/"+quizId}
          onCopy={() => setCoppied(true)}
        >
          <button className="bg-blue-500 w-1/2 my-4 rounded-full text-white p-2">
            {copied ? "Link Coppied" : "Copy Link"}
          </button>
        </CopyToClipboard>
       <ShareLink />
      </div>
      <p className="text-center my-4">After sharing, check who has answered:</p>
      <button
      onClick={() => navigate('/game/creator/resultbord')}
        className="mb-16 w-[80%]  rounded-full  p-2 text-white"
        style={{
          backgroundImage: "linear-gradient(180deg,#00A8FF 0%,#007CFF 100%)",
        }}
      >
        📋 Check Answers
      </button>
      <h5>How does it work?</h5>
      <p>
        Answer questions and share your challenge with friends. Check who got
        more answers right at your Friend wall!
      </p>
    </div>
  );
};

export default ShareScreen;
