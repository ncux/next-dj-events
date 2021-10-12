import { useState } from "react";
import { useRouter } from "next/router";
import cookie from "cookie";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import Layout from "../../components/layout/layout";
import { API_URL, httpHeaders } from "../../config";
import "react-toastify/dist/ReactToastify.css";
import classes from "../../styles/add.module.css";

export default function AddEventPage({ jwt }) {

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

    const handleSubmit = async e => {
        e.preventDefault();
        const hasEmptyFields = Object.values(values).some(val => val === '');
        if(hasEmptyFields) {
            toast.error('Please fill on all fields!');
        }
        try {
            const httpHeadersWithToken = { ...httpHeaders, Authorization: `Bearer ${jwt}` };
            const { data } = await axios.post(`${API_URL}/events`, JSON.stringify(values), httpHeadersWithToken);
            // console.log(data);

            return router.push(`/events/${data?.slug}`);
        } catch (e) {
            toast.error(e.message);
        }
    };

    return (
        <Layout title="Add an event">
            <Link href="/">Go back</Link>
            <ToastContainer />
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
                        <input type="text" value={values.performers} required onChange={ event => setValues({ ...values, performers: event.target.value }) } />
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
                    <textarea type="text" value={values.description} required onChange={ event => setValues({ ...values, description: event.target.value }) } ></textarea>
                </div>
                <input type="submit" value="Save" className="btn"/>
            </form>
        </Layout>
    );
};

export async function getServerSideProps(context) {

    const { req } = context;
    const { jwt } = cookie.parse(req.headers.cookie);

    return {
        props: { jwt }
    }

}

