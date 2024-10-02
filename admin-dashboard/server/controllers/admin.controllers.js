export const loginAdmin = (req, res) => {
    res.status(200).json({message: "Logged in successfully."});
}

export const logoutAdmin = (req, res) => {
    res.status(308).redirect('/');
}

export const registerAdmin = (req, res) => {
    res.status(201).json({message: "Admin registered successfully."});
}