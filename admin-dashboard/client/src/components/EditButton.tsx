import Edit from "../assets/edit.svg";

export default function EditButton({handleButtonClick}: {handleButtonClick: () => void}) {
    return (
        <button onClick={handleButtonClick} className="p-3 bg-blue-600 ml-5 rounded-lg hover:bg-blue-800 hover:cursor-pointer shadow-lg">
            <img src={Edit} alt="Edit" className="w-6 bg-inherit" />
        </button>
    )
}