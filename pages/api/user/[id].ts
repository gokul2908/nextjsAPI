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
            return await getSingleUser(req, res);
        default:
            return res.status(400).send("Method not allowed");
    }
}

const getSingleUser = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const { id } = req.query;
    if (!id) throw "Invalid query";
    console.log(req.query);
    try {
        const results = await db.query(`SELECT * FROM Users where ID='${id}'`);
        return res.status(200).json({ results });
    } catch (error) {
        return res.status(500).json({ error });
    }
};
