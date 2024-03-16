import { IoWarning } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './warningpopup.css';

const WarningPopup = (props) => {
    return (
        <Modal
            open={props.open.show}
            onClose={() => { }}
            center>
            <div className="popup-warning-form">
                <IoIosClose className="close-icon"
                    onClick={() => props.close({
                        show: false,
                        message: ''
                    })
                    } />
                <div className="content">
                    <div className="warning-icon" >
                        <IoWarning />
                    </div>
                    <div className="message">
                        {props.open.message}
                    </div>
                </div>
                <div className="button">
                    <button className="cancel-button"
                        onClick={() => props.close({
                            show: false,
                            message: ''
                        })
                        } >Hủy bỏ</button>
                    <button className="ok-button">Đồng ý</button>
                </div>
            </div>
        </Modal>
    )
}

export default WarningPopup;