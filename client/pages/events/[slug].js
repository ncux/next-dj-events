import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";
import Layout from "../../components/layout/layout";
import classes from "../../styles/event-page.module.css";

export default function EventPage(evt) {

    const router = useRouter();

    return (
        <Layout title="">
            <div className={classes.event}>
                <div className={classes.controls}>
                    <Link href={`/events/edit/${evt.id}`}>
                        <a><FaPencilAlt /> Edit</a>
                    </Link>
                    <a className={classes.delete}>
                        <FaTimes /> Delete
                    </a>
                </div>

                <span>{ evt.date } at { evt.time }</span>
                <h1>{ evt.name }</h1>
                {
                    evt.image && (
                        <div className={classes.image}>
                            <Image src={ evt.image } width={960} height={600} alt="Event image" />
                        </div>
                    )
                }
                <h3>Performers</h3>
                <p>{ evt.performers }</p>
                <h3>Description</h3>
                <p>{ evt.description }</p>
                <h3>Venue: { evt.venue }</h3>
                <p>{ evt.address }</p>

                <Link href={`/events}`}>
                    <a className={classes.back}>Back</a>
                </Link>
            </div>
        </Layout>
    );
};

export async function getServerSideProps(context) {

    const { query } = context;  // get slug from query

    return {
        props: {  }
    }

}
