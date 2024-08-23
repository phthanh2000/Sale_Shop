import { useEffect, useState } from "react";
import { Modal } from 'react-responsive-modal';
import { Service_Role } from "../../service/service_role";
import Overlay from "../Overlay/overlay";
import ErrorPopup from "../ErrorPopup/errorpopup";
import { IoIosClose } from "react-icons/io";
import { IoEye, IoEyeOff } from "react-icons/io5";
import './addedituser.css';

const AddEditUser = (props) => {
    // Display password
    const [isShowPassword, setIsShowPassword] = useState(false);
    // Display re-password
    const [isShowRePassword, setIsShowRePassword] = useState(false);
    // Hide/ Show overlay or loading when handler loading data or on click update button
    const [isShowOverlay, setIsShowOverlay] = useState(false);
    // Hide/ Show error message when handler loading data or on click confirm button error
    const [isShowErrorPopup, setIsShowErrorPopup] = useState({
        show: false,
        message: ''
    });
    // Option of select role
    const [roleOption, setRoleOption] = useState([]);
    // Event on click eye icon to password display 
    const onClickIconEyeToPasswordDislay = (name) => {
        if (name === 'pass') {
            setIsShowPassword(!isShowPassword);
        } else {
            setIsShowRePassword(!isShowRePassword);
        }
    };

    useEffect(() => {
        if (props.open) {
            // Async/ await
            async function fetchData() {
                try {
                    // Show overlay when waiting loading data
                    setIsShowOverlay(true);
                    // Get roles list
                    const roles = await Service_Role.GetRole();
                    setRoleOption(roles);
                    // Hide overlay after loaded data 
                    setIsShowOverlay(false);
                } catch (error) {
                    setIsShowErrorPopup({
                        show: true,
                        message: error
                    });
                }
            };
            fetchData();
        }
    }, [props.open]);

    return (
        <>
            <Modal open={props.open}
                onClose={() => { }}
                center
                modalId='add-edit-user-modal'>
                <div className='add-edit-user-header'>
                    <h2>Thay đổi thông tin</h2>
                    <IoIosClose className="close-icon"
                        onClick={() => props.close(false)} />
                </div>
                <div className='add-edit-user-center'>
                    <p className='name'>Họ và tên:</p>
                    <input type="text"
                        name="name"
                        placeholder="Nhập tên người dùng"
                        maxLength={100}
                        className='input-name'></input>
                    <p className='name'>Thư điện tử:</p>
                    <input type="email"
                        name="email"
                        placeholder="Nhập email"
                        maxLength={50}
                        className='input-email'></input>
                    <p className='address'>Địa chỉ:</p>
                    <input type="text"
                        name="address"
                        placeholder="Nhập địa chỉ"
                        className='input-address'></input>
                    <p className='phone'>Số điện thoại:</p>
                    <input type="tel"
                        name="phone"
                        placeholder="Nhập số điện thoại"
                        maxLength={10}
                        className='input-phone'></input>
                    <div className='form-pass'>
                        <p className='pass'>Mật khẩu:</p>
                        <input type={isShowPassword ? 'text' : 'password'}
                            name="pass"
                            placeholder="Nhập mật khẩu"
                            maxLength={50}
                            className='input-password'></input>
                        {isShowPassword ?
                            <IoEye onClick={() => onClickIconEyeToPasswordDislay('pass')}></IoEye>
                            :
                            <IoEyeOff onClick={() => onClickIconEyeToPasswordDislay('pass')}></IoEyeOff>
                        }
                    </div>
                    <div className='form-re-pass'>
                        <p className='re-pass'>Nhập lại mật khẩu:</p>
                        <input type={isShowRePassword ? 'text' : 'password'}
                            name="re-pass"
                            placeholder="Nhập lại mật khẩu"
                            maxLength={50}
                            className='input-password'></input>
                        {isShowRePassword ?
                            <IoEye onClick={() => onClickIconEyeToPasswordDislay('re-pass')}></IoEye>
                            :
                            <IoEyeOff onClick={() => onClickIconEyeToPasswordDislay('re-pass')}></IoEyeOff>
                        }
                    </div>
                    <p className='role'>Quyền:</p>
                    <select className='select-role'>
                        {roleOption.map((role) => (
                            <option value={role.id}>{role.name}</option>
                        ))}
                    </select>
                </div>
                <div className='add-edit-user-footer'>
                    <button className='cancel'
                        onClick={() => { props.close(false) }}>
                        Hủy bỏ
                    </button>
                    <button className='ok'>Đồng ý</button>
                </div>
                {isShowOverlay && <Overlay />}
                <ErrorPopup open={isShowErrorPopup} close={(e) => setIsShowErrorPopup(e)} />
            </Modal>
        </>
    )
};

export default AddEditUser;