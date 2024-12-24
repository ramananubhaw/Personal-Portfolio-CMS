import accounts from '../../models/accounts.model.js';
import { authenticateToken } from '../../middlewares/authenticateToken.js';

export const accountResolvers = {
    Query: {
        getAccount: async (_, { platform, username }, { req }) => {
            try {
                const account = await accounts.findOne({ platform, username });
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

        getAllAccounts: async (_, __, { req }) => {
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
        addAccount: async (_, { input }, { req }) => {
            authenticateToken(req);
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

        updateAccount: async (_, { platform, input }, { req }) => {
            authenticateToken(req);
            try {
                const account = await accounts.findOne({ platform: platform });
                if (!account) {
                    throw new Error("Account not added");
                }
                if (account.username === input.username && account.link === input.link) {
                    throw new Error("Nothing to update");
                }
                const updatedAccount = await accounts.findOneAndUpdate(
                    { platform: platform },
                    { link: input.link, username: input.username },
                    { new: true }
                );
                return updatedAccount;
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        },

        deleteAccount: async (_, { platform }, { req }) => {
            authenticateToken(req);
            try {
                const account = await accounts.findOne({ platform });
                if (!account) {
                    return { deleted: false, message: "Account not added" };
                }
                await accounts.findOneAndDelete({ platform });
                return { deleted: true, message: "Account removed", id: platform };
            }
            catch (error) {
                console.log(error.message);
                throw error;
            }
        }
    }
};
