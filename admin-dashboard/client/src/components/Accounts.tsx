import { useState, useEffect } from "react";
import { getAllAccounts, addNewAccount, updateAccount, deleteAccount } from "@/graphql/accounts";
import { useQuery, useMutation } from "@apollo/client";
import MainDiv from "./MainDiv";
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
        editing?: boolean,
        disabled?: boolean
    }

    const [accounts, setAccounts] = useState<Account[]> ([]);

    const {error: error, data: data} = useQuery(getAllAccounts);

    useEffect(() => {
        if (error) {
            console.log(error);
            return;
        }
        if (data && data.getAllAccounts) {
            // console.log(data.getAllAccounts);
            data.getAllAccounts.map((account: Account) => (
                {...account, editing: false, disabled: false}
            ))
            setAccounts(data.getAllAccounts);
        }
    }, [data, error])

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

    function handleExistingAccountChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, a: Account, field: keyof Account) {
        setAccounts((prevState: Account[]) => (
            prevState.map((account: Account) => (
                account.platform === a.platform ? {...account, [field]: e.target.value} : {...account}
            ))
        ))
    }

    // update existing account details

    const [update, {error: updateError, data: updatedData}] = useMutation(updateAccount);

    async function updateAccountDetails(account: Account) {
        const originalAccount: Account = data?.getAllAccounts.find((acc: Account) => acc.platform === account.platform);
        const isUnchanged = (): boolean => {
            return (
                account.username === originalAccount.username &&
                account.link === originalAccount.link
            )
        }
        if (isUnchanged()) {
            handleEditingState(account);
            return;
        }
        const input = Object.fromEntries(
            Object.entries(account).filter(([key]) => key !== "platform" && key !== "__typename" && key !== "editing" && key !== "disabled")
        );
        try {
            await update({
                variables: {
                    platform: account.platform,
                    input: input
                }
            })
            handleEditingState(account);
        }
        catch (error) {
            console.log(error);
            handleEditingState(account);
        }
    }

    useEffect(() => {
        if (updateError) {
            console.log(updateError);
            return;
        }
        if (updatedData && updatedData.updateAccount) {
            const updatedAccount = updatedData.updateAccount;
            setAccounts((prevState: Account[]) => (
                prevState.map((account: Account) => 
                    account.platform === updatedAccount.platform ? {...updatedAccount, editing: false, disabled: false} : {...account}
                )
            ))
        }
    }, [updateError, updatedData]);

    function cancelUpdate(account: Account) {
        if (data) {
            const originalAccount: Account = data.getAllAccounts.find((acc: Account) => acc.platform === account.platform);
            setAccounts((prevState: Account[]) => (
                prevState.map((acc: Account) => acc.platform === account.platform ? {...originalAccount, editing: false, disabled: false} : {...acc, editing: false, disabled: false})
            ))
        }
        else {
            setAccounts([]);
        }
    }

    // add new account

    const initialNewAccountValues = {
        username: "",
        platform: "",
        link: "",
        editing: false,
        disabled: false
    };

    const [newAccount, setNewAccount] = useState<Account> (initialNewAccountValues);

    const [addAccount, {error: addError, data: addedAccount}] = useMutation(addNewAccount);

    useEffect(() => {
        if (addError) {
            console.log(addError);
            setNewAccount(initialNewAccountValues);
            return;
        }
        if (addedAccount) {
            // console.log(addedData);
            const addedNewAccount = {...addedAccount.addAccount, editing: false, disabled: false}
            setAccounts((prevState) => [...prevState, addedNewAccount]);
            setNewAccount(initialNewAccountValues);
        }
    }, [addedAccount, addError]);

    function submitAccountDetails() {
        const filteredAccount = {...newAccount}
        delete filteredAccount.editing;
        delete filteredAccount.disabled;
        addAccount({
            variables: {
                input: filteredAccount
            }
        });
        handleAddAccountClick("submit");
    }

    function handleAddAccountClick(action: "submit" | "cancel" | "none") {
        setAccounts((prevState: Account[]) => (
            prevState.map((account: Account) => (
                {...account, disabled: !account.disabled}
            ))
        ));
        if (action==="cancel") {
            setNewAccount(initialNewAccountValues);
        }
        else {
            setNewAccount((prevState: Account) => (
                {...prevState, editing: !prevState.editing}
            ));
        }
    }

    function handleNewAccountChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof Account) {
        setNewAccount((prevState: Account) => (
            {...prevState, [field]: e.target.value}
        ))
    }

    // delete existing account

    const [deleteAccountMutate, {error: deleteError, data: deleteData}] = useMutation(deleteAccount);

    async function deleteSelectedAccount(account: Account) {
        try {
            await deleteAccountMutate({
                variables: {
                    platform: account.platform
                }
            })
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (deleteError) {
            console.log(deleteError);
            return;
        }
        if (deleteData && deleteData.deleteAccount) {
            const deletedAccount = deleteData.deleteAccount;
            console.log(deletedAccount);
            alert(deletedAccount.message)
            if (deletedAccount.deleted) {
                setAccounts((prevState: Account[]) => (
                    prevState.filter((account: Account) => account.platform !== deletedAccount.id)
                ))
            }
        }
    }, [deleteError, deleteData])


    const noAccount: boolean = (accounts.length === 0);

    return noAccount ? (
        <NotAvailable message="No account added" button="Add account" />
    ) : (
        <MainDiv>
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
                        {account.editing ? <CancelButton onClick={() => cancelUpdate(account)} /> : <DeleteButton disabled={account.disabled} onClick={() => deleteSelectedAccount(account)} />}
                        {account.editing ? <SaveButton onClick={() => updateAccountDetails(account)} /> : <EditButton onClick={() => handleEditingState(account)} disabled={account.disabled} />}
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
                        <Button className="bg-green-600 hover:bg-green-800" onClick={submitAccountDetails}>Submit</Button>
                        <Button className="bg-red-600 hover:bg-red-800" onClick={() => handleAddAccountClick("cancel")}>Cancel</Button>
                    </div>
                </form>
            </DisplayCard> : 
            <Button disabled={disableAddButton()} onClick={() => handleAddAccountClick("none")} className="mt-0 mb-8 bg-blue-600 text-white text-lg font-semibold hover:bg-blue-800 shadow-xl transition-colors duration-50">Add Account</Button>}
        </MainDiv>
    )
}