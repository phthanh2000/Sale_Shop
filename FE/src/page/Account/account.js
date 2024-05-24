import { Link } from "react-router-dom";
import { IoCaretForward } from "react-icons/io5";
import './account.css';
import { urlPages } from "../../utils/urlPage";

const Account = () => {
    return (
        <div className="account-form">
            <div className="container-center">
                <div className="row">
                    <div className="account-left">
                        <div className='title'>
                            Tài khoản
                        </div>
                        <div className="account-list">
                            <ul>
                                <li>
                                    <IoCaretForward />
                                    <Link to={''}>
                                        Thông tin cá nhân
                                    </Link>
                                </li>
                                <li>
                                    <IoCaretForward />
                                    <Link to={`/${urlPages[12].path}`}>
                                        Đơn mua
                                    </Link>
                                </li>
                                <li>
                                    <IoCaretForward />
                                    <Link to={`/${urlPages[13].path}`}>
                                        Danh sách địa chỉ
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="account-right">
                        ACCOUNT PAGE
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Account;