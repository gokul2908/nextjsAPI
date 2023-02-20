// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../library/db_class";

type Data = {
    name: string;
};


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    switch (req.method) {
        case "GET":
            return await getUser(req, res);
        case "POST":
            return await saveUser(req, res);
        case "DELETE":
            return await deleteUser(req, res);
        case "PUT":
            return await editUser(req, res);
        default:
            return res.status(400).send("Method not allowed");
    }
}

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const results = await db.query("SELECT * FROM Users");
        return res.status(200).json({ name: "John Doe", results });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const saveUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { firstName, DOB, lastName, password, email } = req.body;
        console.log({ "req.body": req.body });
        if (!(firstName && DOB && lastName && password && email))
            throw `Invalid data: ${req.body}`;
        const result = await db.insert({
            table: "Users",
            data: { firstName, DOB, lastName, password, email },
        });

        return res.status(200).json({ ...req.body, id: result.insertId });
    } catch (error:any) {
        if (error?.code === "ER_DUP_ENTRY")
            return res
                .status(400)
                .json({ message: "User Already Exist!", error });
        return res.status(500).json({ message: error?.message, error });
    }
};

const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { ID, email, password } = req.body;
        if (!(ID || email) && password) {
            console.log(ID, email, req.body);
            throw `Invalid data ${req.body}`;
        }
        const result = await db.delete({
            table: "Users",
            conditions: email ? { email, password } : { ID, password },
        });
        console.log(result);
        return res.status(200).json({ ...req.body, result });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const editUser = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { email, firstName, lastName, DOB, password } = req.body;
        if (!(email && firstName && lastName && DOB && password)) {
            throw `Invalid body ${req.body}`;
        }
        const result = await db.update({
            table: "Users",
            data: { firstName, lastName, DOB, password },
            conditions: { email },
        });
        return res.status(200).json({ ...req.body, result });
    } catch (error) {
        return res.status(500).json({ error });
    }
};
