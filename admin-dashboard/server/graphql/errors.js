// Custom GraphQL errors

import { GraphQLError } from 'graphql';

export const authError = new GraphQLError("Unauthorized", {
    extensions: {
        code: "FORBIDDEN",
        http: {
            status: 401
        }
    }
});

export const loginError = new GraphQLError("Invalid Credentials", {
    extensions: {
        code: "UNAUTHORIZED",
        http: {
            status: 401
        }
    }
});

export const alreadyAuthenticatedError = new GraphQLError("Already logged in", {
    extensions: {
        code: "ALREADY_AUTHENTICATED",
        http: {
            status: 409
        }
    },
});

export const invalidPasswordChangeRequest = new GraphQLError(
    "Change Password is not a valid request here.", {
    extensions: {
        code: "INVALID_PASSWORD_CHANGE",
        http: {
            status: 400
        }
    },
});

export const invalidDeleteAdminRequest = new GraphQLError(
    "Admin cannot delete itself", {
    extensions: {
        code: "INVALID_DELETE_ADMIN_REQUEST",
        http: {
            status: 400
        }
    },
});

export const notFoundError = new GraphQLError(
    "Admin not found", {
    extensions: {
        code: "404_NOT_FOUND",
        http: {
            status: 404
        }
    },
});

export const noUpdateNeededError = new GraphQLError(
    "No update requested or needed.", {
    extensions: {
        code: "NO_UPDATE_NEEDED",
        http: {
            status: 400
        }
    },
});
