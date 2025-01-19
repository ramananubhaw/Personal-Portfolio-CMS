import { useState, useEffect, ReactNode } from "react";
import { getAllSkills } from "@/graphql/skills";
import { useQuery } from "@apollo/client";
import MainDiv from "./MainDiv";
import NotAvailable from "./NotAvailable";
import DisplayCard from "./DisplayCard";
import { Button } from "./ui/button";
import FormElement from "./FormElement";
import CancelButton from "./buttons/CancelButton";
import DeleteButton from "./buttons/DeleteButton";
import EditButton from "./buttons/EditButton";
import SaveButton from "./buttons/SaveButton";

export default function Skills() {

    type Certificate = {
        name: string,
        link: string
    }
    
    type Skill = {
        name: string,
        category: string,
        certifications: Certificate[] | null,
        editing: boolean,
        disabled: boolean
    }

    const [skills, setSkills] = useState<Skill[]> ([]);

    const {error: error, data: data} = useQuery(getAllSkills);

    useEffect(() => {
        if (error) {
            console.log(error);
            return;
        }
        if (data && data.getAllSkills) {
            // console.log(data);
            data.getAllSkills.map((skill: Skill) => (
                {...skill, editing: false, disabled: false}
            ))
            setSkills(data.getAllSkills);
        }
    }, [data, error]);

    // function displayCertifications(certifications: Certificate[] | null): string {
    //     if (certifications === null) {
    //         return "None";
    //     }
    //     let cert = "";
    //     for (let i=0; i<certifications.length-1; i++) {
    //         cert += `${certifications[i]}, `;
    //     }
    //     cert += `${certifications[certifications.length-1]}`;
    //     return cert;
    // }

    function handleEditingState(s: Skill) {
        setSkills((prevState: Skill[]) => (
            prevState.map((skill: Skill) => (
                skill.name === s.name ? {...skill, editing: !skill.editing} : {...skill, disabled: !skill.disabled}
            ))
        ))
    }

    function disableAddButton(): boolean {
        return skills.some((skill: Skill) => skill.editing);
    }

    function handleExistingSkillChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, s: Skill, field: keyof Skill) {
        setSkills((prevState: Skill[]) => (
            prevState.map((skill: Skill) => (
                skill.name === s.name ? {...skill, [field]: e.target.value} : {...skill}
            ))
        ))
    }

    const initialNewSkillValues = {
        name: "",
        category: "",
        certifications: null,
        editing: false,
        disabled: false
    };

    const [newSkill, setNewSkill] = useState<Skill> (initialNewSkillValues)

    function handleAddSkillClick(action: "submit" | "cancel" | "none") {
        setSkills((prevState: Skill[]) => (
            prevState.map((skill: Skill) => (
                {...skill, disabled: !skill.disabled}
            ))
        ));
        if (action==="cancel") {
            setNewSkill(initialNewSkillValues);
        }
        else {
            setNewSkill((prevState: Skill) => (
                {...prevState, editing: !prevState.editing}
            ));
        }
    }

    function handleNewSkillChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof Skill) {
        let value;
        if (field === "certifications") {
            value = e.target.value.split(', ');

        }
        else value = e.target.value;
        setNewSkill((prevState: Skill) => (
            {...prevState, [field]: value}
        ))
        console.log(newSkill.certifications);
    }

    function renderAddSkill(): ReactNode {
        return (
            (newSkill.editing) ? 
            <DisplayCard className="w-1/2 mb-12">
                <form className="bg-inherit flex flex-col justify-center items-center w-full py-5">
                    <FormElement label="Name" value={newSkill.name} type="text" onChange={(e) => handleNewSkillChange(e, "name")} />
                    <FormElement label="Category" value={newSkill.category} type="text" onChange={(e) => handleNewSkillChange(e, "category")} />
                    <FormElement label="Certifications" value="" placeholder="Enter separated by a comma and a whitespace ', '" type="text" onChange={(e) => handleNewSkillChange(e, "certifications")} />
                    <div className="bg-inherit mt-2 flex justify-center items-center gap-x-10 w-full">
                        <Button className="bg-green-600 hover:bg-green-800" onClick={() => handleAddSkillClick("submit")}>Submit</Button>
                        <Button className="bg-red-600 hover:bg-red-800" onClick={() => handleAddSkillClick("cancel")}>Cancel</Button>
                    </div>
                </form>
            </DisplayCard> : 
            <Button disabled={disableAddButton()} onClick={() => handleAddSkillClick("none")} className="mt-0 mb-8 bg-blue-600 text-white text-lg font-semibold hover:bg-blue-800 shadow-xl transition-colors duration-50">Add Skill</Button>
        )
    }

    const noSkills: boolean = (skills.length === 0);

    return noSkills ? (
        <NotAvailable message="No skill added" render={renderAddSkill} />
    ) : (
        <MainDiv>
            {skills.map((skill) => (
                <div key={skill.name} className="w-1/2 flex justify-center items-center mb-10">
                    <DisplayCard className="flex-col justify-center items-center w-full">
                        <h2 className="bg-inherit font-bold text-2xl pt-3 text-center">{skill.name}</h2>
                        <form className="bg-inherit flex flex-col justify-center items-center w-full py-5">
                            <FormElement label="Category" value={skill.category} type="text" readOnly={!skill.editing} onChange={(e) => handleExistingSkillChange(e, skill, "category")} />
                            {skill.certifications ? (
                                <div>
                                    <h3>Certifications</h3>
                                    <FormElement label="Certifications" value="" placeholder={skill.editing ? "Enter Here" : "None"} type="text" readOnly={!skill.editing} onChange={(e) => handleExistingSkillChange(e, skill, "certifications")} />
                                </div>
                            ) : (
                                <FormElement label="Certifications" value="" placeholder={skill.editing ? "Enter Here" : "None"} type="text" readOnly={!skill.editing} onChange={(e) => handleExistingSkillChange(e, skill, "certifications")} />
                            )}
                        </form>
                    </DisplayCard>
                    <div className="h-full flex flex-col space-y-6 justify-center items-center">
                        {skill.editing ? <CancelButton onClick={() => handleEditingState(skill)} /> : <DeleteButton disabled={skill.disabled} />}
                        {skill.editing ? <SaveButton onClick={() => handleEditingState(skill)} /> : <EditButton onClick={() => handleEditingState(skill)} disabled={skill.disabled} />}
                    </div>
                </div>
            ))}
            {renderAddSkill()}
        </MainDiv>
    )
}