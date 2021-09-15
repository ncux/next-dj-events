import axios from "axios";
import qs from "qs";
import { useRouter } from "next/router";
import Link from "next/link";
import EventItem from "../../components/event-item/event-item";
import Layout from "../../components/layout/layout";
import { API_URL } from "../../config";

export default function SearchEventsPage({ data }) {

    const router = useRouter();

    return (
        <Layout title="DJ Events - All Events">

            <Link href="/events">Back</Link>

            <h2>Search results for "{ router.query.term }"</h2>

            { data.length === 0 && (<h2>No events</h2>) }

            {
                data.map(evt => {
                    return (
                        <EventItem key={evt.id} evt={ evt } />
                    )
                })
            }
        </Layout>
    );
};


export async function getServerSideProps(context) {

    const { query } = context;

    const item = qs.stringify({
        _where: {
            _or: [
                { name_contains: query.term },
                { performers_contains: query.term },
                { description_contains: query.term },
                { venue_contains: query.term },
            ]
        }
    });

    const { data } = await axios.get(`${API_URL}/events?${item}`);

    return {
        props: { data }
    };

}

