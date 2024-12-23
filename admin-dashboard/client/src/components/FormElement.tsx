export default function FormElement({label, value, placeholder, type, readOnly, onChange, selectOptions}: {label: string, value: string, placeholder?: string, type: string, readOnly?: boolean, onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void, selectOptions?: string[]}) {
    
    const readonly = readOnly || false;
    
    return (
        <div className="bg-inherit flex items-center px-10 pb-3 text-lg w-full">
            <label className="bg-inherit font-bold w-1/4">{label}:</label>
            {selectOptions ? (
                <select
                    value={value || ""}
                    disabled={readonly}
                    className={`bg-inherit px-1 ml-4 w-2/3 text-black border-black ${readonly ? "cursor-not-allowed" : ""}`}
                    onChange={onChange}
                >
                    <option className="bg-inherit" value="" disabled>
                        Select {label}
                    </option>
                    {selectOptions.map((option, index) => (
                        <option className="bg-inherit" key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
            <input
                type={type}
                value={value}
                placeholder={placeholder || value || "Enter here"}
                readOnly={readonly}
                className={`bg-inherit px-1 ml-4 w-2/3 text-black ${readonly ? "" : "border-black"}`}
                onChange={onChange}
            />)}
        </div>
    )
}