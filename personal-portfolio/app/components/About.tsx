import Heading from "./Heading";
import MainCard from "./MainCard";
import Photo from "../../public/photo.png";
import Image from "next/image";
import { FaPhoneFlip } from "react-icons/fa6";
import { MdOpenInNew } from "react-icons/md";
import { IoMail } from "react-icons/io5";

export default function About() {

    // const tags: string[] = ["Frontend Development", "Backend Development", "Data Analysis", "Machine Learning"]

    return (
        <MainCard className="px-16">
            <Heading first="ABOUT" second="ME" />
            <div className="flex w-full gap-x-3 my-8 h-1/2">
                <div className="w-2/5 flex flex-col gap-y-8 justify-between items-center overflow-hidden h-full">
                    <div className="m-2 text-center rounded-full h-80 w-80 flex justify-center items-center overflow-hidden outline outline-3 outline-light-green outline-offset-4">
                        <Image src={Photo} alt="Profile Photo" className="object-cover h-full w-full"></Image>
                    </div>
                    <div className="m-2 mb-0 flex-1 text-xl flex flex-col gap-y-5">
                        <p className="flex justify-center items-center gap-x-4 bg-red-500 p-2 rounded-lg font-semibold">Check My Resume <MdOpenInNew className="text-white text-2xl font-semibold bg-inherit hover:cursor-pointer" /></p>
                        <div className="flex justify-center items-center gap-x-6 bg-red-500 p-2 rounded-lg font-semibold">
                            Contact Me
                            <p className="bg-inherit flex items-center gap-x-4">
                                <FaPhoneFlip className="text-white text-0 bg-inherit hover:cursor-pointer" /> | <IoMail className="text-white text-2xl bg-inherit hover:cursor-pointer" />
                            </p>
                        </div>
                    </div>
                </div>
                <div className="grow bg-white/15  rounded-xl flex flex-col justify-center items-center mr-12">
                    About Me
                </div>
            </div>
        </MainCard>
    )
}