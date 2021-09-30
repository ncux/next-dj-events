import { FaUser } from "react-icons/fa";
import {useContext, useEffect, useState} from "react";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import classes from "../../styles/auth-form.module.css";
import Layout from "../../components/layout/layout";
import { AuthContext } from "../../context/auth";

export default function RegisterPage() {

    const { error, register } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const registerUser = async e => {
        e.preventDefault();
        try {
            if(password && password !== password2) {
                toast.error('The passwords do not match!');
                return;
            }
            await register({ email, username, password });
        } catch (e) {
            toast.error(`${e.message}`);
        }
    };

    useEffect(() => {
        if(error) {
            toast.error(error);
        }
    }, [error]);

    return (
        <Layout title="Events | Registration">
            <div className={classes.auth}>
                <h1><FaUser /> Register</h1>
                <ToastContainer />
                <form onSubmit={ registerUser }>

                    <div>
                        <label>Username</label>
                        <input type="text" value={ username } onChange={ event => setUsername(event.target.value) }  />
                    </div>

                    <div>
                        <label>Email</label>
                        <input type="email" value={ email } onChange={ event => setEmail(event.target.value) }  />
                    </div>

                    <div>
                        <label>Password</label>
                        <input type="password" value={ password } onChange={ event => setPassword(event.target.value) }  />
                    </div>

                    <div>
                        <label>Conform password</label>
                        <input type="password" value={ password2 } onChange={ event => setPassword2(event.target.value) }  />
                    </div>

                    <input type="submit" value="Register" className="btn"/>
                </form>

                <p>Already registered? Login <Link href="/account/login">here</Link>.</p>

            </div>
        </Layout>
    );
};
