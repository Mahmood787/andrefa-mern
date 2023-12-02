import GaugeChart from "react-gauge-chart";
import ButtonGreen from "../components/ButtonGreen";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import {  useNavigate, useParams } from "react-router-dom";
import { useGetQuizQuery } from "../slices/quizApiSlice";
import FullPageLoader from "../components/FullPageLoader";
;
const MyAnswerScreen = () => {
  const navigate = useNavigate()
  const { quizId, friendsId } = useParams()
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo, "userInfo")
  const { data, error, isLoading } = useGetQuizQuery(quizId);

  if(isLoading){
    return <FullPageLoader />
  }
  if(userInfo){
    navigate("/")
  }
  const currentFriendData = data._doc.friendsAnswers.find((fAns) => fAns.friendsId == friendsId)
  const correctAnswersCount = currentFriendData.friendAnswers.filter(item => item.correctAns === true).length;
 
  return (
    <div>
      <div className="text-center my-4 bg-yellow-100 p-4">
        <h2 className="">🏆 Congrats, {currentFriendData.friendName} 🏆</h2>
        <p className=""> You scored {correctAnswersCount} points at 's Challenge </p>
        <h3 className="">Your Score: {correctAnswersCount}/10</h3>
        <GaugeChart
          className="text-black"
          id="gauge-chart2"
          nrOfLevels={30}
          colors={["#FF5F6D", "#FFC371"]}
          arcWidth={0.3}
          percent={correctAnswersCount/10}
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
          handleClick={() => console.log()}
          text="Create your Quiz!"
        />
      </div>
      <div className="text-center my-4 bg-yellow-100 p-4">
        <h5 className="font-bold">
          Friendboard of <span className="text-blue-700 capitalize">{data._doc.usersName}</span>
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
             data._doc && data._doc.friendsAnswers.map((d,i) => (
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
          handleClick={() => console.log()}
          text="Create your Quiz!"
        />
      </div>
    </div>
  );
};

export default MyAnswerScreen;
