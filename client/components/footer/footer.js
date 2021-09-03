import Link from "next/link";
import classes from "./footer.module.css";

export default function Footer() {

    return (
        <footer className={classes.footer}>
            <p>Copyright &copy; DJ Events 2021</p>
            <p>
                <Link href="/about">About DJ Events</Link>
            </p>
        </footer>
    );
}
