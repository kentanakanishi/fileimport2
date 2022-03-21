import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import fs from "fs";

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
    onError(error, req, res) {
        res.status(501).json({ error: `Method ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method ${req.method} Not allowed` });
    },
});

apiRoute.get((req, res) => {
    const json = JSON.parse(fs.readFileSync("./public/data.json", "utf-8"));
    const path: string = `./public/uploads_${req.query.id}/output.json`;
    json["data"].push({ txt: path });
    fs.writeFileSync(path, JSON.stringify(json));
    res.status(200).json({ data: json });
});

export default apiRoute;
