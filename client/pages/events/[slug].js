import { useRouter } from "next/router";
import Layout from "../../components/layout/layout";

export default function EventPage() {

    const router = useRouter();

    return (
        <Layout title="">
            <h2>Event Page</h2>
        </Layout>
    );
}
