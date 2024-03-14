import { useState } from "react";
import { IoWarning } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './warningpopup.css';

export const WarningPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <Modal
            open={true}
            onClose={() => { }}
            center>
            <div className="popup-warning-form">
                <IoIosClose className="close-icon" onClick={() => {setIsOpen(!isOpen)}}/>
                <div className="content">
                    <div className="warning-icon" >
                    <IoWarning />
                    </div>
                    <div className="message">
                        Thông báo cảnh báo hiển thị ở đây
                    </div>
                </div>
                <div className="button">
                    <button className="cancel-button">Hủy bỏ</button>
                    <button className="ok-button">Đồng ý</button>
                </div>
            </div>
        </Modal>
    )
}