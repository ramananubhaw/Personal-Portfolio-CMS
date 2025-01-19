export type Navs = {
    about: boolean,
    skills: boolean,
    experience: boolean,
    projects: boolean
};

export type AccountType = {
    platform: string,
    link: string
}

export type PersonalInfo = {
    name: string,
    email: string,
    resumeLink: string
}

export type Project = {
    name: string,
    description: string,
    techStack: string[] | null,
    link: string | undefined,
    deployment: string | undefined
}

type DurationObject = {
    startDate: string,
    endDate: null | string,
    isCurrent: boolean
}

export type ExperienceType = {
    serialNo: number,
    mode: string,
    role: string,
    category: string,
    companyName: string,
    duration: DurationObject,
    companyAddress: string | null
}