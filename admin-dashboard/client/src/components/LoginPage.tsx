import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import DisplayCard from "./DisplayCard";
import FormElement from "./FormElement";
import { Button } from "./ui/button";
import { adminLogin } from "../graphql/admin";

export default function LoginPage({ handleLogin }: { handleLogin: () => void }) {

    type LoginCredentials = {
        username: string;
        password: string;
    }

    const [loginCredentials, setLoginCredentials] = useState<LoginCredentials>({
        username: "",
        password: ""
    });

    function updateLoginCredentials(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof LoginCredentials) {
        setLoginCredentials((prevState) => ({
            ...prevState, 
            [field]: e.target.value
        }));
    }

    const [login, { data, error }] = useMutation(adminLogin);

    useEffect(() => {
        if (error) {
            setMessage("Internal Server Error");
            console.log(error.message);
            return;
        }
        if (data && data.adminLogin.loggedIn) {
            // console.log(data.adminLogin.message);
            // console.log(data.adminLogin.status);
            handleLogin();
            return;
        }
        if (data && data.adminLogin.status===401) {
            setMessage(data.adminLogin.message);
        }
    }, [data, error]);

    async function submitCredentials() {
        if (loginCredentials.username === "" || loginCredentials.password === "") {
            return;
        }
        try {
            await login({
                variables: {
                    input: {
                        username: loginCredentials.username,
                        password: loginCredentials.password
                    }
                }
            });
        }
        catch (error) {
            console.log("Error:", error);
        }
        setLoginCredentials({username: "", password: ""})
    }

    const [message, setMessage] = useState<string> ("");

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <DisplayCard className="flex-col justify-center items-center bg-white w-1/3">
                <h1 className="bg-inherit font-bold text-2xl mb-8 mt-4 w-full text-center">Welcome Admin!</h1>
                <form className="bg-inherit w-full" onSubmit={(e) => { e.preventDefault(); submitCredentials(); }}>
                    <FormElement label="Username" value={loginCredentials.username} type="text" onChange={(e) => updateLoginCredentials(e, "username")} />
                    <FormElement label="Password" value={loginCredentials.password} type="password" onChange={(e) => updateLoginCredentials(e, "password")} />
                    <p className="bg-inherit text-center text-red-600 font-medium text-lg">{message}</p>
                    <div className="bg-inherit flex items-center justify-center">
                        <Button type="submit" className={`bg-blue-600 hover:bg-blue-800 w-1/6 mb-5 h-1/2 ${message ? "mt-2" : "mt-4"}`}>Login</Button>
                    </div>
                </form>
            </DisplayCard>
        </div>
    );
}