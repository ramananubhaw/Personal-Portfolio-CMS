import { ReactNode } from "react";

export default function DisplayCard({children, className}: {children: ReactNode, className?: string}) {
    return (
        <div className={`bg-white flex overflow-hidden rounded-2xl shadow-xl ${className}`}>
            {children}
        </div>
    )
}