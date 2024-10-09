import { GraphQLError } from "graphql";

export const loginError = new GraphQLError("Invalid Credentials", {
    extensions: {
        code: "UNAUTHORIZED",
        http: {
            status: 401
        }
    }
});