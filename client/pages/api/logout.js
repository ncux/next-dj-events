import cookie from "cookie";

export default async (req, res) => {
    try {
        if(req.method === 'POST') {
            const jtwCookie = cookie.serialize('jwt', '', { httpOnly: true, secure: process.env.NODE_ENV !== 'development', expires: new Date(0), sameSite: 'strict', path: '/' });
            res.setHeader('Set-Cookie', jtwCookie);
            res.status(200).json({ message: 'OK!' });
        } else {
            res.setHeader('Allow', ['POST']);
            res.status(405).json({ message: `method ${req.method} is not allowed` });
        }
    } catch (e) {
        console.log(e);
        res.status(400).json({ message: e.message });
    }
};
