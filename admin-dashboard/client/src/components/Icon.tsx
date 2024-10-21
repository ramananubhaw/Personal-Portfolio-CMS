export default function Icon({src}: {src:string}) {
    return (
        <img
            src={src}
            alt="icon"
            className="w-4 h-4 bg-inherit"
        />
    )
}