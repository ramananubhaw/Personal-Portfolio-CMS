import Save from "../assets/save.svg";

export default function SaveButton({handleButtonClick}: {handleButtonClick: () => void}) {
    return (
        <button onClick={handleButtonClick} className="p-3 bg-green-600 ml-5 rounded-lg hover:bg-green-800 hover:cursor-pointer shadow-lg">
            <img src={Save} alt="Save" className="w-6 bg-inherit" />
        </button>
    )
}