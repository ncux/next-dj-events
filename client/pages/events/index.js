import axios from "axios";
import EventItem from "../../components/event-item/event-item";
import Layout from "../../components/layout/layout";
import { API_URL, PER_PAGE } from "../../config";
import Pagination from "../../components/pagination/pagination";

export default function EventsPage({ data, currentPage, totalEvents }) {

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

            <Pagination currentPage={ currentPage } total={ totalEvents } />

        </Layout>
    );
};


export async function getServerSideProps(context) {

    const { query } = context;  // query.page to get page num

    // get total number of events from DB
    const events = await fetch(`${API_URL}/events/count`);
    const totalEvents = await events.json();

    // calculate start page
    const start_page = +query.page === 1 ? 0 : (+query.page - 1) * PER_PAGE;
    const start = +start_page;

    const { data } = await axios.get(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`);

    return {
        props: { data, currentPage: +query.page, totalEvents }
    };

}

