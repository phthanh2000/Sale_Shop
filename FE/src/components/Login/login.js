import { useState } from "react";
import { Link } from "react-router-dom";
import { IoClose, IoEye, IoEyeOff } from "react-icons/io5";
import { Modal } from 'react-responsive-modal';
import { Register } from "../Register/register";
import 'react-responsive-modal/styles.css';
import './login.css';
import { ForgetPassWord } from "../ForgetPassword/forget";
import { Service_User } from "../../service/service_user";

export const Login = (props) => {
    // Value from email input
    const [email, setEmail] = useState('');

    // Value from password input
    const [password, setPassword] = useState('');

    // Display message when error email input
    const [emailMessage, setEmailMessage] = useState('');

    // Display message when error password input
    const [passwordMessage, setPasswordMessage] = useState('');

    // Display message when error user not exists or login failed
    const [loginMessage, setLoginMessage] = useState('');

    // Display password
    const [isShowPassword, setIsShowPassword] = useState(false);

    // Registration form display value
    const [isShowRegisterForm, setIsShowRegisterForm] = useState(false);

    // Forget password form display value
    const [isShowForgetPasswordForm, setIsShowForgetPasswordForm] = useState(false);

    // Event on click eye icon to password display 
    const onClickIconEyeToPasswordDislay = () => {
        setIsShowPassword(!isShowPassword);
    }

    // Event on click close icon on login form 
    const onClickCloseIcon = () => {
        props.closeLoginForm(!props.showLoginForm);
        setEmail('');
        setPassword('');
        setLoginMessage('');
    }


    // Event on click forget password link on login form
    const onClickForgetPasswordLink = () => {
        props.closeLoginForm(!props.showLoginForm);
        setIsShowForgetPasswordForm(!isShowForgetPasswordForm);
    }

    // Return value when click close button or return login form button on register form 
    const returnValueToForgetPasswordLink = (data, event) => {
        if (event === 'close') {
            setIsShowForgetPasswordForm(data);
        }
        else {
            setIsShowForgetPasswordForm(data);
            props.closeLoginForm(!props.showLoginForm);
        }
    };

    // Event on click register button on login form
    const onClickRegisterButton = () => {
        props.closeLoginForm(!props.showLoginForm);
        setIsShowRegisterForm(!isShowRegisterForm);
    }

    // Return value when click close button or return login form button on register form 
    const returnValueToCloseRegisterForm = (data, event) => {
        if (event === 'close') {
            setIsShowRegisterForm(data);
        }
        else {
            setIsShowRegisterForm(data);
            props.closeLoginForm(!props.showLoginForm);
        }
    };

    // Event on click login button
    const onClickLoginButton = async () => {
        setLoginMessage('');
        if (email === '') {
            setEmailMessage('Email không được để trống');
        }
        if (password === '') {
            setPasswordMessage('Mật khẩu không được để trống');
        }
        if (email !== '' && password !== '') {
            const dataLogin = {
                email: email,
                pass: password,
            }
            try {
                const result = await Service_User.UserLogin(dataLogin);
                if (result === 'Login failed') {
                    setLoginMessage('Email hoặc mật khẩu không chính xác');
                } else if (result === 'User does not exists') {
                    setLoginMessage('Tài khoản không tồn tại');
                } else {
                    localStorage.setItem('TokenUser', result);
                    props.closeLoginForm(!props.showLoginForm);
                    setEmail('');
                    setPassword('');
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    // Event on enter email or pass input or login button
    const onKeyEnter = async (event) => {
        if (event.key === 'Enter') {
            onClickLoginButton();
        }
    }

    return (
        <div className="login-form">
            <Modal
                open={props.showLoginForm}
                onClose={() => { }}
                center>
                <div className="header-login-form">
                    <IoClose className="close-icon"
                        onClick={() => onClickCloseIcon()} />
                    <div className="image">
                        <img alt="tag"
                            src="https://res.cloudinary.com/doh8xw3s5/image/upload/v1709791944/iiqijmt0v6fgccbvehqy.webp" />
                    </div>
                    <div className="title">
                        Đăng Nhập Tài Khoản
                    </div>
                </div>
                <div className="footer-login-form">
                    <label>
                        Email:
                    </label>
                    <div className="input-email">
                        <input type="email"
                            name="email"
                            placeholder="Nhập Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onClick={() => setEmailMessage('')}
                            onKeyDown={(e) => onKeyEnter(e)} />
                    </div>
                    <div className={email === '' ? "message-notification show" : "message-notification hidden"}>
                        {emailMessage}
                    </div>
                    <label>
                        Mật khẩu:
                    </label>
                    <div className="input-password">
                        <input type={isShowPassword ? "text" : "password"}
                            name="pass"
                            placeholder="Nhập Mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => onKeyEnter(e)} />
                        {isShowPassword ?
                            <IoEye onClick={() => onClickIconEyeToPasswordDislay()}></IoEye>
                            :
                            <IoEyeOff onClick={() => onClickIconEyeToPasswordDislay()}></IoEyeOff>
                        }
                    </div>
                    <div className={password === '' ? "message-notification show" : "message-notification hidden"}>
                        {passwordMessage}
                    </div>
                    <div className={loginMessage === '' ? "message-notification show" : "message-notification show"}>
                        {loginMessage}
                    </div>
                    <div className="login-forget">
                        <Link className="forget-password"
                            title="forget"
                            onClick={() => onClickForgetPasswordLink()}>
                            Quên mật khẩu?
                        </Link>
                        <button className="button-login"
                            type="button"
                            name="login"
                            onClick={() => onClickLoginButton()}>
                            Đăng nhập
                        </button>
                    </div>
                    <div className="line" />
                    <span>Bạn chưa có tài khoản?</span>
                    <div className="register">
                        <button className="button-register"
                            type="button"
                            name="register"
                            onClick={() => onClickRegisterButton()}>
                            Đăng ký
                        </button>
                    </div>
                </div>
            </Modal>
            {isShowForgetPasswordForm && <ForgetPassWord showForgetPasswordForm={isShowForgetPasswordForm}
                closeForgetForm={(data, event) => returnValueToForgetPasswordLink(data, event)} />}
            {isShowRegisterForm && <Register showRegisterForm={isShowRegisterForm}
                closeRegisterForm={(data, event) => returnValueToCloseRegisterForm(data, event)} />}
        </div>
    )
}