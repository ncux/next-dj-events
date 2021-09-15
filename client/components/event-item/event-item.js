import Link from "next/link";
import Image from "next/image";
import classes from "./event-item.module.css";

export default function EventItem({ evt }) {

    const { date, image, name, slug, time } = evt;

    return (
        <div className={classes.event}>
            <div className={classes.image}>
                <Image src={ image ? image.formats.thumbnail.url : '/images/event-default.png' } alt="event image" width={170} height={100} />
            </div>
            <div className={classes.info}>
                <span>{ new Date(date).toLocaleDateString('en-US') } at { time }</span>
                <h3>{ name ? name : '' }</h3>
            </div>

            <Link href={`/events/${slug}`}>
                <a className="btn">View Event</a>
            </Link>

        </div>
    );
}
