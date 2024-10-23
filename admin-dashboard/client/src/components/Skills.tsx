import { useState } from "react";
import NotAvailable from "./NotAvailable";

export default function Skills() {

    type Skill = {
        name: null | string,
        category: null | string,
        certifications: null | string[]
    }

    const [skills, setSkills] = useState<Skill[]> ([]);

    const noSkills: boolean = (skills.length === 0);

    return noSkills ? (
        <NotAvailable message="No skill added" button="Add skill" />
    ) : (
        <>
        
        </>
    )
}