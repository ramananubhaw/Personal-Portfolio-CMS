import { useState, useEffect } from "react";
// import Heading from "./Heading";
import MainCard from "./MainCard";
import Photo from "../../public/photo.png";
import Image from "next/image";
// import { FaPhoneFlip } from "react-icons/fa6";
import { MdOpenInNew } from "react-icons/md";
// import { IoMail } from "react-icons/io5";
import GitHub from "../../public/github.png";
import X from "../../public/x.png";
import Insta from "../../public/insta.png";
import Linkedin from "../../public/linkedin.png";
import Gmail from "../../public/gmail.png";
import Account from "./Account";
import { Button } from "@/components/ui/moving-border";
// import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { useQuery } from "@apollo/client";
import { getAllAccounts, getPersonalInfo } from "../graphql-queries";
import { AccountType, PersonalInfo } from "../types";

export default function About() {

    const tags: string[] = ["Full-stack Web Development", "Data Analysis", "Machine Learning", "Blockchain Development", "Robotic Process Automation"];
    // const words: {text: string; className?: string;}[] = [{text: "Full-stack Web Development"}, {text: "Data Analysis"}, {text: "Machine Learning"}, {text: "Blockchain Development"}, {text: "Robotic Process Automation"}];

    const [currentTagIndex, setCurrentTagIndex] = useState<number> (0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTagIndex((prevIndex) => ((prevIndex + 1) % tags.length));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    // GraphQL queries

    const {error: error, data: data} = useQuery(getAllAccounts);
    const {error: infoError, data: info} = useQuery(getPersonalInfo);

    // fetching into the page

    const [accounts, setAccounts] = useState<AccountType[]> ([]);

    useEffect(() => {
        if (error) {
            console.log(error);
            return;
        }
        if (data && data.getAllAccounts) {
            setAccounts(data.getAllAccounts);
            // console.log(data);
        }
    }, [data, error]);

    function getLink(platform: string): string {
        const account: AccountType | undefined = accounts.find((acc: AccountType) => acc.platform === platform)
        return account ? account.link : "#";
    }

    const [personalInfo, setPersonalInfo] = useState<PersonalInfo> ({
        name: "",
        email: "",
        resumeLink: ""
    })

    useEffect(() => {
        if (infoError) {
            console.log(infoError);
            return;
        }
        if (info && info.admins) {
            setPersonalInfo(info.admins[0]);
            // console.log(info);
        }
    }, [info, infoError]);

    // const name: string = "Anubhaw Raman";
    // const country: string = "India";
    // const college: string = "Vellore Institute of Technology"

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.email}`;

    // function handleGmailRedirect(email: string) {
    //     const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
    //     window.open(gmailUrl, "_blank");
    // }

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
                        <p className="flex justify-center items-center gap-x-4 bg-light-green text-black p-2 rounded-lg font-bold bg-gradient-to-r from-green-600 from-0% via-light-green/60 via-33% to-green-600 to-100%">Check My Resume <a href={personalInfo.resumeLink} target="_blank" className="bg-transparent"><MdOpenInNew className="text-black text-2xl font-bold bg-transparent hover:cursor-pointer" /></a></p>
                        {/* <div className="flex justify-center items-center gap-x-10 bg-light-green text-black p-2 rounded-lg font-bold bg-gradient-to-r from-green-600 from-0% via-light-green/60 via-33% to-green-600 to-100%">
                            Reach out to me <IoMail className="text-black text-2xl bg-transparent hover:cursor-pointer" onClick={() => handleGmailRedirect(personalInfo.email)} />
                        </div> */}
                    </div>
                </div>
                <div className="w-3/5 flex flex-col justify-center items-center mr-20 gap-y-8 overflow-hidden">
                    <p className="bg-transparent w-full text-4xl h-1/6 flex items-end font-bold text-white">Hi, I am {personalInfo.name ? personalInfo.name.split(' ')[0] : ""}</p>
                    <div className="bg-transparent w-full h-3/6 flex justify-start items-center overflow-hidden">
                        <div className="text-7xl font-bold text-light-green animate-slide bg-inherit overflow-hidden" key={currentTagIndex}>
                            {tags[currentTagIndex]}
                        </div>

                        {/* <TypewriterEffect words={words} className="text-7xl font-bold text-light-green animate-slide bg-inherit overflow-hidden" /> */}
                    </div>
                    <div className="bg-white/5 rounded-xl w-full max-w-full py-8 flex justify-center gap-x-8 px-4 overflow-hidden">
                        <b className="bg-transparent flex justify-center items-center text-xl text-white">Let&apos;s connect and collaborate!</b>
                        <div className="bg-transparent flex justify-center items-center gap-x-8">
                            <Account src={Gmail} alt="Gmail" href={gmailUrl} />
                            <Account src={GitHub} alt="GitHub" href={getLink("GitHub")} />
                            <Account src={Linkedin} alt="Linkedin" href={getLink("Linkedin")} />
                            <Account src={Insta} alt="Instagram" href={getLink("Instagram")} />
                            <Account src={X} alt="Twitter" href={getLink("Twitter")} />
                        </div>
                    </div>
                </div>
            </div>
        </MainCard>
    )
}