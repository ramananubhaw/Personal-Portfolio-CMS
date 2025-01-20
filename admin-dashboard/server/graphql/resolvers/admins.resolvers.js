import admins from '../../models/admins.model.js';
import { hashPassword } from '../../middlewares/hashPassword.js';
import { verifyPassword } from '../../middlewares/verifyPassword.js';
import { authenticateToken } from '../../middlewares/authenticateToken.js';
import jwt from 'jsonwebtoken';
import { loginError, alreadyAuthenticatedError, invalidPasswordChangeRequest, notFoundError, noUpdateNeededError } from '../errors.js';
import { convertToDate } from '../../middlewares/convertToDate.js';

export const adminResolvers = {
    Query: {
        admin: async (_, __, {req}) => {
            authenticateToken(req);
            try {
                // console.log(req.admin);
                const email = req.admin.email;
                const admin = await admins.findOne({email: email});
                if (!admin) {
                    throw notFoundError;
                }
                return {
                    ...admin.toObject(), dob: convertToDate(admin.dob)
                };
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        },

        admins: async (_, __, {req}) => {
            // authenticateToken(req);
            try {
                const allAdmins = await admins.find();
                if (allAdmins.length === 0) {
                    throw notFoundError;
                }
                return allAdmins;
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        },

        isLoggedIn: async (_, __, {req}) => {
            if (req.cookies && req.cookies.accessToken) {
                return true;
            }
            return false;
        }
    },

    Mutation: {
        createAdmin: async (_, {input}, {req}) => {
            authenticateToken(req);
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

        updateAdmin: async (_, {input}, {req}) => {
            authenticateToken(req);
            try {
                // console.log(req.admin);
                const email = req.admin.email;
                const admin = await admins.findOne({email: email});
                if (!admin) {
                    throw notFoundError;
                }
                const updatedAdmin = await admins.findOneAndUpdate({email: email}, input, {new: true});
                return {
                    ...updatedAdmin.toObject(), dob: convertToDate(updatedAdmin.dob)
                };
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        },

        deleteAdmin: async (_, {email}, {req, res}) => {
            authenticateToken(req);
            try {
                const admin = await admins.findOne({ email: email });
                if (!admin) {
                    throw notFoundError;
                }
                if (req.admin.email === admin.email) {
                    res.clearCookie("accessToken");
                }
                await admins.findOneAndDelete({email: email});
                return { deleted: true, message: "Admin deleted" };
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        },

        adminLogin: async (_, {input}, {req, res}) => {
            try {
                if (req.cookies && req.cookies.accessToken) {
                    return {message: "Already logged in", loggedIn: true, status: 409};
                }
                const admin = await admins.findOne({email: input.username}, {hashedPassword: 1, name: 1, email: 1, _id: 0});
                if (!admin || !admin.hashedPassword) {
                    return {message: "Invalid username", loggedIn: false, status: 401};
                }
                const check = await verifyPassword(input.password, admin.hashedPassword);
                if (!check) {
                    return {message: "Incorrect password", loggedIn: false, status: 401};
                }

                const accessToken = jwt.sign({
                    admin: {
                        email: admin.email,
                        name: admin.name
                    }
                }, process.env.JWT_SECRET, 
                    // {
                    //     expiresIn: process.env.JWT_EXPIRY_TIME
                    // }
                );

                res.cookie("accessToken", accessToken, {
                    httpOnly: true,
                    // secure: true,
                    // sameSite: "none",
                    // maxAge: process.env.AUTH_COOKIE_EXPIRY_TIME  // increase expiration time of cookie in production
                });

                return {message: "Logged in", loggedIn: true, status: 200};
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        },

        adminLogout: (_, __, {req, res}) => {
            authenticateToken(req);
            try {
                // console.log(req.admin);
                res.clearCookie("accessToken");
                return {message: "Logged out", loggedOut: true};
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        },

        changeEmail: async (_, {input}, {req}) => {
            authenticateToken(req);
            try {
                const email = req.admin.email;
                if (email == input.newEmail) {
                    return {message: "New Email can't be same as Old Email.", updated: false};
                }
                const admin = await admins.findOne({email: email}, {hashedPassword: 1});
                if (!admin) {
                    return {message: "Admin not found.", updated: false};
                }
                const valid = await verifyPassword(input.password, admin.hashedPassword);
                if (!valid) {
                    return {message: "Invalid password.", updated: false};
                }
                await admins.updateOne({email: email}, {$set: {email: input.newEmail}});
                // console.log(updatedAdmin.email);
                // res.clearCookie("accessToken");
                return {message: "Email changed successfully! Logging out.", updated: true};
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        },

        changePassword: async (_, {input}, {req}) => {
            authenticateToken(req);
            try {
                if (input.oldPassword == input.newPassword) {
                    return {message: "New Password can't be same as Old Password.", updated: false};
                }
                const email = req.admin.email;
                const admin = await admins.findOne({email: email}, {hashedPassword: 1});
                if (!admin) {
                    return {message: "Admin not found.", updated: false};
                }
                const valid = await verifyPassword(input.oldPassword, admin.hashedPassword);
                if (!valid) {
                    return {message: "Incorrect old password.", updated: false};
                }
                const newHashedPassword = await hashPassword(input.newPassword);
                await admins.updateOne({email: email}, {$set: {hashedPassword: newHashedPassword}});
                // console.log(input.newPassword);
                // res.clearCookie("accessToken");
                return {message: "Password changed successfully! Logging out.", updated: true};
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        }
    }
}