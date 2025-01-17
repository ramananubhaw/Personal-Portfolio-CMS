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
    phone: string,
    resumeLink: string
}

export type Project = {
    name: string,
    description: string,
    techStack: string[] | null,
    link: string | null,
    deployment: string | null
}