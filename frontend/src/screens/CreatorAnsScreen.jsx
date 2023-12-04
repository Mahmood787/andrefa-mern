import GaugeChart from "react-gauge-chart";
import ButtonGreen from "../components/ButtonGreen";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import {  useNavigate, useParams } from "react-router-dom";
import FullPageLoader from "../components/FullPageLoader";
import useGetQuiz from "./hooks/quiz";
;
const CreatorAnsScreen = () => {
  const navigate = useNavigate()
  const { quizId, friendsId } = useParams()
  const { userInfo } = useSelector((state) => state.auth);
  const { data, loading, error, refetch } = useGetQuiz(import.meta.env.VITE_BACKEND_URL+"/api/quiz/",{userId:quizId});

  const currentFriendData = data &&  data?._doc?.friendsAnswers?.find((fAns) => fAns?.friendsId == friendsId)
  const correctAnswersCount =data && currentFriendData?.friendAnswers?.filter(item => item.correctAns === true).length;

  if (loading ) {
    return <FullPageLoader />;
  }


  return (
    <div>
    
      <div className="text-center my-4 bg-yellow-100 p-4">
        <h2 className="">🏆 Congrats, {currentFriendData && currentFriendData.friendName} 🏆</h2>
        <p className=""> You scored {correctAnswersCount && correctAnswersCount} points at 's Challenge </p>
        <h3 className="">Your Score: {correctAnswersCount && correctAnswersCount}/10</h3>
        <GaugeChart
          className="text-black p-2 "
          id="gauge-chart1"
          nrOfLevels={30}
          colors={["#FF5F6D", "#FFC371"]}
          arcWidth={0.3}
          percent={correctAnswersCount && correctAnswersCount/10}
          style={{
            borderRadius:"10px",
            width: "35%",
            margin: "auto",
            color: "black",
            background: "#7888c0",
          }}
        />
        <p>
          {" "}
          Now it is your turn, create your own Dare and share with friends!
        </p>
        <ButtonGreen
          handleClick={() => navigate('/')}
          text="Create your Quiz!"
        />
      </div>
      <div className="text-center my-4 bg-yellow-100 p-4">
        <h5 className="font-bold">
          Friendboard of <span className="text-blue-700 capitalize">{data && data._doc && data._doc.usersName}</span>
        </h5>
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
           
            {
             data && data._doc && data._doc.friendsAnswers.map((d,i) => (
                <tr>
                <td>{i+1}</td>
                <td>{d.friendName}</td>
                <td>{d.friendAnswers.filter((f) => f.correctAns ==true).length}</td>
              </tr>
              ))
            }
            </tbody>
          </Table>
        </div>
        <h5 className="font-bold my-4">❤️ ❤️ Did you like it?</h5>
        <ButtonGreen
          handleClick={() => navigate('/')}
          text="Create your Quiz!"
        />
      </div>
    </div>
  );
};

export default CreatorAnsScreen;
