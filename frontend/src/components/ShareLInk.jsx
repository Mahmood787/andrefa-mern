import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { FaInstagramSquare, FaTiktok, FaTwitterSquare } from "react-icons/fa";
import {
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterShareButton,
} from "react-share";
const ShareLink = ({ quizId }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        <TelegramShareButton
          url={window.location.origin + "/quiz/" + quizId}
          className="text-white  rounded-md col-span-1 flex justify-center items-center gap-4"
          style={{ background: "#009fd1", fontSize: "1.8rem" }}
        >
          <TelegramIcon className="w-[27px]" />
          Telegram
        </TelegramShareButton>
        <FacebookShareButton
          url={window.location.origin + "/quiz/" + quizId}
          className="text-white  rounded-md col-span-1 flex justify-center items-center gap-4"
          style={{ background: "#415D95", fontSize: "1.8rem" }}
        >
          <FacebookIcon className="w-[27px]" />
          Facebook
        </FacebookShareButton>

        <FacebookMessengerShareButton
          url={window.location.origin + "/quiz/" + quizId}
          className="text-white  rounded-md col-span-1 flex justify-center items-center gap-4"
          style={{ background: "#a174ed", fontSize: "1.8rem" }}
        >
          <FacebookMessengerIcon className="w-[27px]" />
          Messenger
        </FacebookMessengerShareButton>
        <InstapaperShareButton
          url={window.location.origin + "/quiz/" + quizId}
          className="text-white  rounded-md col-span-1 flex justify-center items-center gap-4"
          style={{
            background:
              "linear-gradient(45deg,#f09433 0,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
            fontSize: "1.8rem",
          }}
        >
          <FaInstagramSquare className="w-[27px]" />
          Instagram
        </InstapaperShareButton>

        <TwitterShareButton
          url={window.location.origin + "/quiz/" + quizId}
          className="text-white  rounded-md col-span-1 flex justify-center items-center gap-4"
          style={{ background: "#3EA6EF", fontSize: "1.8rem" }}
        >
          <FaTwitterSquare className="w-[27px]" />
          Twitter
        </TwitterShareButton>
        <button
          onClick={handleShow}
          className="py-2 text-white  rounded-md col-span-1 flex justify-center items-center gap-4"
          style={{ background: "#f1db2f", fontSize: "1.8rem" }}
        >
          <FaTiktok className="w-[27px] rounded-full bg-black p-1" />
          TikTok
        </button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>How to add your challenge to Tiktok:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li>1: Copy your link</li>
            <li>2: Go to your Tiktok profile</li>
            <li>3: Click on Edit profile</li>
            <li>4: Paste your link at the 'Website' section</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShareLink;
