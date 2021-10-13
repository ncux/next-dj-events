import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import cookie from "cookie";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import { FaImage } from "react-icons/fa";
import Layout from "../../../components/layout/layout";
import { API_URL, httpHeaders } from "../../../config";
import "react-toastify/dist/ReactToastify.css";
import classes from "../../../styles/add.module.css";
import Modal from "../../../components/modal/modal";
import ImageUpload from "../../../components/image-upload/image-upload";

export default function EditEventPage({ data, jwt }) {

    const [values, setValues] = useState({
        name: data?.name,
        venue: data?.venue,
        performers: data?.performers,
        address: data?.address,
        date: data?.date,
        time: data?.time,
        description: data?.description
    });

    const [imagePreview, setImagePreview] = useState(data.image ? data.image.formats.thumbnail.url : null);

    const [openModal, setOpenModal] = useState(false);

    const router = useRouter();

    const imageUploaded = async () => {
        try {
            const evt = await axios.get(`${API_URL}/events/${data.id}`);
            setImagePreview(evt.image ? evt.image.formats.thumbnail.url : null);
            setOpenModal(false);
        } catch (e) {
            console.log(e);
        }
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const hasEmptyFields = Object.values(values).some(val => val === '');
        if(hasEmptyFields) {
            toast.error('Please fill on all fields!');
        }
        try {
            const httpHeadersWithToken = { ...httpHeaders, Authorization: `Bearer ${jwt}` };
            await axios.put(`${API_URL}/events/${data.id}`, JSON.stringify(values), httpHeadersWithToken);
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
            <h2>Edit Event </h2>
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
                        <input type="date" value={ moment(values.date).format('yyyy-MM-DD') } required onChange={ event => setValues({ ...values, date: event.target.value }) } />
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
            <h4>Event Poster</h4>
            {
                imagePreview ? (<Image src={ imagePreview } width={170} height={100} />) : (<p>No image uploaded!</p>)
            }
            <div>
                <button onClick={ () => setOpenModal(true) } className="btn-secondary"><FaImage /> Upload image</button>
            </div>

            <Modal open={ openModal } onClose={ () => setOpenModal(false) }>
                <ImageUpload id={data.id} imageUploaded={imageUploaded} jwt={ jwt } />
            </Modal>
        </Layout>
    );
};

export async function getServerSideProps(context) {

    const { params, req } = context;

    const { jwt } = cookie.parse(req.headers.cookie);

    const { data } = await axios.get(`${API_URL}/events/${params.id}`);

    return {
        props: { data, jwt }
    };

}
