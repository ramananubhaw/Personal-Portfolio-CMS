import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { getPersonalInfo, updatePersonalInfo, emailChange, passwordChange } from "../graphql/admin";
import NotAvailable from "./NotAvailable";
import FormElement from "./FormElement";
import EditButton from "./buttons/EditButton";
import SaveButton from "./buttons/SaveButton";
import CancelButton from "./buttons/CancelButton";
import DisplayCard from "./DisplayCard";
import { Button } from "./ui/button";

export default function PersonalInfo() {

    // personal info

    type PersonalInfo = {
        name: string;
        email: string;
        dob: string;
        phone: string;
        country: string;
        resumeLink: string | null;
    }

    const [personalInfo, setPersonalInfo] = useState<PersonalInfo> ({
        name: "",
        email: "",
        dob: "",
        phone: "",
        country: "",
        resumeLink: null
    })

    const { error: error, data: data } = useQuery(getPersonalInfo);
    
    useEffect(() => {
        if (error) {
            console.log(error);
            return;
        }
        if (data && data.admin) {
            setPersonalInfo(data.admin);
        }
    }, [data, error]);
    
    function handlePersonalInfoChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof PersonalInfo) {
        setPersonalInfo((prevState) => ({
            ...prevState, [field]: e.target.value 
        }))
    }
    
    // editing state
    
    const [editing, setEditing] = useState<boolean> (false);
    
    function handleEditingState() {
        setEditing(!editing);
    }
    
    // update personal info
    
    const [ update, {error: updateError, data: updatedData} ] = useMutation(updatePersonalInfo)

    async function updateInfo() {
        const isUnchanged: boolean = Object.keys(personalInfo).every((field: string) => {
            return personalInfo[field as keyof PersonalInfo] === data.admin[field as keyof PersonalInfo];
        });
    
        if (isUnchanged) {
            handleEditingState();
            return;
        }
    
        try {
            const { __typename, ...inputData } = personalInfo as PersonalInfo & {__typename: string};
            const changedFields = Object.fromEntries(
                Object.entries(inputData).filter(([key, value]) => {
                    return value !== data.admin[key as keyof PersonalInfo];
                })
            );
            // console.log(changedFields);
            await update({ variables: { input: changedFields } });
        }
        catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        if (updateError) {
            console.log(updateError);
            handleEditingState();
            return;
        }
        if (updatedData) {
            setPersonalInfo(updatedData.updateAdmin);
            handleEditingState();
        }
    }, [updatedData, updateError]);

    function cancelUpdate() {
        if (data) {
            setPersonalInfo(data.admin);
        }
        else {
            setPersonalInfo({
                name: "",
                email: "",
                dob: "",
                phone: "",
                country: "",
                resumeLink: null
            });
        }
        handleEditingState();
    }
    
    // change email

    const [changeEmail, setChangeEmail] = useState<{newEmail: string, password: string}> ({
        newEmail: "",
        password: ""
    });

    function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof {newEmail: string, password: string}) {
        setChangeEmail((prevState: {newEmail: string, password: string}) => ({
            ...prevState, [field]: e.target.value
        }))
    }

    const [ changeEmailMutate, { error: emailUpdateError, data: emailUpdateData } ] = useMutation(emailChange);

    async function submitEmailChange() {
        if (changeEmail.newEmail === personalInfo.email) {
            alert("New Email can't be same as old Email.");
            handleCredentialsChangeClick("email", "cancel");
            return;
        }

        try {
            await changeEmailMutate({ variables: { input: changeEmail } });
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (emailUpdateError) {
            console.log(emailUpdateError);
            handleCredentialsChangeClick("email", "cancel");
            return;
        }
        if (emailUpdateData && emailUpdateData.changeEmail) {
            console.log("updated is not yet decided.");
            alert(emailUpdateData.changeEmail.message);
            if (!emailUpdateData.changeEmail.updated) {
                handleCredentialsChangeClick("email", "cancel");
                return;
            }
            console.log("updated is true.")
            sessionStorage.setItem("loggedIn", "false");
        }
    }, [emailUpdateData, emailUpdateError]);

    // change password

    const [changePassword, setChangePassword] = useState<{oldPassword: string, newPassword: string}> ({
        oldPassword: "",
        newPassword: ""
    })

    function handleChangePassword(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof {oldPassword: string, newPassword: string}) {
        setChangePassword((prevState: {oldPassword: string, newPassword: string}) => ({
            ...prevState, [field]: e.target.value
        }))
    }

    const [ changePasswordMutate, { error: passwordUpdateError, data: passwordUpdateData } ] = useMutation(passwordChange);

    async function submitPasswordChange() {
        if (changePassword.oldPassword === changePassword.newPassword) {
            alert("New Password can't be same as old Password.");
            handleCredentialsChangeClick("password", "cancel");
            return;
        }

        try {
            await changePasswordMutate({ variables: { input: changePassword } });
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (passwordUpdateError) {
            console.log(passwordUpdateError);
            handleCredentialsChangeClick("password", "cancel");
            return;
        }
        if (passwordUpdateData && passwordUpdateData.changePassword) {
            console.log("updated is not yet decided.");
            alert(passwordUpdateData.changePassword.message);
            if (!passwordUpdateData.changePassword.updated) {
                handleCredentialsChangeClick("password", "cancel");
                return;
            }
            console.log("updated is true.")
            sessionStorage.setItem("loggedIn", "false");
        }
    }, [passwordUpdateData, passwordUpdateError]);

    // credentials change

    const [credentialsChange, setCredentialsChange] = useState<{email: boolean, password: boolean}> ({
        email: false,
        password: false
    })

    function handleCredentialsChangeClick(credential: keyof typeof credentialsChange, action: "submit" | "cancel" | "none") {
        setCredentialsChange((prevState: {email: boolean, password: boolean}) => ({
            ...prevState, email: false, password: false, [credential]: !prevState[credential]
        }));
        if (action==="cancel" || action==="submit") {
            if (credential==="email") {
                setChangeEmail({
                    newEmail: "",
                    password: ""
                })
            }
            else {
                setChangePassword({
                    oldPassword: "",
                    newPassword: ""
                })
            }
        }
    }

    function renderCredentialsChange() {
        if (credentialsChange.email) {
            return (
                <DisplayCard className="w-1/2">
                    <form className="bg-inherit flex flex-col justify-center items-center w-full py-5">
                        <FormElement label="New Email" value={changeEmail.newEmail} type="email" onChange={(e) => handleChangeEmail(e, "newEmail")} />
                        <FormElement label="Enter password" value={changeEmail.password} type="password" onChange={(e) => handleChangeEmail(e, "password")} />
                        <div className="bg-inherit mt-2 flex justify-center items-center gap-x-10 w-full">
                            <Button disabled={changeEmail.newEmail=="" || changeEmail.password==""} className="bg-green-600 hover:bg-green-800" onClick={submitEmailChange}>Submit</Button>
                            <Button className="bg-red-600 hover:bg-red-800" onClick={() => handleCredentialsChangeClick("email", "cancel")}>Cancel</Button>
                        </div>
                    </form>
                </DisplayCard>
            )
        }
        else if (credentialsChange.password) {
            return (
                <DisplayCard className="w-1/2">
                    <form className="bg-inherit flex flex-col justify-center items-center w-full py-5">
                        <FormElement label="Old Password" value={changePassword.oldPassword} type="password" onChange={(e) => handleChangePassword(e, "oldPassword")} />
                        <FormElement label="New password" value={changePassword.newPassword} type="password" onChange={(e) => handleChangePassword(e, "newPassword")} />
                        <div className="bg-inherit mt-2 flex justify-center items-center gap-x-10 w-full">
                            <Button disabled={changePassword.oldPassword=="" || changePassword.newPassword==""} className="bg-green-600 hover:bg-green-800" onClick={submitPasswordChange}>Submit</Button>
                            <Button className="bg-red-600 hover:bg-red-800" onClick={() => handleCredentialsChangeClick("password", "cancel")}>Cancel</Button>
                        </div>
                    </form>
                </DisplayCard>
            )
        }
        else {
            return (
                <div className="w-1/3">
                    <DisplayCard className="flex items-center justify-center gap-x-14 py-6">
                        <Button disabled={editing} onClick={() => handleCredentialsChangeClick("email", "none")} className="text-md bg-blue-600 hover:bg-blue-800">Change Email</Button>
                        <Button disabled={editing} onClick={() => handleCredentialsChangeClick("password", "none")} className="text-md bg-blue-600 hover:bg-blue-800">Change Password</Button>
                    </DisplayCard>
                </div>
            )
        }
    }

    const noInfo: boolean = Object.values(personalInfo).every((field) => field === "");

    return noInfo ? (
        <>
            <NotAvailable message="Personal Information not available" />
        </>
    ) : (
        <div className="w-full h-screen flex flex-col justify-center gap-y-16 items-center">
            <div className="w-1/2 flex h-5/12">
                <DisplayCard className="w-full h-full pb-2 flex-col">
                    <h1 className="bg-inherit font-bold text-3xl pt-2 pb-8 px-4 mt-2 text-center">Personal Information</h1>
                    <form className="bg-inherit mb-2">
                        <FormElement label="Name" value={personalInfo.name} type="text" placeholder={editing ? "Enter here" : "None"} readOnly={!editing} onChange={(e) => handlePersonalInfoChange(e, "name")} />
                        <FormElement label="Email" value={personalInfo.email} type="email" readOnly={true} />
                        <FormElement label="Date of Birth" value={personalInfo.dob} type="date" readOnly={!editing} onChange={(e) => handlePersonalInfoChange(e, "dob")} />
                        <FormElement label="Phone" value={personalInfo.phone} type="number" placeholder={editing ? "Enter here" : "None"} readOnly={!editing} onChange={(e) => handlePersonalInfoChange(e, "phone")} />
                        <FormElement label="Country" value={personalInfo.country} type="text" placeholder={editing ? "Enter here" : "None"} readOnly={!editing} onChange={(e) => handlePersonalInfoChange(e, "country")} />
                        <FormElement label="Resume Link" value={personalInfo.resumeLink || ""} type="text" placeholder={editing ? "Enter here" : "None"} readOnly={!editing} onChange={(e) => handlePersonalInfoChange(e, "resumeLink")} />
                    </form>
                </DisplayCard>
                <div className="flex flex-col space-y-6 justify-center items-center">
                    {editing && <CancelButton onClick={cancelUpdate} />}
                    {editing ? <SaveButton onClick={updateInfo} /> : <EditButton onClick={handleEditingState} disabled={credentialsChange.email || credentialsChange.password} />}
                </div>
            </div>

            {renderCredentialsChange()}

        </div>
    )
}