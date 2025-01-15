import { ReactNode } from "react";
// import BlurCircle from "./BlurCircle";

export default function MainCard({ children, className }: { children: ReactNode, className?: string }) {
    return (
        <div className={`font-mntsrt mx-12 my-4 flex flex-col justify-center items-center ${className ? className : ""}`}>
            {children}
            {/* <BlurCircle size='25rem' op={0.3} /> */}
        </div>
    )
};