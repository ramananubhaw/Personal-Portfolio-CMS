import admins from '../../models/admins.model.js';

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
                console.log(error);
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
                console.log(error);
                throw error;
            }
        }
    }
}