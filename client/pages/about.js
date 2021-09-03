import Link from "next/link";
import Layout from "../components/layout/layout";

export default function AboutPage() {

    return (
        <Layout title="DJ Events | About">
            <h2>About DJ Events</h2>
            <p>DJ Events Web App</p>
            <p>Version: 1.0.0</p>
            <Link href="/">Home</Link>
        </Layout>
    );
}
