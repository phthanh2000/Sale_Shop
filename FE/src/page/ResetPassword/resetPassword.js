import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Spinner from "../../assets/spinner.gif"
import Overlay from "../../components/Overlay/overlay";
import ErrorPopup from "../../components/ErrorPopup/errorpopup";
import { Service_User } from "../../service/service_user";
import './resetPassword.css';

const ResetPassword = () => {
    // Value from new password input
    const [newPassword, setNewPassword] = useState('');

    // Value from re-enter new password input
    const [reEnterNewPassword, setReEnterNewPassword] = useState('');

    // Display message when error password input
    const [passwordMessage, setPasswordMessage] = useState('');

    // Display message when error re-enter password input
    const [reEnterPasswordMessage, setReEnterPasswordMessage] = useState('');

    // Display new password
    const [isShowNewPassword, setIsShowNewPassword] = useState(false);

    // Display re-enter password
    const [isShowReNewPassword, setIsShowReNewPassword] = useState(false);

    // Display notifications form confirm successful
    const [isSubmitConfirm, setIsSubmitConfirm] = useState(false);

    // Hide/ Show overlay or loading when handler on click confirm button
    const [isShowOverlay, setIsShowOverlay] = useState(false);

    // Hide/ Show error message when handler on click confirm button error
    const [isShowErrorPopup, setIsShowErrorPopup] = useState({
        show: false,
        message: ''
    });

    // Event on click eye icon to password display 
    const onClickIconEyeToPasswordDislay = (name) => {
        if (name === 'pass') {
            setIsShowNewPassword(!isShowNewPassword);
        } else {
            setIsShowReNewPassword(!isShowReNewPassword);
        }
    }

    // Event on click confirm button on reset pasword form
    const onClickRegisterButton = async () => {
        if (newPassword === '') {
            setPasswordMessage('Mật khẩu không được để trống');
        }
        if (reEnterNewPassword === '') {
            setReEnterPasswordMessage('Nhập lại mật khẩu không được đê trống')
        }
        if (newPassword !== '' && reEnterNewPassword !== '' && newPassword !== reEnterNewPassword) {
            setReEnterPasswordMessage('Mật khẩu không khớp');
        }
        if (newPassword !== '' && reEnterNewPassword !== '' && newPassword === reEnterNewPassword) {
            // Login API create user
            try {
                setIsShowOverlay(true);

            } catch (error) {
                setIsShowErrorPopup({
                    show: true,
                    message: error
                });
            }
            setIsShowOverlay(false);
        }
    }

    // Event on enter input form
    const onKeyEnter = async (event) => {
        if (event.key === 'Enter') {
            onClickRegisterButton();
        }
    }

    return (
        <div className="reset-password-form">
            <div className="container-center">
                {isSubmitConfirm ?
                    <>
                        <div className="header-reset-password-form">
                            <div className="image">
                                <img alt="tag"
                                    src="https://res.cloudinary.com/doh8xw3s5/image/upload/v1709791944/iiqijmt0v6fgccbvehqy.webp" />
                            </div>
                            <div className="title">
                                Chúc mừng bạn thay đổi mật khẩu thành công
                            </div>
                        </div>
                        <div className="footer-reset-password-form">
                            <div className="info-notification">
                                <a href="/login">Click vào đây</a>&nbsp;để quay về trang đăng nhập.
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div className="header-reset-password-form">
                            <div className="image">
                                <img alt="tag"
                                    src="https://res.cloudinary.com/doh8xw3s5/image/upload/v1709791944/iiqijmt0v6fgccbvehqy.webp" />
                            </div>
                            <div className="title">
                                Thay Đổi Mật Khẩu
                            </div>
                        </div>
                        <div className="footer-reset-password-form">
                            <label>
                                Mật khẩu mới:
                            </label>
                            <div className="input-password">
                                <input type={isShowNewPassword ? 'text' : 'password'}
                                    name="pass"
                                    placeholder="Nhập Mật khẩu mới"
                                    maxLength={50}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    onClick={() => { setPasswordMessage(''); setReEnterPasswordMessage('') }}
                                    onKeyDown={(e) => onKeyEnter(e)} />
                                {isShowNewPassword ?
                                    <IoEye onClick={() => onClickIconEyeToPasswordDislay('pass')}></IoEye>
                                    :
                                    <IoEyeOff onClick={() => onClickIconEyeToPasswordDislay('pass')}></IoEyeOff>
                                }
                            </div>
                            <div className={newPassword === '' ? "message-notification show" : "message-notification hide"}>
                                {passwordMessage}
                            </div>
                            <label>
                                Nhập lại mật khẩu mới:
                            </label>
                            <div className="input-re-enter-password">
                                <input type={isShowReNewPassword ? 'text' : 'password'}
                                    name="re-enter-password"
                                    placeholder="Nhập lại mật khẩu mới"
                                    maxLength={50}
                                    onChange={(e) => setReEnterNewPassword(e.target.value)}
                                    onClick={() => { setReEnterPasswordMessage(''); setReEnterPasswordMessage('') }}
                                    onKeyDown={(e) => onKeyEnter(e)} />
                                {isShowReNewPassword ?
                                    <IoEye onClick={() => onClickIconEyeToPasswordDislay('re-pass')}></IoEye>
                                    :
                                    <IoEyeOff onClick={() => onClickIconEyeToPasswordDislay('re-pass')}></IoEyeOff>
                                }
                            </div>
                            <div className={reEnterNewPassword === '' ? "message-notification show" : "message-notification hide"}>
                                {reEnterPasswordMessage}
                            </div>
                            <div className="change-passwor">
                                <button className="button-change-passwor"
                                    type="button"
                                    name="change-passwor"
                                    onClick={() => onClickRegisterButton()}>
                                    {isShowOverlay ?
                                        <img className="spinner-image" src={Spinner} alt="spinner" />
                                        :
                                        <>Xác nhận</>
                                    }
                                </button>
                            </div>
                        </div>
                    </>
                }
            </div>
            {isShowOverlay && <Overlay />}
            <ErrorPopup open={isShowErrorPopup} close={(e) => setIsShowErrorPopup(e)} />
        </div>
    )
}

export default ResetPassword;