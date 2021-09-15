import Link from "next/link";
import axios from "axios";
import Layout from "../components/layout/layout";
import EventItem from "../components/event-item/event-item";
import { API_URL } from "../config";

export default function Home({ data }) {

  return (
    <Layout title="DJ Events | Home">
        <div >
            <h2>Home</h2>
            <Link href="/about">About</Link>
            {
                data.map(evt => (
                    <EventItem key={evt.id} evt={ evt } />
                ))
            }

        </div>
    </Layout>
  )
}

export async function getServerSideProps() {
    const { data } = await axios.get(`${API_URL}/events`);

    return {
        props: { data }
    };

}
