import { API_URL, httpHeaders } from "../../config";

export default async (req, res) => {
    if(req.method === 'POST') {
        const { email: identifier, password } = req.body;

        res.status(200).json('Hi');
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: `method ${req.method} is not allowed` });
    }
};
