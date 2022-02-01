import { getDbConnection } from "../db";
export const testRoute = {
    path: '/api/test',
    method: 'post',
    handler: async (req, res) => {
        const {email} = req.body;
        const db = getDbConnection('react-auth-db');
        const result = await db.collection('users').insertOne({
            email,
            info: {},
        });
        console.log("result", result.ops[0]);
        res.status(200).send('It works!');
    },
};