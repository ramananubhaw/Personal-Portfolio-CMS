import { useState, useEffect } from "react";
import { getAllExperiences, addExperience, updateExperience } from "@/graphql/experiences";
import { useQuery, useMutation } from "@apollo/client";
import MainDiv from "./MainDiv";
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
        startDate: string,
        endDate: null | string,
        isCurrent: boolean
    }

    type Experience = {
        serialNo: number,
        mode: string,
        role: string,
        category: string,
        companyName: string,
        duration: DurationObject,
        companyAddress: string | null,
        editing: boolean,
        disabled: boolean
    }

    const [experiences, setExperiences] = useState<Experience[]> ([]);

    const {error: error, data: data} = useQuery(getAllExperiences);

    useEffect(() => {
        if (error) {
            console.log(error);
            return;
        }
        if (data) {
            // console.log(data);
            data.getAllExperiences.map((experience: Experience) => (
                {...experience, editing: false, disabled: false}
            ))
            setExperiences(data.getAllExperiences);
        }
    }, [data, error]);

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

    function handleExistingExperienceChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, exp: Experience, field: keyof Experience, subField?: keyof DurationObject) {
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

    // updating existing experience

    const [ update, { error: updateError, data: updatedData } ] = useMutation(updateExperience);

    async function updateExperienceData(experience: Experience) {
        const originalExperience: Experience = data?.getAllExperiences.find((exp: Experience) => exp.serialNo === experience.serialNo);
        const isUnchanged = (): boolean => {
            if (!originalExperience) {
                return false;
            }
            return Object.keys(experience).every((key: string) => {
                const field = key as keyof Experience;

                if (field==="duration") {
                    const duration: DurationObject = experience.duration;
                    const originalDuration: DurationObject = originalExperience.duration;
                    return (
                        duration.startDate === originalDuration.startDate &&
                        duration.endDate === originalDuration.endDate &&
                        duration.isCurrent === originalDuration.isCurrent
                    );
                }

                if (field==="editing" || field==="disabled") {
                    return true;
                }
                return experience[field as keyof Experience] === originalExperience[field as keyof Experience]
            })
        }

        if (isUnchanged()) {
            handleEditingState(experience);
            return;
        }

        // console.log(experience);

        const input = Object.fromEntries(
            Object.entries(experience).filter(([key]) => key !== "serialNo" && key !== "editing" && key !== "disabled" && key !== "__typename")
        );

        if (input.duration) {
            input.duration = Object.fromEntries(
                Object.entries(input.duration).filter(([key]) => key !== "__typename")
            ) as DurationObject;
        }

        // console.log(input);

        try {
            await update({
                variables: {
                    serialNo: experience.serialNo,
                    input: input
                }
            })
            handleEditingState(experience);
        }
        catch (error) {
            console.log(error);
            handleEditingState(experience);
        }
    }

    useEffect(() => {
        if (updateError) {
            console.log(updateError);
            return;
        }
        if (updatedData && updatedData.updateExperience) {
            const updatedExperience = updatedData.updateExperience;
            // console.log(updatedExperience);
            setExperiences((prevState: Experience[]) => (
                prevState.map((experience: Experience) => 
                    experience.serialNo === updatedExperience.serialNo ? {...updatedExperience, editing: false, disabled: false} : {...experience}   
                )
            ))
        }
    }, [updateError, updatedData]);

    function cancelUpdate(experience: Experience) {
        if (data) {
            const originalExperience: Experience = data.getAllExperiences.find((exp: Experience) => exp.serialNo === experience.serialNo);
            setExperiences((prevState: Experience[]) => (
                prevState.map((exp: Experience) => exp.serialNo === experience.serialNo ? {...originalExperience, editing: false, disabled: false} : {...exp, editing: false, disabled: false})
            ))
        }
        else {
            setExperiences([]);
        }
    }

    // adding new experience

    type NewExperience = {
        mode: string,
        role: string,
        category: string,
        companyName: string,
        duration: DurationObject,
        companyAddress: string | null,
        editing?: boolean,
        disabled?: boolean
    }

    const initialNewExperienceValues = {
        mode: "",
        role: "",
        category: "",
        companyName: "",
        duration: {
            startDate: "",
            endDate: null,
            isCurrent: true
        },
        companyAddress: null,
        editing: false,
        disabled: false
    };

    const [newExperience, setNewExperience] = useState<NewExperience> (initialNewExperienceValues)

    function handleAddExperienceClick(action: "submit" | "cancel" | "none") {
        setExperiences((prevState: Experience[]) => (
            prevState.map((experience: Experience) => (
                {...experience, disabled: !experience.disabled}
            ))
        ));
        if (action==="cancel") {
            setNewExperience(initialNewExperienceValues);
        }
        else {
            setNewExperience((prevState: NewExperience) => (
                {...prevState, editing: !prevState.editing}
            ));
        }
        // console.log(newExperience);
    }

    function handleNewExperienceChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof Experience, subField?: keyof DurationObject) {
        setNewExperience((prevState: NewExperience) => (
            subField ? 
            {...prevState, [field]: {...(prevState[field as keyof NewExperience] as DurationObject), [subField]: e.target.value, 
                isCurrent: (subField === "endDate" && e.target.value) ? false : (prevState[field as keyof NewExperience] as DurationObject).isCurrent}} 
            : {...prevState, [field]: e.target.value}
        ))
    }

    const [addExperienceMutate, {error: addError, data: addedData}] = useMutation(addExperience);

    useEffect(() => {
        if (addError) {
            console.log(addError);
            setNewExperience(initialNewExperienceValues);
            return;
        }
        if (addedData && addedData.createExperience) {
            console.log(addedData.createExperience);
            const addedExperience = {...addedData.createExperience, editing: false, disabled: false}
            setExperiences((prevState) => [...prevState, addedExperience]);
            setNewExperience(initialNewExperienceValues);
        }
    }, [addError, addedData]);

    function submitExperienceDetails() {
        // console.log(newExperience);
        const filteredExperience = {...newExperience}
        delete filteredExperience.editing;
        delete filteredExperience.disabled;
        addExperienceMutate({
            variables: {
                input: filteredExperience
            }
        })
        handleAddExperienceClick("submit");
    }

    const noExperience: boolean = (experiences.length === 0);

    return noExperience ? (
        <NotAvailable message="No experience added" button="Add Experience" />
    ) : (
        <MainDiv>
            {experiences.map((experience) => (
                <div key={experience.serialNo} className="w-3/5 flex justify-center items-center mb-10">
                    <DisplayCard className="flex-col justify-center items-center w-full">
                        <h2 className="bg-inherit font-bold text-2xl pt-3 text-center">Experience-{experience.serialNo}</h2>
                        <form className="bg-inherit flex flex-col justify-center items-center w-full py-5">
                            <FormElement label="Mode" value={experience.mode} type="text" selectOptions={["On-site", "Remote"]} readOnly={!experience.editing} onChange={(e) => handleExistingExperienceChange(e, experience, "mode")} />
                            <FormElement label="Role" value={experience.role} type="text" readOnly={!experience.editing} onChange={(e) => handleExistingExperienceChange(e, experience, "role")} />
                            <FormElement label="Category" value={experience.category} type="text" selectOptions={["Full-time", "Internship", "Contractual", "Freelance", "Club"]} readOnly={!experience.editing} onChange={(e) => handleExistingExperienceChange(e, experience, "category")} />
                            <FormElement label="Company Name" value={experience.companyName} type="text" readOnly={!experience.editing} onChange={(e) => handleExistingExperienceChange(e, experience, "companyName")} />
                            <FormElement label="Start Date" value={experience.duration.startDate} type="date" readOnly={!experience.editing} onChange={(e) => handleExistingExperienceChange(e, experience, "duration", "startDate")} />
                            <FormElement label="End Date" value={experience.duration.endDate ? experience.duration.endDate : "Currently working here"} type={experience.editing ? "date" : (experience.duration.isCurrent ? "text" : "date")} readOnly={!experience.editing} onChange={(e) => handleExistingExperienceChange(e, experience, "duration", "endDate")} />
                            <FormElement label="Location" value={experience.companyAddress || ""} placeholder={experience.editing ? "Enter here" : "None"} type="text" readOnly={!experience.editing} onChange={(e) => handleExistingExperienceChange(e, experience, "companyAddress")} />
                        </form>
                    </DisplayCard>
                    <div className="h-full w-1/12 flex flex-col space-y-6 justify-center items-center">
                        {experience.editing ? <CancelButton onClick={() => cancelUpdate(experience)} /> : <DeleteButton disabled={experience.disabled} />}
                        {experience.editing ? <SaveButton onClick={() => updateExperienceData(experience)} /> : <EditButton onClick={() => handleEditingState(experience)} disabled={experience.disabled} />}
                    </div>
                </div>
            ))}
            {(newExperience.editing) ? 
            <DisplayCard className="w-3/5 mb-12">
                <form className="bg-inherit flex flex-col justify-center items-center w-full py-5">
                    <FormElement label="Mode" value={newExperience.mode} type="text" selectOptions={["On-site", "Remote"]} onChange={(e) => handleNewExperienceChange(e, "mode")} />
                    <FormElement label="Role" value={newExperience.role} type="text" readOnly={!newExperience.editing} onChange={(e) => handleNewExperienceChange(e, "role")} />
                    <FormElement label="Category" value={newExperience.category} type="text" selectOptions={["Full-time", "Internship", "Contractual", "Freelance", "Club"]} onChange={(e) => handleNewExperienceChange(e, "category")} />
                    <FormElement label="Company Name" value={newExperience.companyName} type="text" onChange={(e) => handleNewExperienceChange(e, "companyName")} />
                    <FormElement label="Start Date" value={newExperience.duration.startDate} type="date" onChange={(e) => handleNewExperienceChange(e, "duration", "startDate")} />
                    <FormElement label="End Date" value={newExperience.duration.endDate ? newExperience.duration.endDate : ""} type="date" onChange={(e) => handleNewExperienceChange(e, "duration", "endDate")} />
                    <FormElement label="Location" value={newExperience.companyAddress || ""} type="text" onChange={(e) => handleNewExperienceChange(e, "companyAddress")} />
                    <div className="bg-inherit mt-2 flex justify-center items-center gap-x-10 w-full">
                        <Button className="bg-green-600 hover:bg-green-800" onClick={submitExperienceDetails}>Submit</Button>
                        <Button className="bg-red-600 hover:bg-red-800" onClick={() => handleAddExperienceClick("cancel")}>Cancel</Button>
                    </div>
                </form>
            </DisplayCard> : 
            <Button disabled={disableAddButton()} onClick={() => handleAddExperienceClick("none")} className="mt-0 mb-8 bg-blue-600 text-white text-lg font-semibold hover:bg-blue-800 shadow-xl transition-colors duration-50">Add Experience</Button>}
        </MainDiv>
    )
}