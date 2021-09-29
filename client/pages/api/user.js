import cookie from "cookie";
import { API_URL } from "../../config";

export default async (req, res) => {
    try {
        if(req.method === 'GET') {
            if(!req.headers.cookie) {
                res.status(403).json({ message: 'Not authorized' });
                return;
            }
            const { jwt } = cookie.parse(req.headers.cookie);
            const options = {
                method: 'GET', headers: { Authorization: `Bearer ${jwt}` }
            };
            const response = await fetch(`${API_URL}/users/me`, options);
            const user = await response.json();
            if(response.ok) {
                res.status(200).json({ user });
            } else {
                res.status(403).json({ message: 'Not authorized' });
            }
        } else {
            res.setHeader('Allow', ['GET']);
            res.status(405).json({ message: `method ${req.method} is not allowed` });
        }
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: e.message });
    }
};
