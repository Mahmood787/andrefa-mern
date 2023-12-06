import { useState } from "react";
import { Image, Table } from "react-bootstrap";
import CopyToClipboard from "react-copy-to-clipboard";
import { useSelector } from "react-redux";
import { WhatsappIcon, WhatsappShareButton } from "react-share";
import Medal1 from "../assets/medalha11.png";
import Medal2 from "../assets/medalha22.png";
import Medal3 from "../assets/medalha33.png";
import FullPageLoader from "../components/FullPageLoader";
import ShareLink from "../components/ShareLInk";
import useGetQuiz from "./hooks/quiz";
const CreatorsResultBoard = () => {
  const [copied, setCoppied] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const { data, loading, error, refetch } = useGetQuiz(
    import.meta.env.VITE_BACKEND_URL + "/api/quiz/",
    { userId: userInfo._id }
  );
  if (loading) {
    return <FullPageLoader />;
  }
  if (error) {
    return <>Something went wrong</>;
  }

  return (
    <div>
      <div className="text-center my-4 bg-yellow-100 p-4">
        <h5 className="font-bold">
          Friendboard of{" "}
          <span className="text-blue-700 capitalize">{userInfo.name}</span>
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
                {data._doc &&
                  data._doc.friendsAnswers
                    .sort(
                      (a, b) =>
                        b.friendAnswers.filter((f) => f.correctAns == true)
                          .length -
                        a.friendAnswers.filter((f) => f.correctAns == true)
                          .length
                    )
                    .map((d, i) => (
                      <tr key={i}>
                        {i === 0 && (
                          <td className="flex justify-center">
                            {" "}
                            <Image src={Medal1} alt="medal" />
                          </td>
                        )}
                        {i === 1 && (
                          <td className="flex justify-center">
                            {" "}
                            <Image src={Medal2} alt="medal" />
                          </td>
                        )}
                        {i === 2 && (
                          <td className="flex justify-center">
                            {" "}
                            <Image src={Medal3} alt="medal" />
                          </td>
                        )}
                        {i>2 && (<td></td>)}
                        <td className="capitalize">{d.friendName}</td>
                        <td>
                          {
                            d.friendAnswers.filter((f) => f.correctAns == true)
                              .length
                          }
                        </td>
                      </tr>
                    ))}
              </tbody>
          </Table>
          {data._doc.friendsAnswers.length < 1 && <p>No answer yet.</p>}
        </div>
        <h5 className="font-bold my-4">❤️ ❤️ Did you like it?</h5>

        <h4 className="">
          Do you want more answers? Share your challenge with more friends!
        </h4>
        <h4 className="">👇👇👇👇</h4>
        <WhatsappShareButton
          url={
            window.location.origin + "/quiz/" + data._doc.quizId
          }
          className=" my-4 text-white  rounded-md w-full flex justify-center items-center gap-4"
          style={{ background: "#1cb06d", fontSize: "1.8rem" }}
        >
          <WhatsappIcon className="w-[27px]" />
          Share now
        </WhatsappShareButton>
        <input
          className="w-full text-center p-2 rounded-full border-1 border-gray-300"
          onChange={() => null}
          type="text"
          value={
            window.location.origin + "/quiz/" + data._doc.quizId
          }
        />
        <CopyToClipboard
          text={
            window.location.origin + "/quiz/" + data._doc.quizId
          }
          onCopy={() => setCoppied(true)}
        >
          <button className="bg-blue-500 w-1/2 my-4 rounded-full text-white p-2">
            {copied ? "Link Coppied" : "Copy Link"}
          </button>
        </CopyToClipboard>
      </div>
      <ShareLink quizId={data._doc.quizId}/>
    </div>
  );
};

export default CreatorsResultBoard;
