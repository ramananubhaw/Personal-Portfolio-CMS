import { useState, useEffect } from "react";
// import Heading from "./Heading";
import MainCard from "./MainCard";
import Photo from "../../public/photo.png";
import Image from "next/image";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdOpenInNew } from "react-icons/md";
import { IoMail } from "react-icons/io5";
import GitHub from "../../public/github.png";
import X from "../../public/x.png";
import Insta from "../../public/insta.png";
import Linkedin from "../../public/linkedin.png";
import Account from "./Account";
import { Button } from "@/components/ui/moving-border";

export default function About() {

    const tags: string[] = ["Full-stack Web Development", "Data Analysis", "Machine Learning", "Blockchain Development", "Robotic Process Automation"];

    const [currentTagIndex, setCurrentTagIndex] = useState<number> (0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTagIndex((prevIndex) => ((prevIndex + 1) % tags.length));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const name: string = "Anubhaw Raman";
    // const country: string = "India";
    // const college: string = "Vellore Institute of Technology"

    return (
        <MainCard className="px-16">
            {/* <Heading first="ABOUT" second="ME" /> */}
            <div className="flex w-full gap-x-3 my-8 h-1/2">
                <div className="w-2/5 flex flex-col gap-y-8 justify-between items-center overflow-hidden h-full">
                    <Button borderRadius="9999rem" className="h-full w-full rounded-full">
                        <div className="m-2 text-center rounded-full h-80 w-80 flex justify-center items-center overflow-hidden">
                            <Image src={Photo} alt="Profile Photo" className="object-cover rounded-full h-full w-full"></Image>
                        </div>
                    </Button>
                    <div className="m-2 mb-0 flex-1 text-xl flex flex-col gap-y-5">
                        <p className="flex justify-center items-center gap-x-4 bg-light-green text-black p-2 rounded-lg font-bold bg-gradient-to-r from-green-600 from-0% via-light-green/60 via-33% to-green-600 to-100%">Check My Resume <MdOpenInNew className="text-black text-2xl font-bold bg-transparent hover:cursor-pointer" /></p>
                        <div className="flex justify-center items-center gap-x-6 bg-light-green text-black p-2 rounded-lg font-bold bg-gradient-to-r from-green-600 from-0% via-light-green/60 via-33% to-green-600 to-100%">
                            Contact Me
                            <p className="bg-transparent flex items-center gap-x-4">
                                <FaPhoneFlip className="text-black text-0 bg-transparent hover:cursor-pointer" /> | <IoMail className="text-black text-2xl bg-transparent hover:cursor-pointer" />
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-3/5 flex flex-col justify-center items-center mr-20 pb-8 gap-y-2 overflow-hidden">
                    <p className="bg-transparent w-full text-4xl h-1/6 flex items-end font-bold text-white">Hi, I am {name.split(' ')[0]}</p>
                    <div className="bg-transparent w-full h-3/6 flex justify-start items-center overflow-hidden">
                        <div className="text-7xl font-bold text-light-green animate-slide bg-inherit overflow-hidden" key={currentTagIndex}>
                            {tags[currentTagIndex]}
                        </div>
                    </div>
                    <div className="bg-white/5 rounded-xl w-full max-w-full py-8 flex justify-end gap-x-8 px-8 overflow-hidden">
                        <b className="bg-transparent flex justify-center items-center text-2xl text-white">Let&apos;s connect and collaborate!</b>
                        <div className="bg-transparent flex justify-center items-center gap-x-8">
                            <Account src={GitHub} alt="GitHub" />
                            <Account src={Linkedin} alt="Linkedin" />
                            <Account src={Insta} alt="Instagram" />
                            <Account src={X} alt="Twitter" />
                        </div>
                    </div>
                </div>
            </div>
        </MainCard>
    )
}