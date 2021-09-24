import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Layout from "../../components/layout/layout";
import styles from "../../styles/event-page.module.css";
import { API_URL, httpHeaders } from "../../config";

export default function EventPage({ data }) {

    const router = useRouter();

    const deleteEvent = async () => {
        if(confirm('Are you sure yo want to delete the event?')) {
            try {
                await axios.delete(`${API_URL}/events/${data.id}`, httpHeaders);
                return router.push(`/events`);
            } catch (e) {
                toast.error(e.message);
            }
        }
    };

    return (
        <Layout title="">
            <div className={styles.event}>
                <div className={styles.controls}>
                    <Link href={`/events/edit/${data.id}`}>
                        <a><FaPencilAlt /> Edit</a>
                    </Link>
                    <a onClick={ deleteEvent } className={styles.delete}>
                        <FaTimes /> Delete
                    </a>
                </div>

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
