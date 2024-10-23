import { useState } from "react";
import NotAvailable from "./NotAvailable";

export default function Projects() {

    type Project = {
        name: null | string,
        description: null | string,
        techStack: null | string[],
        link: null | string,
        deployment: null | string
    }

    const [projects, setProjects] = useState<Project[]> ([]);

    const noProject: boolean = (projects.length === 0);

    return noProject ? (
        <NotAvailable message="No project added" button="Add Project" />
    ) : (
        <>

        </>
    )
}