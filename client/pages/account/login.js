import { FaUser } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "../../styles/auth-form.module.css";
import Layout from "../../components/layout/layout";

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async e => {
        e.preventDefault();
        console.log(email, password);
    };

    return (
        <Layout title="Events | Login">
            <div className={classes.auth}>
                <h1><FaUser /> Login</h1>
                <ToastContainer />
                <form onSubmit={ login }>
                    <div>
                        <label>Email</label>
                        <input type="email" value={ email } onChange={ event => setEmail(event.target.value) }  />
                    </div>

                    <div>
                        <label>Password</label>
                        <input type="password" value={ password } onChange={ event => setPassword(event.target.value) }  />
                    </div>

                    <input type="submit" value="Login" className="btn"/>
                </form>

                <p>No account? Register <Link href="/account/register">here</Link>.</p>

            </div>
        </Layout>
    );
};
