import { useState, useEffect } from "react";
import NotAvailable from "./NotAvailable";
import FormElement from "./FormElement";
import DeleteButton from "./buttons/DeleteButton";
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
    }

    const [personalInfo, setPersonalInfo] = useState<PersonalInfo> ({
        name: "TUVTUVTUV",
        email: "xyzabc@gmail.com",
        dob: "2009-12-01",
        phone: "3434343434",
        country: "XYZABC"
    })

    const noInfo: boolean = Object.values(personalInfo).every((field) => field === null);

    function handlePersonalInfoChange(e: React.ChangeEvent<HTMLInputElement>, field: keyof PersonalInfo) {
        setPersonalInfo((prevState) => ({
            ...prevState, [field]: e.target.value 
        }))
    }

    // editing state

    const [editing, setEditing] = useState<boolean> (false);

    function handleEditingState() {
        setEditing(!editing);
    }

    // credentials - email and password

    const [changeEmail, setChangeEmail] = useState<{newEmail: string, password: string}> ({
        newEmail: "",
        password: ""
    });

    const [changePassword, setChangePassword] = useState<{oldPassword: string, newPassword: string}> ({
        oldPassword: "",
        newPassword: ""
    })

    const [credentialsChange, setCredentialsChange] = useState<{email: boolean, password: boolean}> ({
        email: false,
        password: false
    })

    function handleCredentialsChangeClick(credential: keyof typeof credentialsChange) {
        setCredentialsChange((prevState: {email: boolean, password: boolean}) => ({
            ...prevState, email: false, password: false, [credential]: !prevState[credential]
        }));
    }

    function handleChangeEmail(e: React.ChangeEvent<HTMLInputElement>, field: keyof {newEmail: string, password: string}) {
        setChangeEmail((prevState: {newEmail: string, password: string}) => ({
            ...prevState, [field]: e.target.value
        }))
    }

    function handleChangePassword(e: React.ChangeEvent<HTMLInputElement>, field: keyof {oldPassword: string, newPassword: string}) {
        setChangePassword((prevState: {oldPassword: string, newPassword: string}) => ({
            ...prevState, [field]: e.target.value
        }))
    }

    function renderCredentialsChange() {
        if (credentialsChange.email) {
            return (
                <DisplayCard className="w-1/2">
                    <form className="bg-inherit flex flex-col justify-center items-center w-full py-5">
                        <FormElement label="New Email" value={changeEmail.newEmail} type="email" onChange={(e) => handleChangeEmail(e, "newEmail")} />
                        <FormElement label="Enter password" value={changeEmail.password} type="password" onChange={(e) => handleChangeEmail(e, "password")} />
                        <div className="bg-inherit mt-2 flex justify-center items-center gap-x-10 w-full">
                            <Button className="bg-green-600 hover:bg-green-800" onClick={() => handleCredentialsChangeClick("email")}>Submit</Button>
                            <Button className="bg-red-600 hover:bg-red-800" onClick={() => handleCredentialsChangeClick("email")}>Cancel</Button>
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
                            <Button className="bg-green-600 hover:bg-green-800" onClick={() => handleCredentialsChangeClick("password")}>Submit</Button>
                            <Button className="bg-red-600 hover:bg-red-800" onClick={() => handleCredentialsChangeClick("password")}>Cancel</Button>
                        </div>
                    </form>
                </DisplayCard>
            )
        }
        else {
            return (
                <div className="w-1/3">
                    <DisplayCard className="flex items-center justify-center gap-x-14 py-6">
                        <Button disabled={editing} onClick={() => handleCredentialsChangeClick("email")} className="text-md bg-blue-600 hover:bg-blue-800">Change Email</Button>
                        <Button disabled={editing} onClick={() => handleCredentialsChangeClick("password")} className="text-md bg-blue-600 hover:bg-blue-800">Change Password</Button>
                    </DisplayCard>
                </div>
            )
        }
    }

    return noInfo ? (
        <>
            <NotAvailable message="No personal information added" button="Add Personal Info" />
        </>
    ) : (
        <div className="w-full h-screen flex flex-col justify-center gap-y-16 items-center">
            <div className="w-1/2 flex h-5/12">
                <DisplayCard className="w-full h-full pb-2 flex-col">
                    <h1 className="bg-inherit font-bold text-3xl pt-2 pb-8 px-4 mt-2 text-center">Personal Information</h1>
                    <form className="bg-inherit mb-2">
                        {personalInfo.name && (<FormElement label="Name" value={personalInfo.name} type="text" readOnly={!editing} onChange={(e) => handlePersonalInfoChange(e, "name")} />)}
                        {personalInfo.email && (<FormElement label="Email" value={personalInfo.email} type="email" readOnly={true} />)}
                        {personalInfo.dob && (<FormElement label="Date of Birth" value={personalInfo.dob} type="date" readOnly={!editing} onChange={(e) => handlePersonalInfoChange(e, "dob")} />)}
                        {personalInfo.phone && (<FormElement label="Phone" value={personalInfo.phone} type="number" readOnly={!editing} onChange={(e) => handlePersonalInfoChange(e, "phone")} />)}
                        {personalInfo.country && (<FormElement label="Country" value={personalInfo.country} type="text" readOnly={!editing} onChange={(e) => handlePersonalInfoChange(e, "country")} />)}
                    </form>
                </DisplayCard>
                <div className="flex flex-col space-y-6 justify-center items-center">
                    {editing ? <CancelButton handleEditingState={handleEditingState} /> : <DeleteButton disabled={credentialsChange.email || credentialsChange.password} />}
                    {editing ? <SaveButton handleEditingState={handleEditingState} /> : <EditButton handleEditingState={handleEditingState} disabled={credentialsChange.email || credentialsChange.password} />}
                </div>
            </div>

            {renderCredentialsChange()}

        </div>
    )
}