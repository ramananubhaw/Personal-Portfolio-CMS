export default function FormElement({label, value, placeholder, type, readOnly, onChange}: {label: string, value: string, placeholder?: string, type: string, readOnly?: boolean, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
    
    const readonly = readOnly || false;
    
    return (
        <div className="bg-inherit flex items-center px-10 pb-3 text-lg w-full">
            <label className="bg-inherit font-bold w-1/4">{label}:</label>
            <input
                type={type}
                value={value}
                placeholder={placeholder || value || "Enter here..."}
                readOnly={readonly}
                className={`bg-inherit px-1 ml-4 w-2/3 text-black ${readonly ? "" : "border-black"}`}
                onChange={onChange}
            />
        </div>
    )
}