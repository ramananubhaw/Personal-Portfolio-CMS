import { useState, useEffect } from "react";
import MainDiv from "./MainDiv";
import { getAllProjects, addNewProject, updateProject, deleteProject } from "../graphql/projects";
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
        techStack: string[] | null,
        link: string | null,
        deployment: string | null,
        editing?: boolean,
        disabled?: boolean
    }

    const [projects, setProjects] = useState<Project[]> ([]);

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

    function displayTechStack(techStack: string[] | null): string {
        if (!techStack || techStack.length === 0) return "";
        return techStack.join(", ");
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

    function handleExistingProjectChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, p: Project, field: keyof Project) {
        const value = field==="techStack" ? e.target.value.split(", ") : e.target.value;
        setProjects((prevState: Project[]) => (
            prevState.map((project: Project) => (
                project.name === p.name ? {...project, [field]: value} : {...project}
            ))
        ))
    }

    // update existing project

    const [update, {error: updateError, data: updatedData}] = useMutation(updateProject);

    async function updateProjectDetails(project: Project) {
        const originalProject: Project = data?.projects.find((proj: Project) => proj.name === project.name);
        const isUnchanged = (): boolean => {
            if (!originalProject) {
                return false;
            }
            return Object.keys(project).every((key: string) => {
                const field = key as keyof Project;
                if (field==="techStack") {
                    return JSON.stringify(project[field]) === JSON.stringify(originalProject[field]);
                }
                return project[field] === originalProject[field];
            })
        }
        if (isUnchanged()) {
            handleEditingState(project);
            return;
        }
        const input = Object.fromEntries(
            Object.entries(project).filter(([key]) => key !== "name" && key !== "__typename" && key !== "editing" && key !== "disabled")
        );
        try {
            await update({
                variables: {
                    name: project.name,
                    input: input
                }
            })
            handleEditingState(project);
        }
        catch (error) {
            console.log(error);
            handleEditingState(project);
        }
    }

    useEffect(() => {
        if (updateError) {
            console.log(updateError);
            return;
        }
        if (updatedData && updatedData.updateProject) {
            const updatedProject = updatedData.updateProject;
            setProjects((prevState: Project[]) => (
                prevState.map((project: Project) => project.name === updatedProject.name ? {...updatedProject, editing: false, disabled: false} : {...project})
            ))
        }
    }, [updateError, updatedData]);

    function cancelUpdate(project: Project) {
        if (data) {
            const originalProject: Project = data.projects.find((proj: Project) => proj.name === project.name);
            setProjects((prevState) => (
                prevState.map((proj: Project) => 
                    proj.name === project.name ? {...originalProject, editing: false, disabled: false} : {...proj, editing: false, disabled: false}
                )
            ));
        }
        else {
            setProjects([]);
        }
    }

    // Add new project

    const initialNewProjectValues = {
        name: "",
        description: "",
        techStack: null,
        link: null,
        deployment: null,
        editing: false,
        disabled: false
    }

    const [newProject, setNewProject] = useState<Project> (initialNewProjectValues);

    function handleAddProjectClick(action: "submit" | "cancel" | "none") {
        setProjects((prevState: Project[]) => (
            prevState.map((project: Project) => (
                {...project, disabled: !project.disabled}
            ))
        ));
        if (action==="cancel") {
            setNewProject(initialNewProjectValues);
        }
        else {
            setNewProject((prevState: Project) => (
                {...prevState, editing: !prevState.editing}
            ));
        }
    }

    function handleNewProjectChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof Project) {
        let value;
        if (field === "techStack") {
            value = e.target.value ? e.target.value.split(", ") : null;
        }
        else {
            value = e.target.value;
        }
        setNewProject((prevState: Project) => ({
            ...prevState,
            [field]: value
        }));
    }
    

    const [addProject, {error: addError, data: addedData}] = useMutation(addNewProject);

    useEffect(() => {
        if (addError) {
            console.log(addError);
            setNewProject(initialNewProjectValues);
            return;
        }
        if (addedData) {
            // console.log(addedData);
            const addedProject = {...addedData.createProject, editing: false, disabled: false}
            setProjects((prevState) => [...prevState, addedProject]);
            setNewProject(initialNewProjectValues);
        }
    }, [addedData, addError]);

    function submitProjectDetails() {
        const filteredProject = {...newProject}
        delete filteredProject.editing;
        delete filteredProject.disabled;
        addProject({
            variables: {
                input: filteredProject
            }
        });
        handleAddProjectClick("submit");
    }

    // deleting existing project

    const [deleteProjectMutate, {error: deleteError, data: deleteData}] = useMutation(deleteProject);

    async function deleteSelectedProject(project: Project) {
        try {
            await deleteProjectMutate({
                variables: {
                    name: project.name
                }
            })
        }
        catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        if (deleteError) {
            console.log(deleteError);
            return;
        }
        if (deleteData && deleteData.deleteProject) {
            const deletedProject = deleteData.deleteProject;
            console.log(deletedProject);
            alert(deletedProject.message)
            if (deletedProject.deleted) {
                setProjects((prevState: Project[]) => (
                    prevState.filter((project: Project) => project.name !== deletedProject.id)
                ))
            }
        }
    }, [deleteError, deleteData])

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
                            <FormElement label="GitHub Link" value={project.link || ""} type="text" placeholder={project.editing ? "Enter here" : "None"} readOnly={!project.editing} onChange={(e) => handleExistingProjectChange(e, project, "link")} />
                            <FormElement label="Deployment Link" value={project.deployment || ""} type="text" placeholder={project.editing ? "Enter here" : "None"} readOnly={!project.editing} onChange={(e) => handleExistingProjectChange(e, project, "deployment")} />
                        </form>
                    </DisplayCard>
                    <div className="h-full w-1/12 flex flex-col space-y-6 justify-center items-center">
                        {project.editing ? <CancelButton onClick={() => cancelUpdate(project)} /> : <DeleteButton disabled={project.disabled} onClick={() => deleteSelectedProject(project)} />}
                        {project.editing ? <SaveButton onClick={() => updateProjectDetails(project)} /> : <EditButton onClick={() => handleEditingState(project)} disabled={project.disabled} />}
                    </div>
                </div>
            ))}
            {(newProject.editing) ? 
            <DisplayCard className="w-3/5 mb-12">
                <form className="bg-inherit flex flex-col justify-center items-center w-full py-5">
                    <FormElement label="Name" value={newProject.name} type="text" onChange={(e) => handleNewProjectChange(e, "name")} />
                    <FormElement label="Description" value={newProject.description} type="text" onChange={(e) => handleNewProjectChange(e, "description")} />
                    <FormElement label="Tech Stack" value={displayTechStack(newProject.techStack)} placeholder="Enter separated by a comma and a whitespace ', '" type="text" onChange={(e) => handleNewProjectChange(e, "techStack")} />
                    <FormElement label="GitHub Link" value={newProject.link || ""} type="text" onChange={(e) => handleNewProjectChange(e, "link")} />
                    <FormElement label="Deployment Link" value={newProject.deployment || ""} type="text" onChange={(e) => handleNewProjectChange(e, "deployment")} />
                    <div className="bg-inherit mt-2 flex justify-center items-center gap-x-10 w-full">
                        <Button className="bg-green-600 hover:bg-green-800" onClick={submitProjectDetails}>Submit</Button>
                        <Button className="bg-red-600 hover:bg-red-800" onClick={() => handleAddProjectClick("cancel")}>Cancel</Button>
                    </div>
                </form>
            </DisplayCard> : 
            <Button disabled={disableAddButton()} onClick={() => handleAddProjectClick("none")} className="mt-0 mb-8 bg-blue-600 text-white text-lg font-semibold hover:bg-blue-800 shadow-xl transition-colors duration-50">Add Project</Button>}
        </MainDiv>
    )
}