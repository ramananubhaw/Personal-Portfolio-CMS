import { useState, useEffect } from "react";
import MainDiv from "./MainDiv";
import { getAllProjects, addNewProject } from "../graphql/projects";
import { useQuery, useMutation } from "@apollo/client";
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
        name: string,
        description: string,
        techStack: string[],
        link: string | null,
        deployment: string | null,
        editing: boolean,
        disabled: boolean
    }

    const [projects, setProjects] = useState<Project[]> ([]);
    
    // const [projects, setProjects] = useState<Project[]> ([
    //     {
    //         name: "Complaint Box",
    //         description: "Online complaint registration portal",
    //         techStack: ["ReactJS", "ExpressJS", "MongoDB", "NodeJS"],
    //         link: null,
    //         deployment: null,
    //         editing: false,
    //         disabled: false
    //     },
    //     {
    //         name: "NASA APOD Project",
    //         description: "Basic React project using Vite",
    //         techStack: ["ReactJS"],
    //         link: null,
    //         deployment: null,
    //         editing: false,
    //         disabled: false
    //     },
    //     {
    //         name: "Iterative Zero",
    //         description: "Personal Portfolio with Admin Dashboard",
    //         techStack: ["NextJS", "ReactJS", "ExpressJS", "MongoDB", "TypeScript", "Tailwind CSS"],
    //         link: null,
    //         deployment: null,
    //         editing: false,
    //         disabled: false
    //     }
    // ]);

    const {error: error, data: data} = useQuery(getAllProjects);

    useEffect(() => {
        if (error) {
            console.log(error);
            return;
        }
        if (data && data.projects) {
            data.projects.map((project: Project) => (
                {...project, editing: false, disabled: false}
            ))
            setProjects(data.projects);
        }
    }, [data, error]);

    function displayTechStack(techStack: string[]): string {
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

    function handleExistingProjectChange(e: React.ChangeEvent<HTMLInputElement>, p: Project, field: keyof Project) {
        setProjects((prevState: Project[]) => (
            prevState.map((project: Project) => (
                project.name === p.name ? {...project, [field]: e.target.value} : {...project}
            ))
        ))
    }

    // Add new project

    const initialNewProjectValues = {
        name: "",
        description: "",
        techStack: [""],
        link: null,
        deployment: null,
        editing: false,
        disabled: false
    }

    const [newProject, setNewProject] = useState<Project> (initialNewProjectValues);

    function handleAddProjectClick() {
        setProjects((prevState: Project[]) => (
            prevState.map((project: Project) => (
                {...project, disabled: !project.disabled}
            ))
        ));
        setNewProject((prevState: Project) => (
            {...prevState, editing: !prevState.editing}
        ));
    }

    function handleNewProjectChange(e: React.ChangeEvent<HTMLInputElement>, field: keyof Project) {
        let value;
        if (field === "techStack") {
            value = e.target.value ? e.target.value.split(", ").map(item => item.trim()) : [""];
        }
        else {
            value = e.target.value;
        }
        setNewProject((prevState: Project) => ({
            ...prevState,
            [field]: value
        }));
    }
    

    // const [addProject, {error: addError, data: addedData}] = useMutation(addNewProject);

    // useEffect(() => {
    //     handleAddProjectClick();
    //     setNewProject(initialNewProjectValues);
    //     if (addError) {
    //         console.log(addError);
    //         return;
    //     }
    // }, [addError, addedData]);

    // async function submitNewProject() {
    //     const filteredProject = Object.fromEntries(
    //         Object.entries(newProject).filter(([key]) => key !== "editing" && key !== "disabled")
    //     );
    //     const filteredInitialValues = Object.fromEntries(
    //         Object.entries(initialNewProjectValues).filter(([key]) => key !== "editing" && key !== "disabled")
    //     );
    //     const isUnchanged: boolean = Object.keys(filteredProject).every((field) => {
    //         if (field=="techStack") {
    //             const techStackProject = filteredProject[field as keyof Project] as string[];
    //             const techStackInitial = filteredInitialValues[field as keyof Project] as string[];
    //             if (techStackProject.length !== techStackInitial.length) return false;
    //             return techStackProject.every((value, index) => {
    //                 return value === techStackInitial[index]
    //             })
    //         }
    //         return filteredProject[field as keyof Project] === filteredInitialValues[field as keyof Project];
    //     });
    //     if (isUnchanged) {
    //         handleAddProjectClick();
    //         return;
    //     }
    //     try {
    //         console.log(filteredProject);
    //         await addProject({ variables: { input: filteredProject } });
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    //     handleAddProjectClick();
    // }
    

    const noProject: boolean = (projects.length === 0);

    return noProject ? (
        <NotAvailable message="No project added" button="Add Project" />
    ) : (
        <MainDiv>
            {projects.map((project) => (
                <div key={project.name} className="w-3/5 flex justify-center items-center mb-10">
                    <DisplayCard className="flex-col justify-center items-center w-full">
                        <h2 className="bg-inherit font-bold text-2xl pt-3 text-center">{project.name}</h2>
                        <form className="bg-inherit flex flex-col justify-center items-center w-full py-5">
                            <FormElement label="Description" value={project.description} type="text" placeholder={project.editing ? "Enter here" : "None"} readOnly={!project.editing} onChange={(e) => handleExistingProjectChange(e, project, "description")} />
                            <FormElement label="Tech Stack" value={displayTechStack(project.techStack)} type="text" placeholder={project.editing ? "Enter here" : "None"} readOnly={!project.editing} onChange={(e) => handleExistingProjectChange(e, project, "techStack")} />
                            <FormElement label="Project Link" value={project.link || ""} type="text" placeholder={project.editing ? "Enter here" : "None"} readOnly={!project.editing} onChange={(e) => handleExistingProjectChange(e, project, "link")} />
                            <FormElement label="Deployment Link" value={project.deployment || ""} type="text" placeholder={project.editing ? "Enter here" : "None"} readOnly={!project.editing} onChange={(e) => handleExistingProjectChange(e, project, "deployment")} />
                        </form>
                    </DisplayCard>
                    <div className="h-full w-1/12 flex flex-col space-y-6 justify-center items-center">
                        {project.editing ? <CancelButton onClick={() => handleEditingState(project)} /> : <DeleteButton disabled={project.disabled} />}
                        {project.editing ? <SaveButton onClick={() => handleEditingState(project)} /> : <EditButton onClick={() => handleEditingState(project)} disabled={project.disabled} />}
                    </div>
                </div>
            ))}
            {(newProject.editing) ? 
            <DisplayCard className="w-3/5 mb-12">
                <form className="bg-inherit flex flex-col justify-center items-center w-full py-5">
                    <FormElement label="Name" value={newProject.name} type="text" onChange={(e) => handleNewProjectChange(e, "name")} />
                    <FormElement label="Description" value={newProject.description} type="text" onChange={(e) => handleNewProjectChange(e, "description")} />
                    <FormElement label="Tech Stack" value={displayTechStack(newProject.techStack)} placeholder="Enter separated by a comma and a whitespace ', '" type="text" onChange={(e) => handleNewProjectChange(e, "techStack")} />
                    <FormElement label="Project Link" value={newProject.link || ""} type="text" onChange={(e) => handleNewProjectChange(e, "link")} />
                    <FormElement label="Deployment Link" value={newProject.deployment || ""} type="text" onChange={(e) => handleNewProjectChange(e, "deployment")} />
                    <div className="bg-inherit mt-2 flex justify-center items-center gap-x-10 w-full">
                        <Button className="bg-green-600 hover:bg-green-800" onClick={handleAddProjectClick}>Submit</Button>
                        <Button className="bg-red-600 hover:bg-red-800" onClick={handleAddProjectClick}>Cancel</Button>
                    </div>
                </form>
            </DisplayCard> : 
            <Button disabled={disableAddButton()} onClick={handleAddProjectClick} className="mt-0 mb-8 bg-blue-600 text-white text-lg font-semibold hover:bg-blue-800 shadow-xl transition-colors duration-50">Add Project</Button>}
        </MainDiv>
    )
}