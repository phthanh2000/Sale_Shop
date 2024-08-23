import { MdError } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './errorpopup.css';

const ErrorPopup = (props) => {
    return (
        <Modal
            open={props.open.show}
            onClose={() => { }}
            center
            modalId="error-popup-modal">
            <div className="popup-error-form">
                <IoIosClose className="close-icon"
                    onClick={() => {
                        props.close({
                            show: !props.open.show,
                            message: ''
                        })
                    }} />
                <div className="content">
                    <div className="error-icon" >
                        <MdError />
                    </div>
                    <div className="message">
                        {props.open.message}
                    </div>
                </div>
                <div className="button">
                    <button className="close-button"
                        onClick={() => {
                            props.close({
                                show: !props.open.show,
                                message: ''
                            })
                        }}>
                        Đóng
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default ErrorPopup;