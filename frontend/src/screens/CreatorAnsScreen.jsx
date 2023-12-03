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
  console.log(userInfo, "userInfo")
  const { data, loading, error, refetch } = useGetQuiz('http://localhost:4000/api/quiz/',{userId:quizId});

  const currentFriendData = data &&  data?._doc?.friendsAnswers?.find((fAns) => fAns?.friendsId == friendsId)
  const correctAnswersCount =data && currentFriendData?.friendAnswers?.filter(item => item.correctAns === true).length;

  if (loading ) {
    return <FullPageLoader />;
  }

  if(userInfo){
    navigate("/")
  }
console.log(currentFriendData, "current friends data")
  return (
    <div>
      creators answer screen
      <div className="text-center my-4 bg-yellow-100 p-4">
        <h2 className="">🏆 Congrats, {currentFriendData && currentFriendData.friendName} 🏆</h2>
        <p className=""> You scored {correctAnswersCount && correctAnswersCount} points at 's Challenge </p>
        <h3 className="">Your Score: {correctAnswersCount && correctAnswersCount}/10</h3>
        <GaugeChart
          className="text-black"
          id="gauge-chart2"
          nrOfLevels={30}
          colors={["#FF5F6D", "#FFC371"]}
          arcWidth={0.3}
          percent={correctAnswersCount && correctAnswersCount/10}
          style={{
            width: "20%",
            margin: "auto",
            color: "black",
            background: "gray",
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
