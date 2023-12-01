import GaugeChart from "react-gauge-chart";
import ButtonGreen from "../components/ButtonGreen";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";

<GaugeChart id="gauge-chart1" />;
const MyAnswerScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div>
      <div className="text-center my-4 bg-yellow-100 p-4">
        <h2 className="">🏆 Congrats, test 🏆</h2>
        <p className=""> You scored 2 points at {userInfo.name}'s Challenge </p>
        <h3 className="">Your Score: 2/10</h3>
        <GaugeChart
          className="text-black"
          id="gauge-chart2"
          nrOfLevels={30}
          colors={["#FF5F6D", "#FFC371"]}
          arcWidth={0.3}
          percent={0.37}
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
          Friendboard of <span className="text-blue-700">{userInfo.name}</span>
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
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
              </tr>
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
