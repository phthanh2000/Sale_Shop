import { useEffect, useReducer, useState } from "react";
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
    const reducer = (state, action) => {
        switch (action.type) {
            case ('id'):
                return props.open.item.id;
            case ('name'):
                if(action.value) {
                    return action.value;
                }
                return props.open.item.name;
            case ('email'):
                if(action.value) {
                    return action.value;
                }
                return props.open.item.email;
            case ('address'):
                if(action.value) {
                    return action.value;
                }
                return props.open.item.address;
            case ('phone'):
                if(action.value) {
                    return action.value;
                }
                return props.open.item.phone;
            case ('pass'):
            case ('repass'):
                if(action.value) {
                    return action.value;
                }
                // Decrypt password
                const bytes = cryptoJS.AES.decrypt(props.open.item.pass, secretKey);
                const decryptedData = bytes.toString(cryptoJS.enc.Utf8);
                return decryptedData;
            case ('roleid'):
                if(action.value) {
                    return Number(action.value);
                }
                return props.open.item.roleid;
            case (''):
                return '';
            default:
                throw new Error();
        }
    }
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
    const [id, setId] = useReducer(reducer, '');
    // Value input name
    const [name, setName] = useReducer(reducer, '');
    // Value input email
    const [email, setEmail] = useReducer(reducer, '');;
    // Value input address
    const [address, setAddress] = useReducer(reducer, '');
    // Value input phone
    const [phone, setPhone] = useReducer(reducer, '');
    // Value input pass
    const [pass, setPass] = useReducer(reducer, '');
    // Value input re-pass
    const [rePass, setRePass] = useReducer(reducer, '');
    // Value roleid present
    const [roleId, setRoleId] = useReducer(reducer, '');
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
                    setId({ type: 'id' });
                    setName({ type: 'name' });
                    setEmail({ type: 'email' });
                    setAddress({ type: 'address' });
                    setPhone({ type: 'phone' });
                    setPass({ type: 'pass' });
                    setRePass({ type: 'repass' });
                    setRoleId({ type: 'roleid' });
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
                    roleid: roleId
                };
                const result = await Service_User.UpdateUser('', id, dataUpdate);
                if (result === 'Email is used') {
                    setEmailMessage('Email đã được đăng ký');
                } else if (result === 'Phone is registered') {
                    setPhoneMessage('Số điện thoại đã được đăng ký');
                } else {
                    // Add role name in object
                    const role = roleOption.find(r => r.id === result.roleid);
                    result.rolename = role.name;
                    // Handle ok form
                    props.ok(result);
                    // Set values in form to back default is empty
                    setId({ type: '' });
                    setName({ type: '' });
                    setEmail({ type: '' });
                    setAddress({ type: '' });
                    setPhone({ type: '' });
                    setPass({ type: '' });
                    setRePass({ type: '' });
                    setRoleId({ type: '' });
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
        setId({ type: '' });
        setName({ type: '' });
        setEmail({ type: '' });
        setAddress({ type: '' });
        setPhone({ type: '' });
        setPass({ type: '' });
        setRePass({ type: '' });
        setRoleId({ type: '' });
        setNameMessage('');
        setEmailMessage('');
        setPhoneMessage('');
        setPassMessage('');
        setRePassMessage('');
        // Set show pass is false
        setIsShowPassword(false);
        setIsShowRePassword(false);
    }

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
                        onChange={(e) => setName({type: 'name', value: e.target.value})}
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
                        onChange={(e) => setEmail({type: 'email', value: e.target.value})}
                        onClick={() => setEmailMessage('')}
                        onKeyDown={(e) => { onKeyEnter(e) }}
                        className='input-email' />
                    <div className={emailMessage ? "warning visible" : "warning hidden"}>{emailMessage}</div>
                    <p className='address'>Địa chỉ:</p>
                    <input type="text"
                        name="address"
                        placeholder="Nhập địa chỉ"
                        value={address}
                        onChange={(e) => setAddress({type: 'address', value: e.target.value})}
                        onKeyDown={(e) => { onKeyEnter(e) }}
                        className='input-address' />
                    <div className="warning"></div>
                    <p className='phone'>Số điện thoại: <strong>*</strong></p>
                    <input type="tel"
                        name="phone"
                        placeholder="Nhập số điện thoại"
                        maxLength={10}
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        value={phone}
                        onChange={(e) => setPhone({type: 'phone', value: e.target.value})}
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
                            onChange={(e) => setPass({type: 'pass', value: e.target.value})}
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
                            onChange={(e) => setRePass({type: 'repass', value: e.target.value})}
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
                    <select className='select-role' value={roleId} 
                    onChange={(e) => setRoleId({type: 'roleid', value: e.target.value})}>
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