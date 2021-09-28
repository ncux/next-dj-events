import { API_URL } from "../../config";

export default async (req, res) => {
    try {
        if(req.method === 'POST') {
            const { email: identifier, password } = req.body;
            const options = {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ identifier, password })
            };
            const response = await fetch(`${API_URL}/auth/local`, options);
            const data = await response.json();
            console.log(data);
            if(response.ok) {
                res.status(200).json({ user: data.user });
            } else {
                res.status(data.statusCode).json({ message: data.message[0].messages[0].message });
            }
        } else {
            res.setHeader('Allow', ['POST']);
            res.status(405).json({ message: `method ${req.method} is not allowed` });
        }
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: e.message });
    }
};
