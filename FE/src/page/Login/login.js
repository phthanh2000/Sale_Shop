import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Service_User } from "../../service/service_user";
import { urlPages } from "../../utils/urlPage";
import './login.css';

const Login = () => {
    const navigate = useNavigate();

    // Value from email input
    const [email, setEmail] = useState('');

    // Value from password input
    const [password, setPassword] = useState('');
    
    // Display password
    const [isShowPassword, setIsShowPassword] = useState(false);

    // Display message when error email input
    const [emailMessage, setEmailMessage] = useState('');

    // Display message when error password input
    const [passwordMessage, setPasswordMessage] = useState('');

    // Display message when error user not exists or login failed
    const [loginMessage, setLoginMessage] = useState('');

    // Event on click eye icon to password display 
    const onClickIconEyeToPasswordDislay = () => {
        setIsShowPassword(!isShowPassword);
    }

    // Event on click forget password link
    const onClickForgetPasswordLink = () => {
        navigate(`/${urlPages[9].path}`);
    }

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
                    navigate(`/${urlPages[0].path}`);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    // Event on click register button
    const onClickRegisterButton = () => {
        navigate(`/${urlPages[8].path}`);
    }

    // Event on enter input form
    const onKeyEnter = async (event) => {
        if (event.key === 'Enter') {
            onClickLoginButton();
        }
    }

    return (
        <div className="login-form">
            <div className="container-center">
                <div className="header-login-form">
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
                            maxLength={50}
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
                            maxLength={50}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onClick={() => setPasswordMessage('')}
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
                        <u className="forget-password"
                            onClick={() => onClickForgetPasswordLink()}>
                            Quên mật khẩu?
                        </u>
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
                            Đăng ký ngay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login