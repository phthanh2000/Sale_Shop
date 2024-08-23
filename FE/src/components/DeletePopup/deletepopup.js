import { FaRegTrashCan } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './deletepopup.css';

const DeletePopup = (props) => {
    return (
        <Modal
            open={props.open.show}
            onClose={() => { }}
            center
            modalId='delete-popup-modal'>
            <div className="popup-confirm-form">
                <IoIosClose className="close-icon"
                    onClick={() => {
                        props.close({
                            show: !props.open.show,
                            message: '',
                            delete: props.open.delete,
                            item: null
                        })
                    }} />
                <div className="content">
                    <div className="delete-icon" >
                        <FaRegTrashCan />
                    </div>
                    <div className="message">
                        <p>{props.open.message}</p>
                        <p>{props.open.item ? `${props.open.item.name}` : ''}</p>
                        <p>{props.open.item ? `( ID: ${props.open.item.id} )` : ''}</p>
                    </div>
                </div>
                <div className="button">
                    <button className="cancel-button"
                        onClick={() => {
                            props.close({
                                show: !props.open.show,
                                message: '',
                                delete: props.open.delete,
                                item: null
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
                                item: props.open.item
                            })
                        }}>
                        Đồng ý
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default DeletePopup;