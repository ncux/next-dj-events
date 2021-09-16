import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "../../components/layout/layout";
import { API_URL } from "../../config";
import classes from "../../styles/add.module.css";

export default function AddEventPage() {

    const [values, setValues] = useState({
        name: '',
        venue: '',
        performers: '',
        address: '',
        date: '',
        time: '',
        description: ''
    });

    const router = useRouter();

    const handleSubmit = e => {
        e.preventDefault();
        if(values.name && values.venue && values.address && values.date && values.time) {
            console.log(values);
        }
    };

    return (
        <Layout title="Add an event">
            <Link href="/">Go back</Link>
            <h2>Add Event Page</h2>
            <form onSubmit={ handleSubmit } className={classes.form}>
                <div className={classes.grid}>
                    <div>
                        <label>Event name</label>
                        <input type="text" value={values.name} required onChange={ event => setValues({ ...values, name: event.target.value }) } />
                    </div>
                    <div>
                        <label>Venue</label>
                        <input type="text" value={values.venue} required onChange={ event => setValues({ ...values, venue: event.target.value }) } />
                    </div>
                    <div>
                        <label>Performers</label>
                        <input type="text" value={values.performers} onChange={ event => setValues({ ...values, performers: event.target.value }) } />
                    </div>
                    <div>
                        <label>Address</label>
                        <input type="text" value={values.address} required onChange={ event => setValues({ ...values, address: event.target.value }) } />
                    </div>
                    <div>
                        <label>Date</label>
                        <input type="date" value={values.date} required onChange={ event => setValues({ ...values, date: event.target.value }) } />
                    </div>
                    <div>
                        <label>Time</label>
                        <input type="text" value={values.time} required onChange={ event => setValues({ ...values, time: event.target.value }) } />
                    </div>
                </div>
                <div>
                    <label>Description</label>
                    <textarea type="text" value={values.description} onChange={ event => setValues({ ...values, description: event.target.value }) } ></textarea>
                </div>
                <input type="submit" value="Save" className="btn"/>
            </form>
        </Layout>
    );
}
