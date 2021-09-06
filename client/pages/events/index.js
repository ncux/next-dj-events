import EventItem from "../../components/event-item/event-item";
import Layout from "../../components/layout/layout";

export default function EventsPage({ events }) {

    return (
        <Layout title="DJ Events - All Events">
            <h2>Upcoming Events</h2>
            { events.length === 0 && (<h2>No events</h2>) }

            {
                events.map(evt => {
                    return (
                        <EventItem key={evt.id} evt={ evt } />
                    )
                })
            }
        </Layout>
    );
}
