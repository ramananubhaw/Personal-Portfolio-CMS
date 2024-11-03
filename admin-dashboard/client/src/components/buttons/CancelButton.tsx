import Cancel from "../../assets/cancel.svg";

export default function CancelButton({onClick}: {onClick?: (p?: any) => void}) {
    return (
        <button onClick={onClick} className="p-3 bg-red-600 ml-5 rounded-lg hover:bg-red-800 hover:cursor-pointer shadow-lg disabled:opacity-60 disabled:cursor-default disabled:hover:bg-red-600">
            <img src={Cancel} alt="Cancel" className="w-6 bg-inherit" />
        </button>
    )
}