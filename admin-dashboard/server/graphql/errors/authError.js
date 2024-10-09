import { GraphQLError } from 'graphql';

export const authError = new GraphQLError("Unauthorized", {
    extensions: {
        code: "FORBIDDEN",
        http: {
            status: 401
        }
    }
});
