import { useEffect, useState } from "react";
import { Modal } from 'react-responsive-modal';
import { Service_Role } from "../../service/service_role";
import { Service_User } from "../../service/service_user";
import { MdEdit } from "react-icons/md";
import { IoIosClose } from "react-icons/io";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Overlay from "../Overlay/overlay";
import ErrorPopup from "../ErrorPopup/errorpopup";
import Spinner from "../../assets/spinner.gif"
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
    // Display message when error name input
    const [nameMessage, setNameMessage] = useState('');
    // Display message when error email input
    const [emailMessage, setEmailMessage] = useState('');
    // Display message when error phone input
    const [phoneMessage, setPhoneMessage] = useState('');
    // Display message when error pass input
    const [passMessage, setPassMessage] = useState('');
    // Display message when error re-pass input
    const [rePassMessage, setRePassMessage] = useState('');
    // Event on click eye icon to password display 
    const onClickIconEyeToPasswordDislay = (name) => {
        if (name === 'pass') {
            setIsShowPassword(!isShowPassword);
        } else {
            setIsShowRePassword(!isShowRePassword);
        }
    };
    // Event on click ok button 
    const onClickOkButton = async () => {
        if (name === '') {
            setNameMessage('Tên người dùng không được để trống');
        }
        if (email === '') {
            setEmailMessage('Email không được để trống');
        }
        // Check if the string has @ with Regular Expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setEmailMessage('Email không đúng định dạng example@example.com');
        }
        if (phone === '') {
            setPhoneMessage('Số điện thoại không được để trống');
        }
        // Check for a string with 10 digits with regular expression
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone) || phone.length < 10) {
            setPhoneMessage('Số điện thoại không đúng định dạng (chỉ gồm số và có 10 số)');
        }
        if (pass === '') {
            setPassMessage('Mật khẩu không được để trống');
        }
        if (rePass === '') {
            setRePassMessage('Nhập lại mật khẩu không được đê trống')
        }
        if (pass !== '' && rePass !== '' && pass !== rePass) {
            setRePassMessage('Mật khẩu không khớp');
        }
        if (name !== '' && email !== '' && emailRegex.test(email) && phone !== '' && phoneRegex.test(phone) && pass !== '' && rePass !== '') {
            // Login API create user
            try {
                // Show overlay when waiting loading data
                setIsShowOverlay(true);
                const dataUpdate = {
                    name: name,
                    email: email,
                    address: address ? address : '',
                    phone: phone,
                    pass: pass,
                    roleid: role
                };
                const result = await Service_User.UpdateUser('', id, dataUpdate);
                if (result === 'Email is used') {
                    setEmailMessage('Email đã được đăng ký');
                } else if (result === 'Phone is registered') {
                    setPhoneMessage('Số điện thoại đã được đăng ký');
                } else {
                    // Handle ok form
                    props.ok(result);
                    // Set values in form to back default is empty
                    setId('');
                    setName('');
                    setEmail('');
                    setAddress('');
                    setPhone('');
                    setPass('');
                    setRePass('');
                    setRole('');
                    setNameMessage('');
                    setEmailMessage('');
                    setPhoneMessage('');
                    setPassMessage('');
                    setRePassMessage('');
                    // Set show pass is false
                    setIsShowPassword(false);
                    setIsShowRePassword(false);
                }
            } catch (error) {
                setIsShowErrorPopup({
                    show: true,
                    message: error
                });
            }
            // Hide overlay after loaded data 
            setIsShowOverlay(false);
        }
    };
    // Event on enter input form
    const onKeyEnter = async (event) => {
        if (event.key === 'Enter') {
            onClickOkButton();
        }
    }
    // Event on close form 
    const onCloseForm = () => {
        // Handle close form
        props.close({
            show: false,
            event: null,
            item: null
        });
        // Set values in form to back default is empty
        setId('');
        setName('');
        setEmail('');
        setAddress('');
        setPhone('');
        setPass('');
        setRePass('');
        setRole('');
        setNameMessage('');
        setEmailMessage('');
        setPhoneMessage('');
        setPassMessage('');
        setRePassMessage('');
        // Set show pass is false
        setIsShowPassword(false);
        setIsShowRePassword(false);
    }

    useEffect(() => {
        // Async/ await
        async function fetchData() {
            try {
                // Show overlay when waiting loading data
                setIsShowOverlay(true);
                // Get roles list
                const roles = await Service_Role.GetRole();
                setRoleOption(roles);
                // If event is click button edit item then fill value into form
                if (props.open.event === 'edit') {
                    setId(props.open.item.id);
                    setName(props.open.item.name);
                    setEmail(props.open.item.email);
                    setAddress(props.open.item.address);
                    setPhone(`0${props.open.item.phone}`);
                    // Decrypt password
                    const bytes = cryptoJS.AES.decrypt(props.open.item.pass, secretKey);
                    const decryptedData = bytes.toString(cryptoJS.enc.Utf8);
                    setPass(decryptedData);
                    setRePass(decryptedData);
                    setRole(props.open.item.roleid);
                }
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
    }, [props.open.event]);

    return (
        <>
            <Modal open={props.open.show}
                onClose={() => { }}
                center
                modalId='add-edit-user-modal'>
                <div className='add-edit-user-header'>
                    <h2>{props.open.event === 'edit' ? 'Chỉnh sửa thông tin' : 'Thêm mới'}</h2>
                    <MdEdit className="icon-edit" />
                    <IoIosClose className="close-icon"
                        onClick={() => onCloseForm()} />
                </div>
                <div className='add-edit-user-center'>
                    <p className='name'>ID:</p>
                    <input type="text"
                        name="id"
                        value={id}
                        className='input-id'
                        disabled={true} />
                    <div className="warning"></div>
                    <p className='name'>Tên người dùng: <strong>*</strong></p>
                    <input type="text"
                        name="name"
                        placeholder="Nhập tên người dùng"
                        maxLength={100}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        onClick={() => setNameMessage('')}
                        onKeyDown={(e) => { onKeyEnter(e) }}
                        className='input-name' />
                    <div className={nameMessage ? "warning visible" : "warning hidden"}>{nameMessage}</div>
                    <p className='name'>Thư điện tử: <strong>*</strong></p>
                    <input type="email"
                        name="email"
                        placeholder="Nhập email"
                        maxLength={50}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onClick={() => setEmailMessage('')}
                        onKeyDown={(e) => { onKeyEnter(e) }}
                        className='input-email' />
                    <div className={emailMessage ? "warning visible" : "warning hidden"}>{emailMessage}</div>
                    <p className='address'>Địa chỉ:</p>
                    <input type="text"
                        name="address"
                        placeholder="Nhập địa chỉ"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        onKeyDown={(e) => { onKeyEnter(e) }}
                        className='input-address' />
                    <div className="warning"></div>
                    <p className='phone'>Số điện thoại: <strong>*</strong></p>
                    <input type="tel"
                        name="phone"
                        placeholder="Nhập số điện thoại"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onClick={() => setPhoneMessage('')}
                        onKeyDown={(e) => { onKeyEnter(e) }}
                        className='input-phone' />
                    <div className={phoneMessage ? "warning visible" : "warning hidden"}>{phoneMessage}</div>
                    <div className='form-pass'>
                        <p className='pass'>Mật khẩu: <strong>*</strong></p>
                        <input type={isShowPassword ? 'text' : 'password'}
                            name="pass"
                            placeholder="Nhập mật khẩu"
                            maxLength={50}
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            onClick={() => setPassMessage('')}
                            onKeyDown={(e) => { onKeyEnter(e) }}
                            className='input-password' />
                        {isShowPassword ?
                            <IoEye onClick={() => onClickIconEyeToPasswordDislay('pass')}></IoEye>
                            :
                            <IoEyeOff onClick={() => onClickIconEyeToPasswordDislay('pass')}></IoEyeOff>
                        }
                    </div>
                    <div className={passMessage ? "warning visible" : "warning hidden"}>{passMessage}</div>
                    <div className='form-re-pass'>
                        <p className='re-pass'>Nhập lại mật khẩu: <strong>*</strong></p>
                        <input type={isShowRePassword ? 'text' : 'password'}
                            name="re-pass"
                            placeholder="Nhập lại mật khẩu"
                            maxLength={50}
                            value={rePass}
                            onChange={(e) => setRePass(e.target.value)}
                            onClick={() => setRePassMessage('')}
                            onKeyDown={(e) => { onKeyEnter(e) }}
                            className='input-password' />
                        {isShowRePassword ?
                            <IoEye onClick={() => onClickIconEyeToPasswordDislay('re-pass')}></IoEye>
                            :
                            <IoEyeOff onClick={() => onClickIconEyeToPasswordDislay('re-pass')}></IoEyeOff>
                        }
                    </div>
                    <div className={rePassMessage ? "warning visible" : "warning hidden"}>{rePassMessage}</div>
                    <p className='role'>Quyền: <strong>*</strong></p>
                    <select className='select-role' value={role} onChange={(e) => setRole(e.target.value)}>
                        {roleOption.map((role) => (
                            <option value={role.id}>{role.name}</option>
                        ))}
                    </select>
                </div>
                <div className='add-edit-user-footer'>
                    <button className='cancel'
                        onClick={() => onCloseForm()}>
                        Hủy bỏ
                    </button>
                    <button className='ok'
                        onClick={() => { onClickOkButton() }}>
                        {isShowOverlay ?
                            <img className="spinner-image" src={Spinner} alt="spinner" />
                            :
                            <>{props.open.event === 'edit' ? "Cập nhật" : "Thêm"}</>
                        }
                    </button>
                </div>
                {isShowOverlay && <Overlay />}
                <ErrorPopup open={isShowErrorPopup} close={(e) => setIsShowErrorPopup(e)} />
            </Modal>
        </>
    )
};

export default AddEditUser;