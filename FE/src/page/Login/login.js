import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Service_User } from "../../service/service_user";
import { urlPages } from "../../utils/urlPage";
import Spinner from "../../assets/spinner.gif"
import Overlay from "../../components/Overlay/overlay";
import ErrorPopup from "../../components/ErrorPopup/errorpopup";
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

    // Hide/ Show overlay or loading when handler on click login button
    const [isShowOverlay, setIsShowOverlay] = useState(false);

    // Hide/ Show error message when handler on click login button error
    const [isShowErrorPopup, setIsShowErrorPopup] = useState({
        show: false,
        message: ''
    });

    useEffect(() => {
        // Get token value to check whether you are logged in or not 
        const userToken = localStorage.getItem('TokenUser');
        if (userToken) {
            // If user logged will return home page
            navigate(`/${urlPages[0].path}`);
            window.location.reload();
        }
    }, []);

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
                setIsShowOverlay(true);
                const result = await Service_User.UserLogin(dataLogin);
                if (result === 'Login failed') {
                    setLoginMessage('Email hoặc mật khẩu không chính xác');
                } else if (result === 'User does not exists') {
                    setLoginMessage('Tài khoản không tồn tại');
                } else {
                    // Set expiration time token login is 8 hours 
                    const now = new Date().getTime();
                    const expirationTime = now + 8 * 60 * 60 * 1000;
                    localStorage.setItem('TokenUser', JSON.stringify({ result, expirationTime }));
                    navigate(`/${urlPages[0].path}`);
                    window.location.reload();
                }
            } catch (error) {
                setIsShowErrorPopup({
                    show: true,
                    message: error
                });
            }
            setIsShowOverlay(false);
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
                            onClick={() => { setEmailMessage(''); setLoginMessage('') }}
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
                            onClick={() => { setPasswordMessage(''); setLoginMessage('') }}
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
                            {isShowOverlay ?
                                <img className="spinner-image" src={Spinner} alt="spinner" />
                                :
                                <>Đăng nhập</>
                            }
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
            {isShowOverlay && <Overlay />}
            <ErrorPopup open={isShowErrorPopup} close={(e) => setIsShowErrorPopup(e)} />
        </div>
    )
}

export default Login