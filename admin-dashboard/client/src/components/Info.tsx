import { useState } from "react";
import NotAvailable from "./NotAvailable";

export default function Info() {

    type PersonalInfo = {
        name: string | null;
        email: string | null;
        dob: string | null;
        phone: string | null;
        country: string | null;
    }

    const [personalInfo, setPersonalInfo] = useState<PersonalInfo> ({
        name: null,
        email: null,
        dob: null,
        phone: null,
        country: null
    })

    const noInfo: boolean = Object.values(personalInfo).every((field) => field === null);

    return noInfo ? (
        <>
            <NotAvailable message="No personal information added" button="Add Personal Info" />
        </>
    ) : (
        <div className="">
            <h1>Personal Information</h1>
            <form>
                {personalInfo.name && (
                    <div>
                        <label>Name: </label>
                        <input type="text" value={personalInfo.name} readOnly />
                    </div>
                )}
                {personalInfo.email && (
                    <div>
                        <label>Email: </label>
                        <input type="email" value={personalInfo.email} readOnly />
                    </div>
                )}
                {personalInfo.dob && (
                    <div>
                        <label>Date of Birth: </label>
                        <input type="date" value={personalInfo.dob} readOnly />
                    </div>
                )}
                {personalInfo.phone && (
                    <div>
                        <label>Phone: </label>
                        <input type="tel" value={personalInfo.phone} readOnly />
                    </div>
                )}
                {personalInfo.country && (
                    <div>
                        <label>Country: </label>
                        <input type="text" value={personalInfo.country} readOnly />
                    </div>
                )}
            </form>
        </div>
    )
}