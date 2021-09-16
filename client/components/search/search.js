import { useRouter } from "next/router";
import { useState } from "react";
import classes from "./search.module.css";

export default function Search() {

    const router = useRouter();

    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!text) return;
        router.push(`/events/search?term=${text}`);
        setText('');
    };

    return (
        <div className={classes.search}>
            <form onSubmit={ handleSubmit }>
                <input type="text" value={ text } onChange={ event => setText(event.target.value) } placeholder="Search events" />
            </form>
        </div>
    );
}
