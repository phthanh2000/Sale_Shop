import { useEffect, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Spinner from "../../assets/spinner.gif"
import Overlay from "../../components/Overlay/overlay";
import ErrorPopup from "../../components/ErrorPopup/errorpopup";
import { Service_User } from "../../service/service_user";
import './resetPassword.css';

const ResetPassword = () => {

    // User id 
    const [userId, setUserId] = useState();

    // Value from new password input
    const [newPassword, setNewPassword] = useState('');

    // Value from re-enter new password input
    const [reEnterNewPassword, setReEnterNewPassword] = useState('');

    // Display message when error password input
    const [newPasswordMessage, setNewPasswordMessage] = useState('');

    // Display message when error re-enter password input
    const [reEnterNewPasswordMessage, setReEnterNewPasswordMessage] = useState('');

    // Display new password
    const [isShowNewPassword, setIsShowNewPassword] = useState(false);

    // Display re-enter password
    const [isShowReNewPassword, setIsShowReNewPassword] = useState(false);

    // Display notifications form confirm successful
    const [isSubmitConfirm, setIsSubmitConfirm] = useState(false);

    // Display notifications form token expired
    const [isTokenExpired, setIsTokenExpired] = useState(false);

    // Hide/ Show overlay or loading when handler on click confirm button
    const [isShowOverlay, setIsShowOverlay] = useState(false);

    // Hide/ Show error message when handler on click confirm button error
    const [isShowErrorPopup, setIsShowErrorPopup] = useState({
        show: false,
        message: ''
    });

    useEffect(() => {
        // Async/ await
        async function fetchData() {
            try {
                // Token value
                const token = window.location.pathname.split('/')[2];

                // Data
                const data = {
                    token: token
                }

                // Check token expried or still valid
                const checkTokenExpired = await Service_User.CheckTokenExpired(data);
                if (checkTokenExpired === 'Token has expired')
                    setIsTokenExpired(true);
                else {
                    setUserId(checkTokenExpired);
                }
            } catch (error) {
                setIsShowErrorPopup({
                    show: true,
                    message: error
                });
            }
        }
        fetchData();
    }, []);

    // Event on click eye icon to password display 
    const onClickIconEyeToPasswordDislay = (name) => {
        if (name === 'pass') {
            setIsShowNewPassword(!isShowNewPassword);
        } else {
            setIsShowReNewPassword(!isShowReNewPassword);
        }
    }

    // Event on click confirm button on reset pasword form
    const onClickConfirmButton = async () => {
        if (newPassword === '') {
            setNewPasswordMessage('Mật khẩu không được để trống');
        }
        if (reEnterNewPassword === '') {
            setReEnterNewPasswordMessage('Nhập lại mật khẩu không được đê trống')
        }
        if (newPassword !== '' && reEnterNewPassword !== '' && newPassword !== reEnterNewPassword) {
            setReEnterNewPasswordMessage('Mật khẩu không khớp');
        }
        if (newPassword !== '' && reEnterNewPassword !== '' && newPassword === reEnterNewPassword) {
            // API reset password
            try {
                setIsShowOverlay(true);
                const data = {
                    id: userId,
                    pass: newPassword
                }
                const user = await Service_User.ResetPasswordUser(data);
                if (user === 'User not exists') {
                    setReEnterNewPasswordMessage('Tài khoản không tồn tại');
                }
                if (user !== undefined) {
                    setIsSubmitConfirm(true);
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

    // Event on enter input form
    const onKeyEnter = async (event) => {
        if (event.key === 'Enter') {
            onClickConfirmButton();
        }
    }

    return (
        <div className="reset-password-form">
            <div className="container-center">
                {isTokenExpired ?
                    <>
                        <div className="header-reset-password-form">
                            <div className="image">
                                <img alt="tag"
                                    src="https://res.cloudinary.com/doh8xw3s5/image/upload/v1709791944/iiqijmt0v6fgccbvehqy.webp" />
                            </div>
                            <div className="title">
                                Liên kết đặt lại mật khẩu của đã hết hạn
                            </div>
                        </div>
                        <div className="footer-reset-password-form">
                            <div className="info-notification">
                                Vui lòng bạn quay về trang <a href="/forget-password">Quên mật khẩu</a> để thực hiện lại yêu cầu.
                            </div>
                        </div>
                    </>
                    :
                    <>
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
                                        <a href="/login">Nhấp vào đây</a>&nbsp;để quay về trang Đăng nhập.
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
                                            onClick={() => { setNewPasswordMessage(''); setReEnterNewPasswordMessage('') }}
                                            onKeyDown={(e) => onKeyEnter(e)} />
                                        {isShowNewPassword ?
                                            <IoEye onClick={() => onClickIconEyeToPasswordDislay('pass')}></IoEye>
                                            :
                                            <IoEyeOff onClick={() => onClickIconEyeToPasswordDislay('pass')}></IoEyeOff>
                                        }
                                    </div>
                                    <div className={newPassword === '' ? "message-notification show" : "message-notification hide"}>
                                        {newPasswordMessage}
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
                                            onClick={() => { setReEnterNewPasswordMessage(''); setReEnterNewPasswordMessage('') }}
                                            onKeyDown={(e) => onKeyEnter(e)} />
                                        {isShowReNewPassword ?
                                            <IoEye onClick={() => onClickIconEyeToPasswordDislay('re-pass')}></IoEye>
                                            :
                                            <IoEyeOff onClick={() => onClickIconEyeToPasswordDislay('re-pass')}></IoEyeOff>
                                        }
                                    </div>
                                    <div className={reEnterNewPassword === '' ? "message-notification show" : "message-notification hide"}>
                                        {reEnterNewPasswordMessage}
                                    </div>
                                    <div className="confirm-password">
                                        <button className="button-confirm-password"
                                            type="button"
                                            name="confirm-password"
                                            onClick={() => onClickConfirmButton()}>
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
                    </>
                }
            </div>
            {isShowOverlay && <Overlay />}
            <ErrorPopup open={isShowErrorPopup} close={(e) => setIsShowErrorPopup(e)} />
        </div>
    )
}

export default ResetPassword;