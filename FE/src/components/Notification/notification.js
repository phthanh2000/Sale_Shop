import { useEffect, useState } from "react";
import "./notification.css";

const Notification = (props) => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (props.show.visible) {
            if(props.show.event === 'add') {
                setMessage('Đã thêm thành công!');
            } else if (props.show.event === 'edit') {
                setMessage('Cập nhật thành công!');
            } else {
                setMessage('Đã xóa thành công!')
            }
            setTimeout(() => {
                props.hide({
                    visible: false,
                    event: ''
                });
            }, 3000);
        }
    }, [props.show.visible]);

    return (
        <div className={`notification ${props.show.visible ? 'fade-in' : 'fade-out'}`}>
            <p>{message}</p>
        </div>
    )
};
export default Notification;