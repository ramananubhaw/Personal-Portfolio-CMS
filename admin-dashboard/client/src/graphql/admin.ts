import { gql } from "@apollo/client";

export const getPersonalInfo = gql`
    query GetAdmin {
        admin {
            name
            email
            dob
            phone
            country
            resumeLink
        }
    }
`;

export const updatePersonalInfo = gql`
    mutation UpdateAdminDetails($input: AdminUpdateInput!) {
        updateAdmin(input: $input) {
            name
            email
            dob
            phone
            country
            resumeLink
        }
    }
`;

export const addPersonalInfo = gql`
    mutation CreateAdmin($input: AdminInput!) {
        createAdmin(input: $input) {
            name
            email
            hashedPassword
        }
    }
`;

export const adminLogin = gql`
    mutation AdminLogin($input: AdminLoginInput!) {
        adminLogin(input: $input) {
            loggedIn
            message
            status
        }
    }
`;

export const isLoggedIn = gql`
    query IsLoggedIn {
        isLoggedIn
    }
`;

export const adminLogout = gql`
    mutation AdminLogout {
        adminLogout {
            loggedOut
            message
        }
    }
`;

export const emailChange = gql`
    mutation ChangeEmail($input: ChangeEmailInput!) {
        changeEmail(input: $input) {
            message
            updated
        }
    }
`;

export const passwordChange = gql`
    mutation ChangePassword($input: ChangePasswordInput!) {
        changePassword(input: $input) {
            message
            updated
        }
    }
`;