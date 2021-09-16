import Search from "../search/search";
import classes from "./showcase.module.css";

export default function Showcase() {

    return (
        <div className={classes.showcase}>
            <h1>Welcome To The Party!</h1>
            <h2>Find the current and upcoming DJ Events</h2>
            <Search />
        </div>
    );
}
