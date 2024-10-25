import { useState } from "react";
import NotAvailable from "./NotAvailable";
import FormElement from "./FormElement";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import SaveButton from "./SaveButton";
import DisplayCard from "./DisplayCard";
import { Button } from "./ui/button";

export default function Info() {

    type PersonalInfo = {
        name: string | null;
        email: string | null;
        dob: string | null;
        phone: string | null;
        country: string | null;
    }

    const [personalInfo, setPersonalInfo] = useState<PersonalInfo> ({
        name: "TUVTUVTUV",
        email: "xyzabc@mnp.com",
        dob: "2009-12-01",
        phone: "3434343434",
        country: "XYZABC"
    })

    const noInfo: boolean = Object.values(personalInfo).every((field) => field === null);

    const [editing, setEditing] = useState<boolean> (false);

    function handleButtonClick() {
        setEditing(!editing);
    }

    const [credentialsChange, setCredentialsChange] = useState<{email: boolean, password: boolean}> ({
        email: false,
        password: false
    })

    return noInfo ? (
        <>
            <NotAvailable message="No personal information added" button="Add Personal Info" />
        </>
    ) : (
        <div className="w-full h-screen flex flex-col justify-center gap-y-16 items-center">
            <div className="w-1/2 flex h-5/12">
                <DisplayCard className="w-full h-full pb-2">
                    <h1 className="bg-inherit font-bold text-3xl pt-2 pb-8 px-4 mt-2 text-center">Personal Information</h1>
                    <form className="bg-inherit mb-2">
                        {personalInfo.name && (<FormElement label="Name" value={personalInfo.name ?? ""} type="text" />)}
                        {personalInfo.email && (<FormElement label="Email" value={personalInfo.email ?? ""} type="email" />)}
                        {personalInfo.dob && (<FormElement label="Date of Birth" value={personalInfo.dob ?? ""} type="date" />)}
                        {personalInfo.phone && (<FormElement label="Phone" value={personalInfo.phone ?? ""} type="number" />)}
                        {personalInfo.country && (<FormElement label="Country" value={personalInfo.country ?? ""} type="text" />)}
                    </form>
                </DisplayCard>
                <div className="flex flex-col space-y-6 justify-center items-center">
                    <DeleteButton editing={editing} />
                    {editing ? <SaveButton handleButtonClick={handleButtonClick} /> : <EditButton handleButtonClick={handleButtonClick} />}
                </div>
            </div>

            {/* {!credentialsChange.email && !credentialsChange.password && <div className="w-1/2">
                <div className="flex items-center justify-center gap-x-14">
                    <Button className="bg-blue-600 hover:bg-blue-800">Change Password</Button>
                    <Button className="bg-blue-600 hover:bg-blue-800">Change Email</Button>
                </div>
            </div>} */}
        </div>
    )
}