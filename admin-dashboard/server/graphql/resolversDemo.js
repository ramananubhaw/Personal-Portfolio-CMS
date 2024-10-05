import axios from "axios";

export const resolversDemo = {
    Todo: {
        user: async (todo) => {
            return (await axios.get(`${process.env.JSON_PLACEHOLDER_USERS_API}/${todo.userId}`)).data;
        }
    },
    Query: {
        getTodos: async () => {
            return (await axios.get(process.env.JSON_PLACEHOLDER_TODOS_API)).data;
        }
    }
};