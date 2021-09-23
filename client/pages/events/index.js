import axios from "axios";
import EventItem from "../../components/event-item/event-item";
import Layout from "../../components/layout/layout";
import { API_URL } from "../../config";

const PER_PAGE = 2;

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


export async function getServerSideProps(context) {

    const { query } = context;  // query.page to get page num

    // calculate start page
    const start_page = +query.page === 1 ? 0 : (+query.page - 1) * PER_PAGE;

    const { data } = await axios.get(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start_page}`);

    return {
        props: { data }
    };

}

