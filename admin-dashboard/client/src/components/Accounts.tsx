import { useState, useEffect } from "react";
import NotAvailable from "./NotAvailable";
import DisplayCard from "./DisplayCard";
import { Button } from "./ui/button";
import FormElement from "./FormElement";
import CancelButton from "./buttons/CancelButton";
import DeleteButton from "./buttons/DeleteButton";
import EditButton from "./buttons/EditButton";
import SaveButton from "./buttons/SaveButton";

export default function Accounts() {

    type Account = {
        username: string,
        platform: string,
        link: string,
        editing: boolean,
        disabled: boolean
    }

    const [accounts, setAccounts] = useState<Account[]> ([
        {
            username: "ramananubhaw",
            platform: "GitHub",
            link: "None",
            editing: false,
            disabled: false
        },
        {
            username: "__anubhaw__",
            platform: "Instagram",
            link: "None",
            editing: false,
            disabled: false
        }

    ]);

    function handleEditingState(a: Account) {
        setAccounts((prevState: Account[]) => (
            prevState.map((account: Account) => (
                account.platform === a.platform ? {...account, editing: !account.editing} : {...account, disabled: !account.disabled}
            ))
        ))
    }

    function disableAddButton(): boolean {
        return accounts.some((account: Account) => account.editing);
    }

    function handleExistingAccountChange(e: React.ChangeEvent<HTMLInputElement>, a: Account, field: keyof Account) {
        setAccounts((prevState: Account[]) => (
            prevState.map((account: Account) => (
                account.platform === a.platform ? {...account, [field]: e.target.value} : {...account}
            ))
        ))
    }

    const [newAccount, setNewAccount] = useState<Account> ({
        username: "",
        platform: "",
        link: "",
        editing: false,
        disabled: false
    })

    function handleAddAccountClick() {
        setAccounts((prevState: Account[]) => (
            prevState.map((account: Account) => (
                {...account, disabled: !account.disabled}
            ))
        ));
        setNewAccount((prevState: Account) => (
            {...prevState, editing: !prevState.editing}
        ));
    }

    function handleNewAccountChange(e: React.ChangeEvent<HTMLInputElement>, field: keyof Account) {
        setNewAccount((prevState: Account) => (
            {...prevState, [field]: e.target.value}
        ))
    }

    const noAccount: boolean = (accounts.length === 0);

    return noAccount ? (
        <NotAvailable message="No account added" button="Add account" />
    ) : (
        <div className="w-full flex flex-col justify-center items-center">
            <h1 className="font-bold text-3xl pt-5 pb-8 px-4 mt-2 text-center">ACCOUNTS</h1>
            {accounts.map((account) => (
                <div key={account.platform} className="w-1/2 flex justify-center items-center mb-10">
                    <DisplayCard className="flex-col justify-center items-center w-full">
                        <h2 className="bg-inherit font-bold text-2xl pt-3 text-center">{account.platform}</h2>
                        <form className="bg-inherit flex flex-col justify-center items-center w-full py-5">
                            <FormElement label="Username" value={account.username} type="text" readOnly={!account.editing} onChange={(e) => handleExistingAccountChange(e, account, "username")} />
                            <FormElement label="Account Link" value={account.link} type="text" readOnly={!account.editing} onChange={(e) => handleExistingAccountChange(e, account, "link")} />
                        </form>
                    </DisplayCard>
                    <div className="h-full flex flex-col space-y-6 justify-center items-center">
                        {account.editing ? <CancelButton handleEditingState={() => handleEditingState(account)} /> : <DeleteButton disabled={account.disabled} />}
                        {account.editing ? <SaveButton handleEditingState={() => handleEditingState(account)} /> : <EditButton handleEditingState={() => handleEditingState(account)} disabled={account.disabled} />}
                    </div>
                </div>
            ))}
            {(newAccount.editing) ? 
            <DisplayCard className="w-1/2 mb-12">
                <form className="bg-inherit flex flex-col justify-center items-center w-full py-5">
                    <FormElement label="Platform" value={newAccount.platform} type="text" onChange={(e) => handleNewAccountChange(e, "platform")} />
                    <FormElement label="Username" value={newAccount.username} type="text" onChange={(e) => handleNewAccountChange(e, "username")} />
                    <FormElement label="Account Link" value={newAccount.link} type="text" onChange={(e) => handleNewAccountChange(e, "link")} />
                    <div className="bg-inherit mt-2 flex justify-center items-center gap-x-10 w-full">
                        <Button className="bg-green-600 hover:bg-green-800" onClick={handleAddAccountClick}>Submit</Button>
                        <Button className="bg-red-600 hover:bg-red-800" onClick={handleAddAccountClick}>Cancel</Button>
                    </div>
                </form>
            </DisplayCard> : 
            <Button disabled={disableAddButton()} onClick={handleAddAccountClick} className="mt-0 mb-8 bg-blue-600 text-white text-lg font-semibold hover:bg-blue-800 shadow-xl transition-colors duration-50">Add Account</Button>}
        </div>
    )
}