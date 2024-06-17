import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { IoCaretForward } from "react-icons/io5";
import { MdLockReset } from "react-icons/md";
import { Service_User } from "../../service/service_user";
import { urlPages } from "../../utils/urlPage";
import Overlay from "../../components/Overlay/overlay";
import ErrorPopup from "../../components/ErrorPopup/errorpopup";
import './changepassword.css';

const ChangePassword = () => {
    const navigate = useNavigate();

    // Id 
    const [id, setId] = useState('');

    // Password
    const [password, setPassword] = useState('');

    // New password
    const [newPassword, setNewPassword] = useState('');

    // Renew password 
    const [renewPassword, setRenewPassword] = useState('');

    // Password message
    const [passwordMessage, setPasswordMessage] = useState('');

    // New password message
    const [newPasswordMessage, setNewPasswordMessage] = useState('');

    // Renew password message
    const [renewPasswordMessage, setRenewPasswordMessage] = useState('');

    // Result message
    const [resultMessage, setResultMessage] = useState('');

    // Display password
    const [showPassword, setShowPassword] = useState(false);

    // Display new password
    const [showNewPassword, setShowNewPassword] = useState(false);

    // Display renew password 
    const [showRenewPassword, setShowRenewPassword] = useState(false);

    // Hide/ Show overlay or loading when handler loading data or on click update button
    const [isShowOverlay, setIsShowOverlay] = useState(false);

    // Hide/ Show error message when handler loading data or on click confirm button error
    const [isShowErrorPopup, setIsShowErrorPopup] = useState({
        show: false,
        message: ''
    });

    useEffect(() => {
        // Async/ await
        async function fetchData() {
            try {
                // Get token value to check whether you are logged in or not 
                const userToken = localStorage.getItem('TokenUser');
                if (!userToken) {
                    // If user logged will return home page
                    navigate(`/${urlPages[0].path}`);
                    window.location.reload();
                }
                // Parse json
                const data = JSON.parse(userToken);
                // Show overlay when waiting loading data
                setIsShowOverlay(true);
                // Get user info from userToken 
                const userInfo = await Service_User.GetUserInfo({ token: data.result });
                if (userInfo) {
                    // Set id
                    setId(userInfo.id);
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
    }, []);

    // Event on click eye icon
    const onClickIconEye = (name) => {
        if (name === 'pass') {
            setShowPassword(!showPassword);
        } else if (name === 'new-pass') {
            setShowNewPassword(!showNewPassword);
        } else {
            setShowRenewPassword(!showRenewPassword);
        }
    }

    // Event on click change button 
    const onClickChangeButton = async () => {
        if (newPassword !== '' && renewPassword !== '' && newPassword != renewPassword) {
            setNewPasswordMessage('Mật khẩu mới không khớp với nhập lại mật khẩu');
            setRenewPasswordMessage('Nhập lại mật khẩu không khớp với mật khẩu mới');
            return;
        }
        // Hanle change password
        try {
            // Show overlay when waiting loading data
            setIsShowOverlay(true);
            // Set messages empty
            setPasswordMessage('');
            setNewPasswordMessage('');
            setRenewPasswordMessage('');
            setResultMessage('');
            // Check present password valid and change password
            const updatePassword = await Service_User.UpdatePasswordUser('', id, { password: password, newPassword: newPassword });
            if (updatePassword === "Current password is incorrect") {
                setResultMessage("Mật khẩu hiện tại không chính xác. Vui lòng kiểm tra lại");
            } else {
                setResultMessage("Thay đổi mật khẩu thành công !");
            }
        } catch (error) {
            setIsShowErrorPopup({
                show: true,
                message: error
            })
        }
        // Hide overlay after handle data 
        setIsShowOverlay(false);
    }

    // Event on enter input form
    const onKeyEnter = async (event) => {
        if (event.key === 'Enter') {
            onClickChangeButton();
        }
    }

    return (
        <div className="change-password-form">
            <div className="container-center">
                <div className="row">
                    <div className="change-password-left">
                        <div className='title'>
                            Tài khoản
                        </div>
                        <div className="change-password-list">
                            <ul>
                                <li>
                                    <IoCaretForward />
                                    <Link to={`/${urlPages[11].path}`}>
                                        Thông tin cá nhân
                                    </Link>
                                </li>
                                <li>
                                    <IoCaretForward />
                                    <Link to={`/${urlPages[13].path}`}>
                                        Thay đổi mật khẩu
                                    </Link>
                                </li>
                                <li>
                                    <IoCaretForward />
                                    <Link to={`/${urlPages[12].path}`}>
                                        Lịch sử mua hàng
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="change-password-line" />
                    <div className="change-password-right">
                        <div className="change-password-right-top">
                            <MdLockReset />
                            <a>Thay đổi mật khẩu</a>
                        </div>
                        <div className="change-password-right-center">
                            <div className="title">
                                <p className="pressent-pass">
                                    Mật khẩu hiện tại:
                                </p>
                                <p className="new-pass">
                                    Mật khẩu mới:
                                </p>
                                <p className="renew-pass">
                                    Nhập lại Mật khẩu mới:
                                </p>
                            </div>
                            <div className="input">
                                <div className="present-pass">
                                    <input type={showPassword ? "text" : "password"}
                                        placeholder="Nhập Mật khẩu hiện tại"
                                        maxLength={50}
                                        onClick={() => { setPasswordMessage('') }}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onKeyDown={(e) => onKeyEnter(e)} />
                                    {showPassword ?
                                        <IoEye onClick={() => onClickIconEye("pass")} />
                                        :
                                        <IoEyeOff onClick={() => onClickIconEye("pass")} />
                                    }
                                </div>
                                <div className={passwordMessage ? "password-message show" : "password-message hide"}>
                                    {passwordMessage}
                                </div>
                                <div className="new-pass">
                                    <input type={showNewPassword ? "text" : "password"}
                                        placeholder="Mật khẩu mới"
                                        maxLength={50}
                                        onClick={() => { setNewPasswordMessage('') }}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        onKeyDown={(e) => onKeyEnter(e)} />
                                    {showNewPassword ?
                                        <IoEye onClick={() => onClickIconEye("new-pass")} />
                                        :
                                        <IoEyeOff onClick={() => onClickIconEye("new-pass")} />
                                    }
                                </div>
                                <div className={newPasswordMessage ? "new-pass-message show" : "new-pass-message hide"}>
                                    {newPasswordMessage}
                                </div>
                                <div className="renew-pass">
                                    <input type={showRenewPassword ? "text" : "password"}
                                        placeholder="Nhập lại Mật khẩu mới"
                                        maxLength={50}
                                        onClick={() => { setRenewPasswordMessage('') }}
                                        onChange={(e) => setRenewPassword(e.target.value)}
                                        onKeyDown={(e) => onKeyEnter(e)} />
                                    {showRenewPassword ?
                                        <IoEye onClick={() => onClickIconEye("renew-pass")} />
                                        :
                                        <IoEyeOff onClick={() => onClickIconEye("renew-pass")} />
                                    }
                                </div>
                                <div className={renewPasswordMessage ? "renew-pass-message show" : "renew-pass-message hide"}>
                                    {renewPasswordMessage}
                                </div>
                            </div>
                        </div>
                        <div className={resultMessage ? "result-message show" : "result-message hide"}>
                            {resultMessage}
                        </div>
                        <div className="change-password-right-bottom">
                            <button onClick={() => onClickChangeButton()}>Thay đổi</button>
                        </div>
                    </div>
                </div>
            </div>
            {isShowOverlay && <Overlay />}
            <ErrorPopup open={isShowErrorPopup} close={(e) => setIsShowErrorPopup(e)} />
        </div>
    )
}

export default ChangePassword;