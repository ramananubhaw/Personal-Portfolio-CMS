export default function Icon({src, className}: {src: string, className?: string}) {
    return (
        <img
            src={src}
            alt="icon"
            className={className || "w-4 h-4 bg-inherit"}
        />
    )
}