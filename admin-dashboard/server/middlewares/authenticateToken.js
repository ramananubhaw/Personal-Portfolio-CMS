import jwt from 'jsonwebtoken';
import { authError } from '../graphql/errors.js';

export const authenticateToken = (req, res) => {
    const token = req.cookies?.accessToken;
    if (!token) {
        throw authError;
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            throw authError;
        }
        req.admin = decoded.admin;
    });
};
