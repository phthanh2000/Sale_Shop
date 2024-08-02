import { FaRegTrashCan } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './confirmpopup.css';

const ConfirmPopup = (props) => {
    return (
        <Modal
            open={props.open.show}
            onClose={() => { }}
            center>
            <div className="popup-confirm-form">
                <IoIosClose className="close-icon"
                    onClick={() => {
                        props.close({
                            show: !props.open.show,
                            message: '',
                            delete: props.open.delete,
                            user: null
                        })
                    }} />
                <div className="content">
                    <div className="delete-icon" >
                        <FaRegTrashCan />
                    </div>
                    <div className="message">
                        <p>{props.open.message}</p>
                        <p>{props.open.user ? `${props.open.user.name}` : ''}</p>
                        <p>{props.open.user ? `( ID: ${props.open.user.id} )` : ''}</p>
                    </div>
                </div>
                <div className="button">
                    <button className="cancel-button"
                        onClick={() => {
                            props.close({
                                show: !props.open.show,
                                message: '',
                                delete: props.open.delete,
                                user: null
                            })
                        }}>
                        Hủy bỏ
                    </button>
                    <button className="ok-button"
                        onClick={() => {
                            props.ok({
                                show: !props.open.show,
                                message: '',
                                delete: !props.open.delete,
                                user: props.open.user
                            })
                        }}>
                        Đồng ý
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default ConfirmPopup;