import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import multer from "multer";

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
    onError(error, req, res) {
        res.status(501).json({ error: `Meshod ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}'Not Allowed` });
    },
});

const date: Date = new Date();
const dateString: string = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`;
const upload = multer({
    storage: multer.diskStorage({
        destination: `./public/uploads_${dateString}`,
        filename: (req, file, cb) => cb(null, file.originalname),
    }),
});

apiRoute.use(upload.array("theFiles"));

apiRoute.post((req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json({ data: dateString });
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false,
    },
};
