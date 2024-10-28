import Edit from "../../assets/edit.svg";

export default function EditButton({handleEditingState, disabled}: {handleEditingState?: (p?: any) => void, disabled?: boolean}) {
    return (
        <button disabled={disabled} onClick={handleEditingState} className="p-3 bg-blue-600 ml-5 rounded-lg hover:bg-blue-800 hover:cursor-pointer shadow-lg disabled:opacity-60 disabled:cursor-default disabled:hover:bg-blue-600">
            <img src={Edit} alt="Edit" className="w-6 bg-inherit" />
        </button>
    )
}