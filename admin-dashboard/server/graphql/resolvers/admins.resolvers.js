import admins from '../../models/admins.model.js';
import { hashPassword } from '../../middlewares/hashPassword.js';

export const adminResolvers = {
    Query: {
        getAdmin: async (_, {email}) => {
            try {
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
                return true;
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        }
    }
}