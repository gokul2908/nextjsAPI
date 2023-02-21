import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../../library/db_class";

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "GET":
            return await getUserByQuery(req, res);
        default:
            return res.status(400).send("Method not allowed");
    }
}

// const getUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
//     const { email, password } = req.body;
//     console.log(req.query);
//     if (!(email || password || getUserByQuery())) {

//         throw "Invalid body";
//     }
//     try {
//         const results = await db.query(
//             `SELECT * FROM Users where email='${email}' and password='${password}'`
//         );
//         return res.status(200).json({ results });
//     } catch (error) {
//         return res.status(500).json({ error });
//     }
// };

const getUserByQuery = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const {
        limit = 100,
        start = 0,
        end = 100000,
        email,
        lastName,
        firstName,
        DOB,
        ID,
    } = req.query;
    let query;
    query = `SELECT * FROM Users where ID>=${start} and ID<=${end} `;
    if (lastName) query += ` and lastName='${lastName}'`;
    if (firstName) query += ` and firstName='${firstName}'`;
    if (DOB) query += ` and DOB=${DOB}`;
    if (email) query += ` and email='${email}'`;
    if (ID) query += ` and ID='${ID}'`;
    query += ` LIMIT ${limit} `

    try {
        console.log(query);
        const results = await db.query(query);
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).json({ error });
    }
};
