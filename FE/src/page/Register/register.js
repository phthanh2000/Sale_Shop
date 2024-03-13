import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Service_User } from "../../service/service_user";
import './register.css';

const Register = () => {
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

    // Display notifications form register successful
    const [isSubmitRegister, setIsSubmitRegister] = useState(false);

    // Event on click eye icon to password display 
    const onClickIconEyeToPasswordDislay = (name) => {
        if (name === 'pass') {
            setIsShowPassword(!isShowPassword);
        } else {
            setIsShowRePassword(!isShowRePassword);
        }
    }

    // Event on click register button on register form
    const onClickRegisterButton = async () => {
        setReEnterPasswordMessage('');
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
        if (!phoneRegex.test(phone)) {
            setPhoneMessage('Số điện thoại không đúng định dạng là số điện thoại');
        }
        if (password === '') {
            setPasswordMessage('Mật khẩu không được để trống');
        }
        if (reEnterPassword === '') {
            setReEnterPasswordMessage('Nhập lại mật khẩu không được đê trống')
        }
        if (password !== '' && reEnterPassword !== '' && password !== reEnterPassword) {
            setReEnterPasswordMessage('Mật khẩu không khớp');
        }
        if (name !== '' && email !== '' && emailRegex.test(email) && phone !== '' && phoneRegex.test(phone) && password !== '' && reEnterPassword !== '') {
            // Login API create user
            try {
                const dataRegister = {
                    name: name,
                    email: email,
                    phone: phone,
                    pass: password,
                    roleid: 2
                };
                const result = await Service_User.RegisterUser('', dataRegister);
                if (result === 'Email is used') {
                    setEmailMessage('Email đã được đăng ký');
                } else {
                    setIsSubmitRegister(!isSubmitRegister);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    // Event on enter input form
    const onKeyEnter = async (event) => {
        if (event.key === 'Enter') {
            onClickRegisterButton();
        }
    }

    return (
        <div className="register-form">
            <div className="container-center">
                {isSubmitRegister ?
                    <>
                        <div className="header-register-form">
                            <div className="image">
                                <img alt="tag"
                                    src="https://res.cloudinary.com/doh8xw3s5/image/upload/v1709791944/iiqijmt0v6fgccbvehqy.webp" />
                            </div>
                            <div className="title">
                                Chúc mừng bạn đăng ký tài khoản thành công
                            </div>
                        </div>
                        <div className="footer-register-form">
                            <div className="info-notification">
                                Tài khoản của bạn đã được kích hoạt.
                                <br></br>
                                Bạn có thể sử dụng tài khoản để đăng nhập và mua sản phẩm của chúng tôi.
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="header-register-form">
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
                                    maxLength={100}
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onClick={() => setNameMessage('')}
                                    onKeyDown={(e) => onKeyEnter(e)} />
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
                                    maxLength={50}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onClick={() => setEmailMessage('')}
                                    onKeyDown={(e) => onKeyEnter(e)} />
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
                                    maxLength={10}
                                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    onClick={() => setPhoneMessage('')}
                                    onKeyDown={(e) => onKeyEnter(e)} />
                            </div>
                            <div className={phone === '' ? "message-notification show" : "message-notification hide"}>
                                {phoneMessage}
                            </div>
                            <label>
                                Mật khẩu:
                            </label>
                            <div className="input-password">
                                <input type={isShowPassword ? 'text' : 'password'}
                                    name="pass"
                                    placeholder="Nhập Mật khẩu"
                                    maxLength={50}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onClick={() => setPasswordMessage('')}
                                    onKeyDown={(e) => onKeyEnter(e)} />
                                {isShowPassword ?
                                    <IoEye onClick={() => onClickIconEyeToPasswordDislay('pass')}></IoEye>
                                    :
                                    <IoEyeOff onClick={() => onClickIconEyeToPasswordDislay('pass')}></IoEyeOff>
                                }
                            </div>
                            <div className={password === '' ? "message-notification show" : "message-notification hide"}>
                                {passwordMessage}
                            </div>
                            <label>
                                Nhập lại mật khẩu:
                            </label>
                            <div className="input-re-enter-password">
                                <input type={isShowRePassword ? 'text' : 'password'}
                                    name="re-enter-password"
                                    placeholder="Nhập lại mật khẩu"
                                    maxLength={50}
                                    onChange={(e) => setReEnterPassword(e.target.value)}
                                    onClick={() => setReEnterPasswordMessage('')}
                                    onKeyDown={(e) => onKeyEnter(e)} />
                                {isShowRePassword ?
                                    <IoEye onClick={() => onClickIconEyeToPasswordDislay('re-pass')}></IoEye>
                                    :
                                    <IoEyeOff onClick={() => onClickIconEyeToPasswordDislay('re-pass')}></IoEyeOff>
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
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Register;