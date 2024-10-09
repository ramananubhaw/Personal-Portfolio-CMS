import admins from '../../models/admins.model.js';
import { hashPassword } from '../../middlewares/hashPassword.js';
import { verifyPassword } from '../../middlewares/verifyPassword.js';
// import { authError } from '../errors/authError.js';
import jwt from 'jsonwebtoken';
import { loginError } from '../errors/loginError.js';
import { authError } from '../errors/authError.js';

export const adminResolvers = {
    Query: {
        getAdmin: async (_, {email}, {req}) => {
            try {
                console.log(req.cookies);
                const admin = await admins.findOne({email: email});
                if (!admin) {
                    throw new Error("Admin does not exist")
                }
                return admin;
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        },

        getAllAdmins: async () => {
            try {
                const allAdmins = await admins.find();
                if (allAdmins.length === 0) {
                    throw new Error("No admins registered");
                }
                return allAdmins;
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        }
    },

    Mutation: {
        createAdmin: async (_, {input}) => {
            try {
                const admin = await admins.findOne({email: input.email});
                if (admin) {
                    throw new Error("Admin with same Email Id already exists.");
                }
                const password = input.password;
                const hashedPassword = await hashPassword(password);
                input.hashedPassword = hashedPassword;
                delete input.password;
                console.log("Password - " + password);
                await admins.create(input);
                return input;
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        },

        updateAdmin: async (_, {email, input}) => {
            try {
                const admin = await admins.findOne({email: email});
                if (!admin) {
                    throw new Error("No admin registered with this Email Id");
                }
                if (input.password) {
                    console.log("Change Password is a separate Mutation of Admin");
                    delete input.password;
                }
                for (const key in input) {
                    if (input[key] === admin[key]) {
                        delete input[key];
                    }
                }
                if (Object.keys(input).length === 0) {
                    throw new Error("No update requested");
                }
                const updatedAdmin = await admins.findOneAndUpdate({email: email}, input, {new: true});
                return updatedAdmin;
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        },

        deleteAdmin: async (_, {email}) => {
            try {
                const admin = await admins.findOne({ email: email });
                if (!admin) {
                    throw new Error("Admin does not exist");
                }
                await admins.findOneAndDelete({email: email});
                return { deleted: true, message: "Admin deleted" };
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        },

        adminLogin: async (_, {input}, {res}) => {
            try {
                const admin = await admins.findOne({email: input.username}, {hashedPassword: 1, name: 1, email: 1, _id: 0});
                if (!admin || !admin.hashedPassword) {
                    throw loginError;
                }
                const check = await verifyPassword(input.password, admin.hashedPassword);
                if (!check) {
                    throw loginError;
                }

                const accessToken = jwt.sign({
                    admin: {
                        username: admin.email,
                        name: admin.name
                    }
                }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRY_TIME // increase expiration time for JWT token in production
                });

                res.cookie("accessToken", accessToken, {
                    httpOnly: true,
                    // secure: true,
                    // sameSite: "strict",
                    maxAge: process.env.AUTH_COOKIE_EXPIRY_TIME // increase expiration time of cookie in production
                });

                return {message: "Logged in", loggedIn: true};
            }
            catch (error) {
                console.log(error.message);
                res.status(401);
                throw error;
            }
        },

        adminLogout: async (_, __, {req, res}) => {
            try {
                // console.log(req.cookies)
                if (!req.cookies || !req.cookies.accessToken) {
                    throw authError;
                }
                res.clearCookie("accessToken");
                return {message: "Logged out", loggedOut: true};
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        }
    }
}