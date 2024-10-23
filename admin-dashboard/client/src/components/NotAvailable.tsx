import { Button } from "./ui/button";

export default function NotAvailable({message, button}: {message: string, button: string}) {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-red-600 bg-inherit text-4xl font-medium h-1/7 flex justify-center items-center bg-white p-6 rounded-2xl shadow-xl">{message}</h1>
            <Button className="mt-10 bg-blue-500 text-white text-lg font-semibold hover:bg-blue-700 shadow-xl transition-colors duration-50">{button}</Button>
        </div>
    )
}