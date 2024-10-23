import { useState } from "react";
import NotAvailable from "./NotAvailable";

export default function Experiences() {

    type DurationObject = {
        startDate: null | Date,
        endDate: null | Date,
        isCurrent: null | boolean
    }

    type Experience = {
        serialNo: null | number,
        mode: null | string,
        role: null | string,
        category: null | string,
        companyName: null | string,
        duration: null | DurationObject,
        companyAddress: null | string
    }

    const [experiences, setExperiences] = useState<Experience[]> ([]);

    const noExperience: boolean = (experiences.length === 0);

    return noExperience ? (
        <NotAvailable message="No experience added" button="Add Experience" />
    ) : (
        <>

        </>
    )
}