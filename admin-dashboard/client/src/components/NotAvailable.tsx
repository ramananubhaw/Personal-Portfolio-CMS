// import { Button } from "./ui/button";
import DisplayCard from "./DisplayCard";
import { ReactNode } from "react";

export default function NotAvailable({message, render}: {message: string, render?: () => ReactNode}) {
    return (
        <div className="w-full flex flex-col justify-center items-center">
            <DisplayCard className="text-red-600 text-4xl font-medium h-1/7 justify-center items-center p-6 flex-col mb-8">{message}</DisplayCard>
            {/* <Button className="mt-10 bg-blue-600 text-white text-lg font-semibold hover:bg-blue-800 shadow-xl transition-colors duration-50">{button}</Button> */}
            {render && render()}
        </div>
    )
}