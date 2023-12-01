import {
    FaInstagram,
    FaInstagramSquare,
    FaTiktok,
    FaTwitter,
    FaTwitterSquare,
  } from "react-icons/fa";
  import { useSelector } from "react-redux";
  import {
    FacebookIcon,
    FacebookMessengerIcon,
    FacebookMessengerShareButton,
    FacebookShareButton,
    InstapaperShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton,
  } from "react-share";
const ShareLink = () => {
    return(<>
  <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <TelegramShareButton
            url={window.location.href}
            className="text-white  rounded-md col-span-1 flex justify-center items-center gap-4"
            style={{ background: "#009fd1", fontSize: "1.8rem" }}
          >
            <TelegramIcon className="w-[27px]" />
            Telegram
          </TelegramShareButton>
          <FacebookShareButton
            url={window.location.href}
            className="text-white  rounded-md col-span-1 flex justify-center items-center gap-4"
            style={{ background: "#415D95", fontSize: "1.8rem" }}
          >
            <FacebookIcon className="w-[27px]" />
            Facebook
          </FacebookShareButton>

          <FacebookMessengerShareButton
            url={window.location.href}
            className="text-white  rounded-md col-span-1 flex justify-center items-center gap-4"
            style={{ background: "#a174ed", fontSize: "1.8rem" }}
          >
            <FacebookMessengerIcon className="w-[27px]" />
            Messenger
          </FacebookMessengerShareButton>
          <InstapaperShareButton
            url={window.location.href}
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
            url={window.location.href}
            className="text-white  rounded-md col-span-1 flex justify-center items-center gap-4"
            style={{ background: "#3EA6EF", fontSize: "1.8rem" }}
          >
            <FaTwitterSquare className="w-[27px]" />
            Twitter
          </TwitterShareButton>
          <InstapaperShareButton
            url={window.location.href}
            className="text-white  rounded-md col-span-1 flex justify-center items-center gap-4"
            style={{ background: "#f1db2f", fontSize: "1.8rem" }}
          >
            <FaTiktok className="w-[27px] rounded-full bg-black p-1" />
            TikTok
          </InstapaperShareButton>
        </div>   
    </>)
}

export default ShareLink;