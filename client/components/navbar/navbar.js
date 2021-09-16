import Link from "next/link";
import classes from "./navbar.module.css";

export default function Navbar() {

    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <Link href="/">
                    <a >DJ Events</a>
                </Link>
            </div>

            <nav>
                <ul>
                    <li>
                        <Link href="/events">
                            <a>Events</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/events/add">
                            <a>Add event</a>
                        </Link>
                    </li>
                </ul>
            </nav>

        </header>
    );
}
