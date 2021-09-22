import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
import classes from "./modal.module.css";

export default function Modal({ open, onClose, title, children }) {

    const [componentLoaded, setComponentLoaded] = useState(false);

    useEffect(() => setComponentLoaded(true), []);

    const overlay = (
        <div className={classes.overlay}>
            <div className={classes.modal}>
                <div className={classes.header}>
                    <a href="#" onClick={ onClose }><FaTimes /></a>
                </div>

                { title && <h5>{ title }</h5> }

                <div className={classes.body}>
                    { children }
                </div>

            </div>
        </div>
    );

    const modalContent = open ? (overlay) : null

    if(componentLoaded) {
        return ReactDOM.createPortal(modalContent, document.querySelector('#modal-root'));
    } else {
        return null;
    }

}
