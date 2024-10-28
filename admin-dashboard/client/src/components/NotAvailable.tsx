import { Button } from "./ui/button";
import DisplayCard from "./DisplayCard";

export default function NotAvailable({message, button}: {message: string, button: string}) {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <DisplayCard className="text-red-600 text-4xl font-medium h-1/7 justify-center items-center p-6 flex-col">{message}</DisplayCard>
            <Button className="mt-10 bg-blue-600 text-white text-lg font-semibold hover:bg-blue-800 shadow-xl transition-colors duration-50">{button}</Button>
        </div>
    )
}