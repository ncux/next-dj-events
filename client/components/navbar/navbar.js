import Link from "next/link";
import { useContext } from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../../context/auth";
import classes from "./navbar.module.css";

export default function Navbar() {

    const { user, logout } = useContext(AuthContext);

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

                    {
                        user ? (
                            <>
                                <li>
                                    <Link href="/account/dashboard">
                                        <a>Dashboard</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/events/add">
                                        <a>Add event</a>
                                    </Link>
                                </li>
                                <li>
                                    <button onClick={ logout } className="btn-secondary btn-icon">
                                        <FaSignOutAlt /> Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link href="/account/login">
                                    <a className="btn-secondary btn-icon"> <FaSignInAlt /> Login</a>
                                </Link>
                            </li>
                        )
                    }

                </ul>
            </nav>

        </header>
    );
}
