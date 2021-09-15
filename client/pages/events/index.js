import axios from "axios";
import EventItem from "../../components/event-item/event-item";
import Layout from "../../components/layout/layout";
import { API_URL } from "../../config";

export default function EventsPage({ data }) {

    return (
        <Layout title="DJ Events - All Events">
            <h2>Upcoming Events</h2>
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


export async function getServerSideProps() {
    const { data } = await axios.get(`${API_URL}/events`);

    return {
        props: { data }
    };

}

