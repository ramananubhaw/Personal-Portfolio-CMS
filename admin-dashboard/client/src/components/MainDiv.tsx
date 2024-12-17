import { ReactNode } from "react";

export default function MainDiv({children, className}: {children: ReactNode, className?: string}) {
    return (
        <div className={`w-full flex flex-col justify-center items-center mt-8 overflow-hidden ${className}`}>
            {children}
        </div>
    )
}