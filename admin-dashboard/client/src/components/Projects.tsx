import { useState, useEffect } from "react";
import NotAvailable from "./NotAvailable";
import DisplayCard from "./DisplayCard";
import { Button } from "./ui/button";
import FormElement from "./FormElement";
import CancelButton from "./buttons/CancelButton";
import DeleteButton from "./buttons/DeleteButton";
import EditButton from "./buttons/EditButton";
import SaveButton from "./buttons/SaveButton";

export default function Projects() {

    type Project = {
        name: null | string,
        description: null | string,
        techStack: null | string[],
        link: null | string,
        deployment: null | string,
        editing: boolean,
        disabled: boolean
    }

    const [projects, setProjects] = useState<Project[]> ([
        {
            name: "Complaint Box",
            description: "Online complaint registration portal",
            techStack: ["ReactJS", "ExpressJS", "MongoDB", "NodeJS"],
            link: null,
            deployment: null,
            editing: false,
            disabled: false
        },
        {
            name: "NASA APOD Project",
            description: "Basic React project using Vite",
            techStack: ["React", "Express", "MongoDB", "NodeJS"],
            link: null,
            deployment: null,
            editing: false,
            disabled: false
        },
        {
            name: "Iterative Zero",
            description: "Online complaint registration portal",
            techStack: ["React", "Express", "MongoDB", "NodeJS"],
            link: null,
            deployment: null,
            editing: false,
            disabled: false
        }
    ]);

    function displayTechStack(techStack: string[] | null): string {
        if (techStack==null) {
            return "";
        }
        let ts = "";
        for (let i=0; i<techStack.length-1; i++) {
            ts += `${techStack[i]}, `;
        }
        ts += `${techStack[techStack.length-1]}`;
        return ts;
    }

    function handleEditingState(p: Project) {
        setProjects((prevState: Project[]) => (
            prevState.map((project: Project) => (
                project.name === p.name ? {...project, editing: !project.editing} : {...project, disabled: !project.disabled}
            ))
        ))
    }

    function disableAddButton(): boolean {
        return projects.some((project: Project) => project.editing);
    }

    const noProject: boolean = (projects.length === 0);

    return noProject ? (
        <NotAvailable message="No project added" button="Add Project" />
    ) : (
        <div className="w-full flex flex-col justify-center items-center">
            <h1 className="font-bold text-3xl pt-5 pb-8 px-4 mt-2 text-center">PROJECTS</h1>
            {projects.map((project) => (
                <div className="w-3/5 flex justify-center items-center mb-10">
                    <DisplayCard className="flex-col justify-center items-center w-full">
                        <form className="bg-inherit flex flex-col justify-center items-center w-full py-5">
                            <FormElement label="Name" value={project.name || ""} type="text" readOnly={true} />
                            <FormElement label="Description" value={project.description || ""} type="text" readOnly={true} />
                            <FormElement label="Tech Stack" value={displayTechStack(project.techStack)} type="text" readOnly={true} />
                            <FormElement label="Project Link" value={project.link || "None"} type="text" readOnly={true} />
                            <FormElement label="Deployment Link" value={project.deployment || "None"} type="text" readOnly={true} />
                        </form>
                    </DisplayCard>
                    <div className="h-full w-1/12 flex flex-col space-y-6 justify-center items-center">
                        {project.editing ? <CancelButton handleEditingState={() => handleEditingState(project)} /> : <DeleteButton disabled={project.disabled} />}
                        {project.editing ? <SaveButton handleEditingState={() => handleEditingState(project)} /> : <EditButton handleEditingState={() => handleEditingState(project)} disabled={project.disabled} />}
                    </div>
                </div>
            ))}
            <Button disabled={disableAddButton()} onClick={() => {
                setProjects((prevState: Project[]) => (
                    prevState.map((project: Project) => (
                        {...project, disabled: !project.disabled}
                    ))
                ))
            }} className="mt-0 mb-8 bg-blue-600 text-white text-lg font-semibold hover:bg-blue-800 shadow-xl transition-colors duration-50">Add Project</Button>
        </div>
    )
}