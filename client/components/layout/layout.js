import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import Showcase from "../showcase/showcase";
import classes from "./layout.module.css";

export default function Layout({ title, keywords, description, children }) {

    const router = useRouter();

    return (
        <div>
            <Head>
                <title>{ title }</title>
                <meta name="description" content={ description } />
                <meta name="keywords" content={ keywords } />
            </Head>

            <Navbar />

            { router.pathname === '/' ? <Showcase /> : null }

            <div className={classes.container}>
                { children }
            </div>
            <Footer />
        </div>
    );
}

Layout.defaultProps = {
    title: 'DJ Events',
    description: 'DJ Events Web Application',
    keywords: 'dj, music, house, deep, trance'
};
