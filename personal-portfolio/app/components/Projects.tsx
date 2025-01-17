import MainCard from "./MainCard";
import Heading from "./Heading";
import { Project } from "../types";
import { MdOpenInNew } from "react-icons/md";

export default function Projects() {

    const projects: Project[] = [
        {
            name: "Admin Dashboard for Personal Portfolio",
            description: "A dashboard to manage the personal portfolio of a developer with no data hard-coded, which makes it easy for the developer to make changes in the portfolio.",
            techStack: ["Next.js", "React.js", "Express.js", "MongoDB", "TypeScript", "Tailwind CSS", "Aceternity UI", "shadcn/ui"],
            link: null,
            deployment: null
        },
        {
            name: "NASA App",
            description: "A dashboard to manage the personal portfolio of a developer with no data hard-coded, which makes it easy for the developer to make changes in the portfolio.",
            techStack: ["Next.js", "React.js", "Express.js", "MongoDB", "TypeScript", "Tailwind CSS", "Aceternity UI", "shadcn/ui"],
            link: null,
            deployment: null
        }
    ]

    function displayTechStack(techStack: string[] | null): string {
        if (techStack===null) {
            return "";
        }
        let ts: string = techStack[0];
        for (let i=1; i<techStack.length-1; i++) {
            ts += ", " + techStack[i];
        }
        ts += " and " + techStack[techStack.length-1];
        return ts;
    } 

    return (
        <MainCard>
            <Heading first="MY" second="PROJECTS" />
            <div className="mx-48 my-8">
                {projects.map((project: Project) => (
                    <div className="flex mb-8 w-180 flex-shrink-0 flex-grow-0" key={project.name}>
                        <div className="w-80 flex-shrink-0 text-light-green bg-transparent font-bold text-2xl flex justify-start  items-center p-4">{project.name}</div>
                        <div className="w-100 text-white bg-white/5 flex flex-col gap-y-6 p-6 rounded-xl flex-grow-0 overflow-hidden text-wrap">
                            <p className="bg-transparent w-full max-w-full text-wrap">{project.description}</p>
                            <p className="bg-transparent"><b className="bg-transparent">Tech Stack - </b>{displayTechStack(project.techStack)}</p>
                            <div className="flex justify-center gap-x-12 bg-transparent">
                                <p className="bg-transparent"><b className="bg-transparent flex justify-center items-center">GitHub&nbsp;&nbsp;<MdOpenInNew className="bg-transparent text-white hover:cursor-pointer" /></b>{project.link}</p>
                                <p className="bg-transparent"><b className="bg-transparent flex justify-center items-center">Deployment&nbsp;&nbsp;<MdOpenInNew className="bg-transparent text-white hover:cursor-pointer" /></b>{project.deployment}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </MainCard>
    )
}