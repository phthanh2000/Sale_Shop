import { useState } from "react";
import { MdError } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './errorpopup.css';

export const ErrorPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Modal
            open={true}
            onClose={() => { }}
            center>
            <div className="popup-error-form">
                <IoIosClose className="close-icon" onClick={() => {setIsOpen(!isOpen)}}/>
                <div className="content">
                    <div className="error-icon" >
                    <MdError />
                    </div>
                    <div className="message">
                        Thông báo lỗi hiển thị ở đây
                    </div>
                </div>
                <div className="button">
                    <button className="close-button">Đóng</button>
                </div>
            </div>
        </Modal>
    )
}