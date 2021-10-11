import cookie from "cookie";
import Layout from "../../components/layout/layout";
import { API_URL } from "../../config";
import classes from "../../styles/dashboard.module.css";
import DashboardEvent from "../../components/dashboard-event/dashboard-event";

export default function Dashboard({ events }) {

    const deleteEvent = async (id) => {

    };

    return (
        <Layout title="DJ Events - User Events">
            <div className={classes.dashboard}>
                <h1>Dashboard</h1>
                <h3>My Events</h3>

                {
                    events.map(evt => {
                        return (
                            <DashboardEvent key={evt.id} evt={ evt } deleteEvent={ deleteEvent } />
                        );
                    })
                }

            </div>
        </Layout>
    );
};


export async function getServerSideProps(context) {

    const { req } = context;
    const { jwt } = cookie.parse(req.headers.cookie);

    const options = {
        method: 'GET', headers: { Authorization: `Bearer ${jwt}` }
    };

    const response = await fetch(`${API_URL}/events/me`, options);
    const events = await response.json();

    return {
        props: { events }
    }

}

