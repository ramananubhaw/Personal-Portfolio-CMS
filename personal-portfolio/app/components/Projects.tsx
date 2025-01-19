import MainCard from "./MainCard";
import Heading from "./Heading";
import { Project } from "../types";
import { MdOpenInNew } from "react-icons/md";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { getAllProjects } from "../graphql-queries";

export default function Projects() {

    // const projects: Project[] = [
    //     {
    //         name: "Admin Dashboard for Personal Portfolio",
    //         description: "A dashboard to manage the personal portfolio of a developer with no data hard-coded, which makes it easy for the developer to make changes in the portfolio.",
    //         techStack: ["Next.js", "React.js", "Express.js", "MongoDB", "TypeScript", "Tailwind CSS", "Aceternity UI", "shadcn/ui"],
    //         link: null,
    //         deployment: null
    //     },
    //     {
    //         name: "NASA App",
    //         description: "A dashboard to manage the personal portfolio of a developer with no data hard-coded, which makes it easy for the developer to make changes in the portfolio.",
    //         techStack: ["Next.js", "React.js", "Express.js", "MongoDB", "TypeScript", "Tailwind CSS", "Aceternity UI", "shadcn/ui"],
    //         link: null,
    //         deployment: null
    //     }
    // ]

    const [projects, setProjects] = useState<Project[]> ([]);

    const { error: error, data: data } = useQuery(getAllProjects);

    useEffect(() => {
        if (error) {
            console.log(error);
            return;
        }
        if (data && data.projects) {
            setProjects(data.projects);
            // console.log(data);
        }
    }, [data, error]);

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
            {projects.length>0 && 
            <div className="mx-44 w-1/2 my-12">
                {projects.map((project: Project) => (
                    <div className="flex mb-12 w-180 flex-shrink-0 flex-grow-0" key={project.name}>
                        <div className="w-1/3 flex-shrink-0 text-light-green bg-transparent font-bold text-2xl flex justify-start  items-center p-4">{project.name}</div>
                        <div className="w-2/3 max-w-3/5 min-w-3/5 text-white bg-white/5 p-6 rounded-xl overflow-hidden text-wrap">
                            <p className="bg-transparent w-full max-w-full text-wrap break-words mb-6">{project.description}</p>
                            <p className="bg-transparent"><b className="bg-transparent text-light-green">Tech Stack - </b>{displayTechStack(project.techStack)}</p>
                            {(project.link || project.deployment) && (<div className="flex justify-center gap-x-12 bg-transparent w-full mt-6">
                                {project.link && (<p className="bg-transparent"><b className="bg-transparent flex justify-center items-center">GitHub&nbsp;&nbsp;<a href={project.link} target="_blank" className="bg-transparent"><MdOpenInNew className="bg-transparent text-white hover:cursor-pointer" /></a></b></p>)}
                                {project.deployment && (<p className="bg-transparent"><b className="bg-transparent flex justify-center items-center">Deployment&nbsp;&nbsp;<a href={project.deployment} target="_blank" className="bg-transparent"><MdOpenInNew className="bg-transparent text-white hover:cursor-pointer" /></a></b></p>)}
                            </div>)}
                        </div>
                    </div>
                ))}
            </div>}
        </MainCard>
    )
}