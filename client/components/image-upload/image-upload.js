import { useState } from "react";
import axios from "axios";
import { API_URL, httpHeaders } from "../../config";
import classes from "../../styles/add.module.css";

export default function ImageUpload({ id, imageUploaded, jwt }) {

    const [image, setImage] = useState('');

    const uploadImage = async e => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('files', image);
            formData.append('ref', 'events');
            formData.append('refId', id);
            formData.append('field', 'image');
            const httpHeadersWithToken = { ...httpHeaders, Authorization: `Bearer ${jwt}` };
            await axios.post(`${API_URL}/upload`, formData, httpHeadersWithToken);
            imageUploaded();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={classes.form}>
            <h1>Upload event image</h1>
            <form onSubmit={ uploadImage }>
                <div className={classes.file}>
                    <input type="file" onChange={ event => setImage(event.target.files[0]) } />
                </div>
                <input type="submit" value="Upload" className="btn" />
            </form>
        </div>
    );
}
