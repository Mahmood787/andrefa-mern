const ButtonGreen = ({handleClick, text, }) => {
    return (
        <>
        <button 
        style={{background:"linear-gradient(180deg,#0AE36E 0%,#08af55 100%)"}}
        onClick={handleClick} className="text-center rounded-full text-white bg-green-500 w-[90%] p-3 mx-[5%] my-2 items-center font-bold"><span className="mr-2">👉</span><span>{text}</span> </button>
        </>
    )
}
export default ButtonGreen