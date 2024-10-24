import Delete from "../assets/delete.svg";

export default function DeleteButton() {
    return (
        <div className="p-3 bg-red-600 ml-5 rounded-lg hover:bg-red-800 hover:cursor-pointer shadow-lg">
            <img src={Delete} alt="Delete" className="w-6 bg-inherit" />
        </div>
    )
}