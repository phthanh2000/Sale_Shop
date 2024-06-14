import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { IoCaretForward } from "react-icons/io5";
import { MdLockReset } from "react-icons/md";
import { urlPages } from "../../utils/urlPage";
import './changepassword.css';

const ChangePassword = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Get token value to check whether you are logged in or not 
        const userToken = localStorage.getItem('TokenUser');
        if (!userToken) {
            // If user logged will return home page
            navigate(`/${urlPages[0].path}`);
            window.location.reload();
        }
    }, [])

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
                                    <input type="password"
                                        placeholder="Nhập Mật khẩu hiện tại"
                                        maxLength={50} />
                                    <IoEyeOff />
                                </div>
                                <div className="new-pass">
                                    <input type="password"
                                        placeholder="Mật khẩu mới:"
                                        maxLength={50} />
                                    <IoEyeOff />
                                </div>
                                <div className="renew-pass">
                                    <input
                                        type="password"
                                        placeholder="Nhập lại Mật khẩu mới"
                                        maxLength={50} />
                                    <IoEyeOff />
                                </div>
                            </div>
                        </div>
                        <div className="change-password-right-bottom">
                            <button>Thay đổi</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword;