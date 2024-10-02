export const loginAdmin = (req, res) => {
    res.status(200).json({message: "Logged in successfully."});
}

export const logoutAdmin = (req, res) => {
    res.status(308).redirect('/');
}

export const registerAdmin = (req, res) => {
    res.status(201).json({message: "Admin registered successfully."});
}

export const editInfo = (req, res) => {
    res.status(200).json({message: "Info updated successfully."});
}

export const editSkills = (req, res) => {
    res.status(200).json({message: "Skills updated successfully."});
}

export const editProjects = (req, res) => {
    res.status(200).json({message: "Projects updated successfully."});
}

export const editExperience = (req, res) => {
    res.status(200).json({message: "Experience updated successfully."});
}