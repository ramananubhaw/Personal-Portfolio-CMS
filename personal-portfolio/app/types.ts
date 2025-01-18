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