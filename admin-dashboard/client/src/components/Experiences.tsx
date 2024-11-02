import { useState, useEffect } from "react";
import NotAvailable from "./NotAvailable";
import DisplayCard from "./DisplayCard";
import { Button } from "./ui/button";
import FormElement from "./FormElement";
import CancelButton from "./buttons/CancelButton";
import DeleteButton from "./buttons/DeleteButton";
import EditButton from "./buttons/EditButton";
import SaveButton from "./buttons/SaveButton";

export default function Experiences() {

    type DurationObject = {
        startDate: Date,
        endDate: null | Date,
        isCurrent: boolean
    }

    type Experience = {
        serialNo: number,
        mode: string,
        role: string,
        category: string,
        companyName: string,
        duration: DurationObject,
        companyAddress: string,
        editing: boolean,
        disabled: boolean
    }

    const [experiences, setExperiences] = useState<Experience[]> ([
        {
            serialNo: 1,
            mode: "Remote",
            role: "Full-stack developer",
            category: "Internship",
            companyName: "Iterative Zero",
            duration: {
                startDate: new Date("2024-10-01"),
                endDate: null,
                isCurrent: true
            },
            companyAddress: "Bengaluru, Karnataka, India",
            editing: false,
            disabled: false
        },
        {
            serialNo: 2,
            mode: "On-site",
            role: "Backend developer",
            category: "Internship",
            companyName: "skilledity solutions",
            duration: {
                startDate: new Date("2024-10-01"),
                endDate: null,
                isCurrent: true
            },
            companyAddress: "Vellore, Tamil Nadu, India",
            editing: false,
            disabled: false
        }
    ]);

    function handleEditingState(exp: Experience) {
        setExperiences((prevState: Experience[]) => (
            prevState.map((experience: Experience) => (
                experience.serialNo === exp.serialNo ? {...experience, editing: !experience.editing} : {...experience, disabled: !experience.disabled}
            ))
        ))
    }

    function disableAddButton(): boolean {
        return experiences.some((experience: Experience) => experience.editing);
    }

    function handleExistingExperienceChange(e: React.ChangeEvent<HTMLInputElement>, exp: Experience, field: keyof Experience, subField?: keyof DurationObject) {
        setExperiences((prevState: Experience[]) => (
            prevState.map((experience: Experience) => (
                experience.serialNo === exp.serialNo ? (
                    subField ? 
                    {...experience, [field]: {
                        ...(experience[field] as DurationObject), [subField]: e.target.value, 
                        isCurrent: (subField === "endDate" && e.target.value) ? false : (experience[field] as DurationObject).isCurrent
                    }} 
                    : {...experience, [field]: e.target.value}
                ) : {...experience}
            ))
        ))
    }

    const [newExperience, setNewExperience] = useState<Experience> ({
        serialNo: 3,
        mode: "",
        role: "",
        category: "",
        companyName: "",
        duration: {
            startDate: new Date(),
            endDate: null,
            isCurrent: true
        },
        companyAddress: "",
        editing: false,
        disabled: false
    })

    function handleAddExperienceClick() {
        setExperiences((prevState: Experience[]) => (
            prevState.map((experience: Experience) => (
                {...experience, disabled: !experience.disabled}
            ))
        ));
        setNewExperience((prevState: Experience) => (
            {...prevState, editing: !prevState.editing}
        ));
    }

    function handleNewExperienceChange(e: React.ChangeEvent<HTMLInputElement>, field: keyof Experience, subField?: keyof DurationObject) {
        setNewExperience((prevState: Experience) => (
            subField ? 
            {...prevState, [field]: {...(prevState[field] as DurationObject), [subField]: e.target.value, 
                isCurrent: (subField === "endDate" && e.target.value) ? false : (prevState[field] as DurationObject).isCurrent}} 
            : {...prevState, [field]: e.target.value}
        ))
    }

    const noExperience: boolean = (experiences.length === 0);

    return noExperience ? (
        <NotAvailable message="No experience added" button="Add Experience" />
    ) : (
        <div className="w-full flex flex-col justify-center items-center mt-8">
            {experiences.map((experience) => (
                <div key={experience.serialNo} className="w-3/5 flex justify-center items-center mb-10">
                    <DisplayCard className="flex-col justify-center items-center w-full">
                        <h2 className="bg-inherit font-bold text-2xl pt-3 text-center">Experience-{experience.serialNo}</h2>
                        <form className="bg-inherit flex flex-col justify-center items-center w-full py-5">
                            <FormElement label="Mode" value={experience.mode} type="text" readOnly={!experience.editing} onChange={(e) => handleExistingExperienceChange(e, experience, "mode")} />
                            <FormElement label="Role" value={experience.role} type="text" readOnly={!experience.editing} onChange={(e) => handleExistingExperienceChange(e, experience, "role")} />
                            <FormElement label="Category" value={experience.category} type="text" readOnly={!experience.editing} onChange={(e) => handleExistingExperienceChange(e, experience, "category")} />
                            <FormElement label="Company Name" value={experience.companyName} type="text" readOnly={!experience.editing} onChange={(e) => handleExistingExperienceChange(e, experience, "companyName")} />
                            <FormElement label="Start Date" value={experience.duration.startDate.toISOString().split('T')[0]} type="date" readOnly={!experience.editing} onChange={(e) => handleExistingExperienceChange(e, experience, "duration", "startDate")} />
                            <FormElement label="End Date" value={experience.duration.endDate ? new Date(experience.duration.endDate).toISOString().split('T')[0] : "Currently working here"} type={experience.editing ? "date" : (experience.duration.isCurrent ? "text" : "date")} readOnly={!experience.editing} onChange={(e) => handleExistingExperienceChange(e, experience, "duration", "endDate")} />
                            <FormElement label="Location" value={experience.companyAddress} type="text" readOnly={!experience.editing} onChange={(e) => handleExistingExperienceChange(e, experience, "companyAddress")} />
                        </form>
                    </DisplayCard>
                    <div className="h-full w-1/12 flex flex-col space-y-6 justify-center items-center">
                        {experience.editing ? <CancelButton handleEditingState={() => handleEditingState(experience)} /> : <DeleteButton disabled={experience.disabled} />}
                        {experience.editing ? <SaveButton handleEditingState={() => handleEditingState(experience)} /> : <EditButton handleEditingState={() => handleEditingState(experience)} disabled={experience.disabled} />}
                    </div>
                </div>
            ))}
            {(newExperience.editing) ? 
            <DisplayCard className="w-3/5 mb-12">
                <form className="bg-inherit flex flex-col justify-center items-center w-full py-5">
                    <FormElement label="Mode" value={newExperience.mode} type="text" onChange={(e) => handleNewExperienceChange(e, "mode")} />
                    <FormElement label="Role" value={newExperience.role} type="text" readOnly={!newExperience.editing} onChange={(e) => handleNewExperienceChange(e, "role")} />
                    <FormElement label="Category" value={newExperience.category} type="text" onChange={(e) => handleNewExperienceChange(e, "category")} />
                    <FormElement label="Company Name" value={newExperience.companyName} type="text" onChange={(e) => handleNewExperienceChange(e, "companyName")} />
                    <FormElement label="Start Date" value={newExperience.duration.startDate.toISOString().split('T')[0]} type="date" onChange={(e) => handleNewExperienceChange(e, "duration", "startDate")} />
                    <FormElement label="End Date" value={newExperience.duration.endDate ? new Date(newExperience.duration.endDate).toISOString().split('T')[0] : ""} type="date" onChange={(e) => handleNewExperienceChange(e, "duration", "endDate")} />
                    <FormElement label="Location" value={newExperience.companyAddress} type="text" onChange={(e) => handleNewExperienceChange(e, "companyAddress")} />
                    <div className="bg-inherit mt-2 flex justify-center items-center gap-x-10 w-full">
                        <Button className="bg-green-600 hover:bg-green-800" onClick={handleAddExperienceClick}>Submit</Button>
                        <Button className="bg-red-600 hover:bg-red-800" onClick={handleAddExperienceClick}>Cancel</Button>
                    </div>
                </form>
            </DisplayCard> : 
            <Button disabled={disableAddButton()} onClick={handleAddExperienceClick} className="mt-0 mb-8 bg-blue-600 text-white text-lg font-semibold hover:bg-blue-800 shadow-xl transition-colors duration-50">Add Experience</Button>}
        </div>
    )
}