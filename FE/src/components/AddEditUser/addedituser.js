import { useEffect, useState } from "react";
import { Modal } from 'react-responsive-modal';
import { Service_Role } from "../../service/service_role";
import Overlay from "../Overlay/overlay";
import ErrorPopup from "../ErrorPopup/errorpopup";
import { IoIosClose } from "react-icons/io";
import { IoEye, IoEyeOff } from "react-icons/io5";
import './addedituser.css';

const AddEditUser = (props) => {
    // Crypto AES
    const cryptoJS = require("crypto-js");
    // Secret key
    const secretKey = "your_secret_key";
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
     // Value input id
     const [id, setId] = useState('');
    // Value input name
    const [name, setName] = useState('');
    // Value input email
    const [email, setEmail] = useState('');
    // Value input address
    const [address, setAddress] = useState('');
    // Value input phone
    const [phone, setPhone] = useState('');
    // Value input pass
    const [pass, setPass] = useState('');
    // Value input re-pass
    const [rePass, setRePass] = useState('');
    // Value role present
    const [role, setRole] = useState('');
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
        if (props.open.show) {
            // Async/ await
            async function fetchData() {
                try {
                    // Show overlay when waiting loading data
                    setIsShowOverlay(true);
                    // Get roles list
                    const roles = await Service_Role.GetRole();
                    setRoleOption(roles);
                    setId(props.open.item.id);
                    setName(props.open.item.name);
                    setEmail(props.open.item.email);
                    setAddress(props.open.item.address);
                    setPhone(props.open.item.phone);
                    // Decrypt password
                    const bytes = cryptoJS.AES.decrypt(props.open.item.pass, secretKey);
                    const decryptedData = bytes.toString(cryptoJS.enc.Utf8);
                    setPass(decryptedData);
                    setRePass(decryptedData);
                    setRole(props.open.item.roleid);
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
    }, [props.open.show]);

    return (
        <>
            <Modal open={props.open.show}
                onClose={() => { }}
                center
                modalId='add-edit-user-modal'>
                <div className='add-edit-user-header'>
                    <h2>Thay đổi thông tin</h2>
                    <IoIosClose className="close-icon"
                        onClick={() => props.close({
                            show: false,
                            change: false,
                            item: null
                        })} />
                </div>
                <div className='add-edit-user-center'>
                    <p className='name'>ID:</p>
                    <input type="text"
                        name="id"
                        value={id}
                        className='input-id'
                        disabled={true} />
                    <p className='name'>Họ và tên:</p>
                    <input type="text"
                        name="name"
                        placeholder="Nhập tên người dùng"
                        maxLength={100}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='input-name' />
                    <p className='name'>Thư điện tử:</p>
                    <input type="email"
                        name="email"
                        placeholder="Nhập email"
                        maxLength={50}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='input-email' />
                    <p className='address'>Địa chỉ:</p>
                    <input type="text"
                        name="address"
                        placeholder="Nhập địa chỉ"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className='input-address' />
                    <p className='phone'>Số điện thoại:</p>
                    <input type="tel"
                        name="phone"
                        placeholder="Nhập số điện thoại"
                        maxLength={10}
                        value={`0${phone}`}
                        onChange={(e) => setPhone(e.target.value)}
                        className='input-phone' />
                    <div className='form-pass'>
                        <p className='pass'>Mật khẩu:</p>
                        <input type={isShowPassword ? 'text' : 'password'}
                            name="pass"
                            placeholder="Nhập mật khẩu"
                            maxLength={50}
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            className='input-password' />
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
                            value={rePass}
                            onChange={(e) => setRePass(e.target.value)}
                            className='input-password' />
                        {isShowRePassword ?
                            <IoEye onClick={() => onClickIconEyeToPasswordDislay('re-pass')}></IoEye>
                            :
                            <IoEyeOff onClick={() => onClickIconEyeToPasswordDislay('re-pass')}></IoEyeOff>
                        }
                    </div>
                    <p className='role'>Quyền:</p>
                    <select className='select-role' value={role} onChange={(e) => setRole(e.target.value)}>
                        {roleOption.map((role) => (
                            <option value={role.id}>{role.name}</option>
                        ))}
                    </select>
                </div>
                <div className='add-edit-user-footer'>
                    <button className='cancel'
                        onClick={() => {
                            props.close({
                                show: false,
                                change: false,
                                item: null
                            })
                        }}>
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