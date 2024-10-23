import { useState } from "react";
import NotAvailable from "./NotAvailable";

export default function Accounts() {

    type Account = {
        username: null | string,
        platform: null | string,
        link: null | string
    }

    const [accounts, setAccounts] = useState<Account[]> ([]);

    const noAccount: boolean = (accounts.length === 0);

    return noAccount ? (
        <NotAvailable message="No account added" button="Add account" />
    ) : (
        <>
        
        </>
    )
}