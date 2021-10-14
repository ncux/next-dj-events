import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../../components/layout/layout";
import styles from "../../styles/event-page.module.css";
import { API_URL, httpHeaders } from "../../config";
import MapBox from "../../components/map-box/map-box";

export default function EventPage({ data }) {

    return (
        <Layout title="">
            <div className={styles.event}>

                <span>{ new Date(data.date).toLocaleDateString('en-US') } at { data.time }</span>
                <h1>{ data.name }</h1>

                <ToastContainer />

                {
                    data.image && (
                        <div className={styles.image}>
                            <Image src={ data.image.formats.medium.url } width={960} height={600} alt="Event image" />
                        </div>
                    )
                }
                <h3>Performers</h3>
                <p>{ data.performers }</p>
                <h3>Description</h3>
                <p>{ data.description }</p>
                <h3>Venue: { data.venue }</h3>
                <p>{ data.address }</p>

                <MapBox evt={ data } />

                <Link href={`/events}`}>
                    <a className={styles.back}>Back</a>
                </Link>
            </div>
        </Layout>
    );
};

export async function getServerSideProps(context) {

    const { query } = context;  // get slug from query
    const { data } = await axios.get(`${API_URL}/events?slug=${query.slug}`);

    return {
        props: { data: data[0] }
    }

}
