import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Layout from "../../components/layout/layout";
import classes from "../../styles/event-page.module.css";
import { API_URL } from "../../config";

export default function EventPage({ data }) {

    return (
        <Layout title="">
            <div className={classes.event}>
                <div className={classes.controls}>
                    <Link href={`/events/edit/${data.id}`}>
                        <a><FaPencilAlt /> Edit</a>
                    </Link>
                    <a className={classes.delete}>
                        <FaTimes /> Delete
                    </a>
                </div>

                <span>{ new Date(data.date).toLocaleDateString('en-US') } at { data.time }</span>
                <h1>{ data.name }</h1>
                {
                    data.image && (
                        <div className={classes.image}>
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
                    <a className={classes.back}>Back</a>
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
