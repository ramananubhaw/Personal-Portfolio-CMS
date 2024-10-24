export default function FormElement({label, value, type}: {label: string, value: string, type: string}) {
    return (
        <div className="bg-inherit flex items-center px-10 pb-3 text-lg w-full">
            <label className="bg-inherit font-bold w-1/4">{label}:</label>
            <input
                type={type}
                value={value}
                readOnly
                className="bg-inherit px-1 ml-4 w-2/3"
            />
        </div>
    )
}