import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa";
import Layout from "../components/layout/layout";
import classes from "../styles/404.module.css";

export default function NotFoundPage() {

    return (
        <Layout title="404 | Not found">
            <div className={classes.container}>
                <h1> <FaExclamationTriangle /> 404</h1>
                <h2>There's nothing here, sorry.</h2>
                <Link href="/">Home</Link>
            </div>
        </Layout>
    );
}
