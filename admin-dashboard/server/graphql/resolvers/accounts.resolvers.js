import accounts from '../../models/accounts.model.js';

export const accountResolvers = {
    Query: {
        getAccount: async (_, {platform, username}) => {
            try {
                const account = await accounts.findOne({platform: platform, username: username});
                if (!account) {
                    throw new Error("Account not found");
                }
                return account;
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        },

        getAllAccounts: async () => {
            try {
                const allAccounts = await accounts.find();
                if (allAccounts.length === 0) {
                    throw new Error("No account found");
                }
                return allAccounts;
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        }
    },

    Mutation: {
        addAccount: async (_, {input}) => {
            try {
                const account = await accounts.findOne(input);
                if (account) {
                    throw new Error("Account already added.");
                }
                await accounts.create(input);
                return input;
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        },

        updateAccount: async (_, {input}) => {
            try {
                if (!input.link) {
                    throw new Error("No update requested");
                }
                const account = await accounts.findOne({platform: input.platform, username: input.username});
                if (!account) {
                    throw new Error("Account not added");
                }
                if (account.link === input.link) {
                    throw new Error("Nothing to update");
                }
                const updatedAccount = await accounts.findOneAndUpdate({platform: input.platform, username: input.username}, {link: input.link}, {new: true});
                return updatedAccount;
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        },

        deleteAccount: async (_, {platform, username}) => {
            try {
                const account = await accounts.findOne({ platform: platform, username: username });
                if (!account) {
                    throw new Error("Account not added");
                }
                await accounts.findOneAndDelete({platform: platform, username: username});
                return { deleted: true, message: "Account removed" };
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        }
    }
}