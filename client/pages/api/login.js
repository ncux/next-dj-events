import cookie from "cookie";
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
            // console.log(data);
            if(response.ok) {
                const { jwt, user } = data;
                const jtwCookie = cookie.serialize('jwt', jwt, { httpOnly: true, secure: process.env.NODE_ENV !== 'development', maxAge: 60*60*24*7, sameSite: 'strict', path: '/' }); // maxAge = 1 week
                res.setHeader('Set-Cookie', jtwCookie);
                res.status(200).json({ user });
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
