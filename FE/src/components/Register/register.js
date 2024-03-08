import { useState } from "react";
import { IoClose, IoEye, IoEyeOff } from "react-icons/io5";
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './register.css';

export const Register = (props) => {
    // Value from name input
    const [name, setName] = useState('');

    // Value from email input
    const [email, setEmail] = useState('');

    // Value from phone input
    const [phone, setPhone] = useState('');

    // Value from password input
    const [password, setPassword] = useState('');

    // Value from re-enter password input
    const [reEnterPassword, setReEnterPassword] = useState('');

    // Display message when error name input
    const [nameMessage, setNameMessage] = useState('');

    // Display message when error email input
    const [emailMessage, setEmailMessage] = useState('');

    // Display message when error phone input
    const [phoneMessage, setPhoneMessage] = useState('');

    // Display message when error password input
    const [passwordMessage, setPasswordMessage] = useState('');

    // Display message when error re-enter password input
    const [reEnterPasswordMessage, setReEnterPasswordMessage] = useState('');

    // Display password
    const [isShowPassword, setIsShowPassword] = useState(false);

    // Display re-enter password
    const [isShowRePassword, setIsShowRePassword] = useState(false);

    // Event on click eye icon to password display 
    const onClickIconEyeToPasswordDislay = (name) => {
        if (name === 'pass') {
            setIsShowPassword(!isShowPassword);
        } else {
            setIsShowRePassword(!isShowRePassword);
        }
    }

    // Event on click close icon on register form
    const onClickCloseIcon = () => {
        props.closeRegisterForm(!props.showRegisterForm, 'close');
    }

    // Event on click register button on register form
    const onClickRegisterButton = () => {
        if (name=== '') {
            setNameMessage('Tên người dùng không được để trống');
        } 
        if (email === '') {
            setEmailMessage('Email không được để trống');
        } 
        if (phone=== '') {
            setPhoneMessage('Số điện không được để trống');
        } 
        if (password === '') {
            setPasswordMessage('Mật khẩu không được để trống');
        } 
        if (reEnterPassword === ''){
            setReEnterPasswordMessage('Nhập lại mật khẩu không được đê trống')
        }
        if (password !== '' && reEnterPassword !== '' && password !== reEnterPassword){
            setReEnterPasswordMessage('Mật khẩu không khớp');
        } else {
            // Login API
        }
    }

    // Event on click return login form button on register form
    const onClickReturnLoginFormButton = () => {
        props.closeRegisterForm(!props.showRegisterForm, 'return');
    }

    return (
        <div className="register-form">
            <Modal
                open={props.showRegisterForm}
                onClose={() => { }}
                center>
                <div className="header-register-form">
                    <IoClose className="close-icon"
                        onClick={() => onClickCloseIcon()} />
                    <div className="image">
                        <img alt="tag"
                            src="https://res.cloudinary.com/doh8xw3s5/image/upload/v1709791944/iiqijmt0v6fgccbvehqy.webp" />
                    </div>
                    <div className="title">
                        Đăng Ký Tài Khoản
                    </div>
                </div>
                <div className="footer-register-form">
                    <label>
                        Tên người dùng:
                    </label>
                    <div className="input-name">
                        <input type="text"
                            name="name"
                            placeholder="Nhập Tên người dùng"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onClick={() => setNameMessage('')} />
                    </div>
                    <div className={name === '' ? "message-notification show" : "message-notification hide"}>
                        {nameMessage}
                    </div>
                    <label>
                        Email:
                    </label>
                    <div className="input-email">
                        <input type="email"
                            name="email"
                            placeholder="Nhập Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onClick={() => setEmailMessage('')} />
                    </div>
                    <div className={email === '' ? "message-notification show" : "message-notification hide"}>
                        {emailMessage}
                    </div>
                    <label>
                        Số điện thoại:
                    </label>
                    <div className="input-phone">
                        <input type="tel"
                            name="phone"
                            placeholder="Nhập Số điện thoại"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            onClick={() => setPhoneMessage('')} />
                    </div>
                    <div className={phone === '' ? "message-notification show" : "message-notification hide"}>
                        {phoneMessage}
                    </div>
                    <label>
                        Mật khẩu:
                    </label>
                    <div className="input-password">
                        {isShowPassword ?
                            <>
                                <input type="text"
                                    name="pass"
                                    placeholder="Nhập Mật khẩu"
                                    onChange={(e) => setPassword(e.target.value)}
                                    onClick={() => setPasswordMessage('')} />
                                <IoEye onClick={(e) => onClickIconEyeToPasswordDislay('pass')}></IoEye>
                            </>
                            :
                            <>
                                <input type="password"
                                    name="pass"
                                    placeholder="Nhập Mật khẩu"
                                    onChange={(e) => setPassword(e.target.value)}
                                    onClick={() => setPasswordMessage('')} />
                                <IoEyeOff onClick={(e) => onClickIconEyeToPasswordDislay('pass')}></IoEyeOff>
                            </>
                        }
                    </div>
                    <div className={password === '' ? "message-notification show" : "message-notification hide"}>
                        {passwordMessage}
                    </div>
                    <label>
                        Nhập lại mật khẩu:
                    </label>
                    <div className="input-re-enter-password">
                        {isShowRePassword ?
                            <>
                                <input type="text"
                                    name="re-enter-password"
                                    placeholder="Nhập lại mật khẩu"
                                    onChange={(e) => setReEnterPassword(e.target.value)}
                                    onClick={() => setReEnterPasswordMessage('')} />
                                <IoEye onClick={(e) => onClickIconEyeToPasswordDislay('re-pass')}></IoEye>
                            </>
                            :
                            <>
                                <input type="password"
                                    name="re-enter-password"
                                    placeholder="Nhập lại mật khẩu"
                                    onChange={(e) => setReEnterPassword(e.target.value)}
                                    onClick={() => setReEnterPasswordMessage('')} />
                                <IoEyeOff onClick={(e) => onClickIconEyeToPasswordDislay('re-pass')}></IoEyeOff>
                            </>
                        }
                    </div>
                    <div className={reEnterPassword === '' ? "message-notification show" : "message-notification hide"}>
                        {reEnterPasswordMessage}
                    </div>
                    <div className="register">
                        <button className="button-register"
                            type="button"
                            name="register"
                            onClick={() => onClickRegisterButton()}>
                            Đăng ký
                        </button>
                    </div>
                    <div className="line" />
                    <span>Bạn đã có tài khoản?</span>
                    <div className="login">
                        <button className="button-login"
                            type="button"
                            name="login"
                            onClick={() => onClickReturnLoginFormButton()}>
                            Quay về trang đăng nhập
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}