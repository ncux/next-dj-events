import Link from "next/link";
import Image from "next/image";
import { FaPencilAlt, FaTimes } from "react-icons/fa";
import classes from "./dashboard-event.module.css";


export default function DashboardEvent({ evt, deleteEvent }) {

    const { id, date, image, name, slug, time } = evt;

    return (
        <div className={classes.event}>
            <h4>
                <Link href={`/events/${slug}`}>
                    <a>{ name }</a>
                </Link>
            </h4>
            <Link href={`events/edit/${id}`}>
                <a className={classes.edit}><FaPencilAlt /> <span>Edit</span></a>
            </Link>

            <a href="#" onClick={ () => deleteEvent(id) } className={classes.delete}>
                <FaTimes /> Delete
            </a>

            {/*<div className={classes.image}>*/}
            {/*    <Image src={ image ? image.formats.thumbnail.url : '/images/event-default.png' } alt="event image" width={170} height={100} />*/}
            {/*</div>*/}
            {/*<div className={classes.info}>*/}
            {/*    <span>{ new Date(date).toLocaleDateString('en-US') } at { time }</span>*/}
            {/*    <h3>{ name ? name : '' }</h3>*/}
            {/*</div>*/}

            {/*<Link href={`/events/${slug}`}>*/}
            {/*    <a className="btn">View Event</a>*/}
            {/*</Link>*/}

        </div>
    );
}
