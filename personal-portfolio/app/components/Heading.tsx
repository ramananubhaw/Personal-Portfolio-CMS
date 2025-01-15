export default function Heading({ first, second }: { first: string, second: string}) {
    return (
        <h1 className="text-4xl w-full text-center bg-inherit text-white">
            {first} <span className="font-bold text-light-green bg-transparent">{second}</span>
        </h1>
    )
}