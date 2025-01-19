import MainCard from "./MainCard";
import Heading from "./Heading";
import { useState, useEffect } from "react";
import { ExperienceType } from "../types";
import { useQuery } from "@apollo/client";
import { getAllExperiences } from "../graphql-queries";

export default function Experience() {

    const [experiences, setExperiences] = useState<ExperienceType[]> ([
        // {
        //     serialNo: 1,
        //     mode: "On-site",
        //     role: "Backend Developer",
        //     category: "Internship",
        //     companyName: "Iterative Zero",
        //     duration: {
        //         startDate: "2024-10-01",
        //         isCurrent: true,
        //         endDate: null
        //     },
        //     companyAddress: "Bangalore, Karnataka, India"
        // }
    ]);

    const { error: error, data: data } = useQuery(getAllExperiences);
    
    useEffect(() => {
        if (error) {
            console.log(error);
            return;
        }
        if (data && data.getAllExperiences) {
            setExperiences(data.getAllExperiences);
            // console.log(data);
        }
    }, [data, error]);

    return (
        <MainCard>
            <Heading first="MY" second="EXPERIENCE" />
            {experiences.length>0 && 
            <div className="mx-32 w-1/2 my-12">
                {experiences.map((experience: ExperienceType) => (
                    <div className="flex gap-x-4 mb-12 w-full bg-transparent" key={experience.serialNo}>
                        <div className="w-1/4 text-light-green bg-transparent font-bold text-2xl flex justify-start items-center p-4">{experience.category}</div>
                        <div className="w-3/4 text-white bg-white/5 p-6 rounded-xl overflow-hidden">
                            <div className="w-full flex bg-transparent justify-between items-center">
                                <p className="bg-transparent"><b className="bg-transparent">Company - </b>{experience.companyName}</p>
                                <p className="bg-transparent text-light-green">{experience.mode}</p>
                            </div>
                            <p className="bg-transparent mt-4"><b className="bg-transparent">Role - </b>{experience.role}</p>
                            <p className="bg-transparent mt-4"><b className="bg-transparent">Start Date - </b>{experience.duration.startDate}</p>
                            <p className="bg-transparent mt-4"><b className="bg-transparent">End Date - </b>{experience.duration.isCurrent ? "Currently Working Here" : experience.duration.endDate}</p>
                            {experience.companyAddress !== "" && (<p className="bg-transparent mt-4"><b className="bg-transparent">Location - </b>{experience.companyAddress}</p>)}
                        </div>
                    </div>
                ))}
            </div>}
        </MainCard>
    )
}