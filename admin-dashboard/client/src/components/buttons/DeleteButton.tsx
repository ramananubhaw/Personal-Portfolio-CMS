import Delete from "../../assets/delete.svg";

export default function DeleteButton({disabled, onClick}: {disabled?: boolean, onClick?: (p?: any) => void}) {
    return (
        <button disabled={disabled || false} onClick={onClick} className="p-3 bg-red-600 ml-5 rounded-lg hover:bg-red-800 hover:cursor-pointer shadow-lg disabled:opacity-60 disabled:cursor-default disabled:hover:bg-red-600">
            <img src={Delete} alt="Delete" className="w-6 bg-inherit" />
        </button>
    )
}